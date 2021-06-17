import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


const image = require('../assets/b-我的商場清單.png');
class page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.17, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                            height: 50,
                            marginLeft: WidthScale(25),
                            marginTop:HeightScale(61),
                            width: 50,
                    }} onPress={()=>this.props.navigation.push('Profile')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height:50,
                        width: 146,
                        marginLeft: WidthScale(55),
                        marginTop:HeightScale(8),
                    }} onPress={()=>this.props.navigation.push('MyStore')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:50,
                        width: 146,
                        marginLeft: WidthScale(20),
                        marginTop:HeightScale(8),
                    }} onPress={()=>this.props.navigation.push('MyStoreHasBeenRemoved')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.8, flexDirection: 'row'}}>
                </View>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: WidthScale(30),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.push('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: WidthScale(20),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.push('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: WidthScale(40),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.push('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: WidthScale(35),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.push('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        marginStart: WidthScale(20),
                        marginTop:HeightScale(12),
                    }} onPress={()=>this.props.navigation.push('Profile')}>
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
        marginStart: WidthScale(60),
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height: 50,
        width:255,
        marginStart: WidthScale(60),
        marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default page;