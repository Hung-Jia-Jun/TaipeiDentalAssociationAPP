import React, { Component } from "react";
import { Dimensions,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
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
			//這張名片你要叫什麼名字
			businessCardName:'',
			experienceList : [
				{
					key: 0,
					placeholderText: '經歷',
					value:"",
				},
			],
			educationList : [
				{
					key: 0,
					placeholderText: '學歷',
					value:"",
				},
			],
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
	removeCardById(Id,callback)
	{
		var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
		dbRef.child("user").child(global.username).get().then((result) => {
			if (result.exists()) {
				var user = result.val();
				var newArr = []
				user.businessCard.forEach(e=>{
					if (e.id!=Id)
					{
						newArr.push(e);
					}
				})
				var businessCardRef = database.ref('/user'+"/" + global.username);
				console.log(newArr);
				businessCardRef.update({
					businessCard : newArr
				});
				
		}},callback);
	}
	uploadSelfBusinessCard(callback)
	{
		var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
		dbRef.child("user").child(global.username).get().then((result) => {
			if (result.exists()) {
				var user = result.val();
				if (user.businessCard==undefined)
				{
					user.businessCard = []
				}
				if (that.state.cardId != undefined)
				{
					user.businessCard.forEach(e=>{
						if (e.id==that.state.cardId)
						{
							if (that.state.experienceList==undefined)
							{
								that.state.experienceList=[]
							}
							if (that.state.educationList==undefined)
							{
								that.state.educationList=[]
							}
							e.businessCardName = that.state.businessCardName;
							e.experienceList = that.state.experienceList;
							e.educationList = that.state.educationList;
						}
					})
					var businessCardRef = database.ref('/user'+"/" + global.username);
					console.log(user.businessCard);
					businessCardRef.update({
						businessCard : user.businessCard
					});
				
				}
				else
				{
					if (that.state.experienceList.length==0)
					{
						that.setState({experienceList:[
							{
								key: 0,
								placeholderText: '經歷',
								value:"",
							},
						]});
					}

					if (that.state.educationList.length==0)
					{
						that.setState({educationList:[
							{
								key: 0,
								placeholderText: '學歷',
								value:"",
							},
						]});
					}

					var timeStamp = new Date().getTime().toString();
					user.businessCard.push({
											id :timeStamp,
											businessCardName : that.state.businessCardName,
											experienceList : that.state.experienceList,
											educationList : that.state.educationList,
											})
					var businessCardRef = database.ref('/user'+"/" + global.username);
					businessCardRef.update({
						businessCard : user.businessCard
					});
				}
			}
			})
			.catch(function(error) {
				console.log('There has been a problem with your fetch operation: ' + error.message);
				// ADD THIS THROW error
				throw error;
				},callback);
		
	}
	render() {
		const renderItem = ({ item }) => (
			<Education_Item _this={this} itemKey={item.key} placeholderText={item.placeholderText} value={item.value}/>
		);
		const renderItem2 = ({ item }) => (
			<Experience_Item _this={this} itemKey={item.key} placeholderText={item.placeholderText} value={item.value}/>
		);
		
	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
								onPress={()=>this.props.navigation.push('PersonalBusinessCard')}>
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
										color:'white'}}>個人名片</Text>
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
								onPress={()=>this.removeCardById(this.state.cardId,this.props.navigation.push('PersonalBusinessCard'))}>
								<Image source={require('../assets/whiteTrachcan.png')}></Image>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{flex: 3.7,
									zIndex:0,
									flexDirection: 'column',
									padding:50}}>
						<Text style={{
									fontSize:18,
									textAlign:'left',
									marginBottom : 15,
									marginTop:20,
									zIndex:0,}}>中文姓名 :</Text>		
						<TextInput style={styles.TextInputclass}
											onChangeText={(text) => this.setState({businessCardName: text})}
											value={this.state.businessCardName}
											placeholder={"中文姓名"}
											// placeholder = '    username'
											class = 'placeholder'
										/>
						<View style={{}}>
							<View style={{flexDirection:'row',alignItems:'center'}}>
								<Text style={{
											fontSize:18,
											marginTop:15,
											textAlign:'left',
											zIndex:0,}}>學歷 :</Text>		
								<TouchableOpacity style={{
										width:40,
										marginStart:10,
										height:40,
										marginTop:15,
										justifyContent:'center',
										alignItems:'center',
										}}
										onPress={()=>{
											if (this.state.educationList==undefined)
											{
												this.setState({educationList:[]},()=>{
													this.state.educationList.push({
														key : this.state.educationList.length,
														placeholderText: '學歷',
														value:"",
													});
													this.setState({educationList : this.state.educationList});
												});
											}
											else
											{
												this.state.educationList.push({
													key : this.state.educationList.length,
													placeholderText: '學歷',
													value:"",
												});
												this.setState({educationList : this.state.educationList});
											}
											
										}}
										>
									<Image source={require('../assets/plus.png')}></Image>
								</TouchableOpacity>
							</View>
							<FlatList
								style={{width:WidthScale(350)}}//backgroundColor:'#EBF0F3'}}
								contentContainerStyle={{ marginTop: 0}}
								data={this.state.educationList}
								renderItem={renderItem}
								keyExtractor={item => item.key.toString()}
							/>
						</View>

						<View style={{flexDirection:'row',alignItems:'center'}}>
							<Text style={{
										fontSize:18,
										marginTop:15,
										textAlign:'left',
										zIndex:0,}}>經歷 :</Text>		
							<TouchableOpacity style={{
									width:40,
									marginStart:10,
									height:40,
									marginTop:15,
									justifyContent:'center',
									alignItems:'center',
									}}
									onPress={()=>{
										if (this.state.experienceList==undefined)
										{
											this.setState({experienceList:[]},()=>{
												this.state.experienceList.push({
													key : this.state.experienceList.length,
													placeholderText: '經歷',
													value:"",
												});
												this.setState({experienceList : this.state.experienceList});
											});
										}
										else
											{
												this.state.experienceList.push({
													key : this.state.experienceList.length,
													placeholderText: '經歷',
													value:"",
												});
												this.setState({experienceList : this.state.experienceList});
											}
									}}
									>
								<Image source={require('../assets/plus.png')}></Image>
							</TouchableOpacity>
						</View>
						<FlatList
							style={{}}//backgroundColor:'#EBF0F3'}}
							contentContainerStyle={{ marginTop: 0}}
							data={this.state.experienceList}
							renderItem={renderItem2}
							keyExtractor={item => item.key.toString()}
						/>
					</View>
					<View style={{flex: 0.01, flexDirection: 'column'}}>
						<Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
					</View>
					<View style={{flex: 0.5,justifyContent:'space-between'}}>
					<TouchableOpacity style={styles.button,{
							justifyContent:'center',
							flex:1,
							backgroundColor:'#01C5DE',
							alignItems:'center',
						}} onPress={()=> this.uploadSelfBusinessCard(this.props.navigation.push('PersonalBusinessCard')) }>
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
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
  }
}




const Education_Item = ({ _this,itemKey,placeholderText,value}) => (
	<View style={styles.container,{marginTop:15,zIndex:0,flex: 1, flexDirection: 'row',height:45}}>
		<TextInput style={styles.TextInputclass}
			onChangeText={(text) => {
				_this.state.educationList[itemKey].value = text;
				_this.setState({educationList:_this.state.educationList})
			}}
			value={_this.state.educationList[itemKey].value}
			placeholder={placeholderText}
			class = 'placeholder'
		/>
		<TouchableOpacity style={{
									padding:8,
									width:40,
									marginStart:10,
									height:35,
									justifyContent:'center',
									alignItems:'center',
									}}
							onPress={()=>{
								console.log(itemKey);
								var _educationList = _this.arrayRemove(_this.state.educationList,itemKey);
								_this.state.educationList = []
								
								try
								{
									var i=0;
									Object.values(_educationList).forEach(e=>{
										_this.state.educationList.push({
											key : i,
											placeholderText: '學歷',
											value:e.value,
										})
										i++;
									})
									_this.setState({educationList:_this.state.educationList})
								}
								catch
								{
									
								}
							}}>
			<Image source={require('../assets/trashCan.png')}></Image>
		</TouchableOpacity>
	</View>
);



const Experience_Item = ({ _this,itemKey,placeholderText,value}) => (
	<View style={styles.container,{marginTop:15,zIndex:0,flex: 1, flexDirection: 'row',height:45}}>
		<TextInput style={styles.TextInputclass}
			onChangeText={(text) => {
				_this.state.experienceList[itemKey].value = text;
				_this.setState({experienceList:_this.state.experienceList})
			}}
			value={_this.state.experienceList[itemKey].value}
			placeholder={placeholderText}
			class = 'placeholder'
		/>
		<TouchableOpacity style={{
									padding:8,
									width:40,
									marginStart:10,
									height:35,
									justifyContent:'center',
									alignItems:'center',
									}}
							onPress={()=>{
								console.log(itemKey);
								var _experienceList = _this.arrayRemove(_this.state.experienceList,itemKey);
								_this.state.experienceList = []
								
								try
								{
									var i=0;
									Object.values(_experienceList).forEach(e=>{
										_this.state.experienceList.push({
											key : i,
											placeholderText: '學歷',
											value:e.value,
										})
										i++;
									})
									_this.setState({experienceList:_this.state.experienceList})
								}
								catch
								{

								}
							}}>
			<Image source={require('../assets/trashCan.png')}></Image>
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