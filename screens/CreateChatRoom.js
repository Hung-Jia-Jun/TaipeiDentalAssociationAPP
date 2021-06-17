import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase';

const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ToggleBtn : [
            ],
            GroupName:'',
        }
    }
    
    onclickFilterItem = (_this,item)=>
    {
        _this.state.ToggleBtn[item.key].toggled = !_this.state.ToggleBtn[item.key].toggled;
        _this.setState({ToggleBtn : _this.state.ToggleBtn});

        var _showGroupList = false;
        this.state.ToggleBtn.forEach((e)=>{
            if (e.toggled == true)
            {
                _showGroupList = true;
                return;
            }
        })
        this.setState({showSelectList:_showGroupList});
    }
    componentDidMount()
    {
        try
        {
            var ToggleBtnJs = JSON.parse(this.props.navigation.state.params.ToggleBtn);
            ToggleBtnJs.push({key:ToggleBtnJs.length.toString(),
                title : 'Append user',
                toggled:true,
                item_image : require('../assets/adfasdfsdf.png'),
                });
                
                // this.setState({ToggleBtn : JSON.parse(this.props.navigation.state.params.ToggleBtn)});
            this.setState({ToggleBtn : ToggleBtnJs});
        }
        catch (error)
        {
            console.log(error);
        }
    }
    onSelectMemberToGroup()
    {
        var dbRef = database.ref();
        //將時間戳當作ＩＤ
        var timeStamp = new Date().getTime().toString();
        var GroupID = this.state.GroupName+'_' + timeStamp;
        var GroupUser = []
        this.state.ToggleBtn.forEach(user=>{
            //只把用戶選擇的客戶加進群組裡
            if (user.toggled & user.title!='Append user')
            {
                var dbRef = database.ref();
                
                //加入該用戶的所屬群組列表
                dbRef.child("user").child(user.title).get().then((result) => {
                if (result.exists()) {
                    var user = result.val();
                    if (user.belongGroups==undefined)
                    {
                        user.belongGroups = []
                    }
                    user.belongGroups.push({
                                                key : this.state.GroupName,
                                                value : GroupID,
                                                //設定群組為多人聊天型態
                                                //因為還有一對一聊天，就不顯示在所屬群組列表內了
                                                groupType : 'multiChat',
                                            })
                    var GroupListRef = database.ref('/user'+"/" + user.username);
                    GroupListRef.update({
                        belongGroups : user.belongGroups
                    });
                }
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                     // ADD THIS THROW error
                      throw error;
                    });
                
                GroupUser.push(user);
            }
        })
        database.ref('/group'+"/" + GroupID).set({	
            GroupUser : GroupUser,
            //設定群組為多人聊天型態
            //因為還有一對一聊天，就不顯示在所屬群組列表內了
            groupType : 'multiChat',
        });
        //groupName是要顯示到下個頁面用的，所以不能帶上Timestamp不然用戶會覺得他的群組名稱怎麼會有一串亂碼
        this.props.navigation.push('GroupChat',{GroupID : GroupID , GroupName : this.state.GroupName,groupType:'multiChat'});
    }
    //追加好友到群組內
    appendMember()
    {
        
        this.props.navigation.push('InviteGroupChat',{ToggleBtn : JSON.stringify(this.state.ToggleBtn),LastPage:"CreateChatRoom"});
    }
  render() {
    const renderItem = ({ item }) => (
        <Item 	_this={this}
                item={item}
                key={item.key}
                title={item.title}
                item_image={item.item_image}/>
    );
    const renderOnSelectItem = ({ item }) => (
        <OnSelectItem 	_this={this}
                item={item}
                key={item.key}
                toggled={item.toggled}
                visible={item.visible}
                item_image={item.item_image}/>
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
            <View style={{flex: 0.25,
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
						onPress={()=>this.props.navigation.push("Message")}
						>
						<Image source={require('../assets/sdfghkjlgfd.png')}></Image>
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
                                    fontSize:18,
                                    // marginStart:WidthScale(165),
                                    textAlign:'center',
                                    zIndex:0,
                                color:'white'}}>群組設定</Text>
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
						onPress={()=>this.onSelectMemberToGroup()}
                        >
                        <View style={{flex:1,justifyContent: "center",
                                            zIndex:0,
                                            alignSelf: 'center'}}>
                            <Text style={{
                                fontSize:15,
                                zIndex:0,
                                color:'darkgreen'}}>
                                    確認
                            </Text>
                        </View>
					</TouchableOpacity>
				</View>
			</View>
            <View style={{flex: 0.25,
                            justifyContent:'top',
                            alignItems:'flex-end',
                            flexDirection: 'column',
                            zIndex:0,
                            }}>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={require('../assets/asdGroup4.png')} style={{marginStart:20,marginTop:30}}></Image>
            </View>
            <View style={{flex: 3.5,
                            zIndex:0,
                            flexDirection: 'column',
                            marginTop:18}}>
                                
                <TextInput style={{marginStart:100,
                                            marginTop:20,
                                            paddingHorizontal:30,
                                            backgroundColor:'white',
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:'gray',
                                            height:Dimensions.get('window').height*0.8,
                                            width:Dimensions.get('window').width*0.50,
                                            height:43,
                                            zIndex:2}}
                                placeholder = '群組名稱'
                                onChangeText={(text) => this.setState({GroupName: text})}
                                class = 'placeholder'
                                value={this.state.GroupName}
                        />  
                <View style={{  flex: 0.005,
                                marginTop:30,
                                alignSelf:'center',
                                width:Dimensions.get('window').width*0.80,
                                flexDirection: 'column',
                                backgroundColor:'#B9C2CC',}}>
                </View>
                <View style={{flex:0.07,
                                }}></View>
                <View style={{flex:0.1,
                                }}>
                    <Text style={{fontSize:14,
                                    marginStart:WidthScale(40),
                                    color:'black'}}>
                                            群組成員
                    </Text>
                </View>
                <View style={{
                    flex:0.9,
                }}>
                    <FlatList
                            horizontal
                            contentContainerstyle={{ 
                                                    flexDirection: 'row'}}
                                                    style={{marginTop:0,marginStart:30}}//backgroundColor:'#EBF0F3'}}
                                                    data={this.state.ToggleBtn}
                                                    renderItem={renderOnSelectItem}
                                                    keyExtractor={item => item.key.toString()}
                                                    />
                </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{flex: 0.45, flexDirection: 'row',justifyContent:'space-between'}}>
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




const OnSelectItem = ({ _this,item,item_image,toggled,visible}) => (
    
    <View style={styles.container,{flex: 1,flexDirection: 'row'}}>
        {item.title=="Append user" ? 
            <TouchableOpacity
                    style={{marginStart:10,marginTop:10,height:65}}
                    onPress={()=>_this.appendMember(_this,item)}>
                <Image source={item_image} style={{marginTop:3,width:55,height:55}}>
                </Image>
                        
                    <Text style={{
                        alignSelf:'center',
                        marginTop:11
                    }}>
                    追加
                </Text>
            </TouchableOpacity>
        :
            toggled==true && visible==true?
                <View>
                    <Image source={item_image} style={{marginStart:0,marginTop:10,width:70,height:70}}>
                    </Image>
                    <TouchableOpacity
                        onPress={()=>_this.onclickFilterItem(_this,item)}>
                        <Image source={require('../assets/Group4.png')} style={{marginStart:WidthScale(40),
                                                                                marginTop:HeightScale(-72),
                                                                                width:20,
                                                                                marginEnd:0,
                                                                                height:20}}></Image>
                    </TouchableOpacity>
                    <Text style={{
                                    alignSelf:'center',
                                    marginEnd:10
                                }}>
                        {item.title}
                    </Text>
                </View>
            :null
        }
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