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
            //來自firebase的文字訊息
            messages : [
            ],
            GroupName:'',
            GroupID:'',
        }
    }
    
   
    componentDidMount()
    {
        try
        {
            this.setState({GroupName : this.props.navigation.state.params.GroupName,
                            GroupID : this.props.navigation.state.params.GroupID,                
            });
        }
        catch (error)
        {
            console.log(error);
        }
    }
    onMsgUpdate()
    {
        //TODO 更新訊息
        var ref = firebase.database().ref('/group'+"/" + this.props.navigation.state.params.GroupID + '/msg');
        ref.on('value', function (snapshot) {
            console.log(snapshot.val());
        })
    }
  render() {
    const renderItem = ({ item }) => (
        <Item 	_this={this}
                item={item}
                key={item.key}
                title={item.title}
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
                                color:'white'}}>{this.state.GroupName}</Text>
                </View>
            </View>
            
            <View style={{flex: 3.8,
                            zIndex:0,
                            borderWidth:1,
                            flexDirection: 'column',
                            marginTop:18}}>
             
                <View style={{
                    flex:0.9,
                }}>
                    {/* <FlatList
                            contentContainerstyle={{ 
                                                    flexDirection: 'row'}}
                                                    style={{marginTop:0,marginStart:30}}//backgroundColor:'#EBF0F3'}}
                                                    data={this.state.messages}
                                                    renderItem={renderOnSelectItem}
                                                    keyExtractor={item => item.key}
                                                    /> */}
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
                    <View style={{backgroundColor:_this.state.messages[item.key].toggled==true? '#43D1E3':'white',
                                    borderWidth:1,
                                    borderColor:_this.state.messages[item.key].toggled==true? 'white':'black',
                                    flex:0.04,
                                    marginTop:HeightScale(35),
                                    width: WidthScale(14),
                                    height: HeightScale(14),
                                    borderRadius: 10000
                                }}></View>
                    <Image source={item_image}style={{marginStart:27,marginTop:11,width:70,
                        height:70}}></Image>
                  
                </View> 
            </ImageBackground>
        :
            <ImageBackground style={{marginTop:0,
                width:Dimensions.get('window').width,height:70}}> 
                <View style={{height:70,
                            justifyContent:'center',
                            flexDirection:"row",}}>
                    <View style={{flex:0.1,}}>
                    </View>
                    <View style={{backgroundColor:_this.state.messages[item.key].toggled==true? '#43D1E3':'white',
                                    borderWidth:1,
                                    borderColor:_this.state.messages[item.key].toggled==true? 'white':'black',
                                    flex:0.04,
                                    marginTop:HeightScale(35),
                                    width: WidthScale(14),
                                    height: HeightScale(14),
                                    borderRadius: 10000
                                }}></View>
                    <Image source={item_image}style={{marginStart:27,marginTop:11,width:70,
                        height:70}}></Image>
                    
                </View> 
            </ImageBackground>
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