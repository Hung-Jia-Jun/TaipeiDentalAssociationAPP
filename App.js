import React from "react";
import { Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput, StyleSheet, Text, View } from "react-native";

// const image = require('./assets/b-首頁_noneUI.png');
const image = require('./assets/b-首頁.png');
const loginBtn = require('./assets/loginBtn.png');

const App = () => (
  <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
    <ImageBackground source={image} style={styles.image}>
        <View style={{flex: 0.9, flexDirection: 'column'}}>

        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
            <TextInput style={styles.UsernameTextInputclass}
            placeholder = '    username'
            class = 'placeholder'
            />
            <TextInput style={styles.TextInputStyleClass}
            placeholder = '    password'
            class = 'placeholder'
            />
            <TouchableOpacity style={styles.button,{
                height: 50,
                width:255,
                marginStart: 60,
                marginTop:135,
            }} onPress={onPressLogin}>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  </View>
);

function onPressLogin(params) {
    console.log("change to login")
}
const styles = StyleSheet.create({

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

export default App;

