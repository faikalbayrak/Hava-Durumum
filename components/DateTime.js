import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment-timezone'

const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const WIDTH= Math.round(Dimensions.get("window").width);
const HEIGHT= Dimensions.get("window").height;

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemTitle}>{title}</Text>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hour < 10? '0'+hour : hour) + ':' + (minutes < 10? '0'+minutes: minutes)) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    return (
        <View style={styles.container}>  
           <View>
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>
               <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Nem" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Basınç" value={current? current.pressure : ""} unit="hPA"/>
                    <WeatherItem title="Gün Doğumu" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Gün Batımı" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="pm"/>
               </View>
           </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1.5,
        flexDirection:"row",
        justifyContent:'space-between',
        padding: 15,
        marginTop: 50
    },
    heading: {
        fontSize: 45,
        color:'white',
        fontWeight: '100',
        marginLeft: WIDTH - 270,
        top:80,
        
    },
    subheading: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300',
        marginLeft: WIDTH - 290,
        top:80
    },
    rightAlign: {
        textAlign:'right',
        marginTop: 20
    },
    timezone: {
        fontSize: 20,
        color:'white'
    },
    latlong:{
        fontSize:16,
        color:'white',
        fontWeight: '700'
    },
    weatherItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 100,
        marginLeft: WIDTH - 330,
        marginRight: -50,
        top:90
    }, 
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherItemTitle: {
        color:'#eee',
        fontSize: 14,
        fontWeight: '100'
    }
})

export default DateTime
