import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper'

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();



const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png')
const Back_image = require('../assets/Announcement_icon/Back.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


class Page extends Component {
    constructor(props) {
		super(props);
		this.state = {
			DATA : [],
            indexImage:[],
            showAnnounce : false,
		}
	}
    fetchAnnouncement()
    {
        var that = this;
        var _DATA = [];
        var _indexImage = [];
        var ref = firebase.database().ref('/eventRegistration');
		ref.child('Event').on('value', function (snapshot) {
			var i=0;
			snapshot.forEach((childSnapshot) => {
				_DATA.push({   key:i.toString(),
                                    date : childSnapshot.val().date,
                                    item_image : childSnapshot.val().item_image,
                                    sceneName : childSnapshot.val().sceneName,
                                    subDescription : childSnapshot.val().subDescription,
                                    subPageImage : childSnapshot.val().subPageImage,
                                    subTitle : childSnapshot.val().subTitle,
                                    title : childSnapshot.val().title,
									})
				i+=1;
			});
			that.setState({DATA : _DATA,showAnnounce:true})
		});
        ref.child('IndexImage').on('value', function (snapshot) {
			var i=0;
			snapshot.forEach((childSnapshot) => {
				_indexImage.push({   key:i.toString(),
                                    uri:childSnapshot.val().uri,
									})
				i+=1;
			});
			that.setState({indexImage : _indexImage})
		});
    }
    componentDidMount()
    {
        this.fetchAnnouncement();
    }
    showScrollImage = (_this) => {
        const imageScrollViews = [];
        var i = 0;
        _this.state.indexImage.forEach(e=>{
            imageScrollViews.push(
                <View key={i.toString()} style={styles.slide}>
                    <Image source={ { uri: e.uri } } style={{
                        width : WidthScale(315),
                        height:HeightScale(200),
                        resizeMode : 'contain',
                }}></Image> 
                </View>
            )
            i++;
        })
        return imageScrollViews;
    }
    signUpEvent=(title,date) =>
    {
        console.log(global.username);
        console.log(title);
        console.log(date);

        var signUpEventRef = database.ref('/signUpEvent');
        
        //控制是否報名的變數
        var haveSign = false;
        signUpEventRef.once('value', function (snapshot) {
			var i=0;
			snapshot.forEach((childSnapshot) => {
                if (haveSign)
                {
                    return;
                }
                //檢查有沒有報名過
                if (global.username == childSnapshot.val().user && 
                        date == childSnapshot.val().date &&
                        title == childSnapshot.val().title)
                {
                    haveSign = true;
                }
			});
            if (haveSign==false)
            {
                signUpEventRef.push({
                    "user" : global.username,
                    "title" : title,
                    "date" : date,
                });
                Alert.alert(
                        "活動報名",
                        "\n" + title + " \n\n日期" + date + "\n\n報名成功!!");
            }
            else
            {
                Alert.alert(
                    "活動報名",
                    "\n" + title + " \n\n日期" + date + "\n\n您已報名過此活動\n請準時參加謝謝！");
            }
            
        });
    }
    render() {
	const renderItem = ({ item }) => (
		<Item _this={this} 
                date={item.date} 
                title={item.title} 
                item_image={item.item_image} 
                description={item.description} 
                subDescription ={item.subDescription}
                subPageImage ={item.subPageImage}
                subTitle ={item.subTitle}
                sceneName={item.sceneName}
                />
                
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
                                        color:'white'}}>活動報名區</Text>
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
                    <View style={{flex:0.2}}></View>
                    <View style={{flex:0.8}}>
                        {this.state.showAnnounce?
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                    {this.showScrollImage(this)}
                            </Swiper>
                        :null}
                    </View>
                    <View style={{flex:0.01}}></View>
            </View>
            <View style={{flex: 2.5,
								flexDirection: 'column',
								}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={this.state.DATA}
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


const Item = ({ _this,
                title,
                date,
                item_image,
                sceneName,
                description,
                subDescription,
                subPageImage,
                subTitle }) => (
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
                
            }} onPress={() => _this.props.navigation.navigate(sceneName,{
                                                                subDescription : subDescription,
                                                                subPageImage : subPageImage,
                                                                subTitle : subTitle,
                                                                title : title,
                                                                date : date,
                                                                })}>
                <Image source={ {uri : item_image} } style={{
                        width: Dimensions.get('window').width*0.3,
                        height: Dimensions.get('window').height*0.1,
                        marginTop: Dimensions.get('window').height*0.02,
                        marginStart: Dimensions.get('window').width*0.03,
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
                <Text style={{
                    position: 'absolute',
                    marginTop: Dimensions.get('window').height*0.08,
                    marginStart: Dimensions.get('window').width*0.43,
                    fontSize:16,
                    width: Dimensions.get('window').width*0.3,
                    height: Dimensions.get('window').height*0.04,
                    color:'#47DCEF'
                }}>
                                {date}
                </Text>
                <Image source={require('../assets/AcademicEvents_icon/meeting.png')}
                        style={{
                            marginTop: Dimensions.get('window').height*0.042*-1,
                            marginStart: Dimensions.get('window').width*0.36,
                            width: Dimensions.get('window').width*0.05,
                            height: Dimensions.get('window').height*0.03,
                            resizeMode:'contain',
                        }}
                        ></Image>
                <TouchableOpacity style={styles.button,{
                            height: 50,
                        width:50,
                        marginStart: 0,
                        marginTop: Dimensions.get('window').height*0.04 * -1,
                        marginStart: Dimensions.get('window').width*0.76,
                    }} onPress={()=>_this.signUpEvent(title,date)}>
                        <View style={{flex:0.6,
                                        justifyContent:'center',
                                        borderRadius:30,
                                        width:Dimensions.get('window').width*0.15,
                                        backgroundColor:'#43D1E3',
                                        alignItems:'center',}}>
                            <Text style={{
                                fontSize:16,
                                color:'white'
                                }}>報名</Text>
                        </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>

);


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
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