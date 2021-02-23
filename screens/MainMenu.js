import React, { Component } from 'react';
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from 'react-native';

const image = require('../assets/b-主選單.png');

const mainmanuTopper_image = require('../assets/MainmanuTopper.png');
const footer_image = require('../assets/Footer_blank.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size
const checkHaveDetailAndShow = (_this,item,isOnTopItem) => {
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
		case "牙材採購":
			if (_this.state.dentalGroupPurchaseShowDetail)
			{
				item.showDetail = true
				return 179
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		case "牙醫學生專區":
			if (_this.state.studentShowDetail)
			{
				item.showDetail = true
				return 185
			}
			else
			{
				item.showDetail = false
				return 87
			}
			break;
		case "校友服務":
			if (_this.state.helpAndServiceShowDetail)
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
			//當選中該物件，他要讓其他物件向下推多少
			itemMarginTop:15,
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
				case "牙材採購":
					_this.setState({dentalGroupPurchaseShowDetail :  _this.state.dentalGroupPurchaseShowDetail ? false : true});
					break;
				case "牙醫學生專區":
					_this.setState({studentShowDetail :  _this.state.studentShowDetail ? false : true});
					break;
				case "校友服務":
					_this.setState({helpAndServiceShowDetail :  _this.state.helpAndServiceShowDetail ? false : true});
					break;
				default:
					_this.props.navigation.navigate(sceneName);
					break;
			}
		}
		else
		{
			_this.props.navigation.navigate(sceneName);
		}
	}
	showSubtitle = (_this,item) => {
			const textList = [];
			item.subTitle.forEach(element => {
				textList.push(
					<TouchableOpacity style={{
							zIndex:2,
							height : 40,
							width:400,
							marginStart: 0,
							top:60,
						}} onPress={() =>_this.props.navigation.navigate(item.sceneName)}>
						<Text style={{
							position: 'absolute',
							marginTop: HeightScale(7),
							marginLeft: WidthScale(37),
							fontSize:18,
							height:25,
							color:'#F7F7F7'}}>
								{element}
						</Text>
					</TouchableOpacity>
				)
			})
			textList.push(
			)
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
			<View style={{marginTop:HeightScale(-170),
								flex: 8.9,
								flexDirection: 'column',
								}}>
				<FlatList
					contentContainerstyle={{marginTop: height < guidelineBaseHeight ? HeightScale(400) : HeightScale(400)}}
					data={DATA}
					backgroundColor={'#43D1E3'}
					renderItem={renderItem}
					ListHeaderComponentStyle={{height:100}}
					ListHeaderComponent={() => <View style={{height:180}}></View>}
					keyExtractor={item => item.id}
					// ListFooterComponentstyle={{height:0}}
					// style={{flex: 1}}
					// ListFooterComponent={() => <View style={{height:0}}></View>}
				/>
			</View>
			{/* <View style={styles.borderBlackLine,{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={styles.borderBlackLine,
                                                        {marginStart:WidthScale(0),
                                                        marginTop:height < guidelineBaseHeight ? HeightScale(-50) : HeightScale(-20),
                                                        width:width}}></Image>
			</View> */}
			<View style={{flex: 1,
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
		subTitle : ['活動資訊\n',
					'活動報名\n',
					'問卷調查\n'],
		item_image : require('../assets/MainManu11.png'),
		sceneName:'AcademicEvents',
	},
	{
		id: '2',
		title: '牙材採購',
		haveDetail : true,
		showDetail : false,
		subTitle : ['限時團購\n',
					'跳蚤市場\n'],
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
		id: '5',
		title: '校友服務',
		haveDetail : true,
		showDetail : false,
		subTitle : ['意見投書\n',
				'健保問題\n',
				'開業問題\n'],
				// '民代服務區\n'],
		item_image : require('../assets/MainManu8.png'),
		sceneName:'HelpAndService',
	},
	{
		id: '4',
		title: '牙醫學生專區',
		haveDetail : true,
		showDetail : false,
		subTitle : ['系學會公告','活動資訊','聊天室'],
		item_image : require('../assets/MainManu9.png'),
		sceneName:'Student',
	},
	
	{
		id: '6',
		title: 'APP問題回報',
		haveDetail : false,
		showDetail : false,
		subTitle : null,
		item_image : require('../assets/MainManu6.png'),
		sceneName:'HelpAndService',
	}
];
const Item = ({ _this,item,title,item_image,sceneName,subTitle}) => (
	//如果是要點下去往下推的話，復用這個function
	<View style={{marginBottom:0}}>
		<ImageBackground style={{
			width:Dimensions.get('window').width,
			borderRadius: 1 ,
			borderWidth:1,
			height:checkHaveDetailAndShow(_this,item,false),
			borderColor:'#00A6B8',
			shadowOffset:{  width:WidthScale(0),  height:HeightScale(5)},
			shadowColor: 'black',
			shadowOpacity: 0.3,
			zIndex:0,
			backgroundColor: '#43D1E3',
		}}>
			<TouchableOpacity style={{
				height : 60,
				width:Dimensions.get('window').width,
				marginStart: 0,
				marginTop:50,
				zIndex:2,
			}} onPress={() => _this.onclickMainMenuItem(_this,item,sceneName)}>
				<View style={{zIndex:0,
								flex: 1,
								flexDirection: 'row',
								height:HeightScale(80),
								marginTop:HeightScale(-40)}}>
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
								height:25,
								color:'#FFFFFF'}}>
									{title}
					</Text>
					{item.showDetail ?
						<View style={{height:10}}>
						{
							_this.showSubtitle(_this,item)
						}
						</View>
				:null}
				</View>	
			</TouchableOpacity>
		</ImageBackground>
	</View>
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