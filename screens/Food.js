// import * as React from 'react';
import MapView from 'react-native-maps';
import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-資訊.png');
const filterButton_image = require('../assets/filterButton.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const arrow_image = require('../assets/arrow.png');
const footer_image = require('../assets/Footer.png');


class OverviewMap extends Component {
  render() {
    return (
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
                        backgroundColor:'#F9FCFF',
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart: 29,
                        marginTop:133,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    <Text style={{marginStart:23,fontSize:16,marginTop:15,color:'black'}}>診所/人力/車位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity id={'foodFilterBtn'} style={styles.button,{
                        height: 50,
                        width:145,
                        borderRadius:30,
                        backgroundColor:'#8E949B',
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart: 15,
                        marginTop:133,
                    }} onPress={()=>this.props.navigation.navigate('Food')}>
                    <Text style={{marginStart:40,fontSize:16,marginTop:15,color:'white'}}>食衣住行</Text>
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
                <View style={{flex: 0.5, flexDirection: 'column'}}>
                 <MapView 
                    provider="google"
                    region={{
                        latitude: 25.034934,
                        longitude: 121.522222,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    style={styles.button,{
                        height: 850,
                        width:Dimensions.get('window').width,
                        // marginStart: 27,
                        marginTop:-50,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </MapView>
                </View>
                <View style={{flex: 0.01, flexDirection: 'column'}}>
                    <Image source={footer_image} style={{marginStart:0,marginTop:325,width:Dimensions.get('window').width}}></Image>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 30,
                        marginTop:330,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 21,
                        marginTop:330,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 39,
                        marginTop:330,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 35,
                        marginTop:330,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 20,
                        marginTop:330,
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                    </TouchableOpacity>
                </View>
        </View>
    );
  }
}

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