import React, { Component,useState, useEffect } from 'react';
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase';
import KeyboardListener from 'react-native-keyboard-listener';
import * as ImagePicker from 'expo-image-picker';
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


//TODO 要能退出群組
const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();


class Message extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			//來自firebase的文字訊息
			messages : '',
			GroupName:'',
			GroupID:'',
			InputMSG : '',
			keyboardOpen : false,
			showGroupSetting : false,
			sendImage:'',
		}
	}



	pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	
		console.log(result.data);
	
		if (!result.cancelled) {
			this.setState({sendImage : result.uri});
		}
	};

	componentDidMount()
	{
		this.msgUpdate = this.msgUpdate.bind(this);
		async () => {
			if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}}
	}
	msgUpdate()
	{
		var that = this; 
		var ref = firebase.database().ref('/group'+"/" + this.props.navigation.state.params.GroupID + '/msg');
		var _GroupMSG = []
		// foo = ref.on('value', function (snapshot) {
		var foo = ref.on('value' , function (snapshot) {
			var i=0
			_GroupMSG = []
			snapshot.forEach((childSnapshot) => {
				_GroupMSG.push({   key:i.toString(),
									username:childSnapshot.val().username,
									msg:childSnapshot.val().msg,
									dateString : childSnapshot.val().dateString,
									})
				i+=1;
			});
			//把歷史訊息讓它顯示在聊天列表內
			that.setState({messages:_GroupMSG});
			// console.log(_GroupMSG);
		});
		this.debounce(foo, 500);
	}
	debounce(fun, delay) {
		return function (args) {
			let that = this
			let _args = args
			// 每次執行的時候重置setTimeout
			clearTimeout(fun.time)
			fun.time = setTimeout(function () {
				// 執行傳入的fun1(透過call方法傳遞參數_args)
				fun.call(that, _args)
			}, delay)
		}
	}
	componentDidMount()
	{
		try
		{
			this.setState({GroupName : this.props.navigation.state.params.GroupName,
							GroupID : this.props.navigation.state.params.GroupID,                
			});
			this.msgUpdate()
		}
		catch (error)
		{
			console.log(error);
		}
		global.updateCount = 1;
		
	}
	sendText()
	{
		this.setState({ keyboardOpen: false });
		if (this.state.InputMSG=='')
		{
			return;
		}
		var m = new Date();
		var Hours = m.getHours();
		Hours = Hours < 10 ? "0" + Hours.toString() : Hours;
		
		var Minutes = m.getMinutes();
		Minutes = Minutes < 10 ? "0" + Minutes.toString() : Minutes;

		var Seconds = m.getSeconds();
		Seconds = Seconds < 10 ? "0" + Seconds.toString() : Seconds;

		var dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + Hours + ":" + Minutes + ":" + Seconds;
		
		var ref = firebase.database().ref('/group'+"/" + this.props.navigation.state.params.GroupID + '/msg');
		ref.push({
			msg: this.state.InputMSG,
			username : global.username,
			dateString : dateString,
		});
		this.setState({InputMSG:''});

	}
	
  render() {
	const renderItem = ({ item }) => (
		<Item 	_this={this}
				item={item}
				key={item.key}
				username={item.username}
				dateString = {item.dateString}
				msg={item.msg}
				item_image={item.item_image}/>
	);
	
	return (
		<View style={styles.container,{flex: 1,
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
			<View style={{flex: 0.4,
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
						onPress={()=>this.props.navigation.push('Message')}>
						<Image source={require('../assets/adsfsdfsdfdxcvcxv.png')}></Image>
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:25,
									textAlign:'center',
									zIndex:0,
									color:'white'}}>
									{this.state.GroupName}
					</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
					<TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							width:50,
						}} 
						onPress={()=>this.setState({showGroupSetting:!this.state.showGroupSetting})}
						>
						<Image source={require('../assets/asdfsdfxcv.png')}></Image>
					</TouchableOpacity>
				</View>
			</View>
			
			<View style={{flex: 3.8,
							zIndex:0,
							flexDirection: 'column',
							marginTop:18}}>
				 <KeyboardListener
					onWillShow={() => { this.setState({ keyboardOpen: true }); }}
					onWillHide={() => { this.setState({ keyboardOpen: false }); }}
				/>
				<View style={{
					flex:this.state.keyboardOpen==false?0.9:0.45,
				}}>
					<FlatList
							contentContainerstyle={{ 
													flexDirection: 'row'}}
													style={{marginTop:20,marginStart:15}}//backgroundColor:'#EBF0F3'}}
													data={this.state.messages}
													renderItem={renderItem}
													keyExtractor={item => item.key.toString()}
													/>
													
				</View>
				
				{this.state.showGroupSetting==true?
					<View style={{flex: 0.3,
						zIndex:0,
						borderRadius:30,
						backgroundColor:'#596570',
						flexDirection: 'column'}}>
						<TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							marginTop:HeightScale(10),
							height:50,
							flexDirection:'row',
						}}>
							<Image source={require('../assets/34567kjhgfds.png')}></Image>
							<Text style={{
								color:'white',
								fontSize:20,
								marginStart:15,
								}}>查看成員</Text>
						</TouchableOpacity>
						<View style={{borderWidth:0.7,borderColor:'white',width:Dimensions.get('screen').width*0.8,alignSelf:'center'}}></View>
						<TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							flexDirection:'row',
						}}>
							<Image source={require('../assets/ahgjkhgfds.png')}></Image>
							<Text style={{
								color:'white',
								fontSize:20,
								marginStart:15,
								}}>退出群組</Text>
						</TouchableOpacity>
						<View style={{borderWidth:0.7,borderColor:'white',width:Dimensions.get('screen').width*0.8,alignSelf:'center'}}></View>
						<TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							flexDirection:'row',
						}}>
							<Image source={require('../assets/sdfghjkljhgfdsa.png')}
									style={{
										marginStart:5,
										marginEnd:20,
										}}></Image>
							<Text style={{
								color:'white',
								fontSize:20,
								}}>刪除群組</Text>
						</TouchableOpacity>
					</View>
					
				:
				<View style={{
					flex:0.1,
					backgroundColor : '#D8F4FB',
					borderWidth:1,
					flexDirection:'row',
					borderColor:'#01C5DE',
				}}>
					<View style={{
						flex:0.15,
					}}>
					<TouchableOpacity
							style={{
									height:HeightScale(70),
									alignalItems:'center',
									justifyContent:'center'
							}}
							onPress={this.pickImage}
							>
						<Text style={{
							zIndex:0,
							textAlign:'center',
							fontSize:50,
							color:'#01C5DE',
							justifyContent:'center',
							}}>
							+
						</Text>
					</TouchableOpacity>
					</View>
					<View style={{
						flex:0.9,
						backgroundColor : '#D8F4FB',
						flexDirection:'row',
						borderColor:'#01C5DE',
						justifyContent:'center',
						alignSelf:'center',
					}}>
						<TextInput style={{ alignSelf:'flex-end',
											paddingHorizontal:20,
											backgroundColor:'white',
											borderColor : '#01C5DE',
											borderRadius:10,
											borderWidth:1,
											height:Dimensions.get('window').height*0.8,
											width:Dimensions.get('window').width*0.8,
											height:43,
											zIndex:2}}
											placeholder = '輸入訊息...'
											onPress={()=>this.setState({keyboardOpen : true})}
											onChangeText={(text) => this.setState({InputMSG: text})}
											onSubmitEditing={()=>{
																	this.sendText();
																	this.setState({ keyboardOpen: false });
																}}
											class = 'placeholder'
											value={this.state.InputMSG}
											/>  
					</View>
					
				</View>}
				
			</View>
			
			<View style={{flex: 0.01, flexDirection: 'column'}}>
				<Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
			</View>
		</View>
	);
  }
}



const Item = ({ _this,item,username,msg,dateString,item_image}) => (
	<View style={styles.container,{	flex: 1,
							alignSelf: username == global.username ? 'flex-end':'flex-start',
							marginEnd:20,
							flexDirection: 'row',
									}}>
		<TouchableOpacity onPress={()=>_this.setState({ keyboardOpen: false,
														showGroupSetting:false})}>
			<View style={{
						}}>	
				<View style={{
							justifyContent:'center',
							flexDirection:"column",}}>
					<Text style={{
							fontSize:20,
							alignSelf: username == global.username ? 'flex-end':'flex-start',
							flex: 0.3,
						}}>
							{username}
						</Text>
					<View style={{
									backgroundColor:username == global.username ? '#596570':"#E2EBF6",
									alignSelf: username == global.username ? 'flex-end':'flex-start',
									borderRadius:30,
									minHeight:35,
									justifyContent:'center',
									marginStart:WidthScale(20),
									}}>
						<Text style={{
								fontSize:22,
								marginStart : 15,
								alignSelf: username == global.username ? 'flex-end':'flex-start',
								marginEnd:15,
								marginTop:5,
								marginBottom:5,
								color:username == global.username ? 'white' : 'black',
								}}>
							{msg}
						</Text>
					</View>
					<View>
							<Text style={{
								fontSize:10,
								marginStart : 35,
								// marginEnd:10,
								marginTop:5,
								alignSelf: username == global.username ? 'flex-end':'flex-start',
								marginBottom:5,
								// alignSelf:'flex-start',
								}}>
								{dateString}
							</Text>
					</View>
				</View> 
			</View> 
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
export default Message;