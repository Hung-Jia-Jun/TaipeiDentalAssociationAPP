// import * as React from 'react';
import MapView, { Marker,animateToRegion } from 'react-native-maps';
import React, { Component , useState} from "react";
import { Dimensions,Linking,Alert,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-資訊.png');
const filterButton_image = require('../assets/filterButton.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const footer_image = require('../assets/Footer.png');
const arrow_image = require('../assets/arrow.png');
const MapDetail = require('../assets/MapDetail.png');
const MapDetail_clinic = require('../assets/MapDetail_clinic.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class OverviewMap extends Component {
    constructor(props) {
        super(props);
        const MemberStoreList = require('../MemberStoreList.json');
        const ClinicTEL_List = require('../ClinicTEL_List.json');
        const carParkList = require('../CarParkList.json');

        this.state = {
            outline:false,
            region:null,
            zoomLevel:this.props.navigation.getParam('zoomLevel')==undefined?14:this.props.navigation.getParam('zoomLevel'),
            showDetail: false,
            showParkOrder : false,
            detailAddress: "台北市中山區",
            phone : "0225356756",
            openTime:"",
            status:"營業中",
            hireInfo : "徵才資訊 : 牙醫助理 1位 /  矯正醫師 1位",
            clinicURL : "官方網站 : https:/abcd.music.com.tw",
            education:"",

            DetailImage:require('../assets/DetailImage.png'),
            TaipeiGroupMarkerSize:{
                width:60,
                height:60
            },
            normalMarkerSize:{
                width:32,
                height:40
            },
            baseMarkers: MemberStoreList,
            markers: [],
            markerRadius: null,
            ClinicTELs : ClinicTEL_List,
            CarParkMark : carParkList,
            mapParameter : [
                            //地區
                            {key : 0 , text : "中正區" , toggled : true},
                            {key : 1 , text : "大同區" , toggled : true},
                            {key : 2 , text : "中山區" , toggled : true},
                            {key : 3 , text : "松山區" , toggled : true},
                            {key : 4 , text : "大安區" , toggled : true},
                            {key : 5 , text : "萬華區" , toggled : true},
                            {key : 6 , text : "信義區" , toggled : true},
                            {key : 7 , text : "士林區" , toggled : true},
                            {key : 8 , text : "北投區" , toggled : true},
                            {key : 9 , text : "內湖區" , toggled : true},
                            {key : 10 , text : "南港區" , toggled : true},
                            {key : 11 , text : "文山區" , toggled : true},

                            //搜尋類別
                            {key : 12 , text : '一般牙科', toggled : true},
                            {key : 13 , text : '矯正醫師', toggled : true},
                            {key : 14 , text : '兒童牙科', toggled : true},
                            {key : 15 , text : '口腔外科', toggled : true},
                            
                            //食衣住行育樂診所
                            {key : 16 , text: '食' , toggled : true},
                            {key : 17 , text: '衣' , toggled : true},
                            {key : 18 , text: '住' , toggled : true},
                            {key : 19 , text: '行' , toggled : true},
                            {key : 20 , text: '育' , toggled : true},
                            {key : 21 , text: '樂' , toggled : true},
                            {key : 22 , text: '診所' , toggled : true},

                            //Uspace
                            {key : 23 , text: '車位' , toggled : true}
                        ],
            mapviewCenter : {
                latitude: 25.034934,
                longitude: 121.522222,
            },
            region:{
                latitude: 25.034934,
                longitude: 121.522222,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05
            },
           
        }
        
        
    }
    onRegionChange(region){
        try
        {
            this.setState({mapParameter : JSON.parse(this.props.navigation.state.params.mapParameter)});
            // console.log(this.state.mapParameter);
        }
        catch (error)
        {
            // console.log(error);
        }
        this.setState({region:region,markers:[]});
        //最初始值是14左右，隨著放大會到18
        this.setState({zoomLevel : Math.log2(360 * (Dimensions.get('window').width/ 256 / region.longitudeDelta)) + 1});
      
    } 
    RegionChangeComplete() {
        //要做最近距離估算的排序
        var markDistance = {}

        //使用完後要清空
        if (this.props.navigation.getParam('zoomLevel')!=undefined)
        {
            this.props.navigation.setParams({zoomLevel: null});
        }
        var showKM = (this.state.zoomLevel*(-0.5))+10
        showKM = showKM > 3 ? 3 : showKM
        //顯示附近診所數量的限制值
        var showLimit = 100
        // var randomIndex;
        //如果他拉很遠
        if (this.state.zoomLevel < 15.5)
        {
            //那就只顯示北醫的Point
            this.state.outline = true;

            //顯示所有台北市的診所
            showKM = 100;
            showLimit = this.state.zoomLevel * 25
            this.state.markerRadius = 20;

            //地圖的上下邊界
            var marginTopLat = this.state.region.latitude + this.state.region.latitudeDelta
            var marginBottomLat = this.state.region.latitude - this.state.region.latitudeDelta

            //地圖的左右邊界
            var marginRightLng = this.state.region.longitude + this.state.region.longitudeDelta
            var marginLeftLng = this.state.region.longitude - this.state.region.longitudeDelta
            
            for (let index = 0; index < showLimit; index++) {
                const element = this.state.baseMarkers[index];
                for (var i = 0; i < this.state.mapParameter.length - 1; i++) 
                {
                    if (element.Area == this.state.mapParameter[i].text)
                    {
                        if (this.state.mapParameter[i].toggled == true)
                        {
                            this.state.markers.push(element);
                            continue;
                        }
                    }
                }
            }

            this.setState({markers:this.state.markers})
            return;
        }
        //近距離的顯示要多一點內容
        //顯示詳細資訊
        this.state.outline = false;
        this.state.baseMarkers.map((marker,index) => {
            // √ (a1 - b1)^2 + (a2-b2)^2
            var distance = Math.sqrt(Math.pow((marker.coordinates.latitude - this.state.region.latitude),2) + Math.pow((marker.coordinates.longitude - this.state.region.longitude),2))*100
            //依照動態zoom調整顯示範圍
            //y=-0.5x+10
            // 在zoom level 14時，要顯示3公里內的mark
            // 在zoom level 18時，要顯示1公里內的mark
            if (distance < showKM )
            {
                markDistance[index] = distance;
            }
        })
        // Create items array
        var items = Object.keys(markDistance).map(function(key) {
            return [key, markDistance[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        items.reverse();
    
        markDistance = items.slice(0, showLimit);
        // console.log(this.state.mapParameter);

        markDistance.map((marker,index) => {
            var marker = this.state.baseMarkers[parseInt(marker[0])];
            // 使用List篩選是否為要出現的區域
            var InArea = false
            try
            {
                for (var i = 0; i < this.state.mapParameter.length - 1; i++) 
                {
                    if (marker.Area == this.state.mapParameter[i].text)
                    {
                        if (this.state.mapParameter[i].toggled == true)
                        {
                            this.state.markers.push(marker);
                            continue;
                        }
                    }
                }
            }
            catch (error)
            {
                console.log(error);
            }
            
        })
        console.log("showKM : " + showKM , this.state.region);
        console.log("Zoom : " + this.state.zoomLevel);
        this.setState({markers:this.state.markers})
        console.log("marker count : " + this.state.markers.length)
        return;
        
    }

    OrderUspacePark = () =>{
        let UspaceUrl = "https://uspace.app.link/WDk6EQIyteb";
        Linking.canOpenURL(UspaceUrl).then((supported) => {
            if (!supported) {
                console.log('Can not handle UspaceUrl:' + UspaceUrl)
            } else {
                return Linking.openURL(UspaceUrl)
            }
        }).catch(error => console.log('tel error', error))
    }

    callTELToClinic = () =>{
        let tel = 'tel:' + this.state.phone;
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
            console.log('Can not handle tel:' + tel)
            } else {
            return Linking.openURL(tel)
            }
        }).catch(error => console.log('tel error', error))
    }
    callToGoogleMapNavigation = () =>{
        var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + this.state.detailAddress;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err)); 
    }
    ClinicOnClick = (marker,fromSearchPage) => {
       
        if (marker.type == "park")
        {
            this.state.clinicURL = "";
            this.state.hireInfo = "";

            //關閉顯示牙醫診所的更多資訊
            this.state.showDetail = false;

            //打開可以讓客戶預約停車位的Button
            this.state.showParkOrder = true;
        }
        else
        {
            var i;
            var phone = "尚未提供電話";
            this.state.hireInfo = "徵才資訊 : 牙醫助理 1位 /  矯正醫師 1位";
            this.state.clinicURL = "官方網站 : https:/abcd.music.com.tw";
            for (i = 0; i < this.state.ClinicTELs.length; i++) {
                //找到符合的診所了
                if (this.state.ClinicTELs[i]["clinicName"] == marker.title)
                {
                    phone = this.state.ClinicTELs[i]["TEL"];
                    break
                }
            }
            this.state.showDetail = true;
            this.state.showParkOrder = false;

        }
        this.setState({ showDetail: this.state.showDetail,
                        title : marker.title,
                        openTime : marker.openTime,
                        detailAddress : marker.detailAddress,
                        education : marker.education,
                        phone : phone,
                        hireInfo : this.state.hireInfo,
                        clinicURL : this.state.clinicURL,
                        showParkOrder : this.state.showParkOrder,
                    });
        
        //當從搜尋頁面過來時，就要拉近到一個程度，但是日常滑動就要可以自由讓用戶設定縮放大小
        if (fromSearchPage==false)
        {
            this.mapRef.animateToRegion({ latitude : marker.coordinates.latitude,
                                            longitude : marker.coordinates.longitude,
                                            latitudeDelta : this.state.region.latitudeDelta,
                                            longitudeDelta : this.state.region.longitudeDelta,
                                        }, 0);
        }
        else
        {
            this.mapRef.animateToRegion({ latitude : marker.coordinates.latitude,
                longitude : marker.coordinates.longitude,
                latitudeDelta : 0.0027820971210203993,
                longitudeDelta :  0.001419559121131897,
            }, 0);
        }
                    
    }
    showPassMarker()
    {
        //從其他頁面要顯示過來的Marker
        //一般都是從Search那邊過來的
        var passMarker = this.props.navigation.getParam('passMarker');
        if (passMarker!=undefined)
        {
            console.log(passMarker.coordinates);
            this.ClinicOnClick(passMarker,true);
        }
    }
    debounce(fun, delay) {
		return function (args) {
			let that = this
			let _args = args
			// 每次執行的時候重置setTimeout
			clearTimeout(fun.time)
			fun.time = setTimeout(function () {
				// 執行傳入的fun1(透過call方法傳遞參數_args)
				fun.call(that, _args)
			}, delay)
		}
	}
    componentDidMount()
    {
       
        var newbaseMark = [];
        for (var index = 0; index < this.state.baseMarkers.length; index++) 
        {
            var clinic = this.state.baseMarkers[index];
            clinic["type"] = "clinic";
            clinic["key"] = index;
            newbaseMark.push(clinic);
        }
        for (var index = 0; index < this.state.CarParkMark.length; index++) 
        {
            var park = this.state.CarParkMark[index];
            park["type"] = "park";
            park["key"] = this.state.baseMarkers.length + index;
            newbaseMark.push(park);
        }
        this.setState({baseMarkers : newbaseMark},()=>this.RegionChangeComplete(this));
        this.showPassMarker();
    }
    render() {

        return (
            <View  style={styles.borderBlackLine,{flex:1}}>
            <View style={styles.container,{flex: 3, flexDirection: 'column',borderWidth:1,
                                        borderColor:'black'}}>
                <View style={{flexDirection: 'column',
                                zIndex: 1,
                                flex:0.84,
                                }}>
                    <Image source={overviewMapTopper_image} style={
                                        {
                                        marginTop: (height /10)*0.4,
                                        resizeMode:'stretch',
                                        width:width}}></Image>
                        <View style={{
                                        flex:1,
                                        
                                        flexDirection:'row',
                                    }}>
                            <View style={{flex:0.1,
                                        }}></View>
                            <View style={{flex:0.5,
                                            alignItems:'flex-start'
                                        }}>
                                <Text style={{
                                                justifyContent:'center',
                                                alignContent:'center',
                                                color:'#47DCEF',
                                                flex:0.5,
                                                fontSize:28,
                                                height:60,
                                                marginTop: -(height/10) *1.5,
                                                }}>Hi {global.username}</Text>
                            </View>
                            <View style={{flex:0.5,
                                        }}></View>
                            <View style={{flex:0.5,
                                            alignItems:'flex-end'
                                        }}>
                                <TouchableOpacity style={{
                                        alignItems:'center',
                                        justifyContent:'center',
                                        
                                        height:60,
                                        width:60,
                                        marginTop: -(height/10) *1.5,
                                    }} 
                                    onPress={()=>{
                                            let UspaceUrl = "https://uspace.app.link/WDk6EQIyteb";
                                            Linking.canOpenURL(UspaceUrl).then((supported) => {
                                                if (!supported) {
                                                    console.log('Can not handle UspaceUrl:' + UspaceUrl)
                                                } else {
                                                    return Linking.openURL(UspaceUrl)
                                                }
                                            }).catch(error => console.log('url error', error))
                                    }}>
                                        <Image source={require('../assets/uspaceLogo.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:0.1}}></View>
                        </View>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.01, flexDirection: 'row',
                        zIndex: 1,}}>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:145,
                        borderRadius:30,
                        backgroundColor:'#8E949B',
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:width < guidelineBaseWidth ? WidthScale(20) : WidthScale(29) ,
                        marginTop:(height /10)*0.32,
                    }} 
                    onPress={()=>this.props.navigation.push('OverviewMap')}>
                    <Text style={styles.borderBlackLine,{marginStart:WidthScale(23),fontSize:16,marginTop:HeightScale(15),color:'white'}}>診所/人力/車位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity id={'foodFilterBtn'} style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(145),
                        borderRadius:30,
                        backgroundColor:'#F9FCFF',
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:width < guidelineBaseWidth ? WidthScale(10) : WidthScale(15) ,
                        marginTop:(height /10)*0.32,
                    }} onPress={()=>this.props.navigation.push('Food')}>
                    <Text style={styles.borderBlackLine,{marginStart:WidthScale(40),fontSize:16,marginTop:HeightScale(15)}}>食衣住行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:HeightScale(50),
                        width:WidthScale(50),
                        shadowOffset:{  width:WidthScale(5),  height:HeightScale(5)},
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        marginStart:WidthScale(15),
                        marginTop:(height /10)*0.32,
                    }} onPress={()=>this.props.navigation.push('FilterStroe')}>
                    <Image source={filterButton_image} style={styles.borderBlackLine,{marginStart:WidthScale(5)}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.14, flexDirection: 'row',
                        zIndex: 1,}}>
                    {this.state.showParkOrder ? (
                            <TouchableOpacity style={styles.button,{
                                    backgroundColor:'#4A68E2',
                                    borderRadius : 50,
                                    borderWidth : 3,
                                    borderColor : 'white',
                                    marginTop : (height / 10) * 6.5 ,
                                    marginStart : (width / 10) * 3.7,
                                    height: HeightScale(60),
                                    alignItems:'center',
                                    justifyContent:'center',
                                    zIndex:1,        
                                    width:WidthScale(120),
                                }} onPress={()=>this.OrderUspacePark()}>
                                    
                                <Text style={{ 
                                        color:'white' ,
                                        fontSize : 18,
                                        zIndex:1,        
                                                }}>立即預約</Text>
                            </TouchableOpacity>
                    ) :null}
                    {this.state.showDetail ? (
                        <View>
                            <Image
                                source={MapDetail_clinic}
                                style={styles.borderBlackLine,{resizeMode:'cover',
                                        width:WidthScale(415),  
                                        height:height < guidelineBaseHeight ? HeightScale(315) : HeightScale(279),
                                        marginTop:(height/10)*4.6,
                                        marginStart:WidthScale(6) }}>
                            </Image>
                            <Image
                                source={this.state.DetailImage}
                                style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ?  HeightScale(-230) : HeightScale(-200),
                                        marginStart:WidthScale(30),
                                        width:WidthScale(143),
                                        height: height < guidelineBaseHeight ?  HeightScale(130) : HeightScale(100),
                                        borderWidth:3,
                                        borderRadius:8,
                                        borderColor:'white'}}>
                            </Image>
                            <View style={styles.borderBlackLine,{flex:1,flexDirection:'column',marginTop:HeightScale(-75),marginStart:WidthScale(12),width:WidthScale(width)}}>
                                <View style={styles.borderBlackLine,{flex:1,flexDirection:'row',marginTop:HeightScale(0),width:width}}>
                                    <TouchableOpacity style={styles.borderBlackLine,{marginTop:HeightScale(-102),
                                                                                    marginStart:WidthScale(210),
                                                                                    width:WidthScale(80),
                                                                                    height:HeightScale(35)}}
                                                        onPress={() => this.callToGoogleMapNavigation()}>
                                        <Text style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ? HeightScale(-25) : HeightScale(12),
                                                                            marginStart:width < guidelineBaseWidth ? WidthScale(27) : WidthScale(30),
                                                                            fontSize:16,
                                                                            color:'#47DCEF'}}>導航</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.borderBlackLine,{marginTop:HeightScale(-102),
                                                                marginStart:WidthScale(5),
                                                                width:WidthScale(80),
                                                                height:HeightScale(35),
                                                                }}
                                                        onPress={() => this.callTELToClinic()}
                                                        >
                                        <Text style={styles.borderBlackLine,{marginTop:height < guidelineBaseHeight ? HeightScale(-25) : HeightScale(12),
                                                                            marginStart:width < guidelineBaseWidth ? WidthScale(30) : WidthScale(40),
                                                                            fontSize:16,
                                                                            color:'#47DCEF'}}>電話</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{marginTop:height < guidelineBaseHeight ?  HeightScale(-110) : HeightScale(-75),
                                                textAlign:'center',
                                                marginStart: width < guidelineBaseWidth ? WidthScale(30) :  WidthScale(23),
                                                fontSize:15,
                                                height:HeightScale(20),
                                                width: WidthScale(80), 
                                                color:'#00606C'}}>{this.state.education}</Text>

                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(20),
                                    marginStart:WidthScale(187),
                                    height:HeightScale(50),
                                    width:WidthScale(210),
                                    color:'#00606C',
                                    fontSize:20}}>{this.state.title}</Text>
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(-10),
                                    marginStart:WidthScale(210),
                                    width:WidthScale(180),
                                    height:HeightScale(60),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.detailAddress}</Text>
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(-10),
                                    marginStart:WidthScale(210),
                                    width:WidthScale(180),
                                    height:HeightScale(60),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.phone}</Text>
                                <Image
                                source={require('../assets/locationMark.png')}
                                style={styles.borderBlackLine,{resizeMode:'cover',
                                        width:WidthScale(19),  
                                        height:HeightScale(19),
                                        marginTop:HeightScale(-110),
                                        marginStart:WidthScale(187) }}>
                                </Image>
                                <Image
                                    source={require('../assets/PhoneCall.png')}
                                    style={styles.borderBlackLine,{resizeMode:'cover',
                                            width:WidthScale(19),  
                                            height:HeightScale(19),
                                            marginTop:HeightScale(32),
                                            marginStart:WidthScale(187) }}>
                                </Image>
                                <Image
                                    source={require('../assets/Path.png')}
                                    style={styles.borderBlackLine,{resizeMode:'cover',
                                            width: width < guidelineBaseWidth ? WidthScale(390) :  WidthScale(413),
                                            height:HeightScale(5),
                                            marginTop:height < guidelineBaseHeight ? HeightScale(45) :  HeightScale(20),
                                            marginStart:width < guidelineBaseWidth ? WidthScale(5) :  WidthScale(-5)}}>
                                </Image>
                                
                            </View>
                            <View style={styles.borderBlackLine,{flex:10,width:100,height:100}}>
                                 <Text style={styles.borderBlackLine,{marginTop: height < guidelineBaseHeight ? HeightScale(90) :  HeightScale(105),
                                    marginStart:WidthScale(30),
                                    width:WidthScale(380),
                                    height:HeightScale(25),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.hireInfo}</Text>
                                <Text style={styles.borderBlackLine,{marginTop:HeightScale(0),
                                    marginStart:WidthScale(30),
                                    width:WidthScale(380),
                                    height:HeightScale(25),
                                    fontSize:15,
                                    color:'#00606C'}}>{this.state.clinicURL}</Text>
                            </View>
                            <TouchableOpacity style={styles.borderBlackLine,{
                                    height: height < guidelineBaseHeight ?  HeightScale(350) : HeightScale(400),
                                    width:width,
                                    marginStart:WidthScale(0),
                                    marginTop:height < guidelineBaseHeight ?  HeightScale(-490) : HeightScale(-500),
                                }} onPress={() => this.setState({ showDetail: false})}>
                            </TouchableOpacity> 
                        </View>
                    ) : null}
                </View>
                <View style={{flex: 5.15,
                        backgroundColor:'white',
                        flexDirection: 'column', 
                        // height:Dimensions.get('screen').height*0.8,
                        // width:width,
                        // marginStart:WidthScale(27),
                        marginTop:HeightScale(-100),
                        zIndex:0
                        }}>
                    <MapView 
                        // ref = {this.mapRef}
                        ref={ref => {
                            this.mapRef = ref
                        }}
                        
                        provider="google"
                        customMapStyle={mapStyle}
                        onRegionChange = {this.onRegionChange.bind(this)}
                        onRegionChangeComplete={this.RegionChangeComplete.bind(this)}
                       
                        initialRegion={{
                            latitude: this.state.mapviewCenter.latitude,
                            longitude: this.state.mapviewCenter.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05
                        }}
                        onMapReady={()=>{
                            console.log("Done");
                            // this.RegionChangeComplete(this);
                            this.showPassMarker()
                        }}
                        style={styles.borderBlackLine,{
                            flexDirection: 'column', 
                            height:Dimensions.get('screen').height,
                            width:width}}>
                              
                        {this.state.markers.map((marker,index) => (
                                <View>
                                    <Marker coordinate={marker.coordinates} 
                                        key={index}
                                        title={this.state.outline == false ? marker.title : null}
                                        onPress={() => {this.state.outline == false ? this.ClinicOnClick(marker,false) : null}}
                                        >
                                        {marker.education == "北醫" ? ( <Image
                                            source={this.state.outline == false ? require('../assets/Marker_TaipeiGroup.png') : null}
                                            style={styles.borderBlackLine,{width:this.state.outline == false ? this.state.TaipeiGroupMarkerSize.width : this.state.markerRadius,
                                                                            height:this.state.outline == false ? this.state.TaipeiGroupMarkerSize.height : this.state.markerRadius,
                                                                            zIndex:1,
                                                                            borderRadius: this.state.outline == true ?  200 : null,
                                                                            backgroundColor: this.state.outline == true ? '#01C5DE' : null,
                                                                            borderWidth: this.state.outline == true ? 3 : null,
                                                                            borderColor: this.state.outline == true ? '#FFFF' : null,
                                                                            }}
                                            resizeMode="contain"
                                        />): marker.type == "park" ?
                                        (
                                            <Image
                                                source={this.state.outline == false ? require('../assets/uspace.png') : null}
                                                style={{
                                                    width:this.state.normalMarkerSize.width + 10,
                                                    height:this.state.normalMarkerSize.height + 10,
                                                    fontSize:20,
                                                    zIndex:1}}
                                                    resizeMode="contain"
                                                    />
                                        )
                                        : 
                                        (
                                            <Image
                                                source={this.state.outline == false ? require('../assets/otherStore.png') : null}
                                                style={{width:this.state.normalMarkerSize.width,height:this.state.normalMarkerSize.height,zIndex:1}}
                                                resizeMode="contain"
                                            />
                                        )
                                    }
                                    </Marker> 

                                </View>
                            ))}
                        
                            
                    </MapView>
                    
                    
                </View>
                <View style={styles.borderBlackLine,{flex: 0.01,zIndex:3, flexDirection: 'column'}}>
                    <Image source={footer_image} style={styles.borderBlackLine,
                                                        {marginStart:WidthScale(0),
                                                        marginTop:height < guidelineBaseHeight ? HeightScale(-10) : HeightScale(0),
                                                        width:width}}></Image>
                </View>
                <View style={styles.borderBlackLine,{flex: 0.5,zIndex:3, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(30),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.push('MainMenu')}>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(21),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.push('Search')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(39),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.push('OverviewMap')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(35),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.push('Notifycation')}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height:height < guidelineBaseHeight ? HeightScale(60) : HeightScale(50),
                        width:WidthScale(50),
                        marginStart:WidthScale(20),
                        marginTop:HeightScale(10),
                       
                    }} onPress={()=>this.props.navigation.push('Profile')}>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
}


const mapStyle = [{
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const styles = StyleSheet.create({
    title:{},
    borderBlackLine:{
        borderColor:'black',
        borderWidth:1
    },
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
        height:HeightScale(50),
        width:255,
        marginStart:WidthScale(60),
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6"
        },
    UsernameTextInputclass:{
        height:HeightScale(50),
        width:255,
        marginStart:WidthScale(60),
        marginBottom: 15,
        borderColor: '#ECF2F6',
        borderWidth: 1,
        borderRadius: 10 ,
        backgroundColor : "#ECF2F6",
    },
});
export default OverviewMap;
