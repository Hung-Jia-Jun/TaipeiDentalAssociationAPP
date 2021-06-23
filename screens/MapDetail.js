// import * as React from 'react';
import MapView, { Marker,animateToRegion } from 'react-native-maps';
import React, { Component , useState} from "react";
import { Dimensions,Linking,Alert,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";
import Geojson from 'react-native-geojson';

const image = require('../assets/b-圖資-資訊.png');
const filterButton_image = require('../assets/filterButton.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');
const footer_image = require('../assets/Footer.png');
const arrow_image = require('../assets/arrow.png');
const MapDetail = require('../assets/MapDetail.png');
const MapDetail_clinic = require('../assets/MapDetail_clinic.png');

//邊界圖
const geoFile = require('../assets/TaipeiGeo.json');
const geoFile_ShongSian = require('../assets/松山區.json');

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
                        <View>
                            <View style={{
                                            flex:1,
                                            flexDirection:'row',
                                            marginTop: -(height/10) *1.5,
                                        }}>
                                <View style={{flex:0.1,
                                            }}></View>
                                <View style={{flex:0.5,
                                                alignItems:'flex-start',
                                            }}>
                                    <Text style={{
                                                    justifyContent:'center',
                                                    alignContent:'center',
                                                    color:'#47DCEF',
                                                    flex:0.5,
                                                    fontSize:28,
                                                    height:60,
                                                    }}>中山區</Text>
                                </View>
                                <View style={{flex:0.5,
                                            }}>
                                            
                                            </View>
                                <View style={{flex:0.5,
                                                alignItems:'flex-end',
                                                height:60,
                                            }}>
                                    <TouchableOpacity 
                                            style={{flex:0.5,
                                                alignItems:'flex-end',
                                                borderWidth:1,
                                                borderRadius:10,
                                                padding:10,
                                            }}
                                            onPress={()=>this.props.navigation.push('OverviewMap')}>
                                        <Text style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        color:'black',
                                                        fontSize:20,
                                                        }}>主選單</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:0.1}}></View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginTop: -(height /10)*0.75,}}>
                            <View style={{flex:0.20}}>
                                
                            </View>
                            <Text style={{
                                    justifyContent:'center',
                                    marginStart:25,
                                    color:'gray',
                                    fontSize:15,
                                    }}>診所 : 80 醫師：160 醫病比 : 1:1500</Text>

                        </View>
                </View>
                
                <View style={{flex: 5.15,
                        backgroundColor:'white',
                        flexDirection: 'column', 
                        // height:Dimensions.get('screen').height*0.8,
                        // width:width,
                        // marginStart:WidthScale(27),
                        // marginTop:HeightScale(-100),
                        zIndex:0
                        }}>
                    <Image source={require('../assets/圖資-大地圖Detail.png')} style={
                                        {
                                            // marginTop: (height /10)*1.5,
                                            resizeMode:'stretch',
                                            width:width}
                                        }></Image>
                    {/* <MapView 
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
                            {/* map.data.setStyle((feature) => {
                                let color = "gray";

                                if (feature.getProperty("isColorful")) {
                                color = feature.getProperty("color");
                                }
                                return{
                                fillColor: color,
                                strokeColor: color,
                                strokeWeight: 2,
                                };
                            });
                        <Geojson geojson={geoFile} />  
                        <Geojson geojson={geoFile_ShongSian} />  
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
                        
                            
                    </MapView> */}
                    
                    
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
