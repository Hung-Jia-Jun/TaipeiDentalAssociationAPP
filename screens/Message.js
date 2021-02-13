import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-訊息中心（聊天室）.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


class Message extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.17, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                            borderWidth: 1,
                            height:HeightScale(50),
                            marginLeft:WidthScale(25),
                            marginTop:HeightScale(61),
                            width:WidthScale(50),
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        borderWidth: 1,
                        height:HeightScale(50),
                        marginLeft:WidthScale(239),
                        marginTop:HeightScale(61),
                        width:WidthScale(50),
                    }} onPress={()=>this.props.navigation.navigate('SendMessage')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                            borderWidth: 1,
                            height:HeightScale(50),
                            width:WidthScale(137),
                            marginLeft:WidthScale(47),
                            marginTop:HeightScale(0),
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        borderWidth: 1,
                        height:HeightScale(50),
                        width:WidthScale(137),
                        marginLeft:WidthScale(5),
                        marginTop:HeightScale(0),
                    }} onPress={()=>this.props.navigation.navigate('Message')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.8, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                        height:HeightScale(90),
                        width:WidthScale(375),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(0),
                        marginTop:HeightScale(0),
                    }} onPress={()=>this.props.navigation.navigate('MessageCommunication')}>
                    </TouchableOpacity> 
                </View>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(24),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(11),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(28),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(24),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        borderWidth:1,
                        borderColor:'black',
                        marginStart:WidthScale(15),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
        height:HeightScale(50),
        width:WidthScale(255),
        marginStart:WidthScale(60),
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height:HeightScale(50),
        width:WidthScale(255),
        marginStart:WidthScale(60),
        marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default Message;