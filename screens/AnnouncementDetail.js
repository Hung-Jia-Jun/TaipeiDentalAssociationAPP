import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import Swiper from 'react-native-swiper'




const Topper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/AcademicEvents_icon/Footer.png')
const Back_image = require('../assets/Announcement_icon/Back.png')
const Schedule_image = require('../assets/Announcement_icon/Schedule.png')

const image = require('../assets/b-校友會公告.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


class Page extends Component {
    constructor(props) {
		super(props);
		this.state = {
			DATA : [],
            showAnnounceDetail : false,
		}
	}
    componentDidMount()
    {
        var _DATA = [];
        _DATA = [
            {
                key: '0',
                title : this.props.navigation.getParam('subTitle'),
                item_image : this.props.navigation.getParam('subPageImage'),
                description: this.props.navigation.getParam('subDescription'),
            }
        ];
        this.setState({DATA:_DATA , showAnnounceDetail:true});
    }
    showScrollImage = (_this) => {
        const imageScrollViews = [];
        var i = 0;
        _this.state.DATA.forEach(e=>{
            e.item_image.forEach(ele=>{
                imageScrollViews.push(
                    <View key={i.toString()} style={styles.slide}>
                        <Image source={ { uri: ele } } style={{
                            width : WidthScale(315),
                            height:HeightScale(200),
                            resizeMode : 'contain',
                    }}></Image> 
                    </View>
                )
                i++;
                console.log(ele);

            })
        })
        return imageScrollViews;
    }
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
                        }} onPress={()=>this.props.navigation.goBack()}>
                            <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center',}}>
                                <Image source={Back_image}></Image>
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:18,
                                        color:'white'}}>{this.props.navigation.getParam('title')}</Text>
                        <TouchableOpacity style={styles.button,{
                            height: 50,
                            width:50,
                            marginTop:0,
                            marginEnd: Dimensions.get('window').width*0.02,
                        }}>
                        </TouchableOpacity>
            </View>
            <View style={{flex:1.8,
                            alignItems:'center',
                                }}>
                    {this.state.showAnnounceDetail?
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                    {this.showScrollImage(this)}
                            </Swiper>
                        :null}
            </View>
            <View style={{flex: 2.5,
								flexDirection: 'column',
								}}>
                    {this.state.showAnnounceDetail?
                        <FlatList
                        contentContainerStyle={{ marginTop: 0}}
                        data={this.state.DATA}
                        style={{backgroundColor:'#EBF0F3'}}
                        renderItem={renderItem}
                        keyExtractor={item => item.key.toString()}
                        />
                    :null}
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
            </View>
            <View style={{flex: 0.5,
                            flexDirection: 'row',
                            justifyContent:'space-between'}}>
            </View>
        </View>
    );
  }
}


const Item = ({ _this,title,item_image,description }) => (
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
                            fontSize:20,
                            width:Dimensions.get('window').width*0.9,
                            color:'black'
                            }}>
                                {title}
                </Text>
                
                <View style={{flex:1.8,
                            flexDirection:'column',
                            alignItems:'center',
                                }}>
                    <Text style={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*0.1,
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
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
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