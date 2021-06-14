import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Constants, Permissions } from 'expo';
import uuid from 'uuid';

// import Moment from 'moment';
import KeyboardListener from 'react-native-keyboard-listener';

const appConfig = require('../app.json');
const firebaseConfig = {
	databaseURL : appConfig.databaseURL,
}
const token = appConfig.token;
const firebaseApp =null;
if (!firebase.apps.length) {
   firebaseApp = firebase.initializeApp(firebaseConfig);
 }

const database = firebase.database();

//NotifycationTopper.png
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const Friend_image = require('../assets/24px_friend.png');


//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 
const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardId :this.props.navigation.getParam('cardId'),
            showEnrollmentYear : false,
            enrollmentYear : global.enrollmentYear,

			showBirthDay:false,
			birthDay : new Date(),

            showGender : false,
            gender : global.gender,

            keyboardOpen : false,

            username : global.username,

            userIcon : global.userIcon,

			userInfo:[
                {
                    key : 0,
                    title : '醫師證號',
                    value : global.doctorID,
                    //要做的彈出框類型
                    popupVar : "textInput",
                },
                {
                    key : 1,
                    title : '入學年',
                    value : enrollmentYear,
                    //要做的彈出框類型
                    popupVar : "Picker",
                },
                {
                    key : 2,
                    title : '性別',
                    value : global.gender,
                    //要做的彈出框類型
                    popupVar : "gender",
                },
                {
                    key : 3,
                    title : '生日',
                    value : global.birthday,
                    //要做的彈出框類型
                    popupVar : "DatetimePicker",
                },
                {
                    key : 4,
                    title : '手機號碼',
                    value : global.phoneNumber,
                    //要做的彈出框類型
                    popupVar : "textInput",
                },
                {
                    key : 5,
                    title : '信箱',
                    value : global.Email,
                    //要做的彈出框類型
                    popupVar : "textInput",
                },
                {
                    key : 6,
                    title : 'LineID',
                    value : global.LineID,
                    //要做的彈出框類型
                    popupVar : "textInput",
                },
                {
                    key : 7,
                    title : 'WechatID',
                    value : global.WechatID,
                    //要做的彈出框類型
                    popupVar : "textInput",
                },
            ]
		}
	}
    YYYYMMDD(value) {
		var mm = value.getMonth() + 1; // getMonth() is zero-based
		var dd = value.getDate();

		return [value.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
				].join('');
	};
	componentDidMount()
	{
	}

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
        });
        var base64data = pickerResult.base64;
    
        const formData = new FormData();
        formData.append('image',base64data);
        formData.append('type', 'base64');
    
        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': token,
            },
            redirect: 'follow'
        };
        fetch('https://api.imgur.com/3/image', requestOptions)
            .then(response => response.text())
            .then(result => {
                var link = JSON.parse(result).data.link;
                console.log(link);
                //更新用戶大頭貼
                global.userIcon = link;
                this.setState({userIcon:link});
            })
            .catch(error => console.log('error', error));
    };
	arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele.key != value; 
        });
    }
	updateProfile()
    {
        var dbRef = database.ref();
        var userRef = dbRef.child("user").child(global.username);
        //更新該用戶的個人資料
        userRef.get().then((result) => {
            if (result.exists()) {
                var user = result.val();

                // var oldUsername = global.username;
                //有查到的話，再來修改名稱
                // global.username = this.state.userInfo[0].value == undefined ? '' : this.state.userInfo[0].value;
                global.doctorID = this.state.userInfo[0].value == undefined ? '' : this.state.userInfo[0].value;
                global.enrollmentYear = this.state.userInfo[1].value == undefined ? '' : this.state.userInfo[1].value;
                global.gender = this.state.userInfo[2].value == undefined ? '' : this.state.userInfo[2].value;
                global.birthday = this.state.userInfo[3].value == undefined ? '' : this.state.userInfo[3].value;
                global.phoneNumber = this.state.userInfo[4].value == undefined ? '' : this.state.userInfo[4].value;
                global.Email = this.state.userInfo[5].value == undefined ? '' : this.state.userInfo[5].value;
                global.LineID = this.state.userInfo[6].value == undefined ? '' : this.state.userInfo[6].value;
                global.WechatID = this.state.userInfo[7].value == undefined ? '' : this.state.userInfo[7].value;
                
                global.belongGroup = user.belongGroups;
                global.groupBuyItem = user.groupBuyItems;
                global.memberType = user.memberType;
                // global.userIcon = user.userIcon;
                global.validation = user.validation;
                //之後要刪掉舊的
                // database.ref('/user'+"/" + oldUsername).remove();

                //因為涉及到更改用戶名稱，所以要推送一個新的user進去
                database.ref('/user'+"/" + global.username).set({	
                    belongGroups:user.belongGroups==undefined ? []:user.belongGroups,
                    groupBuyItems:user.groupBuyItems==undefined ? []:user.groupBuyItems,
                    memberType: user.memberType,
                    userIcon: global.userIcon,
                    validation: user.validation,
                    username : global.username ,
                    doctorID : global.doctorID ,
                    enrollmentYear : global.enrollmentYear,
                    gender : global.gender ,
                    birthday : global.birthday ,
                    phoneNumber : global.phoneNumber ,
                    Email : global.Email ,
                    LineID : global.LineID ,
                    WechatID : global.WechatID ,
                });

                //回到設定頁面，並去更新Global值
                this.props.navigation.navigate('Profile',{username:username});
            }
            })
            .catch(function(error) {
                 // ADD THIS THROW error
                  throw error;
                });
        
    }
	render() {
		const renderItem = ({ item }) => (
			<Item _this={this} item={item}/>
		);
		
	return (
		<View  key="container" style={styles.container,{flex: 1,
										flexDirection: 'column',
										}}>
            <KeyboardListener
                onWillShow={() => { this.setState({ keyboardOpen: true }); }}
                onWillHide={() => { this.setState({ keyboardOpen: false }); }}
            />
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
			<View style={{flex: 0.55,
							justifyContent:'center',
							alignItems:'center',
							zIndex:0,
							flexDirection: 'row',
							}}>
				<View style={{
						flex:0.3,
						alignItems:'flex-start',
					}}>
                    <TouchableOpacity style={{
							alignItems:'center',
							justifyContent:'center',
							height:50,
							width:50,
						}} 
						onPress={()=>this.props.navigation.navigate('Profile')}>
                            <Image source={require('../assets/leftArrow.png')}></Image> 
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>修改個人資訊</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
				</View>
			</View>
			<View style={{flex: 3.7,
			// <View style={{flex: 0.1,
							zIndex:0,
							flexDirection: 'column',
							padding:0}}>
                <View style={{
						flex:0.21,
						alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'center',
					}}>
                        <TouchableOpacity style={{
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        alignItems:'center',}}
                                        onPress={()=>this._pickImage()}
                                        >
                            <Image source={{uri : this.state.userIcon}} 
                                    style={{
                                        borderWidth:3,
                                        height:90,
                                        width:90,
                                        borderRadius:100,
                                        borderColor:'#FFF',
                                        marginEnd:20,
                                        resizeMode:'contain',
                                    }}    
                            ></Image>
                            <View style={{  
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginStart:-45,
                                            marginBottom:-60,
                                        }}>
                                <Image source={require('../assets/axzcvzcvxzcvsdasdfscvd.png')} 
                                    style={{
                                        height:35,
                                        width:35,
                                        resizeMode:'contain',
                                    }}    
                                ></Image>
                            </View>
                        </TouchableOpacity>
                            
				</View>
                <View style={{flex:this.state.keyboardOpen==true?0.4:1}}>
                    <FlatList
                        style={{flex:0.8}}//backgroundColor:'#EBF0F3'}}
                        contentContainerStyle={{}}
                        data={this.state.userInfo}
                        renderItem={renderItem}
                        keyExtractor={item => item.key.toString()}
                    />
                </View>
			</View>

            {this.state.showEnrollmentYear?
                <View style={{
                                width:Dimensions.get('window').width,
                                flex:0.01,
                                justifyContent:'flex-end',
                                marginBottom:10,
                                flexDirection:'column',
                                        }}>
                    <View style={{
                                    justifyContent:'center',
                                    borderTopWidth:3,
                                    borderTopColor:'#B9C2CC',
                                    alignItems:'flex-end',
                                    backgroundColor:'#FFF',
                                    height:50}}>
                        <TouchableOpacity style={{alignContent:'center',
                                                    justifyContent:'center',
                                                    marginEnd:15,
                                                    textAlign:'center',
                                                    flex:1,
                                                    justifyContent:'center',
                                                    height:40,
                                                    width:60,
                                                    }}
                                            onPress={()=>{
                                                            this.setState({showGender : false , showEnrollmentYear:false,showBirthDay:false})
                                                            this.state.userInfo.forEach(e=>{
                                                                if (e.title=='入學年')
                                                                {
                                                                    e.value=this.state.enrollmentYear
                                                                } 
                                                            });
                                                            this.setState({userInfo:this.state.userInfo});
                                                            }}
                                        >
                            <Text style={{textAlign:'center',fontSize:20,}}>確認</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                                    backgroundColor:'#FFF',
                                    height:200}}>
                        <Picker
                            selectedValue={this.state.enrollmentYear}
                            onValueChange={(itemValue, itemIndex) =>{
                                    global.enrollmentYear = itemValue;
                                    this.setState({enrollmentYear:itemValue});
                                }
                            }
                            >
                            <Picker.Item label="2030" value="2030" />
                            <Picker.Item label="2029" value="2029" />
                            <Picker.Item label="2028" value="2028" />
                            <Picker.Item label="2027" value="2027" />
                            <Picker.Item label="2026" value="2026" />
                            <Picker.Item label="2025" value="2025" />
                            <Picker.Item label="2024" value="2024" />
                            <Picker.Item label="2023" value="2023" />
                            <Picker.Item label="2022" value="2022" />
                            <Picker.Item label="2021" value="2021" />
                            <Picker.Item label="2020" value="2020" />
                            <Picker.Item label="2019" value="2019" />
                            <Picker.Item label="2018" value="2018" />
                            <Picker.Item label="2017" value="2017" />
                            <Picker.Item label="2016" value="2016" />
                            <Picker.Item label="2015" value="2015" />
                            <Picker.Item label="2017" value="2017" />
                            <Picker.Item label="2013" value="2013" />
                            <Picker.Item label="2012" value="2012" />
                            <Picker.Item label="2011" value="2011" />
                            <Picker.Item label="2010" value="2010" />
                            <Picker.Item label="2009" value="2009" />
                            <Picker.Item label="2008" value="2008" />
                            <Picker.Item label="2007" value="2007" />
                            <Picker.Item label="2006" value="2006" />
                            <Picker.Item label="2005" value="2005" />
                            <Picker.Item label="2004" value="2004" />
                            <Picker.Item label="2003" value="2003" />
                            <Picker.Item label="2002" value="2002" />
                            <Picker.Item label="2001" value="2001" />
                            <Picker.Item label="2000" value="2000" />
                            <Picker.Item label="1999" value="1999" />
                            <Picker.Item label="1998" value="1998" />
                            <Picker.Item label="1997" value="1997" />
                            <Picker.Item label="1996" value="1996" />
                            <Picker.Item label="1995" value="1995" />
                            <Picker.Item label="1994" value="1994" />
                            <Picker.Item label="1993" value="1993" />
                            <Picker.Item label="1992" value="1992" />
                            <Picker.Item label="1991" value="1991" />
                            <Picker.Item label="1990" value="1990" />
                            <Picker.Item label="1989" value="1989" />
                            <Picker.Item label="1988" value="1988" />
                            <Picker.Item label="1987" value="1987" />
                            <Picker.Item label="1986" value="1986" />
                            <Picker.Item label="1985" value="1985" />
                            <Picker.Item label="1984" value="1984" />
                            <Picker.Item label="1983" value="1983" />
                            <Picker.Item label="1982" value="1982" />
                            <Picker.Item label="1981" value="1981" />
                            <Picker.Item label="1980" value="1980" />
                            <Picker.Item label="1979" value="1979" />
                            <Picker.Item label="1978" value="1978" />
                            <Picker.Item label="1977" value="1977" />
                            <Picker.Item label="1976" value="1976" />
                            <Picker.Item label="1975" value="1975" />
                            <Picker.Item label="1974" value="1974" />
                            <Picker.Item label="1973" value="1973" />
                            <Picker.Item label="1972" value="1972" />
                            <Picker.Item label="1971" value="1971" />
                            <Picker.Item label="1970" value="1970" />
                            <Picker.Item label="1969" value="1969" />
                            <Picker.Item label="1968" value="1968" />
                            <Picker.Item label="1967" value="1967" />
                            <Picker.Item label="1966" value="1966" />
                            <Picker.Item label="1965" value="1965" />
                            <Picker.Item label="1964" value="1964" />
                            <Picker.Item label="1963" value="1963" />
                            <Picker.Item label="1962" value="1962" />
                            <Picker.Item label="1961" value="1961" />
                            <Picker.Item label="1960" value="1960" />
                            <Picker.Item label="1959" value="1959" />
                            <Picker.Item label="1958" value="1958" />
                            <Picker.Item label="1957" value="1957" />
                            <Picker.Item label="1956" value="1956" />
                            <Picker.Item label="1955" value="1955" />
                            <Picker.Item label="1954" value="1954" />
                            <Picker.Item label="1953" value="1953" />
                        </Picker>
                    </View>
                </View>
            :null}  
            {this.state.showGender?
                <View style={{
                                width:Dimensions.get('window').width,
                                flex:0.01,
                                justifyContent:'flex-end',
                                marginBottom:10,
                                flexDirection:'column',
                                        }}>
                    <View style={{
                                    justifyContent:'center',
                                    borderTopWidth:3,
                                    borderTopColor:'#B9C2CC',
                                    alignItems:'flex-end',
                                    backgroundColor:'#FFF',
                                    height:50}}>
                        <TouchableOpacity style={{alignContent:'center',
                                                    justifyContent:'center',
                                                    marginEnd:15,
                                                    textAlign:'center',
                                                    flex:1,
                                                    justifyContent:'center',
                                                    height:40,
                                                    width:60,
                                                    }}
                                            onPress={()=>{
                                                            this.setState({showGender : false , showEnrollmentYear:false,showBirthDay:false})
                                                            this.state.userInfo.forEach(e=>{
                                                                    if (e.title=='性別')
                                                                    {
                                                                        e.value=this.state.gender
                                                                    } 
                                                            });
                                                            this.setState({userInfo:this.state.userInfo});
                                                            }}
                                        >
                            <Text style={{textAlign:'center',fontSize:20,}}>確認</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                                    backgroundColor:'#FFF',
                                    height:200}}>
                        <Picker
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue, itemIndex) =>{
                                    global.gender = itemValue;
                                    this.setState({gender:itemValue});
                                }
                            }
                            >
                            <Picker.Item label="男" value="男" />
                            <Picker.Item label="女" value="女" />
                            <Picker.Item label="不透露" value="不透露" />
                        </Picker>
                    </View>
                </View>
            :null}  
            {this.state.showBirthDay?
                <View style={{
                                width:Dimensions.get('window').width,
                                flex:0.01,
                                justifyContent:'flex-end',
                                marginBottom:10,
                                flexDirection:'column',
                                        }}>
                    <View style={{
                                    justifyContent:'center',
                                    borderTopWidth:3,
                                    borderTopColor:'#B9C2CC',
                                    alignItems:'flex-end',
                                    backgroundColor:'#FFF',
                                    height:50}}>
                        <TouchableOpacity style={{alignContent:'center',
                                                    justifyContent:'center',
                                                    marginEnd:15,
                                                    textAlign:'center',
                                                    flex:1,
                                                    justifyContent:'center',
                                                    height:40,
                                                    width:60,
                                                    }}
                                            onPress={()=>{
                                                            this.setState({showGender : false , showEnrollmentYear:false,showBirthDay:false})
                                                            this.state.userInfo.forEach(e=>{
                                                                    if (e.title=='生日')
                                                                    {
                                                                        e.value=this.YYYYMMDD(this.state.birthDay)
                                                                        
                                                                    } 
                                                            });
                                                            this.setState({userInfo:this.state.userInfo});
                                                        }
                                                    }>
                            <Text style={{textAlign:'center',fontSize:20,}}>確認</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                                    backgroundColor:'#FFF',
                                    height:200}}>
                        <DateTimePicker 
                            value={ this.state.birthDay }
                            mode='date'
                            display='spinner'
                            onChange={ (event,date) =>this.setState( {birthDay:date} )}/>
                    </View>
                </View>
            :null}                

			<View style={{  flex: 0.4,
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                        justifyContent:'center',
                        flex:1,
                        backgroundColor:'#01C5DE',
                        alignItems:'center',
                    }} onPress={()=> {
                                            this.updateProfile();
                                        }}>
                            <Text style={{
                                textAlign:'center',
                                color:'#FFF',
                                fontSize:20,
                                }}>
                                    確認
                                </Text>
                </TouchableOpacity> 
			</View>
		</View>
	);
  }
}




const Item = ({ _this,item,popupVar}) => (
	<View style={styles.container,{marginTop:2,zIndex:0,flex: 1,backgroundColor:'#FFF', flexDirection: 'column',height:70}}>
        <View style={{flexDirection:'row',flex:1,}}>
            <View style={{  alignItems:'flex-start',
                            justifyContent:'center',
                            marginStart:30,
                            flex:0.5,
                        }}>
                <Text style={{
                                fontSize:18,
                                textAlign:'center',
                                zIndex:0}}>{item.title}</Text>
            </View>
            <View style={{alignItems:'flex-end',justifyContent:'center',flex:1}}>
                <TouchableOpacity style={{
                                            padding:8,
                                            minWidth:250,
                                            flex:1,
                                            height:35,
                                            justifyContent:'flex-end',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            }}
                                    onPress={()=>{
                                        switch (item.popupVar) {
                                            case 'Picker':
                                                _this.setState({showEnrollmentYear:true});
                                                break;
                                            case 'DatetimePicker':
                                                _this.setState({showBirthDay:true});
                                                break;
                                            case 'gender':
                                                _this.setState({showGender:true});
                                            case 'textInput':
                                                break;
                                        }
                                    }}>
                    <View>
                        {item.popupVar=='textInput'?
                            <View style={{  alignSelf:'center',
                                            flexDirection:'row'}}>
                                <TextInput style={{
                                    paddingStart:5,
                                    height:43,
                                    fontSize:18,
                                    minWidth:250,
                                    textAlign:'right',
                                    zIndex:2}}
                                            placeholder = {item.value!=undefined?item.value:"未設定"}
                                            onChangeText={(text) => {
                                                _this.state.userInfo.forEach(e=>{
                                                    if (e.title==item.title)
                                                    {
                                                        e.value=text
                                                    } 
                                                });
                                                _this.setState({userInfo:_this.state.userInfo});
                                            }}
                                            // onEndEditing={(text) => item.value}
                                            class = 'placeholder'
                                            value={item.value}
                                /> 
                                <Image source={require('../assets/afsdfsadfsadfasdfasdf.png')} style={{alignSelf:'center'}}></Image> 
                            </View>
                        :
                            <View >
                                <View style={{  alignSelf:'center',
                                                flexDirection:'row'}}>
                                        <Text style={{
                                            fontSize:18,
                                            justifyContent:'center',
                                            color:item.value!=undefined?'black':'gray',
                                            zIndex:0}}>{item.value!=undefined?item.value:"未設定"}
                                            </Text>
                                    <View>
                                            <Image source={require('../assets/afsdfsadfsadfasdfasdf.png')} style={{}}></Image> 
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            </View>

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
	TextInputclass:{
		height: 35,
		width:223,
		paddingHorizontal:15,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10 ,
		backgroundColor : "#FFF",
	},
});
export default Message;