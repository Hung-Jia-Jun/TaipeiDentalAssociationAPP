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
        <Item _this={this} jobCategory={item.jobCategory} skill={item.skill} title={item.title} item_image={item.item_image} discription={item.discription}/>
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
                                                height:40}}>
                        <Text style={{marginTop:12,fontSize:15,color:'#3FEEEA',textAlign:'center'}}>求職</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:Dimensions.get('window').height*0,
                                                marginEnd: Dimensions.get('window').width*0.12,
                                                zIndex:0,
                                                width:100,
                                                height:40}} 
                                                onPress={()=>this.props.navigation.navigate('ClinicRecruitment')}>
                        <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>求才</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.1,
                                flexDirection: 'row',
                                }}>
                    <View style={{flex: 0.2,
                                alignContent:'center',
                                }}>
                    </View>
                    <View style={{flex: 0.5,
                                width:Dimensions.get('window').width*0.1,
                                alignContent:'center',
                                height:Dimensions.get('window').height*0.004,
                                backgroundColor:'#43D1E3',
                                flexDirection: 'row',
                                }}>
                    </View>
                       <View style={{flex: 1,
                                width:Dimensions.get('window').width*0.2,
                                height:Dimensions.get('window').height*0.004,
                                backgroundColor:'#E2EBF6',
                                flexDirection: 'row',
                                }}>
                    </View>
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




const Item = ({ _this,title,jobCategory,skill,item_image,discription}) => (
    <TouchableOpacity style={styles.button,{
                height: Dimensions.get('window').height*0.14,
                shadowOffset:{  width: 5,  height: 5},
                shadowColor: 'black',
                shadowOpacity: 0.2,
                width:Dimensions.get('window').width,
                borderColor:'black',
                marginStart: 0,
                zIndex:0,
                marginTop:0,
                marginBottom:Dimensions.get('window').height*0.02,
            }} onPress={() => _this.props.navigation.navigate('')}>
        <View style={{
                        height:Dimensions.get('window').height*0.15,
                        backgroundColor:'white',
                        flex:1,
                        flexDirection:'row',
                        }}>
            <View style={styles.container,{flex: 0.35,
                            flexDirection: 'column',
                            justifyContent:'center',
                            }}>
                <Image source={ item_image } style={{  width: Dimensions.get('window').width*0.16,
                                                        height: Dimensions.get('window').height*0.09,
                                                        // marginTop: Dimensions.get('window').height*0.03,
                                                        marginStart: Dimensions.get('window').width*0.04,
                                                        borderRadius:100,
                                                        resizeMode:'cover',}}></Image>
            </View>
            <View style={styles.container,{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 0.1}}></View>
                <View style={{flex: 0.3}}>
                    <Text style={{
                        width:230,
                        height:Dimensions.get('window').height*0.04,
                        // marginTop: -Dimensions.get('window').height*0.13,
                        marginLeft: 0,
                        fontSize:17,
                        color:'black'}}>
                            {title}
                    </Text>
                </View>
                <View style={{flex: 0.2}}>
                    <Text style={{
                        width:230,
                        height:Dimensions.get('window').height*0.04,
                        // marginTop: 0,
                        marginLeft: 0,
                        fontSize:12,
                        color:'gray'}}>
                            {skill}
                    </Text>
                </View>
                
                <View style={{flex: 0.1,
                                flexDirection:'row',
                                }}>
                    {
                        _this.showJobCategory(_this,jobCategory)
                    }
                </View>
            </View>
            
        </View> 
    </TouchableOpacity>
);

const DATA = [
    {
        key: '0',
        title: 'Ethan',
        jobCategory:['全職','PGY'],
        skill:'兒童口腔外科',
        item_image : require('../assets/HumanResources/AccountPhoto.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
    },  
    {
        key: '1',
        title: 'John',
        jobCategory:['兼職','PGY'],
        skill:'兒童口腔外科',
        item_image : require('../assets/HumanResources/AccountPhoto.png'),
        discription:'oo精密齒模公司公司簡介：數十年牙科齒模製作經驗的我們,秉持勤懇秉持勤...',
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