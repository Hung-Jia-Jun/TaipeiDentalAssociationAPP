import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();

const Topper_image = require('../assets/profile_topper.png');
const Footer_image = require('../assets/Footer_blank.png')
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//會員等級
			memberLevel:'',

			//要顯示上個等級，所以要把所有已知等級都列出來
			levelList:["普通","金","白金","玉璽"],
			showMemberLevel:false,
			
			//點數累積進度條
			loadingBarLength : 0,
		}
	}

    //取得剩餘點數
    getSelfPoint()
    {
        var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
		dbRef.child("user").child(global.username).get().then((result)=>{
            var user = result.val();
            //更新客戶剩餘的點數
            global.point = user.point;

            that.setState({point : user.point});
        });
    }
	componentDidMount()
	{
		this.getSelfPoint()
		_username = this.props.navigation.getParam('username');
		if (_username!=undefined)
		{
			global.username = _username;
		}

		//需要一個馬上寫入馬上就讀的到的變數
		//不然用setState是異步載入，有機率讀不到
		var _memberLevel='';

		//點數載入條的長度
		var _loadingBarLength = 0;
		if (global.point <= 500 == true)
		{
			_loadingBarLength = parseFloat(global.point/500)
			_memberLevel = '普通';
			this.setState({	memberLevel:'普通',
							loadingBarLength : _loadingBarLength,
							});
		}
		if ((global.point > 500 & global.point <= 1000) == true)
		{
			_loadingBarLength = parseFloat((global.point-500)/500)
			_memberLevel = '金';
			this.setState({	memberLevel:'金',
							loadingBarLength : _loadingBarLength,
							});
		}
		if ((global.point > 1000 & global.point <= 1500) == true)
		{
			_loadingBarLength = parseFloat((global.point-1000)/500)
			_memberLevel = '白金';
			this.setState({	memberLevel:'白金',
							loadingBarLength : _loadingBarLength,
							});
		}
		if ((global.point > 1500) == true)
		{
			_loadingBarLength = 1
			_memberLevel = '玉璽';
			this.setState({	memberLevel:'玉璽',
							loadingBarLength : _loadingBarLength,
							});
		}
		var i=0;
		var index=0
		Object.values(this.state.levelList).forEach(e=>{
			if (e == _memberLevel)
			{
				index = i;
			}
			i++;
		})
		//該用戶的下個等級是？
		if (index == this.state.levelList.length-1)
		{
			this.setState({beforeLevel:'--'});
		}
		else
		{
			this.setState({beforeLevel:this.state.levelList[index+1]});
		}
	}
  	render() {
	const renderItem = ({ item }) => (
		<Item _this={this} title={item.title} sceneName={item.sceneName} />
	);

	return (
		<View style={{flex: 1, flexDirection: 'column'}}>
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
				<View style={{flex:0.5,
							flexDirection: 'column',
							zIndex: 1}}>
					<Text style={{marginStart:30,
										color:'#47DCEF',
										zIndex:1,
										fontSize:28,
										width:Dimensions.get('window').width,
										height:Dimensions.get('window').height*0.05,
										marginTop:0,
										}}>Hi {global.username}</Text>
						
				</View>
				<View style={{flex:1.5,
								flexDirection: 'column',
								padding:10,
								borderRadius:30,
								zIndex: 1}}>
					<ImageBackground source={require('../assets/pointBackground.png')}
                            style={{
                                // marginEnd:WidthScale(20),
                                // marginStart : WidthScale(15),
                                // marginTop:HeightScale(40),
								width:Dimensions.get('window').width *0.95,
								height:Dimensions.get('window').height*0.25,
								borderRadius:45,
                                overflow: 'hidden',
								resizeMode:'stretch',
								padding:20,
                            }}>
							<View style={{
											flex:1}}>
								<View style={{flex:0.2,
												flexDirection:'row',
												alignItems:'center'}}>
									<Text style={{
											fontSize:20,
											textAlign:'center',
											zIndex:0,
											color:'white'}}>Point
										</Text>
								</View>
								<View style={{flex:0.4,
												flexDirection:'row',
												alignItems:'center'}}>
									<View style={{flex:0.5,alignItems:'flex-start',flexDirection:'row'}}>
										<Text style={{
												fontSize:45,
												textAlign:'center',
												zIndex:0,
												color:'white'}}>{global.point}
										</Text>
										<Image source={require('../assets/BigCoin.png')}
												style={{
													marginStart:15,
													height:30,
													width:30,
													resizeMode:'stretch',
													alignSelf:'center'
												}}
												></Image>
									</View>
									<View style={{flex:0.1}}></View>
									<View style={{flex:0.4,alignItems:'flex-end'}}>
										<Text style={{
													fontSize:18,
													textAlign:'center',
													zIndex:0,
													color:'white'}}>{this.state.memberLevel}會員
										</Text>
									</View>
								</View>
								<View style={{
												flexDirection:'row',
												borderRadius:30,
												backgroundColor:'#FFF',
												flex:0.05,
												}}>
									<View style={{	
												flex:this.state.loadingBarLength,
												borderRadius:30,
												flexDirection:'row',
												backgroundColor:'#FFCA2F',
												alignItems:'center'}}></View>
								</View>
								<View style={{flex:0.2,
												flexDirection:'row',
												alignItems:'center'}}>
									<View style={{
													flex:0.2}}>
										<Text style={{
												fontSize:20,
												textAlign:'left',
												zIndex:0,
												color:'white'}}>{this.state.memberLevel}
										</Text>
									</View>
									<View style={{
													flex:0.6}}></View>
									<View style={{
													flex:0.2}}>
										<Text style={{
												fontSize:20,
												textAlign:'right',
												zIndex:0,
												color:'white'}}>{this.state.beforeLevel}
										</Text>
									</View>
								</View>
							</View>
					</ImageBackground>
                    
                </View>
				<View style={{flex: 2.5,
								flexDirection: 'column',
								}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						style={{backgroundColor:'white'}}
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
};

const DATA = [
	{
		key: '0',
		title: '購買清單',
		item_image : require('../assets/profileIcon/Profile_0.png'),
		sceneName:'ShoppingCart',
	},
	// {
	// 	key: '1',
	// 	title: '領取獎勵',
	// 	item_image : require('../assets/profileIcon/Profile_1.png'),
    //     sceneName:'ReceiveAward',
	// },
	{
		key: '1',
		title: '修改個人資訊',
		item_image : require('../assets/profileIcon/Profile_2.png'),
        sceneName:'EditProfile',
	},
	{
		key: '2',
		title: '個人名片',
		item_image : require('../assets/profileIcon/Profile_3.png'),
        sceneName:'PersonalBusinessCard',
  	},
	{
		key: '3',
		title: '我的收藏',
		item_image : require('../assets/profileIcon/Profile_4.png'),
        sceneName:'MyFavourite',
	},
	// {
	// 	key: '4',
	// 	title: '我的商場',
	// 	item_image : require('../assets/profileIcon/Profile_5.png'),
    //     sceneName:'MyStore',
	// },
	
];
const Item = ({ _this,title,item_image,sceneName }) => (
    <ImageBackground style={styles.ProfileMenuItemBackground}>
            <TouchableOpacity style={styles.button,{
                height: 62,
                width:Dimensions.get('window').width,
                marginStart: 0,
                marginTop:0,
            }} onPress={() => _this.props.navigation.push(sceneName)}>

            <Image source={ item_image } style={styles.profileIconImage}></Image>
            <Text style={{
                        position: 'absolute',
                        top: -1,
                        left : -1,
                        marginTop: 20,
                        marginLeft: 89,
                        fontSize:18,
                        color:'#8E949B'}}>
                            {title}
            </Text>
    
        </TouchableOpacity>
    </ImageBackground>
);

const styles = StyleSheet.create({
	title:{},
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	image: {
		flex: 1,
		justifyContent: 'center'
	},
	iconImage: {
		width:42,
		height:42,
		marginStart: 42,
		marginTop:21,
		justifyContent: 'center'
    },
    profileIconImage: {
		width:17,
		height:21,
		marginStart: 42,
		marginTop:21,
		justifyContent: 'center'
	},
	text: {
		color: 'white',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	TextInputStyleClass:{
		height: 50,
		width:255,
		marginStart: 60,
		borderColor: '#ECF2F6',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : '#ECF2F6'
		},
	UsernameTextInputclass:{
		height: 50,
		width:255,
		marginStart: 60,
		marginBottom: 15,
		borderColor: '#ECF2F6',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : '#ECF2F6',
	},
	MainMenuItemBackground:{
		width:Dimensions.get('window').width,
		borderColor: '#00A6B8',
		borderWidth: 1,
		borderRadius: 1 ,
		backgroundColor: '#43D1E3',
    },
	ProfileMenuItemBackground:{
		width:Dimensions.get('window').width,
		borderColor: '#EBF0F3',
		borderWidth: 1,
		borderRadius: 1 ,
		backgroundColor: '#FFFFFF',
    },
    
});
export default Page;