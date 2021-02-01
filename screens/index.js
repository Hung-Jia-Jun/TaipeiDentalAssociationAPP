import React, { Component } from "react";
import { SafeAreaView,Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-首頁.png');

class Index extends Component {
  render() {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container,{flex: 1,flexWrap: 'wrap', flexDirection: 'column'}}>
                <ImageBackground source={image} style={styles.image,{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
                    <View style={{flex: 3.1, flexDirection: 'column'}}>
                    </View>
                    <View style={{flex: 3, flexDirection: 'column',alignItems: 'center'}}>
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
                            elevation: 8,
                            marginTop:136,
                            backgroundColor: "#27D0E5",
                            borderRadius: 63,
                            paddingVertical: 10,
                            paddingHorizontal: 12
                        }} onPress={()=>this.props.navigation.navigate('HightStoreMaps')}>
                            <Text style={ {fontSize: 18,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        alignSelf: "center",
                                        textTransform: "uppercase"}}>登入</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.5, flexDirection: 'column'}}>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
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
        marginTop:15,
        // marginStart: 60,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height: 50,
        width:255,
        // marginStart: 60,
        // marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default Index;