import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';

const image = require('../assets/b-個人資料.png');
const item_image = require('../assets/b-個人資料.png');
class Page extends Component {
  render() {
	const renderItem = ({ item }) => (
		<Item _this={this} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
	);

	return (
		<View style={styles.container,{flex: 4, flexDirection: 'column'}}>
			<ImageBackground source={image} style={styles.image}>
				<View style={{flex: 4.7, flexDirection: 'column'}}>

				</View>
				<View style={{flex: 5, flexDirection: 'column'}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 24,
						marginTop:10,
					}} onPress={()=>this.props.navigation.navigate('MainMenu')}>
					</TouchableOpacity> 
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 11,
						marginTop:10,
					}} onPress={()=>this.props.navigation.navigate('Search')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 28,
						marginTop:10,
					}} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 24,
						marginTop:10,
					}} onPress={()=>this.props.navigation.navigate('Message')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 15,
						marginTop:10,
					}} onPress={()=>this.props.navigation.navigate('Profile')}>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
  }
};

const DATA = [
	{
		id: '0',
		title: '購買清單',
		item_image : require('../assets/profileIcon/Profile_0.png'),
		sceneName:'Announcement',
	},
	{
		id: '1',
		title: '領取獎勵',
		item_image : require('../assets/profileIcon/Profile_1.png'),
        sceneName:'AcademicEvents',
	},
	{
		id: '2',
		title: '修改個人資訊',
		item_image : require('../assets/profileIcon/Profile_2.png'),
        sceneName:'DentalGroupPurchase',
	},
	{
		id: '3',
		title: '個人名片',
		item_image : require('../assets/profileIcon/Profile_3.png'),
        sceneName:'ClinicRecruitmentHumanSupport',
  	},
	{
		id: '4',
		title: '我的收藏',
		item_image : require('../assets/profileIcon/Profile_4.png'),
        sceneName:'Student',
	},
	{
		id: '5',
		title: '我的商場',
		item_image : require('../assets/profileIcon/Profile_5.png'),
        sceneName:'HelpAndService',
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