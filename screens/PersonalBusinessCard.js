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
				_GroupList.push({   key:i.toString(),
									title:childSnapshot.val().key,
									groupID:childSnapshot.val().value,
									item_image : require('../assets/NotifyItem.png'),
									})
				i+=1;
			});
			that.setState({DATA : that.state.DATA});
			that.setState({GroupList:_GroupList}, () => that.updateLastMsg());
		});
	}
	
	render() {
		const renderItem = ({ item }) => (
			<Item   _this={this} 
					title={item.title} 
					item_image={item.item_image} 
					discription={item.discription}
					groupID={item.groupID}
					/>
		);
		const Group_renderItem = ({ item }) => (
			<Group_Item _this={this} title={item.title} item_image={item.item_image} discription={item.discription} groupID={item.groupID}/>
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
                                {/* busniessCardBackground */}
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
							marginTop:0}}>
					<View style={{flex: 0.05,
                                    }}>
			        </View>
                    <TouchableOpacity style={{flex: 0.4,
                                        marginEnd:WidthScale(20),
                                        marginStart : WidthScale(20),
                                        marginTop:HeightScale(20),
                                        borderRadius:15,
                                        backgroundColor:'#FFF',
                                        borderColor:'#01C5DE',
                                        borderWidth:3,
                                        shadowOffset:{  width:0,  height:3},
                                        shadowColor: 'black',
                                        shadowOpacity: 0.1,
                                    }}
                                    onPress={()=>this.props.navigation.navigate('EditBusinessCard')}
                                    >
                            <View style={{flex: 1,
                                            justifyContent:'center',
                                            }}>
                                    <Text style={{padding:30,
                                                    textAlign:'center',
                                                    color:'#01C5DE',
                                                    fontSize:20,
                                                }}>
                                                    <Text style={{
                                                    textAlign:'center',
                                                    color:'#01C5DE',
                                                    fontSize:50,
                                                    }}>
                                                        +{"\n"}
                                                    </Text>
                                                    新增個人名片</Text>
                            </View>
                    </TouchableOpacity>
                    <View style={{flex: 0.2,
                                    }}>
			        </View>
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




const Group_Item = ({ _this,title,item_image,discription,groupID}) => (
	<View style={styles.container,{zIndex:0,flex: 1, flexDirection: 'row',height:45,backgroundColor:'#D8F4FB'}}>
		<View style={{zIndex:0,width:Dimensions.get('window').width,height:50}}>
			<TouchableOpacity style={styles.button,{
					height: 45,
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
																				GroupID : groupID
																				})}>
					<Image source={ item_image } style={{zIndex:0,
														marginTop:0,
														marginStart:50,
														width:30,
														height:30}}></Image>
					<Text style={{
						width:230,
						zIndex:0,
						height:30,
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

const Item = ({ _this,title,item_image,discription,groupID}) => (
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
					}} onPress={() => _this.props.navigation.push('GroupChat',{GroupID : groupID , GroupName : title})}>
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