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
            showSelectList:false,
        }
    }
    componentDidMount()
    {
        var dbRef = database.ref();
        dbRef.child("user").once('value').then((result) => {
		if (result.exists()) {
			var user = result.val();
            var i = 0;
            Object.keys(user).forEach(element=>{
                this.state.ToggleBtn.push({key:i.toString(),
                                            title : user[element].username,
                                            toggled:false,
                                            item_image : require('../assets/MessageIcon.png'),//user[element].userIcon,
                                    });
                i += 1;
            });
            this.setState({ToggleBtn:this.state.ToggleBtn});
			console.log(this.state.ToggleBtn);
            
		} else {
		}
		}).catch((error) => {
			console.error(error);
		});
    }
    onclickFilterItem = (_this,item)=>
    {
        _this.state.ToggleBtn[item.key].toggled = !_this.state.ToggleBtn[item.key].toggled;
        _this.setState({ToggleBtn : _this.state.ToggleBtn});

        var _showGroupList = false;
        this.state.ToggleBtn.forEach((e)=>{
            console.log(e);
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
            this.setState({ToggleBtn : JSON.parse(this.props.navigation.state.params.ToggleBtn)});
        }
        catch (error)
        {
            // console.log(error);
        }
    }
    onSelectMemberToGroup()
    {
        this.props.navigation.navigate('CreateChatRoom',{GroupUser : JSON.stringify(this.state.ToggleBtn)});
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
                        flex:8,
                    }}>
                    <Text style={{
                                    fontSize:18,
                                    marginStart:WidthScale(165),
                                    // textAlign:'center',
                                    zIndex:0,
                                color:'white'}}>群組設定</Text>
                </View>
                <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        zIndex:1,
                        flex:1,
                }}>
                    <TouchableOpacity style={{
                        height: 50,
                        width:50,
                        justifyContent:'center',
                        alignItems:'center',
                        zIndex:1,
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
                <View style={{
                        flex:0.5,
                }}></View>
            </View>
            
            <View style={{flex: 0.25,
                            justifyContent:'top',
                            alignItems:'flex-end',
                            flexDirection: 'column',
                            zIndex:0,
                            }}>
            </View>
            
            <View style={{flex: 3.5,
                            zIndex:0,
                            flexDirection: 'column',
                            marginTop:18}}>
                                
                {/* <Image source={require('../assets/asdGroup4.png')} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image> */}
                <TextInput style={{marginStart:30,
                                            paddingHorizontal:30,
                                            marginTop:0,
                                            backgroundColor:'white',
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:'gray',
                                            height:Dimensions.get('window').height*0.8,
                                            width:Dimensions.get('window').width*0.70,
                                            height:43,
                                            zIndex:2}}
                                placeholder = '群組名稱'
                                class = 'placeholder'
                        />  
            </View>
        
            <View style={{
                flex:0.5,
                borderWidth:1,
                backgroundColor:'#D8F4FB',
                borderColor:'#01C5DE'
            }}>
                <FlatList
                        horizontal
                        contentContainerstyle={{ 
                            flexDirection: 'row',
                                                marginStart:150,}}
                                                style={{marginTop:0,marginStart:0}}//backgroundColor:'#EBF0F3'}}
                                                data={this.state.ToggleBtn}
                                                renderItem={renderOnSelectItem}
                                                keyExtractor={item => item.key}
                                                />
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




const Item = ({ _this,item,title,item_image}) => (
    <View style={styles.container,{flex: 1,flexDirection: 'row',height:70}}>
        <ImageBackground style={{marginTop:0,
                                width:Dimensions.get('window').width,height:70}}> 
            <View style={{height:70,
                        justifyContent:'center',
                        flexDirection:"row",}}>
                <View style={{flex:0.1,}}>
                </View>
                <View style={{backgroundColor:_this.state.ToggleBtn[item.key].toggled==true? '#43D1E3':'white',
                                borderWidth:1,
                                borderColor:_this.state.ToggleBtn[item.key].toggled==true? 'white':'black',
                                flex:0.04,
                                marginTop:HeightScale(35),
                                width: WidthScale(14),
                                height: HeightScale(14),
                                borderRadius: 10000
                                }}></View>
                <Image source={item_image}style={{marginStart:27,marginTop:11,width:70,
                    height:70}}></Image>
                <TouchableOpacity style={styles.button,{
                        height: 70,
                        shadowOffset:{  width: 5,  height: 5},
                        shadowColor: 'black',
                        shadowOpacity: 0.01,
                        width:Dimensions.get('window').width,
                        borderColor:'black',
                        marginStart: 0,
                        alignItems:'center',
                        justifyContent:'center',
                        zIndex:0,
                        marginTop:0,
                        flex:1,
                    }} onPress={() => _this.onclickFilterItem(_this,item)}>
                            <View style={{flex:1,justifyContent: "center",marginStart:30,marginTop:10, alignSelf: 'flex-start'}}>
                                <Text style={{
                                    fontSize:19,
                                    color:'black'}}>
                                        {title}
                                </Text>
                            </View>
                    </TouchableOpacity>
            </View> 
        </ImageBackground>
    </View>
);


const OnSelectItem = ({ _this,item,item_image,toggled}) => (
    
        <View style={styles.container,{flex: 1,flexDirection: 'row'}}>
            {toggled==true?
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