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
const Back_image = require('../assets/Announcement_icon/Back.png')

//求才
class Message extends Component {
    constructor(props) {
		super(props);
		this.state = {
            DATA : [
            ],
        }
    }
    componentDidMount()
    {
        this.getRecruitmentList();
    }
    //取得求才列表
    getRecruitmentList()
    {
        var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
        //此為求才列表
		dbRef.child("recruitmentList").get().then((result)=>{
                //取得所有求才列表訊息
                var posted = result.val();
                var i = 0;
                Object.values(posted).forEach(e=>{
                    var diffDate = this.datediff(this.parseDate(e.publishDate),this.parseDate(this.YYYYMMDD(new Date())))
                    //只刊登14天內的徵才消息
                    if (diffDate<=14)
                    {
                        this.state.DATA.push({
                            key: i.toString(),

                            //診所名稱
                            title: e.publishClinicName,
                            item_image : require('../assets/Announcement_icon/listicon2.png'),
                            sceneName:'',
                            numberOfPeople:e.numberOfPeople,
                            //工作類型說明
                            jobTypeText : e.jobTypeText,
    
                            //需求醫師類型
                            doctorType : e.doctorType,
    
                            //發布時間
                            publishDate : e.publishDate,

                            jobDescription : e.jobDescription,

                            //診所地址
                            clinicAddr : e.publishClinicAddr,
                            
                            //具備PGY診所訓練資格
                            clinicPGYType : e.clinicPGYType,

                            //診所名稱
                            publishClinicName : e.publishClinicName,

                            //發布這則訊息的負責人
                            publishAccount : e.publishAccount,
                        })
                        i ++;
                    }
                    
                })
                this.setState({DATA:this.state.DATA})
        });
    }
    parseDate(str) {
        var mdy = str.split('.');
        return new Date(mdy[0], mdy[1], mdy[2]);
    };
    
    datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second-first)/(1000*60*60*24));
    };

    YYYYMMDD(value) {
		var mm = value.getMonth() + 1; // getMonth() is zero-based
		var dd = value.getDate();

		return [value.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
				].join('.');
	};
    showJobCategory = (_this,jobCategory) => {
        const textList = [];
        jobCategory.forEach(element => {
            textList.push(
                 <View style={styles.container,{flex: 0.2,
                                            height:Dimensions.get('window').height*0.035,
                                            marginEnd:10,
                                            borderRadius:100,
                                            backgroundColor:'rgba(1, 197, 222,0.15)',
                                            flexDirection: 'column'}}>
                    <View style={{flex: 1,
                                    justifyContent:'center',
                                    flexDirection: 'column'}}>
                                        <Text style={{
                                            fontSize:12,
                                            textAlign:'center',
                                            color:'#01C5DE'}}>
                                                {element}
                                        </Text>
                            </View>
                </View>
            )
        });

        return textList;
        
}
  render() {
    const renderItem = ({ item }) => (
		<Item _this={this} item={item} description={item.description} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
	);
    return (
        <View style={styles.container,{flex: 1,
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
            <View style={{flex: 0.05,
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection: 'column',
                            }}>
            </View>
            <View style={{flex: 0.34,
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
                            <Image source={require('../assets/leftArrow.png')}></Image> 
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>人力銀行區</Text>
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
						onPress={()=>this.props.navigation.push('PublishRecruitment')}>
                            <Text style={{  fontSize:35,
                                        color:'#FFF',
                                        justifyContent:'center',
                                        alignContent:'center'}}>+</Text>
					</TouchableOpacity>
				</View>
            </View>
            <View style={{flex: 0.25,
                            flexDirection: 'column',
                            }}>
                <View style={{flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent:'space-between',
                                }}>
                    <TouchableOpacity style={{marginTop:Dimensions.get('window').height*0,
                                                marginStart:Dimensions.get('window').width*0.12,
                                                zIndex:0,
                                                width:100,
                                                borderBottomWidth:3,
                                                borderColor:'#E2EBF6',
                                                height:40}}
                                                onPress={()=>this.props.navigation.push('ClinicRecruitmentHumanSupport')}>
                        <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>求職</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{marginTop:Dimensions.get('window').height*0,
                                                marginEnd: Dimensions.get('window').width*0.12,
                                                zIndex:0,
                                                width:100,
                                                borderBottomWidth:3,
                                                borderColor:'#43D1E3',
                                                height:40}} 
                                                onPress={()=>this.props.navigation.push('ClinicRecruitment')}>
                        <Text style={{marginTop:12,fontSize:15,color:'#43D1E3',textAlign:'center'}}>求才</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{flex: 0.1,
                                flexDirection: 'row',
                                }}>
                    
                    <View style={{flex: 0.63,
                                alignContent:'center',
                                backgroundColor:'#E2EBF6',
                                flexDirection: 'row',
                                }}>
                    </View>
                    <View style={{flex: 0.3,
                            backgroundColor:'#43D1E3',
                            flexDirection: 'row',
                            }}>
                    </View>
                </View> */}
                    <View style={{flex: 0.15,
                                alignContent:'center',
                                }}>
                    </View>
            </View>
            
            <View style={{flex: 3,
                            flexDirection: 'column',
                            marginTop:0}}>
                    <FlatList
                        style={{marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                        contentContainerStyle={{ marginTop: 0}}
                        data={this.state.DATA}
                        extraData={this.state}
                        renderItem={renderItem}
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




const Item = ({ _this,item,title,item_image,sceneName }) => (
         <View style={{flex: 5,
            marginStart:Dimensions.get('window').width*0.02,
            width:Dimensions.get('window').width*0.95,
            backgroundColor : '#FFFFFF',
            flexDirection: 'row',
            marginBottom:Dimensions.get('window').height*0.02,
            shadowOffset:{  width:0,  height:5},
            shadowColor: 'black',
            shadowOpacity: 0.1,
            justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.button,{
                height: Dimensions.get('window').height*0.13,
                width:Dimensions.get('window').width*0.8,
                marginStart: 0,
                marginTop:0,
            }} onPress={() => _this.props.navigation.push('ClinicRecruitmentDetail',{item:item})}>
                <View style={{flex:1,
                            flexDirection:'column'}}>
                    <View style={{flex:0.1,
                                flexDirection:'column'}}></View>
                    <View style={{flex:1,
                                flexDirection:'row'}}>
                        <View style={{flex:0.03,
                                        flexDirection:'row'}}></View>
                        <View style={{flex:0.2,
                                    flexDirection:'row'}}>
                            <Image source={ item_image } style={{
                                resizeMode:'contain',
                                height: Dimensions.get('window').height*0.1,
                                width: Dimensions.get('window').width*0.25,
                            }}></Image>
                        </View>
                    </View>
                </View>
                <View style={{  flexDirection:'row',
                                width:260,
                                flex:1,
                                position: 'absolute',
                                marginTop: Dimensions.get('window').height*0.02,
                                marginStart: Dimensions.get('window').width*0.32,}}>
                    <Text style={{
                                alignItems:'flex-start',
                                flex:1,
                                fontSize:16,
                                color:'black',
                                }}>
                                    {title}
                    </Text>
                    <Text style={{
                                textAlign:'right',
                                flex:1,
                                fontSize:12,
                                color:'black'
                                }}>
                                    {item.publishDate}
                    </Text>
                </View>
                
                <View style={{
                                flexDirection:'column',
                                position: 'absolute',
                                marginTop: Dimensions.get('window').height*0.048,
                                marginStart: Dimensions.get('window').width*0.32,
                                fontSize:16,
                                width: Dimensions.get('window').width*0.6,
                                height: Dimensions.get('window').height*0.07}}>
                    <Text style={{
                                color:'gray'
                                }}>
                                    {item.doctorType}
                    </Text>
                   <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                        <Image source={require('../assets/doctorIcon.png')}></Image>
                        <Text style={{
                                        fontSize:17,
                                        color:'black'
                                        }}>
                                            {item.numberOfPeople}
                        </Text>
                        {item.jobTypeText=='全職醫師'?
                            <View style={{
                                            marginStart:15,
                                            borderRadius:30,
                                            backgroundColor:'rgba(69, 209, 227, 0.15)',
                                            }}>
                                <Text style={{
                                                padding:5,
                                                color:'#45d1e3'
                                            }}>
                                                {item.jobTypeText}
                                </Text>
                            </View>
                        :null}
                        {item.jobTypeText=='兼職醫師'?
                            <View style={{
                                            marginStart:15,
                                            borderRadius:30,
                                            backgroundColor:'rgba(89,101,112,0.1)',
                                            }}>
                                <Text style={{
                                                padding:5,
                                                color:'#596570'
                                            }}>
                                                {item.jobTypeText}
                                </Text>
                            </View>
                        :null}
                        {item.jobTypeText=='工讀生'?
                            <View style={{
                                            marginStart:15,
                                            borderRadius:30,
                                            backgroundColor:'rgba(90,29,208,0.1)',
                                            }}>
                                <Text style={{
                                                padding:5,
                                                color:'#5A1DD0'
                                            }}>
                                                {item.jobTypeText}
                                </Text>
                            </View>
                        :null}
                   </View>
                </View>
            </TouchableOpacity>
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