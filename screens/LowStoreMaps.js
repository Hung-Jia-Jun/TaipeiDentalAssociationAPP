import React, { Component } from "react";
import { StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-低密度.png');
const LineImage = require('../assets/低密度Selection.png');

class HightStoreMaps extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.25, flexDirection: 'row',
                                        alignItems: 'center',
                                        }}>
                    <Text style={{fontSize:26,color:'#051E2D',
                                    marginTop:23,
                                    marginLeft:36}}>歡迎, Welcome!</Text>
                </View>
                <View style={{flex: 0.06, flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent:'center'
                                        }}>
                    <Text style={{fontSize:24,color:'#fff'}}>請選擇您想查詢的區域</Text>
                </View>
                <View style={{flex: 0.1, flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent:'center'
                                        }}>
                    <Text style={{fontSize:13,color:'#fff'}}>醫療密集度一覽</Text>
                </View>
                <View style={{flex: 0.1,
                                flexDirection: 'row',
                                marginTop:22,
                                justifyContent: 'center',
                                flexDirection:'row'}}>
                        <View style={{flex: 1,flexDirection:'row',justifyContent: 'center',}}>
                            <View style={{
                            flex: 1,
                            width: 288,
                            height: 29,
                            position: 'absolute',
                            }} >
                            <Image source={LineImage} style={{width:288,height:29}}></Image>
                        </View>
                        <View style={{
                                    flex: 1,
                                    width: 86,
                                    height: 100,
                                    marginLeft:44,
                                    }}>
                                <TouchableOpacity style={styles.button,{
                                    height: 38,
                                    width:86,
                                    borderWidth:1,
                                    borderColor:'black',
                                }} onPress={()=>this.props.navigation.navigate('LowStoreMaps')}>
                                </TouchableOpacity>
                        </View>
                        <View style={{
                                flex: 1,
                                width: 86,
                                height: 100,
                                marginLeft:31,
                                }}>
                                <TouchableOpacity style={styles.button,{
                                    height: 38,
                                    width:86,
                                    borderWidth:1,
                                    borderColor:'black',
                                }} onPress={()=>this.props.navigation.navigate('MediumStoreMaps')}>
                                </TouchableOpacity>
                        </View>
                        <View style={{
                                flex: 1,
                                width: 86,
                                height: 100,
                                marginLeft:27,
                                }}>
                                <TouchableOpacity style={styles.button,{
                                    height: 38,
                                    width:86,
                                    borderWidth:1,
                                    borderColor:'black',
                                }} onPress={()=>this.props.navigation.navigate('HightStoreMaps')}>
                                </TouchableOpacity>
                        </View>
                        <View style={{
                                flex: 1,
                                width: 86,
                                height: 100,
                                marginLeft:0,
                                }}>
                        </View>
                </View>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 300,
						width:300,
                        marginStart: 60,
                        marginTop:68,
                        borderWidth:1,
                        borderColor:'black',    
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
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
export default HightStoreMaps;