import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';


const OPTIONS = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'];
const longitudes = ['35.330830','38.276451','30.538700','43.050869','35.833618','32.859741','30.713324','41.820370','28.486397','33.495560','29.982059','40.496250','42.106159','31.600210','30.282333','29.060965','26.405689','33.616741','34.959419','29.096333','40.225590','26.555716','39.222515','39.489559','41.264549','30.525631','37.378109','38.392654','39.485180','43.738190','36.349812','30.556210','34.641479','28.978359','27.142826','43.099110','33.778400','35.482597','27.218630','34.160252','29.932949','32.493156','29.985189','38.333527','27.429562','36.946812','40.733952','28.486397','41.494920','34.714149','34.676311','37.879799','40.518929','30.394817','36.336067','41.941978','35.151726','37.015259','27.515240','36.552193','39.719219','39.548260','38.791809','29.404869','43.396450','34.807838','31.789339','34.029701','40.226452','33.256248','33.503349','41.129211','42.453972','32.329342','33.886398','44.038311','29.284185','32.621712','37.114662','36.230331','33.785191'];
const latitudes = ['36.991421','37.764542','38.757542','39.718491','40.653671','39.933365','36.896893','41.181129','37.811703','35.207932','40.144691','38.884312','38.406071','40.730190','37.718334','40.188526','40.151550','40.599640','40.552750','37.783016','37.916248','41.677132','38.674816','39.751221','39.901501','39.766705','37.065952','40.917534','40.459190','37.578350','36.401848','37.764351','36.812103','41.008240','38.423733','40.610519','41.375721','38.720490','41.733959','39.150131','40.762402','37.874641','39.419891','38.355362','38.614033','37.579609','37.312904','37.183582','38.740190','38.624695','37.970230','40.985859','41.026089','40.773075','41.279701','37.927402','42.027973','39.750969','40.978931','40.323463','41.002071','39.106171','37.160221','38.673759','38.503490','39.823730','41.450508','38.368626','40.259239','35.318371','39.839500','37.899910','37.522758','41.625839','35.356621','39.924080','40.654896','41.195759','36.716476','37.065521','35.056301'];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setCity(option);
        let lat;
        let long;
        for(let i=0;i<81;i++){
            if(OPTIONS[i] === option){
                lat = latitudes[i];
                long = longitudes[i];
            }
        }
        props.fetchDataFromApi(lat,long);


    }

    const option = OPTIONS.map((item,index) => {
        return(
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return(

        <TouchableOpacity
           onPress={() => props.changeModalVisibility(false)}
           style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal:{
        backgroundColor: '#000',
        borderRadius: 10,
    },
    option:{
        alignItems: 'flex-start'
    },
    text:{
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export {ModalPicker}