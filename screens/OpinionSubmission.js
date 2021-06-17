import React, { Component,useState } from "react";
import { ToggleButton } from 'react-native-paper';
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";



const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/AcademicEvents_icon/Footer.png')
const Back_image = require('../assets/Announcement_icon/Back.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');

class Page extends Component {

    render() {
    return (
        <View style={{flex: 3, flexDirection: 'column'}}>
            <View style={{flex:0.4,
								flexDirection: 'column',
								zIndex: 1}}>
                    <Image source={Topper_image} style={
                                        {marginTop: 0,
										zIndex:0,
										width:Dimensions.get('window').width,
										height:Dimensions.get('window').height*0.2,
                                        resizeMode:'stretch',
                                        width:Dimensions.get('window').width}}></Image>
                    
            </View>
             
            <View style={{flex: 0.15,
                            zIndex:1,
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            }}>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginStart: 0,
                            marginTop:0,
                            marginStart: Dimensions.get('window').width*0.02,
                        }} onPress={()=>this.props.navigation.push('MainMenu')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>意見投書</Text>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginTop:0,
                            marginEnd: Dimensions.get('window').width*0.02,
                        }} onPress={()=>this.props.navigation.push('Schedule')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image></Image>
                            </View>
                        </TouchableOpacity>
            </View>
            <View style={{flex:0.00001,
                            alignItems:'center',
                                }}>
                  
            </View>
            <View style={{flex: 4.5,
								flexDirection: 'column',
								}}>
				<View style={{flex: 1, flexDirection: 'column',
                             }}>
                    <View style={{flex: 0.15,
                                flexDirection: 'column',
                                        }}>
                    </View>
                    <View style={{flex: 1,
                                flexDirection: 'column',
                                        }}>
                        <View style={{flex: 0.08,
                                flexDirection: 'row',
                                        }}>
                            <View style={{flex: 0.11,
                                flexDirection: 'row',
                                        }}>

                            </View>
                            <View style={{flex: 0.2,
                                            flexDirection: 'row',
                                            justifyContent:'flex-start',
                                            alignItems:'center',
                                        }}>
                                <Text style={{fontSize:18,
                                                textAlign:'center',
                                                        color:'black'}}>姓名 : </Text>

                            </View>
                            <View style={{flex: 0.8,
                                            flexDirection: 'row',
                                        }}>
                                <View style={{flex: 0.6,
                                    flexDirection: 'column',
                                }}>
                                    <TextInput style={{
                                                        flex:1,
                                                        borderColor: '#B9C2CC',
                                                        borderRadius: 1 ,
                                                        backgroundColor : "#FFF",
                                                        }}
                                        placeholder = '    username'
                                        class = 'placeholder'
                                        />
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 0.2,
                                flexDirection: 'row',
                                        }}>
                            <View style={{flex: 0.1,
                                flexDirection: 'row',
                                        }}>

                            </View>
                            <View style={{flex: 0.8,
                                                flexDirection: 'row',
                                                justifyContent:'flex-start',
                                                alignItems:'center',
                                        }}>
                                <Text style={{fontSize:18,
                                                textAlign:'center',
                                                        color:'black'}}>問題描述 : </Text>

                            </View>
                           
                        </View>
                        <View style={{flex: 0.3,
                                flexDirection: 'row',
                                        }}>
                            <View style={{flex: 0.13,
                                flexDirection: 'row',
                                        }}>

                            </View>
                            <View style={{flex: 1.2,
                                            flexDirection: 'row',
                                        }}>
                                <View style={{flex: 0.8,
                                    flexDirection: 'column',
                                }}>
                                    <TextInput style={{
                                                        flex:1,
                                                        borderColor: '#B9C2CC',
                                                        borderRadius: 1 ,
                                                        backgroundColor : "#FFF",
                                                        }}
                                        multiline = {true}
                                        placeholder = '請輸入您想表達的意見'
                                        class = 'placeholder'
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
            </View>
            <View style={{flex: 0.5,
                        backgroundColor:'#43D1E3',
                            flexDirection: 'column'}}>
                <View style={{flex: 0.8, flexDirection: 'column',
                    }}>
                    <TouchableOpacity style={styles.button,{
                        justifyContent:'center',
                        flex:1,
                    }} 
                     onPress={()=>alert("您的意見已送出")}>
                       
                        <Text style={{
                            fontSize:18,
                            textAlign:'center',
                            color:'white'
                        }}>
                                    送出意見回饋
                        </Text>
                    </TouchableOpacity>
                </View>
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
export default Page;