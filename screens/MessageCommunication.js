
import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-訊息中心（聊天室-內容）.png');
class Page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image,{width:375,height: 812}}>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:58,
                    }} onPress={()=>this.props.navigation.navigate('Message')}>
                    </TouchableOpacity> 
                </View>
                <View style={{flex: 0.9, flexDirection: 'row'}}>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
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