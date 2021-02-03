import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

//NotifycationTopper.png
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer.png');


class Message extends Component {
  render() {
    const renderItem = ({ item }) => (
        <Item _this={this} title={item.title} item_image={item.item_image} discription={item.discription}/>
    );
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <ImageBackground style={styles.image}>
           
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={NotifycationTopper_image} style={styles.image,{zIndex:1,width:Dimensions.get('window').width,marginTop:-89}}></Image>
            </View>
            <View style={{flex: 0.01, flexDirection: 'row'}}>
                <TouchableOpacity style={{marginTop:147,
                                            marginStart:70,
                                            zIndex:0,
                                            width:100,
                                            height:40}}>
                    <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>通知</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:147,
                                            marginStart:70,
                                            zIndex:0,
                                            width:100,
                                            height:40}}>
                    <Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center'}}>聊天室</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 4.5, flexDirection: 'column',marginTop:155}}>
                    <FlatList
                        style={{marginTop:48,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>

            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{flex: 0.5, flexDirection: 'row'}}>
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,
                    marginStart: 30,
                    marginTop:12,
                }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,
                    marginStart: 21,
                    marginTop:12,
                }} onPress={()=>this.props.navigation.navigate('Search')}>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,
                    marginStart: 39,
                    marginTop:12,
                }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,
                    marginStart: 35,
                    marginTop:12,
                }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,
                    marginStart: 20,
                    marginTop:12,
                }} onPress={()=>this.props.navigation.navigate('Profile')}>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
  }
}




const Item = ({ _this,title,item_image,discription}) => (
    <View style={styles.container,{flex: 1, flexDirection: 'row',height:105}}>
        <ImageBackground style={{marginTop:0,width:Dimensions.get('window').width,height:100,backgroundColor:'#F2FAFF'}}> 
            <View style={{width:Dimensions.get('window').width,height:100}}>
                <View style={styles.container,{flex: 1, flexDirection: 'row'}}>
                    <Image source={ item_image } style={{marginStart:27,marginTop:11,width:90,height:90}}></Image>
                </View>
                <View style={styles.container,{flex: 0.1, flexDirection: 'column'}}>
                    <Text style={{
                        width:230,
                        height:30,
                        marginTop: 20,
                        marginLeft: 125,
                        fontSize:17,
                        color:'black'}}>
                            {title}
                    </Text>
                    <Text style={{
                        width:230,
                        height:40,
                        marginTop: 0,
                        marginLeft: 125,
                        fontSize:12,
                        color:'black'}}>
                            {discription}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button,{
                        height: 100,
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.01,
                        width:Dimensions.get('window').width,
                        borderColor:'black',
                        marginStart: 0,
                        zIndex:0,
                        marginTop:0,
                    }} onPress={() => _this.props.navigation.navigate('Notifycation')}>
                    </TouchableOpacity>
            </View> 
        </ImageBackground>
    </View>
);

const DATA = [
    {
        id: '0',
        title: '好美麗診所',
        item_image : require('../assets/MessageIcon.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
    },
     {
        id: '1',
        title: '好美麗診所',
        item_image : require('../assets/MessageIcon.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
    },
     {
        id: '2',
        title: '好美麗診所',
        item_image : require('../assets/MessageIcon.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
    },
     {
        id: '3',
        title: '好美麗診所',
        item_image : require('../assets/MessageIcon.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
    },
];
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
export default Message;