import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-篩選地圖.png');


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size


class FilterStroe extends Component {
onclickMainMenuItem = (_this,item,sceneName)=>
{
    if (item.haveDetail == true)
    {
        switch (item.title) {
            case "學術活動":
                _this.setState({academicEventsShowDetail :  _this.state.academicEventsShowDetail ? false : true});
                break;
            case "牙材採購":
                _this.setState({dentalGroupPurchaseShowDetail :  _this.state.dentalGroupPurchaseShowDetail ? false : true});
                break;
            case "牙醫學生專區":
                _this.setState({studentShowDetail :  _this.state.studentShowDetail ? false : true});
                break;
            case "校友服務":
                _this.setState({helpAndServiceShowDetail :  _this.state.helpAndServiceShowDetail ? false : true});
                break;
            default:
                _this.props.navigation.navigate(sceneName);
                break;
        }
    }
    else
    {
        _this.props.navigation.navigate(sceneName);
    }
}
  render() {
    const renderItem = ({ item }) => (
        <Item 	_this={this}
                item={item}
                key={item.key}
                subTitle={item.subTitle}
                title={item.title}
                item_image={item.item_image}
                sceneName={item.sceneName} />
    );
    
    return (
        <View style={styles.container,{flex: 1, flexDirection: 'column'}}>
            <ImageBackground source={image} style={styles.image}>
                <View style={{flex: 10.3, flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button,{
                        height: Dimensions.get('window').height / 2,
                        width:Dimensions.get('window').width,
                        marginStart: 0,
                        marginTop:0,
                    }} onPress={()=>this.props.navigation.goBack()}>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1,  
                            flexDirection: 'column'}}>
                    <Text style={{marginTop:HeightScale(10),alignSelf:'center',color:'#43D1E3'}}>篩選地圖</Text>
                </View>
                <View style={{flex: 0.8, flexDirection: 'column'}}>
                    <Text style={{marginTop:HeightScale(0),marginLeft:WidthScale(25),fontSize:13,marginTop:HeightScale(5),alignSelf:'left',color:'black'}}>依地區</Text>
                </View>

                <View style={{marginTop:HeightScale(0),
                                    flex: 1.2,
                                    marginStart:15,
                                    flexDirection: 'row',
                                    }}>
                    <FlatList
                        horizontal
                        contentContainerstyle={{ justifyContent: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',}}
                        data={DATA}
                        renderItem={renderItem}
                        // ListHeaderComponentStyle={{height:100}}
                        ListHeaderComponent={() => <View style={{height:30}}></View>}
                        keyExtractor={item => item.key}
                    />
                </View>
                <View style={{flex: 0.8, flexDirection: 'column'}}>
                    <Text style={{marginTop:HeightScale(0),marginLeft:WidthScale(25),fontSize:13,marginTop:HeightScale(5),alignSelf:'left',color:'black'}}>依診所職缺</Text>
                </View>
                <View style={{marginTop:HeightScale(0),
                                    flex: 1.2,
                                    marginStart:15,
                                    flexDirection: 'row',
                                    }}>
                    <FlatList
                        horizontal
                        contentContainerstyle={{ justifyContent: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',}}
                        data={Hire}
                        renderItem={renderItem}
                        // ListHeaderComponentStyle={{height:100}}
                        ListHeaderComponent={() => <View style={{height:30}}></View>}
                        keyExtractor={item => item.key}
                    />
                </View>
                <View style={{flex: 0.8, flexDirection: 'column'}}>
                    <Text style={{marginTop:HeightScale(0),marginLeft:WidthScale(25),fontSize:13,marginTop:HeightScale(5),alignSelf:'left',color:'black'}}>搜尋類型</Text>
                </View>
                 <View style={{marginTop:HeightScale(0),
                                    flex: 1.2,
                                    marginStart:15,
                                    flexDirection: 'row',
                                    }}>
                    <FlatList
                        horizontal
                        contentContainerstyle={{ justifyContent: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',}}
                        data={fileterClass}
                        renderItem={renderItem}
                        // ListHeaderComponentStyle={{height:100}}
                        ListHeaderComponent={() => <View style={{height:30}}></View>}
                        keyExtractor={item => item.key}
                    />
                </View>
                <View style={{flex: 0.8, flexDirection: 'column'}}>
                    <Text style={{marginTop:HeightScale(0),marginLeft:WidthScale(25),fontSize:13,marginTop:HeightScale(5),alignSelf:'left',color:'black'}}>Uspace車位</Text>
                </View>
                <View style={{marginTop:HeightScale(0),
                                    flex: 1.2,
                                    marginStart:15,
                                    flexDirection: 'row',
                                    }}>
                    <FlatList
                        horizontal
                        contentContainerstyle={{ justifyContent: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',}}
                        data={Uspace}
                        renderItem={renderItem}
                        // ListHeaderComponentStyle={{height:100}}
                        ListHeaderComponent={() => <View style={{height:30}}></View>}
                        keyExtractor={item => item.key}
                    />
                </View>
                <View style={{flex: 0.5, flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button,{
                        height: HeightScale(60),
                        width:WidthScale(125),
                        marginStart: WidthScale(150),
                        borderRadius:50,
                        backgroundColor : "#27D0E5",
                        marginTop:HeightScale(-50),
                    }} onPress={()=>this.props.navigation.goBack()}>
                        <View style={{flex: 0.3, flexDirection: 'column'}}>
                        </View>
                        <View style={{flex: 0.01, flexDirection: 'column'}}>
                            <Text style={{marginTop:HeightScale(0),
                                            // marginLeft:WidthScale(25),
                                            fontSize:13,
                                            height:HeightScale(60),
                                            textAlign:'center',
                                            justifyContent:'center',
                                            textAlignVertical:'center',
                                            color:'white'}}>進行篩選</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
  }
}


const DATA = [
	{
		key: 0,
		title: '中山區',
	},
    {
		key: 1,
		title: '松山區',
	},
    {
		key: 2,
		title: '內湖區',
	},
    {
		key: 3,
		title: '大安區',
	},
    {
		key: 4,
		title: '信義區',
	},
];


const Hire = [
	{
		key: 0,
		title: '一般牙科',
	},
    {
		key: 1,
		title: '矯正醫師',
	},
    {
		key: 2,
		title: '兒童牙科',
	},
    {
		key: 3,
		title: '口腔外科',
	},
];


const fileterClass = [
	{
		key: 0,
		title: '食',
	},
    {
		key: 1,
		title: '衣',
	},
    {
		key: 2,
		title: '住',
	},
    {
		key: 3,
		title: '行',
	},
    {
		key: 4,
		title: '育',
	},
    {
		key: 5,
		title: '樂',
	},
    {
		key: 6,
		title: '診所',
	},
];


const Uspace = [
	{
		key: 0,
		title: '車位',
	},
];

const Item = ({ _this,item,title,item_image,sceneName,subTitle}) => (
	//如果是要點下去往下推的話，復用這個function
	<View>
		<ImageBackground style={{
			width:55,
			borderRadius: 5,
			height:30,
			shadowOffset:{  width:WidthScale(0),  height:HeightScale(1)},
			shadowColor: 'black',
			shadowOpacity: 0.3,
            marginStart:10,
            marginEnd : 1,
			zIndex:0,
			backgroundColor: 'white',
		}}>
			<TouchableOpacity style={{
				height : 30,
				width:55,
				marginStart: 0,
				marginTop:0,
                zIndex:2,

			}} onPress={() => _this.onclickMainMenuItem(_this,item,sceneName)}>
                        <View style={{  flex:0.5}}></View>
                            <View style={{  flex:1}}>
                                <Text style={{
                                    position: 'absolute',
                                    top: HeightScale(-1),
                                    left : WidthScale(-1),
                                    marginTop: HeightScale(0),
                                    marginLeft: WidthScale(0),
                                    fontSize:12,
                                    height:30,
                                    width:55,
                                    textAlign:'center',
                                    justifyContent:'center',
                                    color:'black'}}>
                                                    {title}
                                </Text>
                            </View>
                            
                    
			</TouchableOpacity>
		</ImageBackground>
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
export default FilterStroe;