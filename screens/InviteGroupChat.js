import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import MultiSelect from 'react-native-multiple-select';
//NotifycationTopper.png
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


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ToggleBtn : [
                {key : 0 , text : "吳智蘭" , toggled : false},
                {key : 1 , text : "邰阿民" , toggled : false},
                {key : 2 , text : "吳鎮宇" , toggled : false},
                {key : 3 , text : "王冠孝" , toggled : false},
            ],
        }
    }
    componentDidMount()
    {
        var dbRef = database.ref();
        dbRef.child("user").get().then((result) => {
		if (result.exists()) {
			var user = result.val();
			console.log(user);
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
    }
  render() {
    const renderItem = ({ item }) => (
        <Item 	_this={this}
                item={item}
                key={item.key}
                title={item.title}
                item_image={item.item_image}
                itemType={item.itemType}/>
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
                            flexDirection: 'column',
                            }}>
                    <Text style={{marginTop:Dimensions.get('window').height*0.03,
                                    fontSize:18,
                                    color:'white'}}>選擇人員</Text>
            </View>
            <View style={{flex: 0.25,
                            justifyContent:'top',
                            alignItems:'flex-end',
                            flexDirection: 'column',
                            marginTop:-30,
                            }}>
            </View>
            
            <View style={{flex: 3,
                            flexDirection: 'column',
                            marginTop:0}}>
                    <FlatList
                        style={{marginTop:0,width:Dimensions.get('window').width,marginStart:0}}//backgroundColor:'#EBF0F3'}}
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={item => item.key}
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
                                width:Dimensions.get('window').width,height:70,backgroundColor:'#F2FAFF'}}> 
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
                <Image source={ item_image } style={{marginStart:27,marginTop:11,width:70,
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


const DATA = [
    {
        key: '0',
        title: '吳智蘭',
        item_image : require('../assets/MessageIcon.png'),
    },
     {
        key: '1',
        title: '邰阿民',
        item_image : require('../assets/MessageIcon.png'),
    },
     {
        key: '2',
        title: '吳鎮宇',
        item_image : require('../assets/MessageIcon.png'),
    },
     {
        key: '3',
        title: '王冠孝',
        item_image : require('../assets/MessageIcon.png'),
    },
];
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