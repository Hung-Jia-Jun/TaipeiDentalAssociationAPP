import React, { Component } from "react";
import { Alert,Dimensions,SafeAreaView,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import Swiper from 'react-native-swiper'
import {Picker} from '@react-native-picker/picker';
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();




const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/AcademicEvents_icon/Footer.png')
const Back_image = require('../assets/asdfdsf.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DATA : [],
			showDetail : false,
			showAmountSelect : false,
			showSpecSelect : false,
			seledtedSpec : '規格',
			seledtedAmount : "數量",
			price : null,
			name : null,
			amount : null,
			item_image : null,
			showDescription:true,
			showModelInfo:false,
			showSpecInfo:false,
		}
	}
	componentDidMount()
	{
		this.setState({});

		var _DATA = [];
		_DATA = [{
					key: '0',
					description : this.props.navigation.getParam('manufacturerInformation'),
					model : this.props.navigation.getParam('model'),

					//型號資訊
					modelInfo : this.props.navigation.getParam('modelInfo'),

					//規格資訊
					specInfo : this.props.navigation.getParam('specInfo'),
				}];
				this.setState({	DATA:_DATA ,
								price : this.props.navigation.getParam('price'),
								spec : this.props.navigation.getParam('spec'),
								amount : this.props.navigation.getParam('amount'),
								name : this.props.navigation.getParam('name'),
								item_image : this.props.navigation.getParam('image'), 
								showDetail:true});
	}
	setSelectedAmount (value)
	{
		this.setState({seledtedAmount: value});
	}
	setSelectedSpec (value)
	{
		this.setState({seledtedSpec: value});
	}
	
	showScrollImage = (_this) => {
		const imageScrollViews = [];
		var i = 0;
		this.state.item_image.forEach(ele=>{
			imageScrollViews.push(
				<View key={i.toString()} style={styles.slide}>
				<Image source={ { uri: ele } } style={{
					width : WidthScale(350),
					height:HeightScale(350),
					resizeMode : 'center',
				}}></Image> 
			</View>
		)
		i++;
		});
		return imageScrollViews;
	}
	
	
	showSpecBtn = (_this) => {
		const scrollView = [];
		var i = 0;
		_this.state.spec.forEach(ele=>{
			scrollView.push(
				<Picker.Item key={ele.toString()} label={ele.toString()} value={ele.toString()} />
			)
			i++;
		})
		return scrollView;
	}
	addGroupBuyInfoToSelf = () =>
	{
		if (this.state.seledtedAmount == '數量')
		{
			Alert.alert(
				"提醒",
				"您尚未選擇數量",
			);
			return;
		}
		if (this.state.seledtedSpec == '規格')
		{
			Alert.alert(
				"提醒",
				"您尚未選擇規格",
			);
			return;
		}
		Alert.alert(
			"加入團購清單？",
			"名稱 : " + this.state.name + "\n" + 
			"單價 : " + this.state.price + "\n" + 
			"數量 : " + this.state.seledtedAmount + "\n" + 
			"規格 : " + this.state.seledtedSpec + "\n" + 
			"總計 : " + this.state.price * this.state.seledtedAmount + "\n" ,
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			},
			{ 
				text: "OK", 
				onPress: () => {
					firebase.database().ref('/user'+"/" + global.username).get().then((result) => {
						var ref = result.val();
						if (ref.groupBuyItems==undefined)
						{
							ref.groupBuyItems = []
						}
						var _orderID = new Date().getTime().toString();
						console.log(_orderID);
						ref.groupBuyItems.push({
												seledtedSpec : this.state.seledtedSpec,
												seledtedAmount : this.state.seledtedAmount,
												price : this.state.price,
												name : this.state.name,
												orderID : _orderID,
												item_image : this.state.item_image[0],
												});
						
						var GroupBuyRef = database.ref('/user'+"/" + global.username);
						GroupBuyRef.update({
							groupBuyItems : ref.groupBuyItems
						});
					},Alert.alert("完成","\n加入成功，請至購買清單查看詳情"));
					
				  }
			}
			]
		);
		
	}
	//產生數量的按鈕
	showAmountBtn = (_this) => {
		const scrollView = [];
		var i = 0;
		_this.state.amount.forEach(ele=>{
			scrollView.push(
				<Picker.Item key={ele.toString()} label={ele.toString()} value={ele.toString()} />
			)
			i++;
		})
		return scrollView;
	}
   render() {
	const renderItem = ({ item }) => (
		<Item   _this={this} description = {item.description}
				model = {item.model}
				spec = {item.spec}
				modelInfo = {item.modelInfo}
				specInfo = {item.specInfo}
				/>
	);
	return (
		<View style={{flex: 1, flexDirection: 'column'}}>
			<View style={{flex: 0.05,
							zIndex:1,
							flexDirection: 'row',
							justifyContent:'space-between',
							alignItems:'center',
							}}>
						<Text style={{fontSize:18,
										color:'white'}}>{this.props.navigation.getParam('title')}</Text>
						<TouchableOpacity style={styles.button,{
							height: 50,
							width:50,
							marginEnd: 20,
							marginTop:HeightScale(140),
							marginStart: Dimensions.get('window').width*0.02,
						}} onPress={()=>this.props.navigation.goBack()}>
							<View style={{flex:1,
											justifyContent:'center',
											alignItems:'center',}}>
								<Image source={Back_image}></Image>
							</View>
						</TouchableOpacity>
			</View>
			<View style={{flex:0.45,
								alignItems:'center',
								}}>
						{this.state.showDetail?
							<Swiper style={styles.wrapper} showsButtons={false}>
									{this.showScrollImage(this)}
							</Swiper>
						:null}
			</View>
			<View style={{flex: 0.19,
								backgroundColor:'#F4F9FD',
								borderBottomRightRadius:5,
								borderBottomLeftRadius:5,
								shadowOffset:{  width:WidthScale(0),  height:HeightScale(5)},
								shadowColor: 'black',
								shadowOpacity: 0.1,
								marginBottom:20,
								flexDirection: 'column',
								}}>
				<View style={{  flexDirection:'column',
								flex:1,
								marginTop:0,
								}}>
					<View style={{flexDirection:'row',flex:0.25}}>
						<Text style={{
							fontSize:14,
							marginTop:8,
							marginStart:35,
							color:'#3BD2E4'}}>
								$
						</Text>
						<Text style={{
							fontSize:23,
							marginStart:5,
							color:'#3BD2E4'}}>
								{this.state.price}
						</Text>
					</View>
					<Text style={{
						flex:0.2,
						fontSize:17,
						marginStart:35,
						color:'black'}}>
							{this.state.name}
					</Text>
					<Text style={{
						fontSize:17,
						flex:0.2,
						marginStart:35,
						color:'black'}}>
							數量
					</Text>
					<View style={{flexDirection:'row',flex:0.3}}>
						<TouchableOpacity style={{
												height: 35,		
												justifyContent:'center',	
												marginStart:35,
												marginEnd : 10,
												width:65,
												borderWidth:1,
												borderColor : 'gray',
												backgroundColor:'#FFF'}}
										onPress={()=>this.setState({showAmountSelect:!this.state.showAmountSelect,
																	showSpecSelect:false,
																	})}>
										<Text style={{paddingHorizontal:15,color:this.state.seledtedAmount=="數量"?'#A4B9CC' : 'black'}}>{this.state.seledtedAmount}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{
												height: 35,		
												justifyContent:'center',	
												marginStart:30,
												marginEnd : 10,
												width:70,
												borderWidth:1,
												borderColor : 'gray',
												backgroundColor:'#FFF'}}
										onPress={()=>this.setState({showSpecSelect:!this.state.showSpecSelect,
																	showAmountSelect:false,
																	})}>
										<Text style={{paddingHorizontal:10,textAlign:'center',color:this.state.seledtedSpec=="規格"?'#A4B9CC' : 'black'}}>{this.state.seledtedSpec}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={{flex: this.state.showAmountSelect==false && this.state.showSpecSelect==false?0.5:0.36,
								paddingLeft:5,
								paddingRight:5,
								flexDirection: 'row',
								}}>

				<View style={{flex: 1,
									flexDirection: 'column',
									shadowOffset:{  width:0,  height:5},
									shadowColor: 'black',
									shadowOpacity: 0.3,
									borderTopLeftRadius:10,
									borderTopRightRadius:10,
									backgroundColor:'#fff',
									}}>
					<View style={{	flex: this.state.showAmountSelect==false && this.state.showSpecSelect==false?0.1:0.2,
									flexDirection: 'row',
									}}>
						<TouchableOpacity style={{
													borderBottomWidth:2,
													borderBottomColor : this.state.showDescription?'#3FEEEA':'gray',
													alignContent:'center',
													justifyContent:'center',
													flex:1,
													height:35}}
													onPress={()=>this.setState({showDescription:true,
																				showModelInfo:false,
																				showSpecInfo:false})}>
							<Text style={{fontSize:15,color:this.state.showDescription?'#3FEEEA':'gray',textAlign:'center'}}>廠商資訊</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{
													zIndex:0,
													borderBottomWidth:2,
													borderBottomColor : this.state.showModelInfo?'#3FEEEA':'gray',
													alignItems:'center',
													flex:1,
													justifyContent:'center',
													height:35}}
													onPress={()=>this.setState({showDescription:false,
																				showModelInfo:true,
																				showSpecInfo:false})}>
							<Text style={{fontSize:15,color:this.state.showModelInfo?'#3FEEEA':'gray',textAlign:'center'}}>型號</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{
													zIndex:0,
													borderBottomWidth:2,
													borderBottomColor : this.state.showSpecInfo?'#3FEEEA':'gray',
													alignItems:'center',
													flex:1,
													justifyContent:'center',
													height:35}}
													onPress={()=>this.setState({showDescription:false,
																				showModelInfo:false,
																				showSpecInfo:true})}>
							<Text style={{fontSize:15,color:this.state.showSpecInfo?'#3FEEEA':'gray',textAlign:'center'}}>規格</Text>
						</TouchableOpacity>
					</View>
					<View style={{	flex: this.state.showAmountSelect==false && this.state.showSpecSelect==false?0.9:0.8,
									flexDirection: 'column',
									}}>
										
						<FlatList
							contentContainerStyle={{ marginTop: 0}}
							data={this.state.DATA}
							style={{backgroundColor:'#FFF'}}
							renderItem={renderItem}
							keyExtractor={item => item.key.toString()}
						/>
					</View>
				</View>
			</View>
			{this.state.showAmountSelect?
				<Picker selectedValue={this.state.seledtedAmount}
						style={{height:160}}
						onValueChange={(itemValue, itemIndex) =>
						this.setSelectedAmount(itemValue)}>
						{this.showAmountBtn(this)}
				</Picker>
			:null}
			{this.state.showSpecSelect?
				<Picker selectedValue={this.state.seledtedSpec}
						style={{height:160}}
						onValueChange={(itemValue, itemIndex) =>
						this.setSelectedSpec(itemValue)}>
						{this.showSpecBtn(this)}
				</Picker>
			:null}
			{this.state.showAmountSelect==false && this.state.showSpecSelect==false ?
				<View style={{flex: 0.1,
							backgroundColor:'#43D1E3',
							marginTop:HeightScale(-10),
								flexDirection: 'column',
								}}>
						
					<TouchableOpacity style={{
								backgroundColor:'#43D1E3',
								flexDirection: 'column',
								height:HeightScale(70),
								justifyContent:'center',
								}}
								onPress={()=>this.addGroupBuyInfoToSelf()}>
						<Text style={{textAlign:'center',fontSize:22,color:'white'}}>加入團購行列</Text>
					</TouchableOpacity>
				</View>
			:null}
		</View>
	);
  }
}


const Item = ({ _this,
				description,
				modelInfo,
				specInfo,
			}) => (
				<View style={{padding:15}}>
					{_this.state.showDescription?
						<Text style={{fontSize:15}}>{description}</Text>	
					:null}
					{_this.state.showModelInfo?
						<Text style={{fontSize:15}}>{modelInfo}</Text>
					:null}
					{_this.state.showSpecInfo?
						<Text style={{fontSize:15}}>{specInfo}</Text>
					:null}
				</View>
);


const styles = StyleSheet.create({
	wrapper: {},
	slide: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
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
export default Page;