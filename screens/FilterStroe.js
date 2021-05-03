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
    constructor(props) {
        super(props);
        this.state = {
            ToggleBtn : [
                //地區
                {key : 0 , text : "中正區" , toggled : false},
                {key : 1 , text : "大同區" , toggled : false},
                {key : 2 , text : "中山區" , toggled : false},
                {key : 3 , text : "松山區" , toggled : false},
                {key : 4 , text : "大安區" , toggled : false},
                {key : 5 , text : "萬華區" , toggled : false},
                {key : 6 , text : "信義區" , toggled : false},
                {key : 7 , text : "士林區" , toggled : false},
                {key : 8 , text : "北投區" , toggled : false},
                {key : 9 , text : "內湖區" , toggled : false},
                {key : 10 , text : "南港區" , toggled : false},
                {key : 11 , text : "文山區" , toggled : false},

                //搜尋類別
                {key : 12 , text : '一般牙科', toggled : false},
                {key : 13 , text : '矯正醫師', toggled : false},
                {key : 14 , text : '兒童牙科', toggled : false},
                {key : 15 , text : '口腔外科', toggled : false},
                
                //食衣住行育樂診所
                {key : 16 , text: '食' , toggled : false},
                {key : 17 , text: '衣' , toggled : false},
                {key : 18 , text: '住' , toggled : false},
                {key : 19 , text: '行' , toggled : false},
                {key : 20 , text: '育' , toggled : false},
                {key : 21 , text: '樂' , toggled : false},
                {key : 22 , text: '診所' , toggled : false},

                //Uspace
                {key : 23 , text: '車位' , toggled : false}
            ],
        }
    }
    onclickFilterItem = (_this,item)=>
    {
        _this.state.ToggleBtn[item.key].toggled = !_this.state.ToggleBtn[item.key].toggled;
        _this.setState({ToggleBtn : _this.state.ToggleBtn});
    }
    filterMap()
    {
        this.props.navigation.navigate('OverviewMap',{mapParameter : JSON.stringify(this.state.ToggleBtn)});
        //this.state.ToggleBtn})
        // this.props.navigation.goBack();
    }
  render() {
    const renderItem = ({ item }) => (
        <Item 	_this={this}
                item={item}
                key={item.key}
                title={item.title}
                itemType={item.itemType}
                />
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
                        data={Area}
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
                        data={Job}
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
                        data={Search}
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
                    }} onPress={()=> this.filterMap()}>
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


const Area = [
	{
        key : 0 ,
        itemType:"Area",
        title : "中正區"
    },
    {
        key : 1 ,
        itemType:"Area",
        title : "大同區"
    },
    {
        key : 2 ,
        itemType:"Area",
        title : "中山區"
    },
    {
        key : 3 ,
        itemType:"Area",
        title : "松山區"
    },
    {
        key : 4 ,
        itemType:"Area",
        title : "大安區"
    },
    {
        key : 5 ,
        itemType:"Area",
        title : "萬華區"
    },
    {
        key : 6 ,
        itemType:"Area",
        title : "信義區"
    },
    {
        key : 7 ,
        itemType:"Area",
        title : "士林區"
    },
    {
        key : 8 ,
        itemType:"Area",
        title : "北投區"
    },
    {
        key : 9 ,
        itemType:"Area",
        title : "內湖區"
    },
    {
        key : 10 ,
        itemType:"Area",
        title : "南港區"
        },
    {
        key : 11 ,
        itemType:"Area",
        title : "文山區"
    },
];


const Job = [
	{
		key: 12,
        itemType : "Job",
		title: '一般牙科',
	},
    {
		key: 13,
        itemType : "Job",
		title: '矯正醫師',
	},
    {
		key: 14,
        itemType : "Job",
		title: '兒童牙科',
	},
    {
		key: 15,
        itemType : "Job",
		title: '口腔外科',
	},
];


const Search = [
	{
		key: 16,
        itemType:"Search",
		title: '食',
	},
    {
		key: 17,
        itemType:"Search",
		title: '衣',
	},
    {
		key: 18,
        itemType:"Search",
		title: '住',
	},
    {
		key: 19,
        itemType:"Search",
		title: '行',
	},
    {
		key: 20,
        itemType:"Search",
		title: '育',
	},
    {
		key: 21,
        itemType:"Search",
		title: '樂',
	},
    {
		key: 22,
        itemType:"Search",
		title: '診所',
	},
];


const Uspace = [
	{
		key: 23,
        itemType:"Uspace",
		title: '車位',
	},
];

const Item = ({ _this,item,title}) => (
	//如果是要點下去往下推的話，復用這個function
	<View>
		<ImageBackground style={{
			width:55,
			height:30,
			shadowOffset:{  width:WidthScale(0),  height:HeightScale(1)},
			shadowColor: 'black',
			shadowOpacity: 0.3,
            marginStart:10,
            marginEnd : 1,
			zIndex:0,
            borderRadius: 5,
			backgroundColor: 'white',

		}}>
			<TouchableOpacity style={{
				height : 30,
				width:55,
				marginStart: 0,
				marginTop:0,
                zIndex:2,
                borderRadius: 5,
                backgroundColor: _this.state.ToggleBtn[item.key].toggled==true ? "#596570" : null,
			}} onPress={() => _this.onclickFilterItem(_this,item)}>

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
                    color:_this.state.ToggleBtn[item.key].toggled==true ? "white" : "black",
                    }}>
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