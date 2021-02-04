// import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import React, { Component , useState} from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-資訊.png');
const filterButton_image = require('../assets/filterButton.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const arrow_image = require('../assets/arrow.png');
const footer_image = require('../assets/Footer.png');
const MapDetail = require('../assets/MapDetail.png');
const MapDetail_clinic = require('../assets/MapDetail_clinic.png');

class OverviewMap extends Component {

    constructor(props) {
        super(props);
        const MemberStoreList = require('../MemberStoreList.json');
        this.state = {
            showDetail: true,
            detailAddress: "台北市中山區",
            opentime:"",
            status:"營業中",

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
        }
    }
   

    render() {

        return (
            <ImageBackground  style={{flex:1}}>
            <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
                <View style={{flex: 0.01, flexDirection: 'column',zIndex: 1}}>
                    <Image source={overviewMapTopper_image} style={{top:-105,width:Dimensions.get('window').width,}}></Image>
                        <Text style={{marginStart:65,color:'#47DCEF',fontSize:28,marginTop:-232}}>Hi Ethan</Text>
                </View>
                <View style={{flex: 0.14, flexDirection: 'row',
                        zIndex: 1,}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:145,
                        borderRadius:30,
                        backgroundColor:'#8E949B',
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart: 29,
                        marginTop:133,
                    }} 
                    onPress={ () => this.setState({ showDetail: !this.state.showDetail }) }>
                    <Text style={{marginStart:23,fontSize:16,marginTop:15,color:'white'}}>診所/人力/車位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity id={'foodFilterBtn'} style={styles.button,{
                        height: 50,
                        width:145,
                        borderRadius:30,
                        backgroundColor:'#F9FCFF',
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart: 15,
                        marginTop:133,
                    }} onPress={()=>this.props.navigation.navigate('Food')}>
                    <Text style={{marginStart:40,fontSize:16,marginTop:15}}>食衣住行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart: 15,
                        marginTop:133,
                    }} onPress={()=>this.props.navigation.navigate('FilterStroe')}>
                    <Image source={filterButton_image} style={{marginStart:5}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.14, flexDirection: 'row',
                        zIndex: 1,}}>
                    {this.state.showDetail ? (
                        <View>
                            <Image
                                source={MapDetail_clinic}
                                style={{resizeMode:'cover',
                                        width:415,  
                                        height: 279,
                                        marginTop:555,
                                        marginStart:6 }}>
                            </Image>
                            <Image
                                source={this.state.DetailImage}
                                style={{marginTop:-200,
                                        marginStart:30,
                                        width:143,
                                        height:106,
                                        borderWidth:3,
                                        borderRadius:8,
                                        borderColor:'white'}}>
                            </Image>
                            <View style={{flex:1,flexDirection:'column',marginTop:-75,marginStart:12,width:Dimensions.get('window').width}}>
                                <View style={{flex:1,flexDirection:'row',marginTop:0,width:Dimensions.get('window').width}}>
                                    <TouchableOpacity style={{marginTop:-102,marginStart:210,width:80,height:35}}>
                                        <Text style={{marginTop:6,marginStart:30,fontSize:16,color:'#47DCEF'}}>導航</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginTop:-102,marginStart:5,width:80,height:35}}>
                                        <Text style={{marginTop:6,marginStart:35,fontSize:16,color:'#47DCEF'}}>電話</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{marginTop:-40,
                                    marginStart:190,
                                    height:50,
                                    width:210,
                                    color:'#00606C',
                                    fontSize:20}}>{this.state.title}</Text>
                                <Text style={{marginTop:33,
                                    marginStart:210,
                                    width:180,
                                    height:60,
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.detailAddress}</Text>
                            </View>
                            <TouchableOpacity style={{
                                    height: 450,
                                    width:Dimensions.get('window').width,
                                    marginStart: 0,
                                    marginTop:-550,
                                }} onPress={() => this.setState({ showDetail: false})}>
                            </TouchableOpacity> 
                        </View>
                    ) : null}
                </View>
                <View style={{flex: 5,  
                        flexDirection: 'column', 
                        height: Dimensions.get('screen').height,
                        width:Dimensions.get('window').width,
                        // marginStart: 27,
                        marginTop:45,
                        zIndex:0
                        }}>
                    <MapView 
                        provider="google"
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: 25.034934,
                            longitude: 121.522222,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05
                        }}
                        style={{
                            flexDirection: 'column', 
                            height: Dimensions.get('screen').height,
                            width:Dimensions.get('window').width}}>
                        {this.state.markers.map((marker,index) => (
                            <View>
                                <Marker coordinate={marker.coordinates} 
                                    key={index}
                                    title={marker.title}
                                    onPress={() => this.setState({ showDetail: true,
                                                                    title : marker.title,
                                                                    opentime : marker.opentime,
                                                                    detailAddress : marker.detailAddress}) }
                                    >
                                    {marker.education == "北醫" ? ( <Image
                                        source={require('../assets/Marker_TaipeiGroup.png')}
                                        style={{width:this.state.TaipeiGroupMarkerSize.width,height:this.state.TaipeiGroupMarkerSize.height,zIndex:1}}
                                        resizeMode="contain"
                                    />):(<Image
                                        source={require('../assets/otherStore.png')}
                                        style={{width:this.state.normalMarkerSize.width,height:this.state.normalMarkerSize.height,zIndex:1}}
                                        resizeMode="contain"
                                    />)}
                                </Marker> 
                            </View>
                            ))}
                    </MapView>
                    
                </View>
                <View style={{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
                </View>
                <View style={{flex: 0.5,zIndex:3, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: 30,
                        marginTop:10,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: 21,
                        marginTop:10,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: 39,
                        marginTop:10,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: 35,
                        marginTop:10,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: 20,
                        marginTop:10,
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
        height: 50,
        width:255,
        marginStart: 60,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height: 50,
        width:255,
        marginStart: 60,
        marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default OverviewMap;
