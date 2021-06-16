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
            showCards : false,
            //個人名片List
			cardList : [
			  
			],
			DATA : [],
		}
	}
	componentDidMount()
	{
		this.updateCardList();
	}
	updateCardList()
	{
		var that = this;
        that.setState({cardList:[],showCards:false},()=>{
            var ref = firebase.database().ref('/user'+"/" + global.username+ '/businessCard');
            ref.on('value', function (snapshot) {
                var _cardList=[]
                // 先清空舊有的聊天室通知列表
                var i=0;
                var _experienceList = []
                var _educationList = []
                snapshot.forEach((childSnapshot) => {
                    //個人名片的資訊
                    var carInfo = childSnapshot.val();
                    
                    _experienceList = that.rebuildCardKey(carInfo.experienceList);
                    _educationList = that.rebuildCardKey(carInfo.educationList);
                
                
                    _cardList.push({    key:i.toString(),
                                        id : carInfo.id,
                                        businessCardName : carInfo.businessCardName,
                                        experienceList : _experienceList,
                                        educationList : _educationList,
                                        })
                    i+=1;
                });
                // that.setState({cardList:_cardList});
                that.setState({cardList:_cardList}, () => that.setState({showCards:true}));
            });
        })
	}

    //因為要重建key不然沒辦法顯示
    rebuildCardKey(arr)
	{
        var that = this;
        var _arr = [];
        var i=0;
        if (arr==undefined)
        {
            return null;
        }
        arr.forEach(e=>{
            _arr.push({
                            key: i.toString(),
                            placeholderText: '學歷',
                            value:e.value,
            });
            i++;
        })
        return _arr;
	}

	showCardsDetail(arr)
	{
        var that = this;
        var textList = [];
        var i=0;
        if (arr==undefined)
        {
            return null;
        }
        Object.values(arr).forEach(card=>{
            textList.push(
                <Text style={{
                    // key : i.toString(),
                    color:'#FFF',
                    fontSize:18,
                    marginBottom:3,
                }}>
                    {card.value}
                </Text>
            )
            i++;
        })
        return textList;
	}
	render() {
		const renderItem = ({ item }) => (
			<Item _this={this} item={item}/>
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
                    alignItems:'flex-start'}}>
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
                         <TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							width:50,
						}} 
						onPress={()=>this.props.navigation.navigate('EditBusinessCard')}>
						<Text style={{  fontSize:35,
                                        color:'#FFF',
                                        justifyContent:'center',
                                        alignContent:'center'}}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 3.7,
							zIndex:0,
							flexDirection: 'column',
							marginTop:0}}>
					<View style={{flex: 0.05,
                                    }}>
			        </View>
                    {this.state.cardList.length>0 & this.state.showCards==true?
                        <View style={{
                                        }}>
                            <FlatList
                                style={{}}//backgroundColor:'#EBF0F3'}}
                                contentContainerStyle={{ marginTop: 0}}
                                data={this.state.cardList}
                                renderItem={renderItem}
                                extraData={this.state}
                                keyExtractor={item => item.key.toString()}
                                />
                        </View>
                    :   <TouchableOpacity style={{flex: 0.4,
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
                    }
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



const Item = ({ _this,item}) => (
    <TouchableOpacity style={{flex: 1}}
    onPress={()=>_this.props.navigation.navigate('EditBusinessCard',{cardId:item.id})}
    style={{flexDirection:'column', 
    shadowOffset:{  width:4,  height:4},
    shadowColor: 'black',
    shadowOpacity: 0.2}}
    >
        <ImageBackground source={require('../assets/busniessCardBackground.png')}
                style={{
                    marginEnd:WidthScale(20),
                    marginStart : WidthScale(15),
                    marginTop:HeightScale(40),
                    borderRadius:10,
                    padding:10,
                    overflow: 'hidden',
                }}>
                <View style={{
                        flexDirection:'row',
                        borderColor:'#FFF',
                        paddingBottom:10,
                        borderBottomWidth:2,
                }}>
                    <Image source={{uri : global.userIcon}} 
                            style={{
                                borderWidth:3,
                                height:60,
                                width:60,
                                borderRadius:100,
                                borderColor:'#FFF',
                                marginEnd:20,
                                resizeMode:'contain',
                            }}    
                            ></Image>
                    <View style={{
                        flexDirection:'column',
                        justifyContent:'center',
                        marginEnd:WidthScale(150),
                    }}>
                        <Text style={{
                            color:'#FFF',
                            fontSize:18,
                        }}>{item.businessCardName}</Text>
                    </View>

                    <View style={{
                        flexDirection:'column',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            color:'#FFF',
                            fontSize:15,
                        }}>{global.birthday}</Text>
                    </View>
                </View>
                <View style={{
                        flexDirection:'column',
                        flex:1,
                        marginTop:10,
                }}>
                    <View style={{
                        flex:1,
                        marginTop:5,
                        flexDirection:'row',
                    }}>
                        <Text style={{
                            color:'#FFF',
                            fontSize:18,
                        }}>學歷 : </Text>

                        <View style={{
                            flex:1,
                            marginStart:15,
                            flexDirection:'column',
                        }}>
                        {
                            _this.showCardsDetail(item.educationList)
                        }
                        </View>
                    </View>

                    <View style={{
                        flex:1,
                        marginTop:5,
                        flexDirection:'row',
                    }}>
                        <Text style={{
                            color:'#FFF',
                            fontSize:18,
                        }}>經歷 : </Text>

                        <View style={{
                            flex:1,
                            marginStart:15,
                            flexDirection:'column',
                        }}>
                        {
                            _this.showCardsDetail(item.experienceList)
                        }
                        </View>
                    </View>
                </View>
        </ImageBackground>
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