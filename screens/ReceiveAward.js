import { stringify } from "querystring";
import React, { Component } from "react";
import { Dimensions,StyleSheet,SafeAreaView,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import { interpolate } from "react-native-reanimated";
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();

const image = require('../assets/b-領取獎勵.png');
const getRewardBackimage = require('../assets/getReward.png')
var dbRef = database.ref();
  

class Page extends Component {
    constructor(props) {
		super(props);
		this.state = {
                initialArr : [],
                year : 0,
                month : 0,
                Datetime:null,

                //已簽到的日子
                signInDayily :[],
                point : global.point,
        }
	}
    generateDay(year,mon)
    {
        this.setState({initialArr:[]},()=>{
            //星期幾的簡稱
            var dayWord = ["S",
                            "M",
                            "T",
                            "W",
                            "T",
                            "F",
                            "S"];
            for (i=0;i<7;i++)
            {
                this.state.initialArr.push({
                    id : i,
                    text : dayWord[i]
                })
            }
            //每次更新月份都要清空原有的日期物件
            var myDate = new Date(year+','+ String(parseInt(mon)+1) +', 01');
            //0是星期天 0-6 日,一,二,三,四,五,六
            var dayOffset = myDate.getDay();
    
            //本月的最後一天要抓取前，要先到下個月的第0天才能知道
            var nextMonth = new Date(new Date().setMonth(myDate.getMonth()+1))
            
            var lastDay = String(new Date(nextMonth.getFullYear(),nextMonth.getMonth(),0).getDate()).padStart(2, '0');
            var startIndex = this.state.initialArr.length;
            
            for (var i = 0; i<dayOffset;i++)
            {
                this.state.initialArr.push({
                    id: startIndex+i,
                    text: ''
                })
            }
            this.setState({signInDayily : this.unique(this.state.signInDayily)},()=>{
                for (var i = 1; i<= parseInt(lastDay);i++)
                {
                    var isSignIn = false;
                    this.state.signInDayily.forEach(day => {
                        var signIn = new Date(day);
                        if (signIn.getFullYear()==year & signIn.getMonth()==mon)
                        {
                            
                            if (i == signIn.getDate())
                            {
                                this.state.initialArr.push({
                                    id: startIndex+i,
                                    text: "已簽到"
                                });
                                isSignIn = true            
                            }
                        }
                    });
                    if (isSignIn==false)
                    {
                        this.state.initialArr.push({
                            id: startIndex+i,
                            text: i.toString()
                        });
                    }
                }
                this.setState({initialArr : this.state.initialArr});
            });
        });
    }
    DailySignInMission()
    {
        var today = String(new Date().getFullYear()) + "," + String(new Date().getMonth()+1) + "," + String(new Date().getDate());

        dbRef.child("user").child(global.username).child('signInDayily').get().then((result)=>{
            if (result.exists()==true)
            {
                var signDays = result.val();

                var isSigned = false;
                Object.keys(signDays).forEach((key)=>{
                    if (signDays[key] == today)
                    {
                        //今日已簽到過了
                        isSigned = true;
                    }
                })
                if (isSigned==false)
                {
                    dbRef.child("user").child(global.username).child('signInDayily').push(today);
                    this.state.signInDayily.push(today);
                    this.setState({signInDayily:this.state.signInDayily},()=>{
                        var _Datetime = new Date();
                        
                        global.point += 50;
                        database.ref('/user'+"/" + global.username).update({	
                            point : global.point,
                        });
                        this.setState({Datetime : _Datetime,year :_Datetime.getFullYear() ,month : _Datetime.getMonth(),point : global.point},()=>{
                            this.generateDay(this.state.year,this.state.month);
                        });
                    });
                }
            }
            else
            {
                dbRef.child("user").child(global.username).child('signInDayily').push(today);
                this.state.signInDayily.push(today);
                this.setState({signInDayily:this.state.signInDayily},()=>{
                    var _Datetime = new Date();
                    
                    global.point += 50;
                    database.ref('/user'+"/" + global.username).update({	
                        point : global.point,
                    });
                    this.setState({Datetime : _Datetime,year :_Datetime.getFullYear() ,month : _Datetime.getMonth(),point : global.point},()=>{
                        this.generateDay(this.state.year,this.state.month);
                    });
                });
            }
        },()=>{
            dbRef.child("user").child(global.username).child('signInDayily').update(signDays);
            this.setState({signInDayily:signDays},()=>{
                var _Datetime = new Date();
                this.setState({Datetime : _Datetime,year :_Datetime.getFullYear() ,month : _Datetime.getMonth()},()=>{
                    this.generateDay(this.state.year,this.state.month);
                });
            });
            
        })
        
    }
    unique (arr) {
        return Array.from(new Set(arr))
    }
    componentDidMount()
    {
        dbRef.child("user").child(global.username).child('signInDayily').get().then((result)=>{
            if (result.exists()==true)
            {
                var signDays = result.val();
                Object.keys(signDays).forEach(key=>{
                    this.state.signInDayily.push(signDays[key]);
                })
            }
            this.setState({signInDayily:this.state.signInDayily},()=>{
                var _Datetime = new Date();
                this.setState({Datetime : _Datetime,year :_Datetime.getFullYear() ,month : _Datetime.getMonth()},()=>{
                    this.generateDay(this.state.year,this.state.month)
                });
            });
        });
        
    }
    render() {
    return (
        <SafeAreaView style={styles.container,{flex: 1, flexDirection: 'column'}}>
            <ImageBackground source={getRewardBackimage} style={styles.image,{flex: 0.2,
                            borderBottomLeftRadius:20,
                            borderBottomRightRadius:20,
                            overflow:'hidden',
                            resizeMode:'stretch',
                            }}>
                <View style={{flexDirection:'row',
                            flex:0.2,    
                            }}>
                    <View style={{
                            flex:0.33,
                            justifyContent:'center',
                            alignItems:'flex-start',
                        }}>
                        <TouchableOpacity style={{
                            alignItems:'center',
                            justifyContent:'center',
                            height:65,
                            width:65,
                        }} 
                        onPress={()=>this.props.navigation.push("Profile")}>
                            <Image source={require('../assets/leftArrow.png')}
                                    style={{
                                        resizeMode:'stresh',
                                        height:30,
                                        width:30,
                                    }}
                                    ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                            flex:0.33,
                            justifyContent:'center',
                        }}>
                        <Text style={{
                                        fontSize:20,
                                        textAlign:'center',
                                        zIndex:0,
                                    color:'white'}}>領取獎勵</Text>
                    </View>
                    
                    <View style={{
                            flex:0.33,
                            alignItems:'flex-end',
                        }}>
                        
                    </View>
                </View>
                <View style={{flexDirection:'column',
                            flex:0.8, 
                            }}>
                    <View style={{flexDirection:'column',
                            flex:0.1, 
                            }}></View>
                    <View style={{flexDirection:'column',
                            flex:0.8, 
                            alignItems:'center',
                            }}>
                        <View style={{flex:0.5,
                                        flexDirection:'row'}}>
                            <Text style={{
                                    fontSize:45,
                                    textAlign:'center',
                                    zIndex:0,
                                    color:'white'}}>{this.state.point}
                            </Text>
                            <Image source={require('../assets/BigCoin.png')}
                                    style={{
                                        marginStart:15,
                                        height:25,
                                        width:25,
                                        resizeMode:'stretch',
                                        alignSelf:'center'
                                    }}
                                    ></Image>
                        </View>
                        <View style={{flex:0.5,
                                        justifyContent:'center',
                                        flexDirection:'column'}}>
                             <Text style={{
                                    fontSize:15,
                                    overflow:'hidden',
                                    borderRadius:15,
                                    padding:5,
                                    paddingStart:30,
                                    paddingEnd:30,
                                    textAlign:'center',
                                    zIndex:0,
                                    backgroundColor:'#01C5DE',
                                    color:'white'}}>今日簽到獎勵50元代幣
                            </Text>
                        </View>
                    </View>
                              
                </View>
            </ImageBackground>
            <View style={{flexDirection:'row',
                            flex:0.01,    
                            }}></View>
            <View style={{flexDirection:'column',
                            flex:0.55,    
                            padding:10,
                            }}>
                
                <View style={{
                            flex:1,   
                            backgroundColor:'#FFF' ,
                            padding:5,
                            // borderWidth:1,
                            shadowOffset:{  width:5,  height:5},
                            shadowColor: 'black',
                            shadowOpacity: 0.15,
                            borderRadius:10,
                            }}>
                    <View style={{
                            flex:0.1,   
                            backgroundColor:'#FFF' ,
                            flexDirection:'row',
                        }}>
                        <View style={{
                                flex:0.2,
                                justifyContent:'center',
                                alignItems:'center',
                            }}>
                            <TouchableOpacity style={{
                                alignItems:'center',
                                justifyContent:'center',
                                // borderWidth:1,
                                padding:8,
                                borderRadius:100,
                                backgroundColor:'rgba(226,235,246,0.4)',
                            }} 
                            onPress={()=>{
                                this.setState({Datetime : new Date(this.state.Datetime.setMonth(this.state.Datetime.getMonth() - 1))},()=>{
                                    var year = this.state.Datetime.getFullYear();
                                    var month = this.state.Datetime.getMonth();
                                    this.generateDay(year,month)
                                    this.setState({year : year , month : month})
                                });
                            }}>
                                <Image source={require('../assets/leftArrowGray.png')}
                                        style={{
                                            resizeMode:'contain',
                                            height:25,
                                            width:25,
                                        }}
                                        ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                                flex:0.15,
                                alignItems:'center',
                            }}></View>

                        <View style={{
                                flex:0.3,
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:100,
                                backgroundColor:'rgba(226,235,246,0.4)',
                                overflow:'hidden',
                            }}>
                            <Text style={{
                                        fontSize:20,
                                        textAlign:'center',
                                        color:'#5C6A6C'}}>{String(parseInt(this.state.month)+1)}月 {this.state.year}</Text>
                        </View>
                        <View style={{
                                flex:0.15,
                                alignItems:'center',
                            }}></View>
                        <View style={{
                                flex:0.2,
                                alignItems:'center',
                            }}>
                            <TouchableOpacity style={{
                                alignItems:'center',
                                justifyContent:'center',
                                // borderWidth:1,
                                padding:8,
                                borderRadius:100,
                                backgroundColor:'rgba(226,235,246,0.4)',
                            }} 
                            onPress={()=>{
                                this.setState({Datetime : new Date(this.state.Datetime.setMonth(this.state.Datetime.getMonth() + 1))},()=>{
                                    var year = this.state.Datetime.getFullYear();
                                    var month = this.state.Datetime.getMonth();
                                    this.generateDay(year,month)
                                    this.setState({year : year , month : month})
                                });
                            }}>
                                <Image source={require('../assets/RightArrowGray.png')}
                                        style={{
                                            resizeMode:'contain',
                                            height:25,
                                            width:25,
                                        }}
                                        ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',
                            flex:0.9,   
                            flexWrap: 'wrap',
                            backgroundColor:'#FFF',
                            padding:5,
                            }}>
                        {this.state.initialArr.map((prop, key) => {
                            return (
                            <TouchableOpacity style={{
                                                        // borderWidth:1,
                                                        borderRadius:100,
                                                        backgroundColor:prop.text=="已簽到"?'rgba(226,235,246,0.4)':'',
                                                        width:55,
                                                        height:52,
                                                        justifyContent:'center',
                                                    }}>
                                <View style={{
                                                alignContent:'center',
                                                alignItems:'center',
                                                    }}>
                                    <Text style={{
                                                    color: prop.text=="已簽到"?'#01C5DE':'#5C6A6C',
                                                    borderWidth:prop.text=="已簽到"?1:0,
                                                    borderColor : prop.text=="已簽到"?'#01C5DE':'',
                                                    padding:2,
                                                    fontSize:prop.text=="已簽到"?16:18,
                                                    textAlign:'center'}}  key={key}>{prop.text}</Text>
                                </View>
                            </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'column',
                            flex:0.3,    
                            padding:10,
                            }}>
                <View style={{flexDirection:'column',
                            flex:1,   
                            backgroundColor:'#FFF' ,
                            padding:15,
                            // borderWidth:1,
                            shadowOffset:{  width:5,  height:5},
                            shadowColor: 'black',
                            shadowOpacity: 0.15,
                            borderRadius:10,
                            }}>
                    <View style={{flexDirection:'column',
                            flex:0.2,    
                            alignItems:'flex-start',
                            }}>
                        <Text style={{
                                fontSize:18,
                                textAlign:'center',
                                color:'#01C5DE'}}>好康資訊</Text>
                    </View>
                    <View style={{flexDirection:'row',
                            flex:0.8,    
                            alignItems:'flex-start',
                            }}>
                        <TouchableOpacity style={{  flexDirection:'column',
                                        flex:0.3,    
                                        padding:3,
                                        alignItems:'center',
                                        }}>
                            <Image source={require('../assets/Group_4_adsfsdf.png')}
                                    style={{
                                        width:80,
                                        height:80,
                                        resizeMode:'stretch',
                                    }}></Image>
                            <Text style={{
                                fontSize:16,
                                textAlign:'center',
                                marginTop:10,
                                color:'#5C6A6C'}}>看廣告送代幣</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{  flexDirection:'column',
                                        flex:0.3,    
                                        padding:3,
                                        alignItems:'center',
                                        }}>
                            <Image source={require('../assets/Group_2_dzxcvlkj.png')}
                                    style={{
                                        width:80,
                                        height:80,
                                        resizeMode:'stretch',
                                    }}></Image>
                            <Text style={{
                                fontSize:16,
                                textAlign:'center',
                                marginTop:10,
                                color:'#5C6A6C'}}>填寫問券</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{  flexDirection:'column',
                                        flex:0.3,    
                                        padding:3,
                                        alignItems:'center',
                                        }}
                                        onPress={()=>{
                                            //每日簽到任務
                                            this.DailySignInMission();
                                        }}
                                        >
                            <Image source={require('../assets/Group_30_adsfljl.png')}
                                    style={{
                                        width:80,
                                        height:80,
                                        resizeMode:'stretch',
                                    }}></Image>
                            <Text style={{
                                fontSize:16,
                                textAlign:'center',
                                marginTop:10,
                                color:'#5C6A6C'}}>每日簽到任務</Text>
                        </TouchableOpacity>
                        
                    </View>

                </View>
            </View>
        </SafeAreaView>
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
export default Page;