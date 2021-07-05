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
var dbRef = database.ref();

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
            showClinic :true,
            showFood :false,
            showEvent :false,
            showProduct :false,

            //診所職缺那邊有HashTag要顯示
            clinicShowClinic : true,
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
                        if (this.state.clinicShowClinic==true)
                        {
                            if (favoritesLi[key].type == "clinic")
                            {
                                favoritesLi[key].key=i.toString();
                                _DATA.push(favoritesLi[key]);
                                i++;
                            }
                        }
                        if (this.state.clinicShowJob==true)
                        {
                            if (favoritesLi[key].type == "job")
                            {
                                favoritesLi[key].key=i.toString();
                                _DATA.push(favoritesLi[key]);
                                i++;
                            }
                        }
                        
                    }
                })
            this.setState({DATA:_DATA});
            });
        this.showFilterResult("clinic");   
	}
    //篩選器
    showFilterResult(filter)
    {
       
        var _DATA=[]
        this.setState({DATA:[]},()=>{
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                var i=0;
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type == filter)
                    {
                        favoritesLi[key].key=i.toString();
                        _DATA.push(favoritesLi[key]);
                        i++;
                    }
                })
            this.setState({DATA:_DATA});
            });
        });
    }
	render() {
		const renderItem = ({ item }) => (
			<Item   _this={this} 
					item={item}
					/>
		);
        const renderJobItem = ({ item }) => (
			<JobItem _this={this} 
					item={item}
					/>
		);
        const renderEventItem = ({ item }) => (
			<EventItem _this={this} 
					item={item}
					/>
		);
        const renderProductItem = ({ item }) => (
			<ProductItem _this={this} 
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
												onPress={()=>{
                                                                this.setState({showClinic : true,showEvent:false,showFood : false , showProduct: false,showEvent : false},()=>{
                                                                    if (this.state.clinicShowClinic)
                                                                    {
                                                                        this.showFilterResult("clinic");    
                                                                    }
                                                                    else
                                                                    {
                                                                        this.showFilterResult("job");    
                                                                    }
                                                                });
                                                            }
                                                            }>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showClinic==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>診所/職缺</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showFood==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>{
                                                                this.setState({showClinic : false,showEvent:false,showFood : true , showProduct: false,showEvent : false});
                                                                this.showFilterResult();    
                                                            }
                                                            }>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showFood==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>食衣住行</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showEvent==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>{
                                                                this.setState({showClinic : false,showEvent:true,showFood : false , showProduct: false,showEvent : true});
                                                                this.showFilterResult("academicEvent");    
                                                            }
                                                            }>
						<Text style={{marginTop:12,fontSize:15,color:this.state.showEvent==true?'#43D1E3':'#5C6A6C',textAlign:'center'}}>活動</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{
												zIndex:0,
												alignContent:'flex-start',
                                                borderBottomWidth:3,
                                                borderColor:this.state.showProduct==true?'#43D1E3':'#E2EBF6',
												width:100,
												height:40}}
												onPress={()=>{
                                                                this.setState({showClinic : false,showEvent:false,showFood : false , showProduct: true,showEvent : false});
                                                                this.showFilterResult("dentalProcurement");    
                                                            }
                                                            }>
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
                                    borderColor:'#43D1E3',
                                    backgroundColor:this.state.clinicShowClinic==true?'rgba(67,209,227,0.15)':null,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    }}
                                    onPress={()=>{
                                                    this.setState({clinicShowClinic:true,clinicShowJob:false});
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
                                                    this.setState({clinicShowClinic:false,clinicShowJob:true});
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
                {this.state.clinicShowClinic}
                <View style={{
                                flex: 0.95,
                                flexDirection: 'column'}}>
                    
                        {this.state.clinicShowClinic==true&this.state.showClinic==true?
                            <FlatList
                                style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                                contentContainerStyle={{ padding:15,}}
                                data={this.state.DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.key}
                            />
                        :null}
                        {this.state.clinicShowJob==true&this.state.showClinic==true?
                            <FlatList
                                style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                                contentContainerStyle={{ padding:15,}}
                                data={this.state.DATA}
                                renderItem={renderJobItem}
                                keyExtractor={item => item.key}
                            />
                        :null}
                        {this.state.showEvent==true?
                            <FlatList
                                style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                                contentContainerStyle={{ padding:15,}}
                                data={this.state.DATA}
                                renderItem={renderEventItem}
                                keyExtractor={item => item.key}
                            />
                        :null}
                         {this.state.showProduct==true?
                            <FlatList
                                style={{zIndex:0,marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                                contentContainerStyle={{ padding:15,}}
                                data={this.state.DATA}
                                renderItem={renderProductItem}
                                keyExtractor={item => item.key}
                            />
                        :null}
                    
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
        }}
        onPress={() => {
            _this.props.navigation.push('OverviewMap',{passMarker:item,zoomLevel:18});
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
                {/* TODO 診所圖片要動態 */}
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
                                {item.title}
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
                        {item.detailAddress}
            </Text>
        </View>
        {/* TODO 要做徵才資訊的顯示 */}
        <View style={{
                        borderWidth:0,
                        flex:0.15,
                        padding:5,
        }}>
            <Text style={{
                    fontSize:13,
                    color:'black'}}>
                        徵才資訊 : 無
            </Text>
        </View>
    </TouchableOpacity>
);


const JobItem = ({ _this,item}) => (
    <TouchableOpacity style={styles.button,{
        height: 100,
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
        }}onPress={() => _this.props.navigation.push('ClinicRecruitmentDetail',{item:item})}>
        <View style={styles.container,{
                                        borderWidth:0,
                                        flex:1,
                                        flexDirection:'row',
                                        }}>
            <View style={styles.container,{
                                        flex: 0.3,
                                        borderWidth:0,
                                        padding:5,
                                        }}>
                {/* TODO 職缺圖片要動態 */}
                <Image source={ require('../assets/DetailImage.png') } style={{
                                                                                width: '100%',
                                                                                height:'100%',
                                                                                }}></Image>
            </View>
            <View style={styles.container,{ flex: 0.7,
                                            flexDirection: 'column'}}>      
                <View style={{
                                flex:0.4,
                                flexDirection:'row',
                                borderWidth:0,}}>
                    <View style={{flex:0.8}}>
                        <Text style={{
                            fontSize:20,
                            color:'black'}}>
                                {item.publishClinicName}
                        </Text>
                    </View>
                    <View style={{
                                flex:0.2,
                                borderRadius:10,
                                height:20,
                                backgroundColor:item.clinicPGYType=="是"?'rgba(222, 142, 1, 0.15)':null,
                                justifyContent:'center',
                                alignContent:'center',
                                alignItems:'center',
                                }}>
                    <Text style={{
                            fontSize:13,
                            color:item.clinicPGYType=="是"?'#F5A623':null}}>
                                {item.clinicPGYType=="是"?"PGY":null}
                    </Text>
                 </View>
                </View>
                <View style={{flex:0.3,borderWidth:0,}}>
                    <Text style={{
                        fontSize:16,
                        color:'gray'}}>
                            {item.doctorType}
                    </Text>
                </View>
                <View style={{
                            flex:0.3,
                            flexDirection:'row',
                            alignItems:'center',
                            }}>
                    <View style={{
                        flexDirection:'row',
                        flex:0.5,
                    }}>
                        <Image source={require('../assets/doctorIcon.png')}
                                style={{
                                        width:18,
                                        height:18,
                                        resizeMode:'contain',
                                        alignSelf:'center',
                                    }}
                                    ></Image>
                        <Text style={{
                                    marginStart:10,
                                    fontSize:15,
                                    textAlign:'center',
                                    color:'#5C6A6C'
                                    }}>
                            {item.numberOfPeople}
                        </Text>
                        <Text style={{
                                    marginStart:15,
                                    fontSize:18,
                                    color:'#01C5DE',
                                    textAlign:'center',

                                    }}>
                            {item.jobTypeText}
                        </Text>
                    </View>
                    <View style={{
                                    flex:0.5,
                                    alignItems:'flex-end',
                                }}>
                        <Text style={{
                                    fontSize:18,
                                    color:'gray',
                                    }}>
                            {item.publishDate}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

//活動收藏
const EventItem = ({ _this,item}) => (
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
        }}
        onPress={()=>_this.props.navigation.push(item.sceneName,{
            subDescription : item.description,
            subPageImage : item.item_image,
            subTitle : item.subTitle,
            title : item.title,
            date : item.date,
            sceneName: item.sceneName,
            })}>
        <View style={styles.container,{
                                        borderWidth:0,
                                        flex:1,
                                        flexDirection:'row',
                                        }}>
            <View style={styles.container,{
                                        flex: 0.3,
                                        borderWidth:0,
                                        padding:10,
                                        }}>
                <Image source={ {uri:item.item_image[0]} } style={{
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
                                {item.title}
                        </Text>
                    </View>
                </View>
                <View style={{flex:0.3,borderWidth:0,}}></View>
                <View style={{flex:0.3,borderWidth:0,flexDirection:'row'}}>
                    <Image source={require('../assets/AcademicEvents_icon/meeting.png')}
                        style={{
                            width: "8%",
                            height: "65%",
                            resizeMode:'stretch',
                            marginEnd:10,
                        }}
                        ></Image>
                    <Text style={{
                        fontSize:15,
                        color:'#43D1E3'}}>
                            {item.date}
                    </Text>
                    <TouchableOpacity style={styles.button,{
                            height: 50,
                            flex:1,
                            alignItems:'flex-end',
                            // marginStart: 20,
                        }} onPress={()=>_this.props.navigation.push(item.sceneName,{
                                                                    subDescription : item.description,
                                                                    subPageImage : item.item_image,
                                                                    subTitle : item.subTitle,
                                                                    title : item.title,
                                                                    date : item.date,
                                                                    sceneName: item.sceneName,
                                                                    })}>
                            <View style={{flex:0.6,
                                            justifyContent:'center',
                                            borderRadius:30,
                                            width:Dimensions.get('window').width*0.15,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',}}>
                                <Text style={{
                                    fontSize:16,
                                    color:'white'
                                    }}>報名</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);


const ProductItem = ({ _this,item}) => (
    <TouchableOpacity style={{
    }} onPress={() => _this.props.navigation.push(item.sceneName,{   name : item.name,
                                                                price : item.price,
                                                                amount : item.amount,
                                                                image : item.image,
                                                                manufacturerInformation : item.manufacturerInformation,
                                                                model : item.model,
                                                                spec : item.spec,
                                                                modelInfo : item.modelInfo,
                                                                specInfo : item.specInfo,
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
            <Image source={ { uri : item.image[0] }  } style={{
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
                                {item.price}
                        </Text>
                    </Text>
                </View>
            </View>
            <Text style={{
                fontSize:17,
                color:'black'}}>
                    {item.name}
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