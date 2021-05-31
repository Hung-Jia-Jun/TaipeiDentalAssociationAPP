import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";




const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/AcademicEvents_icon/Footer.png')
const Back_image = require('../assets/Announcement_icon/Back.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');
class Page extends Component {
   render() {
	const renderItem = ({ item }) => (
		<Item _this={this} date={item.date} endDate={item.endDate} description={item.description} location={item.location} title={item.title} item_image={item.item_image} sceneName={item.sceneName} />
	);
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
                        }} onPress={()=>this.props.navigation.navigate('EventRegistration')}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>活動報名詳細資訊</Text>
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
            <View style={{flex:1.8,
                            alignItems:'center',
                                }}>
                    <Image source={require('../assets/EventRegistration_icon/EventImage.png')}
                            style={{
                                    flex:0.9,
                                    resizeMode:'contain',
                                    marginTop: Dimensions.get('window').height*0.07,
                                    }}></Image>
            </View>
            <View style={{flex: 2.5,
								flexDirection: 'column',
								}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						style={{backgroundColor:'#EBF0F3'}}
						renderItem={renderItem}
						keyExtractor={item => item.key.toString()}
					/>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
            </View>
            <View style={{flex: 0.5,
                            flexDirection: 'row',
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                    height: 50,
                    width:50,justifyContent:'center',
                    alignItems:'center',
                    marginStart: Dimensions.get('window').width*0.051,
                    marginTop:Dimensions.get('window').height*0.01,
                }} onPress={()=>alert("已加入我的最愛")}>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button,{
                    width: Dimensions.get('window').width*0.77,
                    height: Dimensions.get('window').height*0.08,
                    justifyContent:'center',
                    alignItems:'center',
                    marginStart: Dimensions.get('window').width*0.03,
                }} onPress={()=>alert("報名成功")}>
                    <Text style={{
                                position: 'absolute',
                                justifyContent:'center',
                                // marginTop: Dimensions.get('window').height*0,
                                // marginStart: Dimensions.get('window').width*0,
                                fontSize:18,
                                color:'white'
                                }}>
                                    立即報名
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}


const DATA = [
	{
		key: '0',
		title: '【 管樂社 】2020年度公演',
		item_image : require('../assets/EventRegistration_icon/EventImage.png'),
		sceneName:'',
        date:'2020.12.30 10:00-12:00',
        endDate : '2020.12.25',
        location : '國父紀念館',
        description:'2020音樂之夜Music Night浮世情深\n─向曼紐因致敬\n信念是江海上的恆星，\n讓人在隨波漂流時，\n有了安定，有了慰藉，也有了繼續往\n前的勇氣。',
	}
];

const Item = ({ _this,title,date,item_image,sceneName,endDate,location,description }) => (
         <View style={{flex: 5,
            marginStart:Dimensions.get('window').width*0.02,
            width:Dimensions.get('window').width*0.95,
            backgroundColor : '#FFFFFF',
            flexDirection: 'row',
            height:Dimensions.get('window').height,
            shadowOffset:{  width:0,  height:5},
            shadowColor: 'black',
            shadowOpacity: 0.1,
            justifyContent:'space-between'}}>
                <Text style={{
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height*0.01,
                            marginStart: Dimensions.get('window').width*0.05,
                            fontSize:25,
                            color:'black'
                            }}>
                                {title}
                </Text>
                <Image source={require('../assets/AcademicEvents_icon/meeting.png')}
                style={{
                    marginTop: Dimensions.get('window').height*0.08,
                    marginStart: Dimensions.get('window').width*0.05,
                    width: Dimensions.get('window').width*0.05,
                    height: Dimensions.get('window').height*0.03,
                    resizeMode:'contain',
                }}
                ></Image>
                <View style={{flex:1.8,
                            marginTop:Dimensions.get('window').height*0.08,
                            flexDirection:'column',
                            alignItems:'center',
                                }}>

                    <Text style={{
                        position: 'absolute',
                        fontSize:16,
                        width: Dimensions.get('window').width*0.76,
                        height: Dimensions.get('window').height*0.04,
                        color:'#47DCEF'
                    }}>
                                    {date}
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*0.05,
                        fontSize:14,
                        width: Dimensions.get('window').width*0.76,
                        height: Dimensions.get('window').height*0.04,
                        color:'#FF7CB4'
                    }}>
                                    {"報名截止日期：" + endDate}
                    </Text>
                    
                    <Text style={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*0.1,
                        marginStart: Dimensions.get('window').width*2,
                        fontSize:14,
                        width: Dimensions.get('window').width*0.76,
                        height: Dimensions.get('window').height*0.04,
                        color:'#01C5DE'
                    }}>
                                    {"      "+location}
                    </Text>
                     <Image source={require('../assets/AcademicEvents_icon/locationMark.png')}
                        style={{
                            marginTop: Dimensions.get('window').height*0.1,
                            marginStart: Dimensions.get('window').width*0.73 * -1,
                            width: Dimensions.get('window').width*0.05,
                            height: Dimensions.get('window').height*0.03,
                            resizeMode:'contain',
                        }}
                    ></Image>
                    <Text style={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*0.15,
                        marginStart: Dimensions.get('window').width*2,
                        fontSize:14,
                        width: Dimensions.get('window').width*0.76,
                        height: Dimensions.get('window').height,
                        color:'black'
                    }}>
                                    {description}
                    </Text>
                </View>
             
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
export default Page;