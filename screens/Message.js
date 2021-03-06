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
			showGroupList:false,
			GroupList : [
			  
			],
			DATA : [],
		}
	}
	componentDidMount()
	{
		this.updateGroupList();
	}
	updateGroupList()
	{
		var that = this;
		var _GroupList=[]
		var ref = firebase.database().ref('/user'+"/" + global.username+ '/belongGroups');
		ref.on('value', function (snapshot) {
			// 先清空舊有的聊天室通知列表
			var i=0;
			snapshot.forEach((childSnapshot) => {
				if (childSnapshot.val().groupType=="multiChat")
				{
					_GroupList.push({   key:i.toString(),
										title:childSnapshot.val().key,
										groupID:childSnapshot.val().value,
										groupType:childSnapshot.val().groupType,
										item_image : require('../assets/NotifyItem.png'),
										})
				}
				i+=1;
			});
			that.setState({DATA : that.state.DATA});
			that.setState({GroupList:_GroupList}, () => that.updateLastMsg());
		});
	}
	updateLastMsg()
	{
		var that = this;
		var GroupList = that.state.GroupList;
		var i =0;
		GroupList.forEach(e =>{
			var groupID = e.groupID;
			//只要關於群組的內容有更新，就更新一次畫面
			var ref = firebase.database().ref();
			that.state.DATA = [];
			ref.child("group").child(groupID).get().then((snapshot) => {
				if  (snapshot.val().msg!=undefined && snapshot.val().groupType=='multiChat')
				{
					var EachGroupMsgArr = Object.values(snapshot.val().msg);
					var last = EachGroupMsgArr[EachGroupMsgArr.length - 1];
					
					that.state.DATA.push({
						key : i.toString(),
						title : e.title,
						groupID : groupID,
						groupType: snapshot.val().groupType,
						item_image : require('../assets/MessageIcon.png'),
						discription : last.msg,
					});
					i++;
					that.setState({DATA : that.state.DATA});
				}
			});
		});
	}
	render() {
		const renderItem = ({ item }) => (
			<Item   _this={this} 
					title={item.title} 
					item_image={item.item_image} 
					discription={item.discription}
					groupID={item.groupID}
					item={item}
					/>
		);
		const Group_renderItem = ({ item }) => (
			<Group_Item _this={this} item={item} title={item.title} item_image={item.item_image} discription={item.discription} groupID={item.groupID}/>
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
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>訊息中心</Text>
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
						onPress={()=>this.props.navigation.push('InviteGroupChat',{GroupUsers:[]})}>
						<Image source={require('../assets/MessageBtn.png')}></Image>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 0.35,
							flexDirection: 'column',
							}}>
				<View style={{flex: 1,
								flexDirection: 'row',
								}}>
					<TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												marginStart:Dimensions.get('window').width*0.12,
												zIndex:0,
												alignContent:'flex-start',
												width:100,
												height:40}}
												onPress={()=>this.props.navigation.push('Notifycation')}>
						<Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>通知</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												marginStart:Dimensions.get('window').width*0.2,
												zIndex:0,
												alignItems:'flex-end',
												width:100,
												height:40}}
												onPress={()=>this.props.navigation.push('Message')}>
						<Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center'}}>聊天室</Text>
					</TouchableOpacity>
				</View>
				<View style={{flex: 0.05,
								flexDirection: 'row',
								}}>
					<View style={{flex: 1,
								width:Dimensions.get('window').width*0.1,
								alignContent:'center',
								height:Dimensions.get('window').height*0.004,
								backgroundColor:'#E2EBF6',
								flexDirection: 'row',
								}}>
					</View>
					   <View style={{flex: 1,
								width:Dimensions.get('window').width*0.2,
								height:Dimensions.get('window').height*0.004,
								backgroundColor:'#43D1E3',
								flexDirection: 'row',
								}}>
					</View>
				</View>
			</View>
			<View style={{flex: 0.25,
							zIndex:1,
							flexDirection: 'column',
							marginTop:0}}>
				<TouchableOpacity style={{      zIndex:1,
												backgroundColor:'#D8F4FB',
												width:Dimensions.get('window').width,
												height:HeightScale(50)}}
												onPress={()=>{
																this.setState({showGroupList:!this.state.showGroupList});
																}}>
						<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
							<Image source={Friend_image} style={{alignSelf:'center', marginStart:WidthScale(30)}}></Image>
							<Text style={{marginStart:WidthScale(30),alignSelf:'center', fontSize:15,color:'black',textAlign:'left'}}>查看所屬群組</Text>
							<View style={{flex:2,flexDirection:'row',justifyContent:'flex-end',marginEnd:WidthScale(30)}}>
								<Image source={require('../assets/downArrow.png')} style={{}}></Image>
							</View>
						</View>
				</TouchableOpacity>
				{this.state.showGroupList==true?
				<View style={{flex:0.01,flexDirection:'row',alignItems:'center'}}>
					<FlatList
					style={{zIndex:0,marginTop:200,height:200,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
					contentContainerStyle={{ marginTop: 0}}
					data={this.state.GroupList}
					renderItem={Group_renderItem}
					keyExtractor={item => item.key.toString()}
					/>
				</View>
				:null}
			</View>
			<View style={{flex: 3.7,
							zIndex:0,
							flexDirection: 'column',
							marginTop:0}}>
					<FlatList
						style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
						contentContainerStyle={{ marginTop: 0}}
						data={this.state.DATA}
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
				}} onPress={()=>this.props.navigation.push('MainMenu')}>
						<Image source={require('../assets/footerIcon/Home.png')}></Image>
				</TouchableOpacity> 
				<TouchableOpacity style={styles.button,{
					height: 50,
					width:50,justifyContent:'center',
					alignItems:'center',
					marginStart: Dimensions.get('window').width*0.03,
					marginTop:12,
				}} onPress={()=>this.props.navigation.push('Search')}>
						<Image source={require('../assets/footerIcon/Search.png')}></Image>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button,{
					height: 50,
					width:50,justifyContent:'center',
					alignItems:'center',
					marginStart: Dimensions.get('window').width*0.08,
					marginTop:12,
				}} onPress={()=>this.props.navigation.push('OverviewMap')}>
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
				}} onPress={()=>this.props.navigation.push('Notifycation')}>
						<Image source={require('../assets/footerIcon/Msg.png')}></Image>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button,{
					height: 50,
					width:50,justifyContent:'center',
					alignItems:'center',
					marginStart: Dimensions.get('window').width*0.03,
					marginEnd: Dimensions.get('window').width*0.01,
					marginTop:12,
				}} onPress={()=>this.props.navigation.push('Profile')}>
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




const Group_Item = ({ _this,title,item,item_image,discription,groupID}) => (
	<View style={styles.container,{zIndex:0,
									flex: 1,
									flexDirection: 'row',
									height:item.groupType=='multiChat'?45:0,
									backgroundColor:'#D8F4FB'}}>
		<View style={{zIndex:0,width:Dimensions.get('window').width,height:50}}>
			<TouchableOpacity style={styles.button,{
					height: item.groupType=='multiChat'?45:0,
					zIndex:0,
					shadowOffset:{  width: 5,  height: 5},
					shadowColor: 'black',
					shadowOpacity: 0.01,
					width:Dimensions.get('window').width,
					marginStart: 0,
					zIndex:1,
					flexDirection:'row',
					marginTop:0,
				}} onPress={() => _this.props.navigation.push('GroupChat',{ GroupName : title,
																				GroupID : groupID,
																				groupType:'multiChat'
																				})}>
					<Image source={ item_image } style={{zIndex:0,
														marginTop:0,
														marginStart:50,
														width:30,
														height:item.groupType=='multiChat'?30:0,}}></Image>
					<Text style={{
						width:230,
						zIndex:0,
						height:item.groupType=='multiChat'?30:0,
						marginLeft: 100,
						textAlign:'left',
						marginTop:3,
						fontSize:15,
						justifyContent:'center',
						color:'black'}}>
							{title}
					</Text>
			</TouchableOpacity>
		</View> 
	</View>
);

const Item = ({ _this,item,title,item_image,discription,groupID}) => (
	<View style={styles.container,{zIndex:0,flex: 1, flexDirection: 'row',height:105}}>
		<ImageBackground style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,height:100,backgroundColor:'#F2FAFF'}}> 
			<View style={{zIndex:0,width:Dimensions.get('window').width,height:100}}>
				<View style={styles.container,{zIndex:0,flex: 1, flexDirection: 'row'}}>
					<Image source={ item_image } style={{zIndex:0,marginStart:27,marginTop:11,width:90,height:90}}></Image>
				</View>
				<View style={styles.container,{zIndex:0,flex: 0.1, flexDirection: 'column'}}>
					<Text style={{
						width:230,
						zIndex:0,
						height:30,
						marginTop: 20,
						marginLeft: 125,
						fontSize:17,
						color:'black'}}>
							{title}
					</Text>
					<Text style={{
						width:230,
						height:40,
						zIndex:0,
						marginTop: 0,
						marginLeft: 125,
						fontSize:12,
						color:'black'}}>
							{discription}
					</Text>
				</View>
				<TouchableOpacity style={styles.button,{
						height: 100,
						zIndex:0,
						shadowOffset:{  width: 5,  height: 5},
						shadowColor: 'black',
						shadowOpacity: 0.01,
						width:Dimensions.get('window').width,
						borderColor:'black',
						marginStart: 0,
						zIndex:0,
						marginTop:0,
					}} onPress={() => _this.props.navigation.push('GroupChat',{GroupID : groupID , GroupName : title,groupType:'multiChat'})}>
					</TouchableOpacity>
			</View> 
		</ImageBackground>
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