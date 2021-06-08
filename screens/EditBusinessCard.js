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
	arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele.key != value; 
        });
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
				user.businessCard.push({
										businessCardName : that.state.businessCardName,
										experienceList : that.state.experienceList,
										educationList : that.state.educationList,
										})
				var businessCardRef = database.ref('/user'+"/" + global.username);
				businessCardRef.update({
					businessCard : user.businessCard
				});
			}
			})
			.catch(function(error) {
				console.log('There has been a problem with your fetch operation: ' + error.message);
				// ADD THIS THROW error
				throw error;
				},callback);
		
	}
	// updateLastMsg()
	// {
	// 	var that = this;
	// 	var GroupList = that.state.GroupList;
	// 	var i =0;
	// 	GroupList.forEach(e =>{
	// 		var groupID = e.groupID;
	// 		//只要關於群組的內容有更新，就更新一次畫面
	// 		var ref = firebase.database().ref();
	// 		that.state.DATA = [];
	// 		ref.child("group").child(groupID).get().then((snapshot) => {
	// 		// var foo = ref.on('value' , function (snapshot) {
	// 			var EachGroupMsgArr = Object.values(snapshot.val().msg);
	// 			var last = EachGroupMsgArr[EachGroupMsgArr.length - 1];
				
	// 			that.state.DATA.push({
	// 				key : i.toString(),
	// 				title : e.title,
	// 				groupID : groupID,
	// 				item_image : require('../assets/MessageIcon.png'),
	// 				discription : last.msg,
	// 			});
	// 			i++;
	// 			that.setState({DATA : that.state.DATA});
	// 		});
	// 	});
	// }
	render() {
		const renderItem = ({ item }) => (
			<Education_Item _this={this} itemKey={item.key} title={item.placeholderText} value={item.value}/>
		);
		const renderItem2 = ({ item }) => (
			<Experience_Item _this={this} itemKey={item.key} title={item.placeholderText} value={item.value}/>
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
								color:'white'}}>個人名片</Text>
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
							padding:50}}>
				<Text style={{
							fontSize:18,
							textAlign:'left',
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
									this.state.educationList.push({
										key : this.state.educationList.length,
										placeholderText: '學歷',
										value:"",
									});
									this.setState({educationList : this.state.educationList});
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
								this.state.experienceList.push({
									key : this.state.experienceList.length,
									placeholderText: '經歷',
									value:"",
								});
								this.setState({experienceList : this.state.experienceList});
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