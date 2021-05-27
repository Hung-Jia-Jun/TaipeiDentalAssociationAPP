import React, { Component,useState,Keyboard } from "react";
import { SafeAreaView,Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View,Alert} from "react-native";
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as firebase from 'firebase';

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
			memberType:'身份',
			birthDay:new Date(),
			birthDay_str:'生日',
			enrollmentYear:'入學年',
			
			showMemberType:false,
			showEnrollmentYear:false,
			showBirthDay:false,
		}
	}
	
	signup() {
		if (this.state.username=='')
		{
			Alert.alert("請輸入姓名");
			return;
		}
		if (this.state.birthday_str=='生日')
		{
			Alert.alert("請輸入生日");
			return;
		}
		if (this.state.memberType=='身份')
		{
			Alert.alert("請輸入身份");
			return;
		}
		if (this.state.enrollmentYear=='入學年')
		{
			Alert.alert("請輸入入學年");
			return;
		}
		var dbRef = database.ref();
		dbRef.child("user").child(this.state.username).get().then((result) => {
			if (result.exists()==false) 
			{
				database.ref('/user'+"/" + this.state.username).set({	username:this.state.username,
									memberType:this.state.memberType,
									birthday:this.state.birthDay_str,
									enrollmentYear:this.state.enrollmentYear,
									userIcon : '../assets/MessageIcon.png',
									validation : false,
									belongGroups : [],
								});
				Alert.alert("申請成功，等待審核中");
			} 
			else 
			{
				Alert.alert("會員已存在，請直接登入謝謝");
			}
		}).catch((error) => {
			console.error(error);
		});

		
	}
	setSelectedMemberType(itemValue)
	{
		this.setState({memberType:itemValue});
	}
	setSelectedEnrollmentYear (year)
	{
		this.setState({enrollmentYear: year});
	}
	setSelectedBirthDay(value)
	{
		this.setState({birthDay_str:this.YYYYMMDD(value)});
		this.setState({birthDay:value});
	}
	YYYYMMDD(value) {
		var mm = value.getMonth() + 1; // getMonth() is zero-based
		var dd = value.getDate();

		return [value.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
				].join('');
	};
	componentDidMount()
    {
		// const [date, setDate] = useState(new Date(1598051730000));
	}
	render() {
		return (
			<SafeAreaView style={{flex:1}}>
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
											marginTop:HeightScale(0),
											}}>
								<TouchableOpacity style={styles.button,{
									height: 50,
									width:150,
									elevation: 8,
									// marginTop:136,
									// borderRadius: 63,
									paddingVertical: 10,
									paddingHorizontal: 12
								}} onPress={()=>this.props.navigation.navigate('Index')}>
									<Text style={ {fontSize: 18,
												color: "#B9C2CC",
												fontWeight: "bold",
												marginBottom : HeightScale(10),
												// justifyContent:'center',
												alignSelf: "center",
												textTransform: "uppercase"}}>登入</Text>
										<View style={{ borderWidth:1.5,
														borderColor:"#B9C2CC"
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
								}} onPress={()=>this.props.navigation.navigate('Register')}>
									<Text style={ {fontSize: 18,
												color: "#27D0E5",
												fontWeight: "bold",
												marginBottom:HeightScale(10),
												alignSelf: "center",
												textTransform: "uppercase"}}>註冊</Text>
									<View style={{ borderWidth:1.5,
														borderColor:"#27D0E5"
												}}></View>
								</TouchableOpacity>
							</View>
							<View style={{marginTop:HeightScale(0),
											flexDirection:'column',
											}}>
								<TextInput style={{height: 50,
													width:255,
													borderColor: '#ECF2F6',
													borderWidth: 1,
													borderRadius: 10 ,
													paddingHorizontal:20,
													marginTop:HeightScale(10),
													backgroundColor : "#ECF2F6",
													}	
												}
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
										onPress={()=>this.setState({showMemberType:!this.state.showMemberType,
																	showEnrollmentYear:false,
																	showBirthDay:false,
																		})}>
										<Text style={{paddingHorizontal:20,color:this.state.memberType=="身份"?'#A4B9CC' : 'black'}}>{this.state.memberType}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{borderRadius:10,
												height: 50,		
												justifyContent:'center',	
												width:255,
												marginTop:HeightScale(10),
												backgroundColor:'#ECF2F6'}}
										onPress={()=>this.setState({showEnrollmentYear:!this.state.showEnrollmentYear,
																	showMemberType:false,
																	showBirthDay:false,
																		})}>	
										<Text style={{paddingHorizontal:20,color:this.state.enrollmentYear=="入學年"?'#A4B9CC' : 'black'}}>{this.state.enrollmentYear}</Text>
								</TouchableOpacity>
								
								<TouchableOpacity style={{borderRadius:10,
												height: 50,		
												justifyContent:'center',	
												width:255,
												marginTop:HeightScale(10),
												backgroundColor:'#ECF2F6'}}
										onPress={()=>this.setState({showBirthDay:!this.state.showBirthDay,
																	showEnrollmentYear:false,
																	showMemberType:false,
																		})}>	
										<Text style={{paddingHorizontal:20,color:this.state.birthDay_str=="生日"?'#A4B9CC' : 'black'}}>{this.state.birthDay_str}</Text>
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
								 
							}} onPress={this.signup.bind(this)}>
								<Text style={ {fontSize: 18,
											color: "#fff",
											fontWeight: "bold",
											// justifyContent:'center',
											alignSelf: "center",
											textTransform: "uppercase"}}>確認</Text>
							</TouchableOpacity>
						</View>
						{this.state.showMemberType==false?null:
							<View style={{
											width:Dimensions.get('window').width,
											flex:0.01,
											justifyContent:'flex-end',
											marginBottom:10,
													}}>
										<Picker
											selectedValue={this.state.memberType}
											onValueChange={(itemValue, itemIndex) =>
												this.setSelectedMemberType(itemValue)
											}
											>
											<Picker.Item label="台北市開業" value="台北市開業" />
											<Picker.Item label="台北市服務" value="台北市服務" />
											<Picker.Item label="外縣市校友" value="外縣市校友" />
											<Picker.Item label="牙醫系學生" value="牙醫系學生" />
											<Picker.Item label="其他校盟友" value="其他校盟友" />
										</Picker>
							</View>
						}
						{this.state.showEnrollmentYear?
						<View style={{
											width:Dimensions.get('window').width,
											flex:0.01,
											justifyContent:'flex-end',
											marginBottom:10,
													}}>
													<Picker
														selectedValue={this.state.enrollmentYear}
														onValueChange={(itemValue, itemIndex) =>
															this.setSelectedEnrollmentYear(itemValue)
														}
														>
														<Picker.Item label="2030" value="2030" />
														<Picker.Item label="2029" value="2029" />
														<Picker.Item label="2028" value="2028" />
														<Picker.Item label="2027" value="2027" />
														<Picker.Item label="2026" value="2026" />
														<Picker.Item label="2025" value="2025" />
														<Picker.Item label="2024" value="2024" />
														<Picker.Item label="2023" value="2023" />
														<Picker.Item label="2022" value="2022" />
														<Picker.Item label="2021" value="2021" />
														<Picker.Item label="2020" value="2020" />
														<Picker.Item label="2019" value="2019" />
														<Picker.Item label="2018" value="2018" />
														<Picker.Item label="2017" value="2017" />
														<Picker.Item label="2016" value="2016" />
														<Picker.Item label="2015" value="2015" />
														<Picker.Item label="2017" value="2017" />
														<Picker.Item label="2013" value="2013" />
														<Picker.Item label="2012" value="2012" />
														<Picker.Item label="2011" value="2011" />
														<Picker.Item label="2010" value="2010" />
														<Picker.Item label="2009" value="2009" />
														<Picker.Item label="2008" value="2008" />
														<Picker.Item label="2007" value="2007" />
														<Picker.Item label="2006" value="2006" />
														<Picker.Item label="2005" value="2005" />
														<Picker.Item label="2004" value="2004" />
														<Picker.Item label="2003" value="2003" />
														<Picker.Item label="2002" value="2002" />
														<Picker.Item label="2001" value="2001" />
														<Picker.Item label="2000" value="2000" />
														<Picker.Item label="1999" value="1999" />
														<Picker.Item label="1998" value="1998" />
														<Picker.Item label="1997" value="1997" />
														<Picker.Item label="1996" value="1996" />
														<Picker.Item label="1995" value="1995" />
														<Picker.Item label="1994" value="1994" />
														<Picker.Item label="1993" value="1993" />
														<Picker.Item label="1992" value="1992" />
														<Picker.Item label="1991" value="1991" />
														<Picker.Item label="1990" value="1990" />
														<Picker.Item label="1989" value="1989" />
														<Picker.Item label="1988" value="1988" />
														<Picker.Item label="1987" value="1987" />
														<Picker.Item label="1986" value="1986" />
														<Picker.Item label="1985" value="1985" />
														<Picker.Item label="1984" value="1984" />
														<Picker.Item label="1983" value="1983" />
														<Picker.Item label="1982" value="1982" />
														<Picker.Item label="1981" value="1981" />
														<Picker.Item label="1980" value="1980" />
														<Picker.Item label="1979" value="1979" />
														<Picker.Item label="1978" value="1978" />
														<Picker.Item label="1977" value="1977" />
														<Picker.Item label="1976" value="1976" />
														<Picker.Item label="1975" value="1975" />
														<Picker.Item label="1974" value="1974" />
														<Picker.Item label="1973" value="1973" />
														<Picker.Item label="1972" value="1972" />
														<Picker.Item label="1971" value="1971" />
														<Picker.Item label="1970" value="1970" />
														<Picker.Item label="1969" value="1969" />
														<Picker.Item label="1968" value="1968" />
														<Picker.Item label="1967" value="1967" />
														<Picker.Item label="1966" value="1966" />
														<Picker.Item label="1965" value="1965" />
														<Picker.Item label="1964" value="1964" />
														<Picker.Item label="1963" value="1963" />
														<Picker.Item label="1962" value="1962" />
														<Picker.Item label="1961" value="1961" />
														<Picker.Item label="1960" value="1960" />
														<Picker.Item label="1959" value="1959" />
														<Picker.Item label="1958" value="1958" />
														<Picker.Item label="1957" value="1957" />
														<Picker.Item label="1956" value="1956" />
														<Picker.Item label="1955" value="1955" />
														<Picker.Item label="1954" value="1954" />
														<Picker.Item label="1953" value="1953" />
													</Picker>
													</View>
						:null}
						{this.state.showBirthDay==false?null:
							<View style={{borderWidth:1,
											width:Dimensions.get('window').width,
											flex:0.01,
											justifyContent:'flex-end',
											marginBottom:40,
													}}>
								<DateTimePicker 
									value={ this.state.birthDay }
									mode='date'
									display='spinner'
									onChange={ (event,date) => this.setSelectedBirthDay(date) } />
								
							</View>
						}
						
					</ImageBackground>
				</View>
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
		// marginStart: 60,
		borderColor: '#ECF2F6',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : "#ECF2F6"
		},
	UsernameTextInputclass:{
		height: 50,
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
