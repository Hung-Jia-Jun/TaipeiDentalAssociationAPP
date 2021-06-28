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
var dbRef = database.ref();
class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
            showClinic :true,
            showFood :false,
            showEvent :false,
            showProduct :false,

            //診所職缺那邊有HashTag要顯示
            clinicShowAll : true,
            clinicShowClinic : false,
            clinicShowJob : false,
            DATA : [],
        }
	}
	componentDidMount()
	{
        var _DATA=[]
		dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                var i=0;
                Object.keys(favoritesLi).forEach(key=>{
                    if (this.state.showClinic==true)
                    {
                        if (favoritesLi[key].type == "clinic")
                        {
                            favoritesLi[key].key=i.toString();
                            _DATA.push(favoritesLi[key]);
                            i++;
                        }
                    }
                })
            this.setState({DATA:_DATA});
            });
	}
    //篩選器
    showFilterResult(filter)
    {
       
        var _DATA=[]
        dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
            var favoritesLi = result.val();
            var i=0;
            Object.keys(favoritesLi).forEach(key=>{
                if (this.state.showClinic==true)
                {
                    filter.split(",").forEach(element => {
                        if (favoritesLi[key].type == element)
                        {
                            favoritesLi[key].key=i.toString();
                            _DATA.push(favoritesLi[key]);
                            i++;
                        }
                    });
                }
            })
        this.setState({DATA:_DATA});
        });
    }
	render() {
		const renderItem = ({ item }) => (
			<Item   _this={this} 
					item={item}
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
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>我的收藏</Text>
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
						onPress={()=>this.props.navigation.push('InviteGroupChat')}>
						<Image source={require('../assets/MessageBtn.png')}></Image>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 0.25,
							flexDirection: 'column',
							}}>
				<View style={{flex: 1,
                                justifyContent:'center',
								flexDirection: 'row',
								}}>
					<TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showClinic==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>this.setState({showClinic : true,showEvent:false,showFood : false , showProduct: false})}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showClinic==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>診所/職缺</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showFood==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>this.setState({showClinic : false,showEvent:false,showFood : true , showProduct: false})}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showFood==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>食衣住行</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showEvent==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>this.setState({showClinic : false,showEvent:true,showFood : false , showProduct: false})}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showEvent==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>活動</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showProduct==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>this.setState({showClinic : false,showEvent:false,showFood : false , showProduct: true})}>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showProduct==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>商品</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{flex: 3.7,
							zIndex:0,
							flexDirection: 'column',
							marginTop:0}}>
                {this.state.showClinic==true?
                    <View style={{
                                    flex: 0.05,
                                    marginTop:10,
                                    marginStart:30,
                                    flexDirection: 'row'}}>
                        <TouchableOpacity style={{
                                    flex: 0.15,
                                    marginEnd:15,
                                    borderRadius:5,
                                    borderWidth:1,
                                    backgroundColor:this.state.clinicShowAll==true?'rgba(67,209,227,0.15)':null,
                                    borderColor:'#43D1E3',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    }}
                                    onPress={()=>{
                                                    this.setState({clinicShowAll:true,clinicShowClinic:false,clinicShowJob:false});
                                                    this.showFilterResult("clinic,job");
                                                }}
                                    >
                            <Text style={{  
                                            fontSize:15,
                                            color :'#43D1E3',
                                            justifyContent:'center',
                                            textAlign:'center'}}># 全部</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                                    flex: 0.15,
                                    marginEnd:15,
                                    borderRadius:5,
                                    borderWidth:1,
                                    borderColor:'#43D1E3',
                                    backgroundColor:this.state.clinicShowClinic==true?'rgba(67,209,227,0.15)':null,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    }}
                                    onPress={()=>{
                                                    this.setState({clinicShowAll:false,clinicShowClinic:true,clinicShowJob:false});
                                                    this.showFilterResult("clinic");
                                                }}
                                    >
                            <Text style={{  
                                            fontSize:15,
                                            color :'#43D1E3',
                                            justifyContent:'center',
                                            textAlign:'center'}}># 診所</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                                    flex: 0.15,
                                    marginEnd:15,
                                    borderRadius:5,
                                    borderWidth:1,
                                    borderColor:'#43D1E3',
                                    backgroundColor:this.state.clinicShowJob==true?'rgba(67,209,227,0.15)':null,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    }}
                                    onPress={()=>{
                                                    this.setState({clinicShowAll:false,clinicShowClinic:false,clinicShowJob:true});
                                                    this.showFilterResult("job");
                                                }}
                                    >
                            <Text style={{  
                                            fontSize:15,
                                            color :'#43D1E3',
                                            justifyContent:'center',
                                            textAlign:'center'}}># 職缺</Text>
                        </TouchableOpacity>
                    </View>
                :null}
                <View style={{
                                flex: 0.95,
                                flexDirection: 'row'}}>
                    <FlatList
                        style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                        contentContainerStyle={{ padding:15,}}
                        data={this.state.DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />
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



const Item = ({ _this,item}) => (
    <TouchableOpacity style={styles.button,{
        height: 136,
        borderWidth:0,
        borderColor:'black',
        flexDirection:'column',
        padding:10,
        backgroundColor:'#FFF',
        marginBottom:8,
        borderRadius:5,
        shadowOffset:{  width:5,  height:5},
        shadowColor: 'black',
        shadowOpacity: 0.1,
        flex:1,
        }}>
        <View style={styles.container,{
                                        borderWidth:0,
                                        flex:0.7,
                                        flexDirection:'row',
                                        }}>
            <View style={styles.container,{
                                        flex: 0.3,
                                        borderWidth:0,
                                        padding:5,
                                        }}>
                <Image source={ require('../assets/DetailImage.png') } style={{
                                                                                width: '100%',
                                                                                height:'100%',
                                                                                }}></Image>
            </View>
            <View style={styles.container,{ flex: 0.7,
                                            padding:8,
                                            flexDirection: 'column'}}>      
                <View style={{
                                flex:0.4,
                                flexDirection:'row',
                                borderWidth:0,}}>
                    <View style={{flex:0.8}}>
                        <Text style={{
                            fontSize:20,
                            color:'black'}}>
                                {item.clinicName}
                        </Text>
                    </View>
                    <View style={{
                                flex:0.2,
                                borderRadius:10,
                                height:20,
                                backgroundColor:'rgba(1,197,222,0.15)',
                                justifyContent:'center',
                                alignContent:'center',
                                alignItems:'center',
                                }}>
                    <Text style={{
                            fontSize:13,
                            color:'#01C5DE'}}>
                                {item.education}
                    </Text>
                 </View>
                </View>
                <View style={{flex:0.3,borderWidth:0,}}></View>
                <View style={{flex:0.3,borderWidth:0,}}>
                    <Text style={{
                        fontSize:12,
                        color:'black'}}>
                            {item.phone}
                    </Text>
                </View>
            </View>
        </View>
        <View style={{
                        borderWidth:0,
                        flex:0.15,
                        padding:5,
        }}>
            <Text style={{
                    fontSize:13,
                    color:'black'}}>
                        {item.address}
            </Text>
        </View>
        <View style={{
                        borderWidth:0,
                        flex:0.15,
                        padding:5,
        }}>
            <Text style={{
                    fontSize:13,
                    color:'black'}}>
                        徵才資訊 : 
            </Text>
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