import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-意見反饋區（匿名）.png');
class Page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.17, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 23,
                        marginTop:60,
                    }} onPress={()=>this.props.navigation.push('MainMenu')}>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 0.3, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:150,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 43,
                        marginTop:20,
                    }} onPress={()=>this.props.navigation.push('HelpAndService')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:150,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 0,
                        marginTop:20,
                    }} onPress={()=>this.props.navigation.push('HelpAndServiceAnonymous')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.4, flexDirection: 'row'}}>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 70,
                        width:Dimensions.get('window').width,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 0,
                        marginTop:227,
                    }} onPress={()=>alert('您的意見已送出')}>
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