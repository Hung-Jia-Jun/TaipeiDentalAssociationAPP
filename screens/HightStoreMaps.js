import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-圖資-大地圖.png');
const LineImage = require('../assets/高密度Selection.png');
const overviewMapTopper_image = require('../assets/overviewMapTopper.png');

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class HightStoreMaps extends Component {
  render() {
    return (
        <View style={styles.container,{flex: 3, flexDirection: 'column'}}>
            <View style={{flexDirection: 'column',
                            zIndex:1,}}>
                    <TouchableOpacity style={styles.button,{
                            height: 40,
                            width:70,
                            alignSelf:'flex-end',
                            marginStart: WidthScale(-120),
                            marginTop:HeightScale(50),
                            borderWidth:1,
                            justifyContent:'center',
                            borderRadius:10,
                        }} onPress={()=>this.props.navigation.push('OverviewMap')}>
                            <Text style={{
                                // marginStart:WidthScale(50),
                                        color:'black',
                                        fontSize:15,
                                                        textAlign:'center',
                                        // marginTop: HeightScale(-155),
                                        }}>主選單</Text>
                    </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column',
                            flex:0.05,
                            zIndex: 0,
                            marginTop:HeightScale(-100)
                            }}>
                <Image source={overviewMapTopper_image} style={
                                    {marginTop: HeightScale(-85),
                                    resizeMode:'stretch',
                                    width:width}}></Image>
                
                <Text style={{marginStart:WidthScale(50),
                                color:'#47DCEF',
                                fontSize:18,
                                marginTop: HeightScale(-140),
                                }}>台北市</Text>
            </View>
            
            <View style={{flex: 0.05, flexDirection: 'row',
                                    alignItems: 'center',
                                    marginStart:WidthScale(52),
                                    marginTop : HeightScale(50),
                                    zIndex:1,
                                    }}>
                <Text style={{fontSize:18,
                                color:'black',
                                textAlign:'left',
                                }}>診所1000 醫院 1000 醫病比 1:2000</Text>
            </View>
            <View style={{flex: 0.01,
                            flexDirection: 'row',
                            // marginTop:22,
                            justifyContent: 'center',
                            flexDirection:'row'}}>
                     <Image source={image} style={
                                    {
                                    marginTop: HeightScale(150),
                                    resizeMode:'contain',
                                    width:width}}></Image>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column'}}>
                <TouchableOpacity style={styles.button,{
                    height: 650,
                    width:Dimensions.get('window').width,
                    marginTop:HeightScale(68),
                }} onPress={()=>this.props.navigation.push('OverviewMap')}>
                </TouchableOpacity>
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
export default HightStoreMaps;