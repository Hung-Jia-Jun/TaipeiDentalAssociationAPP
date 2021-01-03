import React, { Component } from "react";
import { StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-地圖.png');
class OverviewMap extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.9, flexDirection: 'column'}}>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 300,
						width:300,
                        marginStart: 60,
                        marginTop:0,
                    }} onPress={()=>this.props.navigation.navigate('Index')}>
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
        background: "#000000a0"
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