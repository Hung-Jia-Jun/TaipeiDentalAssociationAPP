import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";




const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png')
const Back_image = require('../assets/Announcement_icon/Back.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');
class Page extends Component {
   render() {
	const renderItem = ({ item }) => (
		<Item _this={this} Date={item.Date} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
	);
    return (
        <View style={{flex: 3, flexDirection: 'column'}}>
            <View style={{flex:0.4,
								flexDirection: 'column',
								zIndex: 1}}>
                    <Image source={Topper_image} style={
                                        {marginTop: 0,
										zIndex:0,
										width:Dimensions.get('window').width,
										height:Dimensions.get('window').height*0.2,
                                        resizeMode:'stretch',
                                        width:Dimensions.get('window').width}}></Image>
                    
            </View>
             
            <View style={{flex: 0.15,
                            zIndex:1,
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            }}>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginStart: 0,
                            marginTop:0,
                            marginStart: Dimensions.get('window').width*0.02,
                        }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>開業問題</Text>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginTop:0,
                            marginEnd: Dimensions.get('window').width*0.02,
                        }} onPress={()=>this.props.navigation.navigate('Schedule')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image></Image>
                            </View>
                        </TouchableOpacity>
            </View>
            <View style={{flex:1.8,
                            alignItems:'center',
                                }}>
                    <Image source={require('../assets/AcademicEvents_icon/RawImage.png')}
                            style={{
                                    flex:0.9,
                                    resizeMode:'contain',
                                    marginTop: Dimensions.get('window').height*0.07,
                                    }}></Image>
            </View>
            <View style={{flex: 2.5,
								flexDirection: 'column',
								}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						style={{backgroundColor:'#EBF0F3'}}
						renderItem={renderItem}
						keyExtractor={item => item.key.toString()}
					/>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{flex: 0.5,
                            flexDirection: 'row',
                            justifyContent:'space-between'}}>
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
        </View>
    );
  }
}


const DATA = [
	{
		key: '0',
		title: '選址問題',
		item_image : require('../assets/AcademicEvents_icon/Bitmap.png'),
		sceneName:'',
        Date:'2020.12.30',
	},
    {
		key: '1',
		title: '裝潢問題',
		item_image : require('../assets/AcademicEvents_icon/Bitmap2.png'),
		sceneName:'',
        Date:'2020.12.24',
	},
    {
		key: '1',
		title: '人才需求問題',
		item_image : require('../assets/AcademicEvents_icon/Bitmap2.png'),
		sceneName:'',
        Date:'2020.12.24',
	},
    
];

const Item = ({ _this,title,Date,item_image,sceneName }) => (
         <View style={{flex: 5,
            marginStart:Dimensions.get('window').width*0.02,
            width:Dimensions.get('window').width*0.95,
            backgroundColor : '#FFFFFF',
            flexDirection: 'row',
            marginBottom:Dimensions.get('window').height*0.02,
            shadowOffset:{  width:0,  height:5},
            shadowColor: 'black',
            shadowOpacity: 0.1,
            justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.button,{
                height: Dimensions.get('window').height*0.13,
                width:Dimensions.get('window').width*0.8,
                marginStart: 0,
                marginTop:0,
                
            }} onPress={() => _this.props.navigation.navigate(sceneName)}>
                <Image source={ item_image } style={{
                        width: Dimensions.get('window').width*0.3,
                        height: Dimensions.get('window').height*0.1,
                        marginTop: Dimensions.get('window').height*0.02,
                        marginStart: Dimensions.get('window').width*0.04,
                        resizeMode:'contain',
                }}></Image>
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.02,
                            marginStart: Dimensions.get('window').width*0.36,
                            fontSize:16,
                            color:'black'
                            }}>
                                {title}
                </Text>
                <TouchableOpacity style={styles.button,{
                            height: 50,
                        width:50,
                        marginStart: 0,
                        marginTop: Dimensions.get('window').height*0.04 * -1,
                        marginStart: Dimensions.get('window').width*0.76,
                    }} onPress={()=>_this.props.navigation.navigate('OpeningStoreProblemsDetail')}>
                        <View style={{flex:0.6,
                                        justifyContent:'center',
                                        borderRadius:30,
                                        width:Dimensions.get('window').width*0.17,
                                        backgroundColor:'#43D1E3',
                                        alignItems:'center',}}>
                            <Text style={{
                                fontSize:16,
                                color:'white'
                                }}>查看詳情</Text>
                        </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>

);


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