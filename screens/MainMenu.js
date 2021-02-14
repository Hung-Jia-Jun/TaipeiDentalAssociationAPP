import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';

const image = require('../assets/b-主選單.png');

const mainmanuTopper_image = require('../assets/MainmanuTopper.png');
const footer_image = require('../assets/Footer.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size
const checkHaveDetailAndShow = (_this,item) => {
	switch (item.title) {
		case "學術活動":
			if (_this.state.academicEventsShowDetail)
			{
				item.showDetail = true
				return 200
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		case "牙材選購":
			if (_this.state.dentalGroupPurchaseShowDetail)
			{
				item.showDetail = true
				return 150
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		case "牙醫學生":
			if (_this.state.studentShowDetail)
			{
				item.showDetail = true
				return 150
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		case "服務與協助":
			if (_this.state.helpAndServiceShowDetail)
			{
				item.showDetail = true
				return 150
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		default:
			return 87
			break;
	}
}

class Page extends Component {
	constructor(props) {
        super(props);
        this.state = {
			//定義好主選單的四個控制變量
            studentShowDetail: false,
			academicEventsShowDetail : false,
			dentalGroupPurchaseShowDetail : false,
			helpAndServiceShowDetail : false,
            subTitle: "學生系學會",
        }
    } 
	onclickMainMenuItem = (_this,item,sceneName)=>
	{
		if (item.haveDetail == true)
		{
			switch (item.title) {
				case "學術活動":
					_this.setState({academicEventsShowDetail :  _this.state.academicEventsShowDetail ? false : true});
					break;
				case "牙材選購":
					_this.setState({dentalGroupPurchaseShowDetail :  _this.state.dentalGroupPurchaseShowDetail ? false : true});
					break;
				case "牙醫學生":
					_this.setState({studentShowDetail :  _this.state.studentShowDetail ? false : true});
					break;
				case "服務與協助":
					_this.setState({helpAndServiceShowDetail :  _this.state.helpAndServiceShowDetail ? false : true});
					break;
				default:
					return 87
					break;
			}
		}
		//_this.props.navigation.navigate(sceneName);
		
	}
	showSubtitle = (item) => {
			const textList = [];
			console.log(textList);
			item.subTitle.forEach(element => {
				textList.push(
					<View style={{height:30}}>
						<View style={{height:50}}>
						</View>
						<View style={{height:30}}>
							<Text style={{
								position: 'absolute',
								top: HeightScale(-1),
								left : WidthScale(-1),
								marginTop: HeightScale(30),
								marginLeft: WidthScale(37),
								fontSize:18,
								color:'#F7F7F7'}}>
									{element}
							</Text>
						</View>
					</View>
					
				)
			})
			
			return textList;
	}
  render() {
	const renderItem = ({ item }) => (
		<Item 	_this={this}
				item={item}
				id={item.id}
				subTitle={item.subTitle}
				title={item.title}
				item_image={item.item_image}
				sceneName={item.sceneName} />
	);

	return (
		<View style={styles.container,{flex: 4, flexDirection: 'column'}}>
			<View style={{flexDirection: 'column',zIndex: 1}}>
                    <Image source={mainmanuTopper_image} style={
                                        {marginTop: height < guidelineBaseHeight ? HeightScale(0) : HeightScale(0),
                                        resizeMode:'stretch',
                                        width:width}}></Image>
			</View>
			<View style={{flex: 0.01,zIndex:2, flexDirection: 'column',
								marginTop:HeightScale(20)}}>
					<Text style={{
								color:'black',
								fontSize:20,
								textAlign:'center',
								marginTop:height < guidelineBaseHeight ? HeightScale(-110) : HeightScale(-110),
							}}>主選單</Text>
			</View>
			<View style={{marginTop:HeightScale(-250),flex: 8.9, flexDirection: 'column'}}>
				<FlatList
					contentContainerStyle={{ marginTop: height < guidelineBaseHeight ? HeightScale(210) : HeightScale(210)}}
					data={DATA}
					backgroundColor={'#43D1E3'}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			</View>
			<View style={styles.borderBlackLine,{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={styles.borderBlackLine,
                                                        {marginStart:WidthScale(0),
                                                        marginTop:height < guidelineBaseHeight ? HeightScale(-50) : HeightScale(-20),
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
		haveDetail : false,
		showDetail : false,
		subTitle : null,
		item_image : require('../assets/MainManu13.png'),
		sceneName:'Announcement',
	},
	{
		id: '1',
		title: '學術活動',
		haveDetail : true,
		showDetail : false,
		subTitle : ['學術活動\n',
					'活動報名\n',
					'填寫問卷\n'],
		item_image : require('../assets/MainManu11.png'),
		sceneName:'AcademicEvents',
	},
	{
		id: '2',
		title: '牙材選購',
		haveDetail : true,
		showDetail : false,
		subTitle : ['特價團購\n',
					'牙材選購\n'],
		item_image : require('../assets/MainManu10.png'),
		sceneName:'DentalGroupPurchase',
	},
	{
		id: '3',
		title: '人力交流',
		haveDetail : false,
		showDetail : false,
		subTitle : null,
		item_image : require('../assets/MainManu7.png'),
		sceneName:'ClinicRecruitmentHumanSupport',
  	},
	{
		id: '4',
		title: '牙醫學生',
		haveDetail : true,
		showDetail : false,
		subTitle : ['學生系學會'],
		item_image : require('../assets/MainManu9.png'),
		sceneName:'Student',
	},
	{
		id: '5',
		title: '服務與協助',
		haveDetail : true,
		showDetail : false,
		subTitle : ['民代服務區\n',
				'健保申覆協助區\n',
				'開業疑難排解區\n'],
		item_image : require('../assets/MainManu8.png'),
		sceneName:'HelpAndService',
	},
	{
		id: '6',
		title: '意見反映',
		haveDetail : false,
		showDetail : false,
		subTitle : null,
		item_image : require('../assets/MainManu6.png'),
		sceneName:'HelpAndService',
	},
];
const Item = ({ _this,item,title,item_image,sceneName,subTitle}) => (
	<ImageBackground style={{
		width:Dimensions.get('window').width,
		borderRadius: 1 ,
		borderWidth:1,
		borderColor:'#00A6B8',
		shadowOffset:{  width:WidthScale(0),  height:HeightScale(5)},
		shadowColor: 'black',
		shadowOpacity: 0.3,
		backgroundColor: '#43D1E3',
	}}>
		<TouchableOpacity style={styles.button,{
			height : checkHaveDetailAndShow(_this,item),
			width:Dimensions.get('window').width,
			marginStart: 0,
			marginTop:15,
			zIndex:2,
		}} onPress={() => _this.onclickMainMenuItem(_this,item,sceneName)}>
			<View style={styles.container,{zIndex:0,
										flex: 1,
										// borderWidth:1,
										// borderColor:'black',
										flexDirection: 'row',
										height:HeightScale(80),
										marginTop:HeightScale(0)}}>
			<Image source={ item_image} style={{width:WidthScale(50),
												height: height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
												marginStart: WidthScale(30),
												marginTop:HeightScale(10),
												justifyContent: 'center'}}></Image>
			<Text style={{
						position: 'absolute',
						top: HeightScale(-1),
						left : WidthScale(-1),
						marginTop: HeightScale(30),
						marginLeft: WidthScale(117),
						fontSize:18,
						color:'#FFFFFF'}}>
							{title}
			</Text>
			{item.showDetail ?
					<View>
						{
							_this.showSubtitle(item)
						}
					</View>
				:null}
			
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