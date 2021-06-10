import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();

//NotifycationTopper.png
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const Friend_image = require('../assets/24px_friend.png');


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardId :this.props.navigation.getParam('cardId'),
			userInfo:[
                {
                    key : 0,
                    title : '姓名',
                    value : global.username,
                },
                {
                    key : 1,
                    title : '醫師證號',
                    value : global.doctorID,
                },
                {
                    key : 2,
                    title : '入學民國',
                    value : global.enrollmentYear,
                },
                {
                    key : 3,
                    title : '性別',
                    value : global.gender,
                },
                {
                    key : 4,
                    title : '生日',
                    value : global.birthday,
                },
                {
                    key : 5,
                    title : '手機號碼',
                    value : global.phoneNumber,
                },
                {
                    key : 6,
                    title : '信箱',
                    value : global.Email,
                },
                {
                    key : 7,
                    title : 'LineID',
                    value : global.LineID,
                },
                {
                    key : 8,
                    title : 'WechatID',
                    value : global.WechatID,
                },
            ]
		}
	}
	componentDidMount()
	{
		try
		{
			// this.setState({cardId : this.props.navigation.getParam('cardId')});
			console.log(this.state.cardId);
			var businessCardName;
			var experienceList;
			var that = this;
			var educationList;
			// 現在是進入編輯名片的環節
			if (this.state.cardId != undefined)
			{
				var ref = firebase.database().ref('/user'+"/" + global.username+ '/businessCard');
				ref.on('value', function (snapshot) {
					console.log(snapshot);
					snapshot.forEach((childSnapshot) => {
						//個人名片的資訊
						var carInfo = childSnapshot.val();
						if (carInfo.id == that.state.cardId)
						{
							console.log(carInfo);
							that.setState({
								businessCardName : carInfo.businessCardName,
								experienceList : carInfo.experienceList,
								educationList : carInfo.educationList,
							});
						}
					});
				});
			}
		}
		catch
		{

		}
	}
	arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele.key != value; 
        });
    }
	
	render() {
		const renderItem = ({ item }) => (
			<Item _this={this} item={item}/>
		);
		
	return (
		<View  key="container" style={styles.container,{flex: 1,
										flexDirection: 'column',
										}}>
			<View style={{flex: 0.3,
							flexDirection: 'column',
							}}>
				<Image source={NotifycationTopper_image} style={styles.image,
																			{zIndex:1,
																			resizeMode:'stretch',
																			height:Dimensions.get('window').height*0.2,
																			width:Dimensions.get('window').width,
																			marginTop:0
																			}}></Image>
			</View>
			<View style={{flex: 0.55,
							justifyContent:'center',
							alignItems:'center',
							zIndex:0,
							flexDirection: 'row',
							}}>
				<View style={{
						flex:0.3,
						alignItems:'flex-start',
					}}>
                    <TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							width:50,
						}} 
						onPress={()=>this.props.navigation.navigate('Profile')}>
						<Image source={require('../assets/adsfsdfsdfdxcvcxv.png')}></Image>
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>修改個人資訊</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
				</View>
			</View>
			<View style={{flex: 3.7,
							zIndex:0,
							flexDirection: 'column',
							padding:0}}>
                <View style={{
						flex:0.21,
						alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'center',
					}}>
                        <TouchableOpacity style={{
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        alignItems:'center',}}>
                            <Image source={{uri : global.userIcon}} 
                                    style={{
                                        borderWidth:3,
                                        height:90,
                                        width:90,
                                        borderRadius:100,
                                        borderColor:'#FFF',
                                        marginEnd:20,
                                        resizeMode:'contain',
                                    }}    
                            ></Image>
                            <View style={{  
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginStart:-45,
                                            marginBottom:-60,
                                        }}>
                                <Image source={require('../assets/axzcvzcvxzcvsdasdfscvd.png')} 
                                    style={{
                                        height:35,
                                        width:35,
                                        resizeMode:'contain',
                                    }}    
                                ></Image>
                            </View>
                        </TouchableOpacity>
                            
				</View>
				<FlatList
					style={{flex:0.3}}//backgroundColor:'#EBF0F3'}}
					contentContainerStyle={{}}
					data={this.state.userInfo}
					renderItem={renderItem}
                    extraData={this.state}
					keyExtractor={item => item.key.toString()}
				/>
			</View>
			<View style={{flex: 0.01, flexDirection: 'column'}}>
				<Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
			</View>
			<View style={{flex: 0.4,justifyContent:'space-between'}}>
			<TouchableOpacity style={styles.button,{
					justifyContent:'center',
					flex:1,
					backgroundColor:'#01C5DE',
					alignItems:'center',
				}} onPress={()=> this.uploadSelfBusinessCard(this.props.navigation.navigate('PersonalBusinessCard')) }>
						<Text style={{
                            textAlign:'center',
                            color:'#FFF',
                            fontSize:20,
                            }}>
                                確認
                            </Text>
				</TouchableOpacity> 
			</View>
		</View>
	);
  }
}




const Item = ({ _this,item}) => (
	<View style={styles.container,{marginTop:2,zIndex:0,flex: 1,backgroundColor:'#FFF', flexDirection: 'column',height:70}}>
        <View style={{flexDirection:'row',flex:1,}}>
            <View style={{  alignItems:'flex-start',
                            justifyContent:'center',
                            marginStart:30,
                            flex:0.5,
                        }}>
                <Text style={{
                                fontSize:18,
                                textAlign:'center',
                                zIndex:0}}>{item.title}</Text>
            </View>
            <View style={{alignItems:'flex-end',justifyContent:'center',flex:1,flex:0.5,}}>
                <TouchableOpacity style={{
                                            padding:8,
                                            minWidth:100,
                                            flex:1,
                                            height:35,
                                            justifyContent:'flex-end',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            }}
                                    onPress={()=>{
                                    }}>
                    <View style={{}}>
                            <Text style={{
                                    fontSize:18,
                                    color:item.value!=undefined?'black':'gray',
                                    textAlign:'flex-end',
                                    zIndex:0}}>{item.value!=undefined?item.value:"未設定"}</Text>
                    </View>
                    <View style={{}}>
                        <Image source={require('../assets/afsdfsadfsadfasdfasdf.png')}></Image> 
                    </View>
                    
                </TouchableOpacity>
            </View>

        </View>
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
	TextInputclass:{
		height: 35,
		width:223,
		paddingHorizontal:15,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : "#FFF",
	},
});
export default Message;