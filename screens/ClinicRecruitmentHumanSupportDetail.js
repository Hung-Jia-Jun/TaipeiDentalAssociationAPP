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


class Message extends Component {
    constructor(props) {
		super(props);
		this.state = {
            DATA : [
            ],
            item :'',
            
            title : '',
            item_image : '',
            numberOfPeople : '',
            jobTypeText : '',
            doctorType : '',
            publishDate : '',

            //房間名稱用診所名，從上個頁面帶過來的
            roomName : '',
        }
    }
    componentDidMount()
    {
        var item = this.props.navigation.getParam('item');
        this.setState({
            item:item,
            title: item.publishClinicName,
            item_image : require('../assets/Announcement_icon/listicon2.png'),
            numberOfPeople:item.numberOfPeople,
            jobTypeText : item.jobTypeText,
            doctorType : item.doctorType,
            publishDate : item.publishDate,
            roomName : item.publishClinicName,
        },()=>console.log(this.state.item));
    }
    //把診所負責人加到群組裡面
    startContactClinic()
    {
        var dbRef = database.ref();
        //將時間戳當作ＩＤ
        var timeStamp = new Date().getTime().toString();

        //建立群組ID
        var GroupID = this.state.roomName+'_' + timeStamp;
        var GroupUser = []
        var dbRef = database.ref();
        
            
        //將發布該職缺的診所負責人名稱從用戶資料那邊撈出來
        dbRef.child("user").once('value').then((result) => {
            if (result.exists()) {
                var user = result.val();
                var i = 0;
                Object.keys(user).forEach(element=>{
                    //也加入自己，要做一對一聊天
                    //加入用戶還有診所負責人到一對一診所聊天
                    if (this.state.item.publishAccount==user[element].username || global.username==user[element].username)
                    {
                        var clinicManager = {   key:i.toString(),
                                    title : user[element].username,
                                    toggled:false,
                                    //可以在好友列表內出現，因為自己的帳號一定要在群組裡面，但又不用出現在好友列表防止選錯
                                    visible:true,
                                    item_image :user[element].userIcon,
                                };
                        //加入用戶還有診所負責人到一對一診所聊天
                        GroupUser.push(clinicManager);

                        if (user[element].belongGroups==undefined)
                        {
                            user[element].belongGroups = []
                        }
                        //查出該用戶旗下有多少所屬群組
                        //並push現在的內容進去
                        user[element].belongGroups.push({
                                                    key : this.state.roomName,
                                                    value : GroupID,
                                                    //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                                    groupType : 'clinicNotify',
                                                });
                        var GroupListRef = database.ref('/user'+"/" + user[element].username);
                        //更新用戶所屬群組的資訊
                        GroupListRef.update({
                           belongGroups : user[element].belongGroups,
                           //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                           groupType : 'clinicNotify',
                        });
                        
                    }
                    i += 1;
                });
                
                } 
                else 
                {
                }
                //一對一聊天
                database.ref('/group'+"/" + GroupID).set({	
                    GroupUser : GroupUser,
                    //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                    groupType : 'clinicNotify',
                });
                //roomName是要顯示到下個頁面用的，所以不能帶上Timestamp不然用戶會覺得他的群組名稱怎麼會有一串亂碼
                this.props.navigation.push('GroupChat',{GroupID : GroupID , GroupName : this.state.roomName,groupType:'clinicNotify'})
            }).catch((error) => {
                console.error(error);
        });
       
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
						onPress={()=>this.props.navigation.push('ClinicRecruitment')}>
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
								color:'white'}}>{this.state.item.title}</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
				</View>
            </View>
                        
            <View style={{flex: 3.25,
                            flexDirection: 'column',
                            paddingStart:20,
                            paddingTop:10,
                            paddingEnd:20,
                            marginTop:0}}>
                    <View style={{flex:0.45,flexDirection:'row'}}>
                        <Image source={this.state.item.item_image} style={{
                            width: Dimensions.get('window').width*0.3,
                            height: Dimensions.get('window').height*0.33,
                            flex:1,
                            resizeMode:'contain',
                        }}></Image>
                    </View>
                    <View style={{flex:0.55}}>
                        <View style={{
                                    flex:0.1
                                    }}>
                            <Text style={{
                                        fontSize:24,
                                        color:'#5C6A6C'
                                        }}>
                                {this.state.item.doctorType}
                            </Text>
                        </View>
                        <View style={{
                                    flex:0.1
                                    }}>
                            <Text style={{
                                        fontSize:15,
                                        color:'#5C6A6C'
                                        }}>
                                {this.state.item.title}
                            </Text>
                        </View>
                        
                        <View style={{
                                    flex:0.1,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    }}>
                            <Image source={require('../assets/doctorIcon.png')}></Image>
                            <Text style={{
                                        marginStart:10,
                                        fontSize:18,
                                        color:'#5C6A6C'
                                        }}>
                                {this.state.item.numberOfPeople}
                            </Text>
                            <Text style={{
                                        marginStart:10,
                                        fontSize:18,
                                        color:'#01C5DE'
                                        }}>
                                {this.state.item.jobTypeText}
                            </Text>
                        </View>
                        
                        <View style={{
                                    flex:0.1
                                    }}>
                            <Text style={{
                                        fontSize:18,
                                        color:'#5C6A6C'
                                        }}>
                                刊登時間 ： {this.state.item.publishDate}
                            </Text>
                        </View>
                        
                        <View style={{
                                    flex:1,
                                    }}>
                            <TextInput 
                                    multiline={true}
                                    editable={false}
                                    selection={false}
                                    contextMenuHidden={true}
                                    style={{
                                        fontSize:18,
                                        color:'#5C6A6C'
                                        }}>
                                {this.state.item.jobDescription}
                            </TextInput>
                        </View>
                    </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{  flex: 0.4,
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                        justifyContent:'center',
                        flex:1,
                        backgroundColor:'#01C5DE',
                        alignItems:'center',
                    }} onPress={()=> {
                                            this.startContactClinic();
                                        }}>
                            <Text style={{
                                textAlign:'center',
                                color:'#FFF',
                                fontSize:20,
                                }}>
                                    聯繫診所
                                </Text>
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
            }} onPress={() => _this.props.navigation.navigate('ClinicRecruitmentHumanSupportDetail')}>
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