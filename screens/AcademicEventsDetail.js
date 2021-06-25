import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,Alert,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import Swiper from 'react-native-swiper'
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();



const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/AcademicEvents_icon/Footer.png')
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
            Like : false,
            showDetail : false,
		}
	}
    signUpEvent=(title,date) =>
    {
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
                        "學術活動報名",
                        "\n" + title + " \n\n日期" + date + "\n\n報名成功!!");
            }
            else
            {
                Alert.alert(
                    "學術活動報名",
                    "\n" + title + " \n\n日期" + date + "\n\n您已報名過此活動\n請準時參加謝謝！");
            }
            
        });
    }
    onClickLike()
    {              
        var dbRef = database.ref();

        //代表原本沒有收藏，現在要收藏了
        if (this.state.Like == false)
        {
            //加入該用戶的收藏清單  
            dbRef.child("user").child(global.username).child('favoritesLi').push({
                    description:this.state.DATA[0].description,
                    item_image :this.state.DATA[0].item_image,
                    subTitle :this.state.DATA[0].subTitle,
                    date :this.state.DATA[0].date,
                    title :this.state.DATA[0].title,
                    type:'academicEvent',
            });
        }
        else
        {
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type=='academicEvent')
                    {
                        if (favoritesLi[key].title == this.state.DATA[0].title)
                        {
                            dbRef.child("user").child(global.username).child('favoritesLi').child(key).remove();
                        }
                    }
                });
            });
        }
        this.setState({Like:!this.state.Like})
    }
    componentDidMount()
    {
        var dbRef = database.ref();

        var _DATA = [];
        _DATA = [
            {
                key: '0',
                description: this.props.navigation.getParam('subDescription'),
                item_image : this.props.navigation.getParam('subPageImage'),
                subTitle : this.props.navigation.getParam('subTitle'),
                date : this.props.navigation.getParam('date'),
                title : this.props.navigation.getParam('title'),
            }
        ];
        this.setState({DATA:_DATA , showDetail:true},()=>{
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type=='academicEvent')
                    {
                        if (favoritesLi[key].title == this.state.DATA[0].title)
                        {
                            this.setState({Like:true});
                        }
                    }
                });
            });
        });
    }
    showScrollImage = (_this) => {
        const imageScrollViews = [];
        var i = 0;
        _this.state.DATA.forEach(e=>{
            e.item_image.forEach(ele=>{
                imageScrollViews.push(
                    <View key={i.toString()} style={styles.slide}>
                        <Image source={ { uri: ele } } style={{
                            width : WidthScale(315),
                            height:HeightScale(200),
                            resizeMode : 'contain',
                    }}></Image> 
                    </View>
                )
                i++;
                console.log(ele);

            })
        })
        return imageScrollViews;
    }
   render() {
	const renderItem = ({ item }) => (
		<Item _this={this} date={item.date} item={item} endDate={item.endDate} description={item.description} location={item.location} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
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
                        }} onPress={()=>this.props.navigation.goBack()}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>{this.props.navigation.getParam('title')}</Text>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginTop:0,
                            marginEnd: Dimensions.get('window').width*0.02,
                        }}>
                        </TouchableOpacity>
            </View>
            <View style={{flex:1.8,
                            alignItems:'center',
                                }}>
                        {this.state.showDetail?
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                    {this.showScrollImage(this)}
                            </Swiper>
                        :null}
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
            </View>
            <View style={{flex: 0.5,
                            flexDirection: 'row',
                            backgroundColor:'#43D1E3',
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                    flex:0.2,
                    justifyContent:'center',
                    alignItems:'center',
                    // marginStart: Dimensions.get('window').width*0.051,
                    backgroundColor:'#FFF',
                }} onPress={()=>this.onClickLike()}>
                    {this.state.Like==true?
                        <Image source={require('../assets/GrayLike_Fill.png')}
                        style={{
                                resizeMode:'stretch',
                                width:45,
                                height:45,
                            }}
                        ></Image>
                    :
                        <Image source={require('../assets/GrayLike.png')}
                                style={{
                                        resizeMode:'stretch',
                                        width:45,
                                        height:45,
                                    }}
                        ></Image>
                    }
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button,{
                    flex:0.9,
                    justifyContent:'center',
                    alignItems:'center',
                    marginStart: Dimensions.get('window').width*0.03,
                }} onPress={()=>this.signUpEvent(this.state.DATA[0].title,this.state.DATA[0].date)}>
                    <Text style={{
                                position: 'absolute',
                                justifyContent:'center',
                                // marginTop: Dimensions.get('window').height*0,
                                // marginStart: Dimensions.get('window').width*0,
                                fontSize:18,
                                color:'white'
                                }}>
                                    立即報名
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}


const Item = ({ _this,item,date,item_image,sceneName,description }) => (
         <View style={{flex: 5,
            marginStart:Dimensions.get('window').width*0.02,
            width:Dimensions.get('window').width*0.95,
            backgroundColor : '#FFFFFF',
            flexDirection: 'row',
            height:Dimensions.get('window').height,
            shadowOffset:{  width:0,  height:5},
            shadowColor: 'black',
            shadowOpacity: 0.1,
            justifyContent:'space-between'}}>
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.01,
                            marginStart: Dimensions.get('window').width*0.05,
                            fontSize:20,
                            width:Dimensions.get('window').width*0.9,
                            color:'black'
                            }}>
                                {item.subTitle}
                </Text>
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.05,
                            marginStart: Dimensions.get('window').width*0.05,
                            fontSize:10,
                            width:Dimensions.get('window').width*0.9,
                            color:'black'
                            }}>
                                {date}
                </Text> 
                <View style={{flex:1.8,
                            flexDirection:'column',
                            alignItems:'center',
                                }}>
                    <Text style={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*0.1,
                        marginStart: Dimensions.get('window').width*2,
                        fontSize:14,
                        width: Dimensions.get('window').width*0.76,
                        height: Dimensions.get('window').height,
                        color:'black'
                    }}>
                                    {description}
                    </Text>
                </View>
        </View>

);


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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