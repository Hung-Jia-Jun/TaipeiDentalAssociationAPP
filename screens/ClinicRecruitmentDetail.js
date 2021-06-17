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
            item :'',
            
            title : '',
            item_image : '',
            numberOfPeople : '',
            jobTypeText : '',
            doctorType : '',
            publishDate : '',
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
            clinicPGYType : item.clinicPGYType,
            publishDate : item.publishDate,
        },()=>console.log(this.state.item));
    }
    //把診所負責人加到群組裡面
    startContactClinic()
    {
        var dbRef = database.ref();
        //將時間戳當作ＩＤ
        var timeStamp = new Date().getTime().toString();

        //建立群組ID
        var chatID = timeStamp;
        var GroupUser = []
        
        var publishAccount;
        var selfInfo;
            
        //將發布該職缺的診所負責人名稱從用戶資料那邊撈出來
        dbRef.child("user").once('value').then((result) => {
            if (result.exists()) {
                var user = result.val();
                Object.keys(user).forEach(element=>{
                    var _user = user[element];
                    switch (_user.username)
                    {
                        case this.state.item.publishAccount:
                            console.log(_user.username);
                            //加入用戶還有診所負責人到一對一診所聊天
                            GroupUser.push(_user);
                            if (_user.belongGroups==undefined)
                            {
                                _user.belongGroups = []
                            }
                            //查出該用戶旗下有多少所屬群組
                            //並push現在的內容進去
                            //此為診所負責人聯繫求職者的過程
                            _user.belongGroups.push({
                                                            chatID : chatID,
                                                            //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                                            groupType : 'clinicNotify',
                                                            //此聯繫的發起人是我，所以我要發給toUser那端的訊息
                                                            toUser : global.username,
                                                    });
                            //更新用戶所屬群組的資訊
                            var GroupListRef = database.ref('/user'+"/" + _user.username);
                            //更新用戶所屬群組的資訊
                            GroupListRef.update({
                                belongGroups : _user.belongGroups,
                                //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                groupType : 'clinicNotify',
                            });
                            break
                        case global.username:
                            console.log(_user.username);
                            //加入用戶還有診所負責人到一對一診所聊天
                            GroupUser.push(_user);
                            if (_user.belongGroups==undefined)
                            {
                                _user.belongGroups = []
                            }
                            //查出該用戶旗下有多少所屬群組
                            //並push現在的內容進去
                            //此為診所負責人聯繫求職者的過程
                            _user.belongGroups.push({
                                                            chatID : chatID,
                                                            //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                                            groupType : 'clinicNotify',
                                                            //此聯繫的發起人是我，所以我要發給toUser那端的訊息
                                                            toUser :  this.state.item.publishClinicName,
                                                    });
                            //更新用戶所屬群組的資訊
                            var GroupListRef = database.ref('/user'+"/" + _user.username);
                            //更新用戶所屬群組的資訊
                            GroupListRef.update({
                                belongGroups : _user.belongGroups,
                                //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                groupType : 'clinicNotify',
                            });
                            break
                    }
                });
                database.ref('/group'+"/" + chatID).set({	
                                                        GroupUser : GroupUser,
                                                        //設定群組為跟診所求職的通知，或是求職者發訊息給診所
                                                        groupType : 'clinicNotify',
                                                    },()=>{
                                                        this.props.navigation.push('GroupChat',{GroupID : chatID , GroupName : this.state.item.publishAccount==global.username?global.username:this.state.item.publishClinicName,groupType:'clinicNotify'});
                                                    });
            }
        });
    }
  render() {
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
                                    flex:0.1,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    }}>
                            <Text style={{
                                        fontSize:15,
                                        color:'#5C6A6C',
                                        marginEnd:20,
                                        }}>
                                {this.state.item.title}
                            </Text>
                            {this.state.item.clinicPGYType=="是"?
                                <View style={{
                                                marginEnd:15,
                                                borderRadius:30,
                                                backgroundColor:'rgba(222, 142, 1, 0.15)',
                                                }}>
                                    <Text style={{
                                                    padding:5,
                                                    color:'#F5A623'
                                                }}>
                                                    {"具備PGY診所訓練資格"}
                                    </Text>
                                </View>
                            :null}
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