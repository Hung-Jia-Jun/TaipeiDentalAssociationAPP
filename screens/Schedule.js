import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

const image = require('../assets/b-校友會行事曆.png');
class Page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.3, flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(50),
                        width:WidthScale(50),
                         marginStart: WidthScale(30),
                        marginTop:HeightScale(70),
                    }} onPress={()=>this.props.navigation.navigate('Announcement')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.6, flexDirection: 'row'}}>
                    
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(50),
                        width:WidthScale(50),
                        marginStart: WidthScale(30),
                        marginTop:HeightScale(265),
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(50),
                        width:WidthScale(50),
                        marginStart: WidthScale(20),
                        marginTop:HeightScale(265),
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                         height: HeightScale(50),
                        width:WidthScale(50),
                        marginStart: WidthScale(40),
                        marginTop:HeightScale(265),
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(50),
                        width:WidthScale(50),
                        marginStart: WidthScale(35),
                        marginTop:HeightScale(265),
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(50),
                        width:WidthScale(50),
                        marginStart: WidthScale(20),
                        marginTop:HeightScale(265),
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
export default Page;