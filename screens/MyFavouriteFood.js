import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-我的收藏 （食衣住行）.png');
class page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.17, flexDirection: 'row'}}>
                     <TouchableOpacity style={styles.button,{
                            borderWidth: 1,
                            height: 50,
                            marginLeft: 25,
                            marginTop: 61,
                            width: 50,
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width: 104,   
                        marginTop: 0,
                        marginLeft: 22,
                        borderWidth: 1,
                        borderColor:'black',
                    }} onPress={()=>this.props.navigation.navigate('MyFavourite')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        borderWidth: 1,
                        height: 50,
                        width: 85,
                        marginLeft: 5,
                        marginTop: 0,
                    }} onPress={()=>this.props.navigation.navigate('MyFavouriteFood')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        borderWidth: 1,
                        height: 50,
                        width: 66,
                        marginLeft: 5,
                        marginTop: 0,
                    }} onPress={()=>this.props.navigation.navigate('MyFavouriteSeminar')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        borderWidth: 1,
                        height: 50,
                        width: 63,
                        marginLeft: 5,
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
                        marginStart: 24,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 11,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 28,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 15,
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
export default page;