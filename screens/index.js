import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-首頁.png');
const loginBtn = require('../assets/loginBtn.png');

class Index extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image,{width:375,height:812}}>
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
                    }} onPress={()=>this.props.navigation.navigate('HightStoreMap')}>
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
export default Index;