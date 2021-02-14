// import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import React, { Component , useState} from "react";
import { Dimensions,Linking,Alert,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-資訊.png');
const filterButton_image = require('../assets/filterButton.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const footer_image = require('../assets/Footer.png');
const arrow_image = require('../assets/arrow.png');
const MapDetail = require('../assets/MapDetail.png');
const MapDetail_clinic = require('../assets/MapDetail_clinic.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class OverviewMap extends Component {
    constructor(props) {
        super(props);
        const MemberStoreList = require('../MemberStoreList.json');
        const ClinicTEL_List = require('../ClinicTEL_List.json');

        this.state = {
            showDetail: false,
            detailAddress: "台北市中山區",
            phone : "0225356756",
            opentime:"",
            status:"營業中",
            education:"",

            DetailImage:require('../assets/DetailImage.png'),
            TaipeiGroupMarkerSize:{
                width:82,
                height:82
            },
            normalMarkerSize:{
                width:32,
                height:40
            },
            markers: MemberStoreList,
            ClinicTELs : ClinicTEL_List,
        }
        
    }
    callTELToClinic = () =>{
        let tel = 'tel:' + this.state.phone;
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
            console.log('Can not handle tel:' + tel)
            } else {
            return Linking.openURL(tel)
            }
        }).catch(error => console.log('tel error', error))
    }
    callToGoogleMapNavigation = () =>{
        var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + this.state.detailAddress;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err)); 
    }
    ClinicOnClick = (marker) => {
        var i;
        var phone = "尚未提供電話";
        for (i = 0; i < this.state.ClinicTELs.length; i++) {
            //找到符合的診所了
            if (this.state.ClinicTELs[i]["clinicName"] == marker.title)
            {
                phone = this.state.ClinicTELs[i]["TEL"];
                break
            }
        }
        this.setState({ showDetail: true,
                        title : marker.title,
                        opentime : marker.opentime,
                        detailAddress : marker.detailAddress,
                        education : marker.education,
                        phone : phone,
                    });
    }
    render() {

        return (
            <ImageBackground  style={styles.borderBlackLine,{flex:1}}>
            <View style={styles.container,{flex: 3, flexDirection: 'column',borderWidth:1,
                                        borderColor:'black'}}>
                <View style={{flexDirection: 'column',zIndex: 1}}>
                    <Image source={overviewMapTopper_image} style={
                                        {marginTop: height < guidelineBaseHeight ? HeightScale(-170) : HeightScale(-85),
                                        resizeMode:'stretch',
                                        width:width}}></Image>
                    <Text style={{marginStart:WidthScale(65),
                                    color:'#47DCEF',
                                    fontSize:28,
                                    marginTop:height < guidelineBaseHeight ? HeightScale(-180) : HeightScale(-140),
                                    }}>Hi Ethan</Text>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.14, flexDirection: 'row',
                        zIndex: 1,}}>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:145,
                        borderRadius:30,
                        backgroundColor:'#8E949B',
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:width < guidelineBaseWidth ? WidthScale(20) : WidthScale(29) ,
                        marginTop:HeightScale(35),
                    }} 
                    onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    <Text style={styles.borderBlackLine,{marginStart:WidthScale(23),fontSize:16,marginTop:HeightScale(15),color:'white'}}>診所/人力/車位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity id={'foodFilterBtn'} style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(145),
                        borderRadius:30,
                        backgroundColor:'#F9FCFF',
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:width < guidelineBaseWidth ? WidthScale(10) : WidthScale(15) ,
                        marginTop:HeightScale(35),
                    }} onPress={()=>this.props.navigation.navigate('Food')}>
                    <Text style={styles.borderBlackLine,{marginStart:WidthScale(40),fontSize:16,marginTop:HeightScale(15)}}>食衣住行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:WidthScale(15),
                        marginTop:HeightScale(30),
                    }} onPress={()=>this.props.navigation.navigate('FilterStroe')}>
                    <Image source={filterButton_image} style={styles.borderBlackLine,{marginStart:WidthScale(5)}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.14, flexDirection: 'row',
                        zIndex: 1,}}>
                    {this.state.showDetail ? (
                        <View>
                            <Image
                                source={MapDetail_clinic}
                                style={styles.borderBlackLine,{resizeMode:'cover',
                                        width:WidthScale(415),  
                                        height:height < guidelineBaseHeight ? HeightScale(315) : HeightScale(279),
                                        marginTop:height < guidelineBaseHeight ? HeightScale(410) : HeightScale(455),
                                        marginStart:WidthScale(6) }}>
                            </Image>
                            <Image
                                source={this.state.DetailImage}
                                style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ?  HeightScale(-230) : HeightScale(-200),
                                        marginStart:WidthScale(30),
                                        width:WidthScale(143),
                                        height: height < guidelineBaseHeight ?  HeightScale(130) : HeightScale(100),
                                        borderWidth:3,
                                        borderRadius:8,
                                        borderColor:'white'}}>
                            </Image>
                            <View style={styles.borderBlackLine,{flex:1,flexDirection:'column',marginTop:HeightScale(-75),marginStart:WidthScale(12),width:WidthScale(width)}}>
                                <View style={styles.borderBlackLine,{flex:1,flexDirection:'row',marginTop:HeightScale(0),width:width}}>
                                    <TouchableOpacity style={styles.borderBlackLine,{marginTop:HeightScale(-102),
                                                                                    marginStart:WidthScale(210),
                                                                                    width:WidthScale(80),
                                                                                    height:HeightScale(35)}}
                                                        onPress={() => this.callToGoogleMapNavigation()}>
                                        <Text style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ? HeightScale(-25) : HeightScale(12),
                                                                            marginStart:width < guidelineBaseWidth ? WidthScale(27) : WidthScale(30),
                                                                            fontSize:16,
                                                                            color:'#47DCEF'}}>導航</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.borderBlackLine,{marginTop:HeightScale(-102),
                                                                marginStart:WidthScale(5),
                                                                width:WidthScale(80),
                                                                height:HeightScale(35),
                                                                }}
                                                        onPress={() => this.callTELToClinic()}
                                                        >
                                        <Text style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ? HeightScale(-25) : HeightScale(12),
                                                                            marginStart:width < guidelineBaseWidth ? WidthScale(30) : WidthScale(40),
                                                                            fontSize:16,
                                                                            color:'#47DCEF'}}>電話</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{marginTop:height < guidelineBaseHeight ?  HeightScale(-110) : HeightScale(-75),
                                                textAlign:'center',
                                                marginStart: width < guidelineBaseWidth ? WidthScale(30) :  WidthScale(23),
                                                fontSize:15,
                                                height:HeightScale(20),
                                                width: WidthScale(80), 
                                                color:'#00606C'}}>{this.state.education}</Text>

                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(20),
                                    marginStart:WidthScale(187),
                                    height:HeightScale(50),
                                    width:WidthScale(210),
                                    color:'#00606C',
                                    fontSize:20}}>{this.state.title}</Text>
                                    {/* this.state.title */}
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(-10),
                                    marginStart:WidthScale(210),
                                    width:WidthScale(180),
                                    height:HeightScale(60),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.detailAddress}</Text>
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(-10),
                                    marginStart:WidthScale(210),
                                    width:WidthScale(180),
                                    height:HeightScale(60),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.phone}</Text>
                                <Image
                                source={require('../assets/locationMark.png')}
                                style={styles.borderBlackLine,{resizeMode:'cover',
                                        width:WidthScale(19),  
                                        height:HeightScale(19),
                                        marginTop:HeightScale(-110),
                                        marginStart:WidthScale(187) }}>
                                </Image>
                                <Image
                                    source={require('../assets/PhoneCall.png')}
                                    style={styles.borderBlackLine,{resizeMode:'cover',
                                            width:WidthScale(19),  
                                            height:HeightScale(19),
                                            marginTop:HeightScale(32),
                                            marginStart:WidthScale(187) }}>
                                </Image>
                                <Image
                                    source={require('../assets/Path.png')}
                                    style={styles.borderBlackLine,{resizeMode:'cover',
                                            width: width < guidelineBaseWidth ? WidthScale(390) :  WidthScale(413),
                                            height:HeightScale(5),
                                            marginTop:height < guidelineBaseHeight ? HeightScale(45) :  HeightScale(20),
                                            marginStart:width < guidelineBaseWidth ? WidthScale(5) :  WidthScale(-5)}}>
                                </Image>
                                
                            </View>
                            <View style={styles.borderBlackLine,{flex:10,width:100,height:100}}>
                                 <Text style={styles.borderBlackLine,{marginTop: height < guidelineBaseHeight ? HeightScale(90) :  HeightScale(105),
                                    marginStart:WidthScale(30),
                                    width:WidthScale(380),
                                    height:HeightScale(25),
                                    fontSize:15,
                                    color:'#00606C'}}>{"徵才資訊 : 牙醫助理 1位 /  矯正醫師 1位"}</Text>
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(0),
                                    marginStart:WidthScale(30),
                                    width:WidthScale(380),
                                    height:HeightScale(25),
                                    fontSize:15,
                                    color:'#00606C'}}>{"官方網站 : https:/abcd.music.com.tw"}</Text>
                            </View>
                            <TouchableOpacity style={styles.borderBlackLine,{
                                    height: height < guidelineBaseHeight ?  HeightScale(350) : HeightScale(400),
                                    width:width,
                                    marginStart:WidthScale(0),
                                    marginTop:height < guidelineBaseHeight ?  HeightScale(-490) : HeightScale(-500),
                                }} onPress={() => this.setState({ showDetail: false})}>
                            </TouchableOpacity> 
                        </View>
                    ) : null}
                </View>
                <View style={styles.borderBlackLine,{flex: 5,  
                        flexDirection: 'column', 
                        height:Dimensions.get('screen').height,
                        width:width,
                        // marginStart:WidthScale(27),
                        marginTop:HeightScale(-45),
                        zIndex:0
                        }}>
                    {/* <MapView 
                        provider="google"
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: 25.034934,
                            longitude: 121.522222,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05
                        }}
                        style={styles.borderBlackLine,{
                            flexDirection: 'column', 
                            height:Dimensions.get('screen').height,
                            width:width}}>
                        {this.state.markers.map((marker,index) => (
                            <View>
                                <Marker coordinate={marker.coordinates} 
                                    key={marker.生年月日}
                                    title={marker.title}
                                    onPress={() => {this.ClinicOnClick(marker);}}
                                    >
                                    {marker.education == "北醫" ? ( <Image
                                        source={require('../assets/Marker_TaipeiGroup.png')}
                                        style={styles.borderBlackLine,{width:this.state.TaipeiGroupMarkerSize.width,height:this.state.TaipeiGroupMarkerSize.height,zIndex:1}}
                                        resizeMode="contain"
                                    />):(<Image
                                        source={require('../assets/otherStore.png')}
                                        style={styles.borderBlackLine,{width:this.state.normalMarkerSize.width,height:this.state.normalMarkerSize.height,zIndex:1}}
                                        resizeMode="contain"
                                    />)}
                                </Marker> 
                            </View>
                            ))}
                    </MapView> */}
                    
                </View>
                <View style={styles.borderBlackLine,{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={styles.borderBlackLine,
                                                        {marginStart:WidthScale(0),
                                                        marginTop:height < guidelineBaseHeight ? HeightScale(-10) : HeightScale(0),
                                                        width:width}}></Image>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.5,zIndex:3, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(30),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(21),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(39),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(35),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(20),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
  }
}


const mapStyle = [{
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const styles = StyleSheet.create({
    title:{},
    borderBlackLine:{
        borderColor:'black',
        borderWidth:1
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        
    },
    TextInputStyleClass:{
        height:HeightScale(50),
        width:255,
        marginStart:WidthScale(60),
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height:HeightScale(50),
        width:255,
        marginStart:WidthScale(60),
        marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default OverviewMap;
