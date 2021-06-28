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
            Like : false,
        }
    }
    componentDidMount()
    {
        var item = this.props.navigation.getParam('item');
        this.setState({
            title: item.publishClinicName,
            publishClinicName :item.publishClinicName,
            item_image : require('../assets/Announcement_icon/listicon2.png'),
            numberOfPeople:item.numberOfPeople,
            jobTypeText : item.jobTypeText,
            doctorType : item.doctorType,
            clinicPGYType : item.clinicPGYType,
            publishDate : item.publishDate,
            jobDescription : item.jobDescription,
            publishAccount : item.publishAccount,
            clinicAddr : item.clinicAddr,
        },()=>{
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type=='job')
                    {
                        if (favoritesLi[key].title == this.state.title)
                        {
                            this.setState({Like:true});
                        }
                    }
                });
            })});
    }
    onClickLike()
    {              
        var dbRef = database.ref();

        //代表原本沒有收藏，現在要收藏了
        if (this.state.Like == false)
        {
            //加入該用戶的收藏清單  
            dbRef.child("user").child(global.username).child('favoritesLi').push({
                    title : this.state.title,
                    publishClinicName :this.state.publishClinicName,
                    item_image : this.state.item_image,
                    numberOfPeople : this.state.numberOfPeople,
                    jobTypeText : this.state.jobTypeText,
                    doctorType : this.state.doctorType,
                    clinicPGYType : this.state.clinicPGYType,
                    publishDate : this.state.publishDate,
                    jobDescription : this.state.jobDescription,
                    publishAccount : this.state.publishAccount,
                    clinicAddr : this.state.clinicAddr,
                    type:'job',
            });
        }
        else
        {
            dbRef.child("user").child(global.username).child('favoritesLi').get().then((result)=>{
                var favoritesLi = result.val();
                Object.keys(favoritesLi).forEach(key=>{
                    if (favoritesLi[key].type=='job')
                    {
                        if (favoritesLi[key].title == this.state.title)
                        {
                            dbRef.child("user").child(global.username).child('favoritesLi').child(key).remove();
                        }
                    }
                });
            });
        }
        this.setState({Like:!this.state.Like})
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
        
        var selfInfo;
            
        //將發布該職缺的診所負責人名稱從用戶資料那邊撈出來
        dbRef.child("user").once('value').then((result) => {
            if (result.exists()) {
                var user = result.val();
                Object.keys(user).forEach(element=>{
                    var _user = user[element];
                    switch (_user.username)
                    {
                        case this.state.publishAccount:
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
                                                            toUser :  this.state.publishClinicName,
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
                                                        this.props.navigation.push('GroupChat',{GroupID : chatID , GroupName : this.state.publishAccount==global.username?global.username:this.state.publishClinicName,groupType:'clinicNotify'});
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
								color:'white'}}>{this.state.title}</Text>
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
                        <Image source={this.state.item_image} style={{
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
                                {this.state.doctorType}
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
                                {this.state.title}
                            </Text>
                            {this.state.clinicPGYType=="是"?
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
                                {this.state.numberOfPeople}
                            </Text>
                            <Text style={{
                                        marginStart:10,
                                        fontSize:18,
                                        color:'#01C5DE'
                                        }}>
                                {this.state.jobTypeText}
                            </Text>
                        </View>
                        
                        <View style={{
                                    flex:0.1
                                    }}>
                            <Text style={{
                                        fontSize:18,
                                        color:'#5C6A6C'
                                        }}>
                                刊登時間 ： {this.state.publishDate}
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
                                {this.state.jobDescription}
                            </TextInput>
                        </View>
                    </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{flex: 0.4,
                            flexDirection: 'row',
                            backgroundColor:'#01C5DE',
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                    flex:0.2,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#FFF',
                }} onPress={()=>this.onClickLike()}>
                    {this.state.Like==true?
                        <Image source={require('../assets/GrayLike_Fill.png')}
                        style={{
                                resizeMode:'stretch',
                                width:45,
                                height:45,
                            }}
                        ></Image>
                    :
                        <Image source={require('../assets/GrayLike.png')}
                                style={{
                                        resizeMode:'stretch',
                                        width:45,
                                        height:45,
                                    }}
                        ></Image>
                    }
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button,{
                    flex:0.9,
                    justifyContent:'center',
                    alignItems:'center',
                    marginStart: Dimensions.get('window').width*0.03,
                }} onPress={()=> this.startContactClinic()}>
                    <Text style={{
                                position: 'absolute',
                                justifyContent:'center',
                                fontSize:20,
                                color:'white'
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