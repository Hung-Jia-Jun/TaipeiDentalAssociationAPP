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
const dbRef = database.ref();
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
			showFilterList:false,
			DATA : [],
			Like : false,
		}
	}

	fetchDataFromFirebase()
    {
        var that = this;
        var _DATA = [];
        var _indexImage = [];
		
		dbRef.child('limitTimeGroupPurchaseProduct/item').on('value', function (snapshot) {
			var i=0;
			snapshot.forEach((childSnapshot) => {
				_DATA.push({   key:i.toString(),
                                name : childSnapshot.val().name,
                                price : childSnapshot.val().price,
                                amount : childSnapshot.val().amount,
                                manufacturerInformation : childSnapshot.val().manufacturerInformation,
                                model : childSnapshot.val().model,
                                spec : childSnapshot.val().spec,
                                image : childSnapshot.val().image,
                                sceneName : childSnapshot.val().sceneName,
                                modelInfo  : childSnapshot.val().modelInfo,
                                specInfo  : childSnapshot.val().specInfo,
								Like : false,
									})
				i+=1;
			});
			that.setState({DATA : _DATA,showDetail:true},()=>{
				that.setLikeStatus();
			})
		});
    }
    componentDidMount()
    {
        this.fetchDataFromFirebase();
    }
	setLikeStatus()
	{
		dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
			var favoritesLi = result.val();
			Object.keys(favoritesLi).forEach(key=>{
				if (favoritesLi[key].type=='dentalProcurement')
				{
					var i=0;
					this.state.DATA.forEach(e=>{
						if (favoritesLi[key].name == e.name)
						{
							this.state.DATA[i].Like=true
						}
						i+=1;
					})
				}
			});
			this.setState({DATA:this.state.DATA});
		});
	}
    showScrollImage = (_this) => {
        const imageScrollViews = [];
        var i = 0;
        _this.state.indexImage.forEach(e=>{
            imageScrollViews.push(
                <View key={i.toString()} style={styles.slide}>
                    <Image source={ { uri: e.uri } } style={{
                        width : WidthScale(315),
                        height:HeightScale(200),
                        resizeMode : 'contain',
                }}></Image> 
                </View>
            )
            i++;
        })
        return imageScrollViews;
    }
	onClickLike(item)
    {              
        var dbRef = database.ref();

        //代表原本沒有收藏，現在要收藏了
        if (item.Like == false)
        {
            //加入該用戶的收藏清單  
            dbRef.child("user").child(global.username).child('favoritesLi').push({
					name : item.name,
					price : item.price,
					image : item.image,
                    type:'dentalProcurement',
            });
			this.state.DATA.forEach(e=>{
				if (e.name == item.name)
				{
					e.Like=true;
				}
			this.setState({DATA:this.state.DATA});
			});
        }
        else
        {
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type=='dentalProcurement')
                    {
                        if (favoritesLi[key].name == item.name)
                        {
                            dbRef.child("user").child(global.username).child('favoritesLi').child(key).remove();
                        }
                    }
					this.state.DATA.forEach(e=>{
						if (e.name == item.name)
						{
							e.Like=false;
						}
					});
                });
				this.setState({DATA:this.state.DATA});
            });
        }
		
    }
	render() {
		const renderItem = ({ item }) => (
			<Item   _this={this} 
                    name = {item.name}
					item = {item}
                    price = {item.price}
                    amount = {item.amount}
                    manufacturerInformation = {item.manufacturerInformation}
                    model = {item.model}
                    spec = {item.spec}
                    image = {item.image}
                    sceneName = {item.sceneName}
                    modelInfo = {item.modelInfo}
                    specInfo = {item.specInfo}
					/>
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
						onPress={()=>this.props.navigation.push('MainMenu')}>
						<Image source={require('../assets/6516516516.png')}></Image>
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>牙材採購</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
					
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
												onPress={()=>this.props.navigation.push('LimitedTimeGroupPurchase')}>
						<Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>牙材採購</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												marginStart:Dimensions.get('window').width*0.2,
												zIndex:0,
												alignItems:'flex-end',
												width:100,
												height:40}}
												onPress={()=>this.props.navigation.push('LimitedTimeGroupPurchase')}>
						<Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center'}}>限時團購</Text>
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
			<View style={{flex: 4,
							zIndex:0,
							flexDirection: 'column',
							marginTop:0}}>
				<FlatList
					style={{marginTop:5,marginStart:8}}//backgroundColor:'#EBF0F3'}}
                    contentContainerStyle={{}}
					data={this.state.DATA}
					renderItem={renderItem}
                    numColumns={2}
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




const Item = ({ _this,
				item,
                name,
                price,
                amount,
                image,
                manufacturerInformation,
                model,
                spec,
                modelInfo,
                specInfo,
                sceneName,
            }) => (
        <TouchableOpacity style={{
            }} onPress={() => _this.props.navigation.push(sceneName,{   name : name,
                                                                        price : price,
                                                                        amount : amount,
                                                                        image : image,
                                                                        manufacturerInformation : manufacturerInformation,
                                                                        model : model,
                                                                        spec : spec,
                                                                        modelInfo : modelInfo,
                                                                        specInfo : specInfo,
                                                                    })}>
            <View style={{  
                            height:230,
                            width:Dimensions.get('window').width*0.47,
                            shadowOffset:{  width:WidthScale(0),  height:HeightScale(5)},
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            borderRadius:10,
                            marginEnd:8,
                            marginBottom:10,
                            flex:1,
                            backgroundColor:'#FFFFFF',
                            }}>
                <View style={styles.container,{flex: 0.8,
                                                justifyContent:'center',
                                                alignItems:'center',
                                            }}>
                    <Image source={ { uri : image[0] }  } style={{
                                                                width : WidthScale(130),
                                                                height:HeightScale(130),
                                                                resizeMode : 'contain',
                                                        }}></Image>
                </View>
                <View style={styles.container,{flex: 0.2, 
                                                flexDirection: 'column',
                                                backgroundColor:'#F4F9FD',
                                                paddingLeft:20,
                                                paddingBottom:20,
                                                justifyContent:'center',
                                                borderBottomRightRadius:10,
                                                borderBottomLeftRadius:10,
                                                }}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.65}}>
							<Text style={{
								fontSize:14,
								marginTop:8,
								color:'#3BD2E4'}}>
									$
								<Text style={{
									fontSize:23,
									color:'#3BD2E4'}}>
										{price}
								</Text>
							</Text>
						</View>
						<View style={{
							flex:0.3,
							flexDirection:'column',
                                }}>
							<TouchableOpacity style={{
								flex:1,
								justifyContent:'center',
							}}
							onPress={()=>_this.onClickLike(item)}
							>
								<View style={{
									alignItems:'center',
								}}>
									{item.Like==true?
										<Image source={require('../assets/GrayLike_Fill.png')}
										style={{
												resizeMode:'stretch',
												width:25,
												height:25,
											}}
										></Image>
									:
										<Image source={require('../assets/GrayLike.png')}
												style={{
														resizeMode:'stretch',
														width:25,
														height:25,
													}}
										></Image>
									}
								</View>
							</TouchableOpacity>
						</View>
                    </View>
                    <Text style={{
                        fontSize:17,
                        color:'black'}}>
                            {name}
                    </Text>
                </View>
            </View> 
        </TouchableOpacity>
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