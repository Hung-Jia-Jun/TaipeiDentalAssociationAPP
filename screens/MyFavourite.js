import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

const image = require('../assets/b-我的收藏（診所）.png');
class page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.17, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                            
                            height: 50,
                            marginLeft: WidthScale(30),
                            marginTop: HeightScale(70),
                            width: WidthScale(50),
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width: WidthScale(104),   
                        marginTop: 0,
                        marginLeft: WidthScale(30),
                        
                        borderColor:'black',
                    }} onPress={()=>this.props.navigation.navigate('MyFavourite')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        
                        height: 50,
                        width: WidthScale(95),
                        marginLeft: WidthScale(15),
                        marginTop: 0,
                    }} onPress={()=>this.props.navigation.navigate('MyFavouriteFood')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        
                        height: 50,
                        width: WidthScale(66),
                        marginLeft: WidthScale(12),
                        marginTop: 0,
                    }} onPress={()=>this.props.navigation.navigate('MyFavouriteSeminar')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        
                        height: 50,
                        width: 63,
                        marginLeft: WidthScale(10),
                        marginTop: 0,
                    }} onPress={()=>this.props.navigation.navigate('MyFavouriteProduct')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.8, flexDirection: 'row'}}>
                </View>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: WidthScale(30),
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: WidthScale(21),
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: WidthScale(38),
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: WidthScale(35),
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: WidthScale(20),
                        marginTop:12,
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
        
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height: 50,
        width:255,
        marginStart: 60,
        marginBottom: 15,
        borderColor: '#ECF2F6',
        
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default page;