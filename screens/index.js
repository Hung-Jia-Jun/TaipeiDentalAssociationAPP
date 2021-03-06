import React, { Component } from "react";
import { SafeAreaView,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView,Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

const image = require('../assets/b-首頁.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			birthday: new Date(),
			birthday_str : '密碼（出生年月日）',
			showBirthDay:false,
		}
	}
	componentDidMount()
	{
		this.setState({username:"test",birthday_str : '20210614'});
	}
	signin() {
		if (this.state.username=='' || this.state.birthday_str=='密碼（出生年月日）')
		{
			Alert.alert("請輸入登入資訊");
			return;
		}
		var dbRef = database.ref();
		dbRef.child("user").child(this.state.username).get().then((result) => {
		if (result.exists()) {
			var user = result.val();
			if (this.state.birthday_str != user.birthday)
			{
				Alert.alert("姓名或生日錯誤");
				return;
			}
			else if(user.validation==false)
			{
				Alert.alert("會員正在審核中，請等待客服通知");
				return;
			}
			else 
			{
				// Alert.alert("登入成功");
				global.username = user.username;
				global.userIcon = user.userIcon;
				global.birthday = user.birthday;
				global.enrollmentYear = user.enrollmentYear;
				global.memberType = user.memberType;
				global.doctorID = user.doctorID==undefined?'':user.doctorID;
				global.gender = user.gender==undefined?'':user.gender;
				global.phoneNumber = user.phoneNumber==undefined?'':user.phoneNumber;
				
				//該用戶所屬診所
				global.clinic = user.clinic==undefined?'':user.clinic;
				
				//該用戶所屬診所的地址
				global.clinicAddr = user.clinicAddr==undefined?'':user.clinicAddr;

				//用戶所屬診所具備PGY診所訓練資格
				global.clinicPGYType = user.clinicPGYType==undefined?'':user.clinicPGYType;
				global.Email = user.Email==undefined?'':user.Email;
				global.LineID = user.LineID==undefined?'':user.LineIrD;
				global.WechatID = user.WechatID==undefined?'':user.WechatID;
				//個人點數
				global.point = user.point;

				global.clinic = user.clinic;
				global.clinicAddr = user.clinicAddr;
				this.props.navigation.push('HightStoreMaps');
				// this.props.navigation.push('OverviewMap');
			}
		} else {
			Alert.alert("帳號或密碼錯誤");
		}
		}).catch((error) => {
			console.error(error);
		});

	}
	setSelectedBirthDay(value)
	{
		this.setState({birthday_str:this.YYYYMMDD(value)});
		this.setState({birthday:value});
	}
	YYYYMMDD(value) {
		var mm = value.getMonth() + 1; // getMonth() is zero-based
		var dd = value.getDate();

		return [value.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
				].join('');
	};
	render() {
		return (
			<SafeAreaView style={{flex:1}}>
				<KeyboardAvoidingView 
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={styles.container}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.container,{flex: 1,flexWrap: 'wrap', flexDirection: 'column'}}>
							<ImageBackground source={image} style={styles.image,{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
								<View style={{flex: 2.3, flexDirection: 'column'}}>
								</View>
								<View style={{	flex: 2,
												flexDirection: 'column',
												width:WidthScale(380),
												justifyContent:'center',
												alignSelf:'center',
												borderRadius:30,
												backgroundColor:'white',
												alignItems: 'center'}}>
									<View style={{flexDirection:"row",
													marginTop:HeightScale(-80),
													}}>
										<TouchableOpacity style={styles.button,{
											height: 50,
											width:150,
											elevation: 8,
											// marginTop:136,
											// borderRadius: 63,
											paddingVertical: 10,
											paddingHorizontal: 12
											
										}} onPress={()=>this.props.navigation.push('Index')}>
											<Text style={ {fontSize: 18,
														color: "#27D0E5",
														fontWeight: "bold",
														marginBottom : HeightScale(10),
														// justifyContent:'center',
														alignSelf: "center",
														textTransform: "uppercase"}}>登入</Text>
												<View style={{ borderWidth:1.5,
																borderColor:"#27D0E5"
														}}></View>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button,{
											height: 50,
											width:150,
											elevation: 8,
											// marginTop:136,
											// borderRadius: 63,
											paddingVertical: 10,
											paddingHorizontal: 12
										}} onPress={()=>this.props.navigation.push('Register')}>
											<Text style={ {fontSize: 18,
														color: "#B9C2CC",
														fontWeight: "bold",
														marginBottom:HeightScale(10),
														alignSelf: "center",
														textTransform: "uppercase"}}>註冊</Text>
											<View style={{ borderWidth:1.5,
																borderColor:"#B9C2CC"
														}}></View>
										</TouchableOpacity>
									</View>
									<View style={{marginTop:HeightScale(60)}}>
										<TextInput style={styles.UsernameTextInputclass}
											onChangeText={(text) => this.setState({username: text})}
											value={this.state.username}
											placeholder={"中文姓名"}
											// placeholder = '    username'
											class = 'placeholder'
										/>
										<TouchableOpacity style={{borderRadius:10,
														height: 50,		
														justifyContent:'center',	
														width:255,
														marginTop:HeightScale(10),
														backgroundColor:'#ECF2F6'}}
												onPress={()=>this.setState({showBirthDay:!this.state.showBirthDay,
																				})}>	
												<Text style={{paddingHorizontal:20,color:this.state.birthday_str=="密碼（出生年月日）"?'#A4B9CC' : 'black'}}>{this.state.birthday_str}</Text>
										</TouchableOpacity>
									</View>
								</View>
								<View style={{flex: 1.5, 
												flexDirection: 'column',
												alignSelf:'center',}}>
									<TouchableOpacity style={styles.button,{
										height: 50,
										width:255,
										elevation: 8,
										// marginTop:136,
										backgroundColor: "#27D0E5",
										borderRadius: 63,
										paddingVertical: 10,
										paddingHorizontal: 12
										
									}} onPress={this.signin.bind(this)}>
										<Text style={ {fontSize: 18,
													color: "#fff",
													fontWeight: "bold",
													// justifyContent:'center',
													alignSelf: "center",
													textTransform: "uppercase"}}>確認</Text>
									</TouchableOpacity>
								</View>
								{this.state.showBirthDay==false?null:
									<View style={{borderWidth:1,
													width:Dimensions.get('window').width,
													flex:0.01,
													justifyContent:'flex-end',
													marginBottom:40,
															}}>
									<View style={{
														justifyContent:'center',
														borderTopWidth:3,
														borderTopColor:'#B9C2CC',
														alignItems:'flex-end',
														backgroundColor:'#FFF',
														height:50}}>
											<TouchableOpacity style={{alignContent:'center',
																		justifyContent:'center',
																		marginEnd:15,
																		textAlign:'center',
																		flex:1,
																		justifyContent:'center',
																		height:40,
																		width:60,
																		}}
																onPress={()=>{this.setState({showEnrollmentYear:false,
																	showMemberType:false,
																	showBirthDay:false,})}}
															>
												<Text style={{textAlign:'center',fontSize:20,}}>確認</Text>
											</TouchableOpacity>

										</View>
										<View style={{
														backgroundColor:'#FFF',
														height:200}}>

											<DateTimePicker 
												value={ this.state.birthday }
												mode='date'
												display='spinner'
												onChange={ (event,date) => this.setSelectedBirthDay(date) } />
										</View>
									</View>
								}
								
							</ImageBackground>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
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
		paddingHorizontal:20,
		// marginStart: 60,
		borderColor: '#ECF2F6',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : "#ECF2F6"
		},
	UsernameTextInputclass:{
		height: 50,
		paddingHorizontal:20,
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