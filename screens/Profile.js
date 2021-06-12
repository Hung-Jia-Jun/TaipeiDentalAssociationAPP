import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';


const Topper_image = require('../assets/profile_topper.png');
const Footer_image = require('../assets/Footer_blank.png')
class Page extends Component {
	componentDidMount()
	{
		try
		{
			_username = this.props.navigation.getParam('username');
			if (_username!=undefined)
			{
				global.username = _username;
				console.log(global.username);
			}
		}
		catch
		{

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
								zIndex: 1}}>
                    <Image source={require('../assets/ProfileCard.png')} style={
                                        {marginTop: 0,
										zIndex:0,
										width:Dimensions.get('window').width,
										height:Dimensions.get('window').height*0.32,
                                        resizeMode:'stretch',
                                        width:Dimensions.get('window').width}}></Image>
                    
                </View>
				<View style={{flex: 2,
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
};

const DATA = [
	{
		key: '0',
		title: '購買清單',
		item_image : require('../assets/profileIcon/Profile_0.png'),
		sceneName:'ShoppingCart',
	},
	{
		key: '1',
		title: '領取獎勵',
		item_image : require('../assets/profileIcon/Profile_1.png'),
        sceneName:'ReceiveAward',
	},
	{
		key: '2',
		title: '修改個人資訊',
		item_image : require('../assets/profileIcon/Profile_2.png'),
        sceneName:'EditProfile',
	},
	{
		key: '3',
		title: '個人名片',
		item_image : require('../assets/profileIcon/Profile_3.png'),
        sceneName:'PersonalBusinessCard',
  	},
	{
		key: '4',
		title: '我的收藏',
		item_image : require('../assets/profileIcon/Profile_4.png'),
        sceneName:'MyFavourite',
	},
	{
		key: '5',
		title: '我的商場',
		item_image : require('../assets/profileIcon/Profile_5.png'),
        sceneName:'MyStore',
	},
	
];
const Item = ({ _this,title,item_image,sceneName }) => (
    <ImageBackground style={styles.ProfileMenuItemBackground}>
            <TouchableOpacity style={styles.button,{
                height: 62,
                width:Dimensions.get('window').width,
                marginStart: 0,
                marginTop:0,
            }} onPress={() => _this.props.navigation.navigate(sceneName)}>

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