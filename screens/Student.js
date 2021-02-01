import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-學生系學會區.png');
class Page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.3, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 23,
                        marginTop:60,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.6, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 90,
                        width:355,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 10,
                        marginTop:200,
                    }} onPress={()=>this.props.navigation.navigate('StudenDepartmentAssociationAnnouncementDetail')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:230,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 11,
                        marginTop:230,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 28,
                        marginTop:230,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:230,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 15,
                        marginTop:230,
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