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
const Back_image = require('../assets/asdfdsf.png')

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
			DATA : [],
            //顯示啟動（剛下單未結帳）的訂單
            showOrderActive:true,

            //顯示取消的訂單
            showOrderCancel:false,

            //顯示已完成的訂單
            showOrderDone:false,
		}
	}
	componentDidMount()
	{
		this.getOrders();
	}
	getOrders()
	{
		var that = this;
		var _GroupList=[]
        this.setState({DATA : []});
		firebase.database().ref('/user'+"/" + global.username+ '/groupBuyItems').get().then((result) => {
            var orders = result.val();
            var i = 0;
            orders.forEach(e=>{
                this.state.DATA.push({
                    key : i.toString(),
                    seledtedSpec : e.seledtedSpec,
                    seledtedAmount : e.seledtedAmount,
                    price : e.price,
                    name : e.name,
                    orderID : e.orderID,
                    item_image : e.item_image,
                    status : e.status,
                })
                i++;
            })
            this.setState({DATA : this.state.DATA});
        });
	}
	render() {
		const renderItemActive = ({ item }) => (
			<Item   _this={this} 
                    seledtedSpec = {item.seledtedSpec}
                    seledtedAmount = {item.seledtedAmount}
                    price = {item.price}
                    name = {item.name}
                    orderID = {item.orderID}
                    item_image = {item.item_image}
                    status = {item.status}
                    //這次Flat List 要顯示的訂單為
                    showStatus = {'active'}
					/>
		);
        const renderItemCancel = ({ item }) => (
			<Item   _this={this} 
                    seledtedSpec = {item.seledtedSpec}
                    seledtedAmount = {item.seledtedAmount}
                    price = {item.price}
                    name = {item.name}
                    orderID = {item.orderID}
                    item_image = {item.item_image}
                    status = {item.status}
                    //這次Flat List 要顯示的訂單為
                    showStatus = {'cancel'}
					/>
		);
        const renderItemDone = ({ item }) => (
			<Item   _this={this} 
                    seledtedSpec = {item.seledtedSpec}
                    seledtedAmount = {item.seledtedAmount}
                    price = {item.price}
                    name = {item.name}
                    orderID = {item.orderID}
                    item_image = {item.item_image}
                    status = {item.status}
                    //這次Flat List 要顯示的訂單為
                    showStatus = {'done'}
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
                        flex:0.5,
                        width:50,
                    }}
                    onPress={()=>this.props.navigation.navigate('Profile')}
                    >
                        <View style={{
                                                justifyContent:'center',
                                                alignItems:'center',}}>
                            <Image source={require('../assets/leftArrow.png')}></Image>
                        </View>
                    </TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>購買清單</Text>
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
						}}>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 0.35,
							flexDirection: 'column',
							}}>
				<View style={{flex: 1,
								flexDirection: 'row',
								}}>
					<TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												zIndex:0,
                                                flex:1,
												alignContent:'center',
                                                borderBottomWidth:2,
                                                borderColor:this.state.showOrderActive==true?'#3FEEEA':'gray',
												width:100,
												height:40}}
												onPress={()=>this.setState({showOrderActive:true,
                                                                            showOrderCancel : false,
                                                                            showOrderDone : false,
                                                                        },()=>this.getOrders())}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showOrderActive==true?'#3FEEEA':'gray',textAlign:'center'}}>已選購</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												zIndex:0,
                                                flex:1,
                                                borderBottomWidth:2,
                                                borderColor:this.state.showOrderDone==true?'#3FEEEA':'gray',
												alignItems:'center',
												width:100,
												height:40}}
												onPress={()=>this.setState({showOrderActive:false,
                                                                            showOrderCancel : false,
                                                                            showOrderDone : true,
                                                                        },()=>this.getOrders())}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showOrderDone==true?'#3FEEEA':'gray',textAlign:'center'}}>訂單完成</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{marginTop:Dimensions.get('window').height*0.01,
												zIndex:0,
                                                flex:1,
                                                borderBottomWidth:2,
                                                borderColor:this.state.showOrderCancel==true?'#3FEEEA':'gray',
												alignItems:'center',
												width:100,
												height:40}}
												onPress={()=>this.setState({showOrderActive:false,
                                                                            showOrderCancel : true,
                                                                            showOrderDone : false,
                                                                        },()=>this.getOrders())}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showOrderCancel==true?'#3FEEEA':'gray',textAlign:'center'}}>已取消</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 3.7,
							zIndex:0,
							flexDirection: 'column',
							marginTop:0}}>
                    {this.state.showOrderActive==true?
                        <FlatList
                            style={{}}//backgroundColor:'#EBF0F3'}}
                            contentContainerStyle={{ marginTop: 0}}
                            data={this.state.DATA}
                            renderItem={renderItemActive}
                            keyExtractor={item => item.key.toString()}
                        />
                    :null}
                    {this.state.showOrderCancel==true?
                        <FlatList
                            style={{}}//backgroundColor:'#EBF0F3'}}
                            contentContainerStyle={{ marginTop: 0}}
                            data={this.state.DATA}
                            renderItem={renderItemCancel}
                            keyExtractor={item => item.key.toString()}
                        />
                    :null}
                    {this.state.showOrderDone==true?
                        <FlatList
                            style={{}}//backgroundColor:'#EBF0F3'}}
                            contentContainerStyle={{ marginTop: 0}}
                            data={this.state.DATA}
                            renderItem={renderItemDone}
                            keyExtractor={item => item.key.toString()}
                        />
                    :null}
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



const Item = ({ _this,
                name,
                price,
                seledtedSpec,
                seledtedAmount,
                orderID,
                item_image,
                status,
                showStatus
            }) => (
    //檢查訂單狀態
    <View>
    {status==showStatus?
        <View style={styles.container,{
            zIndex:0,
            padding:10,
            shadowOffset:{  width:WidthScale(0),  height:HeightScale(5)},
            shadowColor: 'black',
            shadowOpacity: 0.2,
            flex: 1}}>
                    <View style={styles.container,{zIndex:0,
                                                    padding:10,
                                                    flex: 0.7,
                                                    borderTopLeftRadius:10,
                                                    borderTopRightRadius:10,
                                                    backgroundColor:'white',
                                                    flexDirection:'column',
                                                    }}>

                        
                        <View style={{flexDirection:'row',flex:1,borderBottomWidth:2,borderColor:'#E2EBF6'}}>
                            <View style={{flex:0.3,
                                    justifyContent:'center',
                                }}>
                                <Text style={{
                                    fontSize:15,
                                    color:'black'}}>
                                    訂單編號 
                                </Text>
                            </View>
                            <View style={{flex:1,
                                    justifyContent:'center',
                                }}>
                                <Text style={{
                                    fontSize:18,
                                    textAlign:'left',
                                    color:'black'}}>
                                    #{orderID}
                                </Text>
                            </View>
                            <TouchableOpacity style={{  
                                                        height:HeightScale(40),
                                                        width:WidthScale(30),
                                                        justifyContent:'center',
                                                        flex:0.3}}
                                                onPress={function(){
                                                                    var _GroupList=[]
                                                                    var _DATA=[]
                                                                    var ref = firebase.database().ref('/user'+"/" + global.username);
                                                                    ref.child('/groupBuyItems').get().then((result) => {
                                                                        var orders = result.val();
                                                                        var i = 0;
                                                                        orders.forEach(e=>{
                                                                            if (e.orderID==orderID)
                                                                            {
                                                                                //如果是都顯示在已取消的訂單列表了，那就可以讓用戶刪除
                                                                                if (showStatus=='cancel')
                                                                                {
                                                                                    e.status = 'delete';
                                                                                }
                                                                                else
                                                                                {
                                                                                    e.status = 'cancel';
                                                                                }
                                                                            }
                                                                            //重建其他不需要取消訂單的Item
                                                                            else
                                                                            {
                                                                                _DATA.push({
                                                                                    key : i.toString(),
                                                                                    seledtedSpec : e.seledtedSpec,
                                                                                    seledtedAmount : e.seledtedAmount,
                                                                                    price : e.price,
                                                                                    name : e.name,
                                                                                    orderID : e.orderID,
                                                                                    item_image : e.item_image,
                                                                                    status : e.status,
                                                                                })
                                                                            }
                                                                            i++;
                                                                        })
                                                                        ref.update({
                                                                            groupBuyItems : orders
                                                                        });
                                                                        _this.setState({DATA : _DATA});
                                                                    });
                                                        }}
                                                        >
                                <Text style={{
                                                alignSelf:'flex-end',
                                                color:'#3BD2E4'}}>
                                        {showStatus=='cancel'?"刪除":"取消"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.8,flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{paddingTop:5}}>
                                    <Image source={ {uri : item_image} } style={{width:80,height:80}}></Image>
                                </View>
                                <View style={{  
                                            flex:1,
                                            padding:5,
                                            justifyContent:'center'}}>
                                    <View style={{  
                                            flex:1,
                                            justifyContent:'center'}}>
                                            <View style={{flex:0.2,marginTop:HeightScale(20)}}>
                                                <Text style={{
                                                    textAlign:'left',
                                                    fontSize:20,
                                                    color:'black'}}>
                                                        {name}
                                                </Text>
                                            </View>
                                            <View style={{flex:0.8,flexDirection:'row'}}>

                                                <View style={{  
                                                                flex:1,
                                                                justifyContent:'center'}}>
                                                    <Text style={{
                                                                    fontSize:10,
                                                                    color:'#3BD2E4'}}>$
                                                                        <Text style={{
                                                                            textAlign:'right',
                                                                            marginEnd:10,
                                                                            fontSize:20,
                                                                            color:'#3BD2E4'}}>
                                                                                {price}
                                                                            </Text>
                                                        </Text>
                                                    
                                                </View>
                                                <View style={{  
                                                                flex:0.5,
                                                                justifyContent:'center'}}>
                                                    <Text style={{
                                                                    textAlign:'center',
                                                                    color:'black'}}>
                                                            x{seledtedAmount}
                                                    </Text>
                                                </View>
                                                <View style={{  
                                                                flex:1,
                                                                justifyContent:'center'}}>
                                                    <Text style={{
                                                                    textAlign:'right',
                                                                    marginEnd:20,
                                                                    color:'black'}}>
                                                            {seledtedSpec}
                                                    </Text>
                                                    <Text style={{
                                                                    textAlign:'right',
                                                                    marginEnd:10,
                                                                    fontSize:15,
                                                                    color:'#3BD2E4'}}>$
                                                                        <Text style={{
                                                                            textAlign:'right',
                                                                            marginEnd:10,
                                                                            fontSize:20,
                                                                            color:'#3BD2E4'}}>
                                                                                {price * seledtedAmount}
                                                                        </Text>
                                                        </Text>
                                                </View>
                                            </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                                    zIndex:0,
                                    flex:0.3,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    height:HeightScale(55),
                                    backgroundColor : '#01C5DE',
                                    justifyContent:'center',
                                    }}>
                                        <Text style={{
                                                    textAlign:'right',
                                                    marginEnd:10,
                                                    fontSize:20,
                                                    color:'white'}}>
                                                        總共 : $
                                                        <Text style={{
                                                            textAlign:'right',
                                                            marginEnd:10,
                                                            fontSize:25,
                                                            color:'white'}}>
                                                                {price * seledtedAmount}
                                                            </Text>
                                        </Text>
                    </View>
        </View> 
    :null}
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