import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

//NotifycationTopper.png
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const Back_image = require('../assets/Announcement_icon/Back.png')


class Message extends Component {
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
		<Item _this={this} description={item.description} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
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
                        }} onPress={()=>this.props.navigation.navigate('MainMenu')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>人力銀行區</Text>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginTop:0,
                            marginEnd: Dimensions.get('window').width*0.02,
                        }} onPress={()=>this.props.navigation.navigate('')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image></Image>
                            </View>
                        </TouchableOpacity>
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
                                                height:40}}
                                                onPress={()=>this.props.navigation.navigate('ClinicRecruitmentHumanSupport')}>
                        <Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center'}}>求職</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:Dimensions.get('window').height*0,
                                                marginEnd: Dimensions.get('window').width*0.12,
                                                zIndex:0,
                                                width:100,
                                                height:40}} >
                        <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>求才</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.1,
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
                    </View>
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
						data={DATA}
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




const Item = ({ _this,title,description,item_image,sceneName }) => (
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
            }} onPress={() => _this.props.navigation.navigate(sceneName)}>
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
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.02,
                            marginStart: Dimensions.get('window').width*0.32,
                            fontSize:16,
                            color:'black'
                            }}>
                                {title}
                </Text>
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.048,
                            marginStart: Dimensions.get('window').width*0.32,
                            fontSize:16,
                            width: Dimensions.get('window').width*0.6,
                            height: Dimensions.get('window').height*0.07,
                            color:'gray'
                            }}>
                                {description}
                </Text>
            </TouchableOpacity>
        </View>

);



const DATA = [
	{
		key: '0',
		title: '好美麗診所',
		item_image : require('../assets/DetailImage.png'),
		sceneName:'StudentDepartmentAssociationAnnouncementDetail',
        description:'兒童牙科',
	},
    {
		key: '1',
		title: '牙齒美白診所',
		item_image : require('../assets/Announcement_icon/listicon2.png'),
		sceneName:'StudentDepartmentAssociationAnnouncementDetail',
        description:'口腔外科',
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