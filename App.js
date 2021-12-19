import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, Modal, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { AdMobBanner } from 'expo-ads-admob';
import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';
import {ModalPicker} from './components/ModalPicker';
import { backgroundColor, color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



const API_KEY ='39d46f56e8e487a3d046df02e30b11d7';
const img = require('./assets/image.png');
const WIDTH= Math.round(Dimensions.get("window").width);
const HEIGHT= Math.round(Dimensions.get("window").height);
export default function App() {
  const [data, setData] = useState({});
  const [chooseData,setChooseData] = useState('Şehir Seçiniz..');
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [loc,setLoc] = useState("");
  const changeModalVisibility = (bool) => {
      setIsModalVisible(bool);
  }

  const setCity = (option) => {
    setChooseData(option);
  }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("41.008240", "28.978359")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      
      
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.coords.latitude + ',' + location.coords.longitude + '&key=' + "AIzaSyC-Boiha514rQij5kb4_92RZkpwk8DsNJU")
        .then((response) => response.json())
        .then((responseJson) => {
            setChooseData(responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name)
            setLoc(responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name)
      })

    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} >
      
      <View style={styles.banner}>
        <AdMobBanner
              bannerSize='banner'
              adUnitID="ca-app-pub-5831767362421175/4361443532" // Test ID, Replace with your-admob-unit-id
              />
      </View>

      <Text style={{top:HEIGHT - 750,left:WIDTH - 270}}>Konumunuz: {loc}</Text>

      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <SafeAreaView style={styles.container2}>
          <TouchableOpacity 
            style={styles.touchableOpacity}
            onPress={() => changeModalVisibility(true)}
          >
            <Text style={styles.text}>{chooseData}</Text>
          </TouchableOpacity>
          <Modal 
          transparent={true}
          animationType='fade'
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}
          >
            <ModalPicker
              changeModalVisibility={changeModalVisibility}
              setCity={setCity}
              fetchDataFromApi={fetchDataFromApi}
             
            />
          </Modal>
        </SafeAreaView>
        
        
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    

  },
  text:{
    marginVertical: 20,
    fontSize: 25,
    paddingLeft: Dimensions.get('window').width/2 - 80,
    color: '#fff'
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  },
  touchableOpacity:{
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: '#00000077',
    borderRadius: 10

  },
  banner:{
    marginBottom: HEIGHT - 1000,
    marginLeft: WIDTH - 360,
    marginTop:50,
  }
});
