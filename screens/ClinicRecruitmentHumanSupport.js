import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-人力銀行區-人力支援.png');
class Page extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 0.18, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
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

                <View style={{flex: 0.1, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:150,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 43,
                        marginTop:5,
                    }} onPress={()=>this.props.navigation.navigate('ClinicRecruitmentHumanSupport')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:150,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 0,
                        marginTop:5,
                    }} onPress={()=>this.props.navigation.navigate('ClinicRecruitment')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.42, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 90,
                        width:355,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 10,
                        marginTop:10,
                    }} onPress={()=>this.props.navigation.navigate('ClinicRecruitmentHumanSupportDetail')}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:280,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 11,
                        marginTop:280,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 28,
                        marginTop:280,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 24,
                        marginTop:280,
                    }} onPress={()=>this.props.navigation.navigate('Message')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,
                        borderWidth:1,
                        borderColor:'black',
                        marginStart: 15,
                        marginTop:280,
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