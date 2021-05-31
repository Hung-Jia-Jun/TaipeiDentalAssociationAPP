import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-搜尋.png');
const searchTopper_image = require('../assets/searchTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const addressIcon_image = require('../assets/addressIcon.png');


class Page extends Component {
  render() {
    const renderItem = ({ item }) => (
        <Item _this={this} title={item.title} item_image={item.item_image} address = {item.address} status = {item.status} openTime = {item.openTime} />
    );
    return (
        <View style={styles.container,{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 0.3, flexDirection: 'column'}}>
                    <Image source={searchTopper_image} style={styles.image,
                                                                {zIndex:1,
                                                                    resizeMode:'stretch',
                                                                    height:Dimensions.get('window').height*0.21,
                                                                    width:Dimensions.get('window').width,
                                                                    marginTop:0}}></Image>
                </View>
                <View style={{flex: 0.3,
                                flexDirection: 'column'}}>
                   
                    <View style={{flex: 0.02,
                                     flexDirection: 'row',}}>
                        <TextInput style={{marginStart:30,
                                            paddingHorizontal:30,
                                            marginTop:0,
                                            backgroundColor:'#ECF0F6',
                                            borderRadius:30,
                                            height:Dimensions.get('window').height*0.8,
                                            width:Dimensions.get('window').width*0.70,
                                            height:43,
                                            zIndex:2}}
                                placeholder = '搜尋'
                                class = 'placeholder'
                        />    
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:20,
                                                    zIndex:0,
                                                    backgroundColor:'#ECF0F6',
                                                    borderRadius:30,
                                                    width:Dimensions.get('window').width*0.11,
                                                    height:40}}>
                            <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>取消</Text>
                        </TouchableOpacity>
                    </View>                
                    
                </View>
                <View style={{flex: 0.05,
                                flexDirection: 'column'}}>
                    <View style={{flex: 0.01, flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:30,
                                                    zIndex:0,
                                                    width:100,
                                                    height:40}}>
                            <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>全部</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:0,
                                                    zIndex:0,
                                                    width:100,
                                                    height:40}}>
                            <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>診所/停車場</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:3,
                                                    zIndex:0,
                                                    width:100,
                                                    height:40}}>
                            <Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center',textAlignVertical:'auto'}}>食衣住行</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:4, 
                                flexDirection: 'column',
                                }}>
                    <FlatList
                        style={{marginTop:60,width:Dimensions.get('window').width,marginStart:0,backgroundColor:'#EBF0F3'}}
                        contentContainerStyle={{ marginTop: 0}}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.key.toString()}
                        />

                </View>
                <View style={{flex: 0.01, flexDirection: 'column'}}>
                    <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.02,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                            <Image source={require('../assets/footerIcon/Home.png')}></Image>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.03,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Search')}>
                            <Image source={require('../assets/footerIcon/Search.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.08,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
                            <Image source={require('../assets/footerIcon/Map.png')} 
                                    style={{resizeMode:'stretch',
                                            marginTop:10,
                                            width:80,
                                            height:80
                                            }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.07,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Notifycation')}>
                            <Image source={require('../assets/footerIcon/Msg.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.03,
                        marginEnd: Dimensions.get('window').width*0.01,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.navigate('Profile')}>
                            <Image style={{
                                            marginTop:10,
                                            marginStart:5,
                                            }} 
                                    source={require('../assets/footerIcon/Profile.png')}></Image>
                    </TouchableOpacity>
                </View>
            {/* </ImageBackground> */}
        </View>
    );
  }
}




const Item = ({ _this,title,item_image,address, status, openTime }) => (
    <View style={styles.container,{flex: 1, flexDirection: 'row',height:110}}>
        <ImageBackground style={{marginTop:0,width:Dimensions.get('window').width,height:100,backgroundColor:'white'}}>
            <View style={{width:Dimensions.get('window').width,height:100}}>
                <View style={styles.container,{flex: 1, flexDirection: 'row'}}>
                    <Image source={ item_image } style={{marginStart:15,marginTop:10,width:105,height:70}}></Image>
                </View>
                <View style={styles.container,{flex: 0.1, flexDirection: 'column'}}>
                    <Text style={{
                        width:230,
                        height:30,
                        marginTop: 10,
                        marginLeft: 130,
                        fontSize:18,
                        color:'black'}}>
                            {title}
                    </Text>
                    <Image source={addressIcon_image} 
                            style={{marginStart:132,width:15,height:15}}>
                    </Image>
                    <Text style={{
                        width:230,
                        height:30,
                        marginTop: -15,
                        marginLeft: 150,
                        fontSize:12,
                        color:'black'}}>
                            {address}
                    </Text>
                    <Text style={{
                        width:230,
                        height:30,
                        marginTop: 0,
                        marginLeft: 130,
                        fontSize:14,
                        color:'#3FEEEA'}}>
                            {status}
                    </Text>
                    <Text style={{
                        width:230,
                        height:30,
                        marginTop: -31,
                        marginLeft: 180,
                        fontSize:12,
                        color:'black'}}>
                            {openTime}
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
                    }} onPress={() => _this.props.navigation.navigate('Search')}>
                    </TouchableOpacity>
            </View> 
        </ImageBackground>
    </View>
);

const DATA = [
    {
        key: '0',
        title: '泰泰茶餐廳 內湖店',
        item_image : require('../assets/Bitmap.png'),
        address:'台北市中山區內湖路一段99號',
        status : '營業中',
        openTime:'下午5:00-下午9:00',
    },
    {
        key: '1',
        title: '好歡樂餐酒館 民生店',
        item_image : require('../assets/Bitmap2.png'),
        address:'台北市中山區民生東路五段68號',
        status : '營業中',
        openTime:'下午5:00-下午10:00',
    },
    {
        key: '2',
        title: '情豆花開豆花店 圓環民生店',
        item_image : require('../assets/Bitmap3.png'),
        address:'台北市中山區民生東路五段40號',
        status : '閉業中',
        openTime:'中午12:00-下午7:30',
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
export default Page;