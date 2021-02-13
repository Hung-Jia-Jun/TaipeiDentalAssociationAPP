import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';

const image = require('../assets/b-主選單.png');
const item_image = require('../assets/b-主選單.png');


const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const footer_image = require('../assets/Footer.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


class Page extends Component {
  render() {
	const renderItem = ({ item }) => (
		<Item _this={this} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
	);

	return (
		<View style={styles.container,{flex: 4, flexDirection: 'column'}}>
			<View style={{flexDirection: 'column',zIndex: 1}}>
                    <Image source={overviewMapTopper_image} style={
                                        {marginTop: height < guidelineBaseHeight ? HeightScale(-140) : HeightScale(-85),
                                        resizeMode:'stretch',
                                        width:width}}></Image>
			</View>
			<View style={{flex: 0.01,zIndex:2, flexDirection: 'column',
								marginTop:HeightScale(20)}}>
					<Text style={{
								color:'black',
								fontSize:20,
								textAlign:'center',
								marginTop:height < guidelineBaseHeight ? HeightScale(-180) : HeightScale(-140),
							}}>主選單</Text>
			</View>
			<View style={{marginTop:HeightScale(-250),flex: 8.9, flexDirection: 'column'}}>
				<FlatList
					contentContainerStyle={{ marginTop: 100}}
					data={DATA}
					backgroundColor={'#43D1E3'}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			</View>
			<View style={styles.borderBlackLine,{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={styles.borderBlackLine,
                                                        {marginStart:WidthScale(0),
                                                        marginTop:height < guidelineBaseHeight ? HeightScale(-10) : HeightScale(0),
                                                        width:width}}></Image>
			</View>
			<View style={styles.borderBlackLine,{flex: 0.5,zIndex:3, flexDirection: 'row'}}>
				<TouchableOpacity style={styles.button,{
					height: height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
					width:WidthScale(50),
					marginStart:WidthScale(30),
					marginTop:HeightScale(10),
					
				}} onPress={()=>this.props.navigation.navigate('MainMenu')}>
				</TouchableOpacity> 
				<TouchableOpacity style={styles.button,{
					height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
					width:WidthScale(50),
					marginStart:WidthScale(21),
					marginTop:HeightScale(10),
					
				}} onPress={()=>this.props.navigation.navigate('Search')}>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button,{
					height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
					width:WidthScale(50),
					marginStart:WidthScale(39),
					marginTop:HeightScale(10),
					
				}} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button,{
					height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
					width:WidthScale(50),
					marginStart:WidthScale(35),
					marginTop:HeightScale(10),
					
				}} onPress={()=>this.props.navigation.navigate('Notifycation')}>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button,{
					height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
					width:WidthScale(50),
					marginStart:WidthScale(20),
					marginTop:HeightScale(10),
					
				}} onPress={()=>this.props.navigation.navigate('Profile')}>
				</TouchableOpacity>
			</View>
		</View>
	);
  }
};

const DATA = [
	{
		id: '0',
		title: '校友會公告',
		item_image : require('../assets/Group 13.png'),
		sceneName:'Announcement',
	},
	{
		id: '1',
		title: '學術活動',
		item_image : require('../assets/Group 11.png'),
		sceneName:'AcademicEvents',
	},
	{
		id: '2',
		title: '牙材選購',
		item_image : require('../assets/Group 10.png'),
		sceneName:'DentalGroupPurchase',
	},
	{
		id: '3',
		title: '人力交流',
		item_image : require('../assets/Group 7 Copy.png'),
		sceneName:'ClinicRecruitmentHumanSupport',
  	},
	{
		id: '4',
		title: '牙醫學生',
		item_image : require('../assets/Group 9 Copy.png'),
		sceneName:'Student',
	},
	{
		id: '5',
		title: '服務與協助',
		item_image : require('../assets/Group 8.png'),
		sceneName:'HelpAndService',
	},
	{
		id: '6',
		title: '意見反映',
		item_image : require('../assets/Group 6.png'),
		sceneName:'HelpAndService',
	},
];
const Item = ({ _this,title,item_image,sceneName }) => (
	<ImageBackground style={styles.MainMenuItemBackground}>
		<TouchableOpacity style={styles.button,{
			height: 87,
			width:Dimensions.get('window').width,
			marginStart: 0,
			marginTop:15,
		}} onPress={() => _this.props.navigation.navigate(sceneName)}>

		<View style={styles.container,{flex: 1, flexDirection: 'row'}}>
			<Image source={ item_image } style={styles.iconImage}></Image>
			<Text style={{
						position: 'absolute',
						top: -1,
						left : -1,
						marginTop: 30,
						marginLeft: 117,
						fontSize:18,
						color:'#FFFFFF'}}>
							{title}
			</Text>
		</View>
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
});
export default Page;