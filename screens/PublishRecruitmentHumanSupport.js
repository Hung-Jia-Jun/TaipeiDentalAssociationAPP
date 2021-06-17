import React, { Component } from "react";
import { Keyboard,Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View, TextPropTypes, TextInputBase, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import KeyboardListener from 'react-native-keyboard-listener';
import * as firebase from 'firebase';

const appConfig = require('../app.json');
const config = {
	databaseURL : appConfig.databaseURL,
}
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
const database = firebase.database();

//NotifycationTopper.png
const image = require('../assets/b-訊息中心（聊天室）.png');

const NotifycationTopper_image = require('../assets/NotifycationTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const Back_image = require('../assets/Announcement_icon/Back.png')

//iphone 12 pro max 
const guidelineBaseWidth = 428
const guidelineBaseHeight = 926
const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width] // Figuring out if portrait or landscape 

const WidthScale = (size) => (shortDimension / guidelineBaseWidth) * size
const HeightScale = (size) => (longDimension / guidelineBaseHeight) * size

//求職
class Message extends Component {
    constructor(props) {
		super(props);
		this.state = {
            //點數
            point : global.point,
            doctorType : '請選擇    ',
            showDoctorType : false,
            keyboardOpen : false,

            //全職醫師
            fullTimeDoctor : false,

            //兼職醫師
            parTimeDoctor : false,

            //工讀生
            studentParTime : false,

            //將上面的選項寫入是否想找PGY診所
            PGYType : undefined,

            //工作說明
            jobDescription :'',

            //將上面的選項寫入工作類型
            jobType : '',

            

            //發布徵才消息需要多少
            PublishClinicRecruitPoint : 0,

            showNeedPoint : false,
		}
	}
    YYYYMMDD(value) {
		var mm = value.getMonth() + 1; // getMonth() is zero-based
		var dd = value.getDate();

		return [value.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
				].join('.');
	};
    componentDidMount()
    {
        this.getSelfPoint();
        
        //更新現在發布一則求才文要多少點數
        this.getFirebaseGlobalVar();
        this.setState({
            jobDescription : '',
            jobType : '',
            doctorType : '請選擇    ',
        })
    }
    //取得徵才點數扣除額
    getFirebaseGlobalVar()
    {
        var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
		dbRef.child("firebaseGlobalVar").get().then((result)=>{
                var user = result.val();
                var _PublishJobHuntingPoint =  user.PublishJobHuntingPoint
                that.setState({PublishJobHuntingPoint : _PublishJobHuntingPoint,
                                showNeedPoint: true,
                                },()=>{
                                    if (global.point<this.state.PublishJobHuntingPoint)
                                    {
                                        Alert.alert("剩餘點數 : "+global.point+"點\n"+"目前點數不足，無法刊登求職訊息")
                                    }
                                });
        });
    }
    
    //取得剩餘點數
    getSelfPoint()
    {
        var that = this;
		var dbRef = database.ref();
		//加入該用戶的所屬群組列表
		dbRef.child("user").child(global.username).get().then((result)=>{
            var user = result.val();
            //更新客戶剩餘的點數
            global.point = user.point;

            //更新該用戶的所屬診所
            global.clinic = user.clinic;
            that.setState({point : user.point});
        });
    }
    //求職找診所訊息
    publishClinicRequest()
    {
        var jobDescription = this.state.jobDescription;
        var jobType = this.state.jobType;
        var doctorType = this.state.doctorType;
        var PGYType = this.state.PGYType;
        
        console.log(this.state.PGYType);
        if (jobDescription=='')
        {
            Alert.alert("請輸入求職說明");
            return;
        }

        if (jobType=='')
        {
            Alert.alert("請輸入工作型態");
            return;
        }

        if (doctorType=='請選擇    ')
        {
            Alert.alert("請輸入科別");
            return;
        }

        if (PGYType==undefined)
        {
            Alert.alert("請選擇是否想找PGY診所");
            return;
        }
        var JobTypeText = '';
        switch(this.state.jobType)
        {
            case 'fullTimeDoctor' :
                JobTypeText = '全職醫師';
                break;
            case 'parTimeDoctor' :
                JobTypeText = '兼職醫師';
                break;
            case 'studentParTime' :
                JobTypeText = '工讀生';
                break;
        }
        global.point = global.point-this.state.PublishJobHuntingPoint;
        var NowPoint = global.point;
        var PGYText = this.state.PGYType==true?"是":"否";
        Alert.alert(
			"確認發布求職訊息？",
			"工作型態 : " + JobTypeText + "\n" + 
			"科別 : " + this.state.doctorType + "\n" + 
			"是否想找PGY診所 : " + PGYText + "\n" + 
            
            "本次使用點數 : " + this.state.PublishJobHuntingPoint.toString() + "\n"+
            "剩餘點數 : " + (NowPoint).toString(),
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			},
			{ 
				text: "OK", 
				onPress: () => {
                    var that = this;
                    var dbRef = database.ref();
                    //加入該用戶的所屬群組列表
                    dbRef.child("jobRequestList").push({
                        //發布者名稱，要顯示在求職列表內
                        publishAccount : global.username,
                        userIcon : global.userIcon,
                        jobType : this.state.jobType,
                        doctorType : this.state.doctorType,
                        jobDescription : this.state.jobDescription,
                        jobTypeText : JobTypeText,
                        
                        //求職者對PGY診所的需求
                        PGYType : this.state.PGYType,
                        publishDate : this.YYYYMMDD(new Date()),
                    },()=>{
                        Alert.alert("完成","\n發布成功，請至求職列表查看");
                        this.props.navigation.push('ClinicRecruitment');
                        });
					
                    //要扣500點
                    dbRef.child("user").child(global.username).update({
                        //更新客戶剩餘的點數
                        point : global.point-this.state.PublishClinicRecruitPoint,
                    },that.setState({point:global.point}));

				  }
			}
			]
		);

      

       
        

    }
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
            <View style={{flex: 0.05,
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection: 'column',
                            }}>
            </View>
            <View style={{flex: 0.34,
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
						onPress={()=>this.props.navigation.push('ClinicRecruitmentHumanSupport')}>
                            <Image source={require('../assets/sdfghkjlgfd.png')}></Image> 
					</TouchableOpacity>
				</View>
				<View style={{
						flex:0.3,
					}}>
					<Text style={{
									fontSize:18,
									textAlign:'center',
									zIndex:0,
								color:'white'}}>我要求職</Text>
				</View>
				
				<View style={{
						flex:0.3,
						alignItems:'flex-end',
					}}>
				</View>
            </View>
            
            
            <View style={{flex: 3.25,
                            flexDirection: 'column',
                            marginTop:0}}>
                {this.state.showNeedPoint==true?
                    <View style={{
                        shadowOffset:{  width:0,  height:5},
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                    }}>
                        <ImageBackground source={require('../assets/busniessCardBackground.png')}
                            style={{
                                marginEnd:WidthScale(20),
                                marginStart : WidthScale(15),
                                marginTop:HeightScale(40),
                                borderRadius:30,
                                padding:10,
                                overflow: 'hidden',
                            }}>
                            <Text style={{
                                            fontSize:18,
                                            textAlign:'center',
                                            zIndex:0,
                                            color:'white'}}>刊登持續兩週，求職每則需
                                            <Text style={{
                                                color:'#FFD883',
                                            }}>  -{this.state.PublishJobHuntingPoint} </Text>
                                            <Image source={require('../assets/money.png')}></Image>
                                            <Text style={{
                                                color:'#FFF',
                                            }}>  點數</Text>
                                        </Text>
                        </ImageBackground>
                    </View>
                :null}
                <View style={{
                                marginTop:20,
                                alignItems:'center',
                                flex:0.08,
                                }}>
                    <View style={{
                        marginTop:10,
                        borderBottomWidth:3,
                        width:WidthScale(380),
                        borderColor:'#E2EBF6',
                        justifyContent:'flex-end'
                    }}>
                        
                        <Text style={{
                                        marginBottom:10,
                                        marginStart:5,
                                        color:'#43D1E3',
                                        fontSize:18,
                                            }}>內容</Text>
                    </View>
                </View>
                <View style={{
                                flex:0.07,
                                marginTop:0,
                                flexDirection:'row',
                                marginStart:25,
                                alignItems:'flex-start',
                                }}>
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button,{
                                                flexDirection: 'row',
                                                height:50,
                                                marginTop:0,
                                            }}
                                            // 設定工作類型
                                            onPress={()=>this.setState({
                                                fullTimeDoctor : true,
                                                parTimeDoctor : false,
                                                studentParTime : false,
                                                jobType : 'fullTimeDoctor',
                                            })}
                                            >
                            <View style={{
                                justifyContent:'center',
                                }}>
                                <View style={{
                                    marginStart:10,
                                    borderWidth:1,
                                    borderColor:'#B9C2CC',
                                    borderRadius:100,
                                    width:20,
                                    height:20,
                                    backgroundColor:'#FFF',
                                    alignItems:'center',
                                    justifyContent:'center'}}>
                                    {this.state.fullTimeDoctor==true?
                                        <View style={{
                                            padding:5,
                                            borderColor:'gray',
                                            borderRadius:100,
                                            width:12,
                                            height:12,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',
                                            justifyContent:'center'}}>
                                        </View>
                                    :null}
                                </View>
                            </View>
                            <View style={{  
                                            justifyContent:'center',
                                            }}>
                                <Text style={{fontSize:17,color:'#5C6A6C'}}> 全職醫師</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginStart:10,
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button,{
                                                flexDirection: 'row',
                                                height:50,
                                                marginTop:0,
                                            }}
                                            //設定工作類型
                                            onPress={()=>this.setState({
                                                fullTimeDoctor : false,
                                                parTimeDoctor : true,
                                                studentParTime : false,
                                                jobType : 'parTimeDoctor',
                                            })}
                                            >
                            <View style={{
                                justifyContent:'center',
                                }}>
                                <View style={{
                                    marginStart:10,
                                    borderWidth:1,
                                    borderColor:'#B9C2CC',
                                    borderRadius:100,
                                    width:20,
                                    height:20,
                                    backgroundColor:'#FFF',
                                    alignItems:'center',
                                    justifyContent:'center'}}>
                                    {this.state.parTimeDoctor==true?
                                        <View style={{
                                            padding:5,
                                            borderColor:'gray',
                                            borderRadius:100,
                                            width:12,
                                            height:12,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',
                                            justifyContent:'center'}}>
                                        </View>
                                    :null}
                                </View>
                            </View>
                            <View style={{  
                                            justifyContent:'center',
                                            }}>
                                <Text style={{fontSize:17,color:'#5C6A6C'}}> 兼職醫師</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginStart: 18,
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button,{
                                                flexDirection: 'row',
                                                height:50,
                                                marginTop:0,
                                            }}
                                            //設定工作類型
                                            onPress={()=>this.setState({
                                                fullTimeDoctor : false,
                                                parTimeDoctor : false,
                                                studentParTime : true,
                                                jobType : 'studentParTime',
                                            })}
                                            >
                            <View style={{
                                justifyContent:'center',
                                }}>
                                <View style={{
                                    marginStart:10,
                                    borderWidth:1,
                                    borderColor:'#B9C2CC',
                                    borderRadius:100,
                                    width:20,
                                    height:20,
                                    backgroundColor:'#FFF',
                                    alignItems:'center',
                                    justifyContent:'center'}}>

                                    {this.state.studentParTime==true?
                                        <View style={{
                                            padding:5,
                                            borderColor:'gray',
                                            borderRadius:100,
                                            width:12,
                                            height:12,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',
                                            justifyContent:'center'}}>
                                        </View>
                                    :null}
                                </View>
                            </View>
                            <View style={{  
                                            justifyContent:'center',
                                            }}>
                                <Text style={{fontSize:17,color:'#5C6A6C'}}> 工讀生</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                                flex:0.07,
                                marginTop:15,
                                flexDirection:'row',
                                marginStart:25,
                                alignItems:'center',
                                }}>
                    <View style={{
                                    justifyContent:'center',
                                    marginEnd:30,
                                }}>
                        <Text style={{fontSize:17,color:'black'}}> 科別</Text>
                    </View>
                    <View style={{
                                }}>
                        <TouchableOpacity style={{
													zIndex:0,
                                                    alignItems:'center',
                                                    flexDirection:'row',
                                                    borderColor:'#43D1E3',
                                                    borderRadius:8,
													borderWidth:1,
                                                    backgroundColor:'#FFF',
                                                    width:200,
													height:40}}
													onPress={()=>this.setState({showDoctorType:!this.state.showDoctorType})}>
                                <View>
                                    <Text style={{  fontSize:15,
                                                    marginStart:15,
                                                    color:this.state.doctorType=='請選擇    '?'gray':'black',
                                                    textAlign:'left'}}>
                                                        {/* 需求的專業能力類別 */}
                                                        {this.state.doctorType}

                                    </Text>
                                </View>

                                <View style={{marginStart:80}}>
                                    <Image source={require('../assets/downarrow_blue.png')}></Image>
                                </View>
						</TouchableOpacity>
                    </View>
                </View>
                <View style={{
                                flex:0.4,
                                marginTop:15,
                                flexDirection:'row',
                                marginStart:25,
                                alignItems:'flex-start',
                            }}>
                    <View style={{
                                    justifyContent:'center',
                                    marginEnd:30,
                                }}>
                        <Text style={{fontSize:17,color:'black'}}> 說明</Text>
                    </View>
                    <View style={{
                                flexDirection:'column',
                                flex:1,
                                }}>
                        <View style={{
                                flex:1,
                                }}>
                            <TextInput 
                                        multiline={true}
                                        style={{
                                            backgroundColor:'#FFF',
                                            width:WidthScale(300),
                                            flex:1,
                                        }}
                                        onChangeText={(text) => {
                                            this.setState({jobDescription:text})
                                        }}
                                        value={this.state.jobDescription}>
                            </TextInput>
                            <Text style={{marginTop:5,fontSize:17,color:'gray'}}>字數限制 : 200字</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                                marginTop:20,
                                alignItems:'center',
                                flex:0.08,
                                }}>
                    <View style={{
                        marginTop:10,
                        borderBottomWidth:3,
                        width:WidthScale(380),
                        borderColor:'#E2EBF6',
                        justifyContent:'flex-end'
                    }}>
                        
                        <Text style={{
                                        marginBottom:10,
                                        marginStart:5,
                                        color:'#43D1E3',
                                        fontSize:18,
                                            }}>是否想找PGY診所</Text>
                    </View>
                </View>
                <View style={{
                                flex:0.07,
                                marginTop:0,
                                flexDirection:'row',
                                marginStart:25,
                                alignItems:'flex-start',
                                }}>
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button,{
                                                flexDirection: 'row',
                                                height:50,
                                                marginTop:0,
                                            }}
                                            // 設定工作類型
                                            onPress={()=>this.setState({
                                                PGYType : true,
                                            })}
                                            >
                            <View style={{
                                justifyContent:'center',
                                }}>
                                <View style={{
                                    marginStart:10,
                                    borderWidth:1,
                                    borderColor:'#B9C2CC',
                                    borderRadius:100,
                                    width:20,
                                    height:20,
                                    backgroundColor:'#FFF',
                                    alignItems:'center',
                                    justifyContent:'center'}}>
                                    {this.state.PGYType==true?
                                        <View style={{
                                            padding:5,
                                            borderColor:'gray',
                                            borderRadius:100,
                                            width:12,
                                            height:12,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',
                                            justifyContent:'center'}}>
                                        </View>
                                    :null}
                                </View>
                            </View>
                            <View style={{  
                                            justifyContent:'center',
                                            }}>
                                <Text style={{fontSize:17,color:'#5C6A6C'}}> 是</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginStart:10,
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button,{
                                                flexDirection: 'row',
                                                height:50,
                                                marginTop:0,
                                            }}
                                            //設定工作類型
                                            onPress={()=>this.setState({
                                                PGYType : false,
                                            })}
                                            >
                            <View style={{
                                justifyContent:'center',
                                }}>
                                <View style={{
                                    marginStart:10,
                                    borderWidth:1,
                                    borderColor:'#B9C2CC',
                                    borderRadius:100,
                                    width:20,
                                    height:20,
                                    backgroundColor:'#FFF',
                                    alignItems:'center',
                                    justifyContent:'center'}}>
                                    {this.state.PGYType==false?
                                        <View style={{
                                            padding:5,
                                            borderColor:'gray',
                                            borderRadius:100,
                                            width:12,
                                            height:12,
                                            backgroundColor:'#43D1E3',
                                            alignItems:'center',
                                            justifyContent:'center'}}>
                                        </View>
                                    :null}
                                </View>
                            </View>
                            <View style={{  
                                            justifyContent:'center',
                                            }}>
                                <Text style={{fontSize:17,color:'#5C6A6C'}}> 否</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

            {this.state.keyboardOpen == true?
            
                <View style={{
                    width:Dimensions.get('window').width,
                    flex:0.01,
                    justifyContent:'flex-end',
                    flexDirection:'column',
                            }}>
                    <View style={{
                                    justifyContent:'center',
                                    alignItems:'flex-end',
                                    backgroundColor:'#FFF',
                                    height:50,
                                }}>
                        <TouchableOpacity style={{alignItems:'flex-end',
                                                    flex:1,
                                                    justifyContent:'center',
                                                    borderTopWidth:3,
                                                    borderTopColor:'#B9C2CC',
                                                    backgroundColor:'#FFF',
                                                    height:40,
                                                    width:Dimensions.get('screen').width,
                                                    }}
                                            onPress={()=>{
                                                            Keyboard.dismiss()
                                                            }}
                                        >
                            <Text style={{  textAlign:'center',
                                                fontSize:20,
                                                marginEnd:40,
                                                }}>確認</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                                    height:HeightScale(260)}}>
                    </View>
                </View>
            :null}
            {this.state.showDoctorType?
				<View style={{
					width:Dimensions.get('window').width,
					flex:0.01,
					justifyContent:'flex-end',
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
															this.setState({showDoctorType : false});
															}}
										>
							<Text style={{textAlign:'center',fontSize:20,}}>確認</Text>
						</TouchableOpacity>

					</View>
					<View style={{
									backgroundColor:'#FFF',
									height:200}}>
						<Picker
                            selectedValue={this.state.doctorType}
                            onValueChange={(itemValue) =>this.setState({doctorType:itemValue})}>
                            <Picker label="一般牙科" value="一般牙科" />
                            <Picker label="矯正醫師" value="矯正醫師" />
                            <Picker label="兒童牙科" value="兒童牙科" />
                            <Picker label="口腔外科" value="口腔外科" />
                        </Picker>
					</View>
				</View>
			:null}
            
            <View style={{  flex: 0.4,
                            justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.button,{
                        justifyContent:'center',
                        flex:1,
                        backgroundColor:global.point<this.state.PublishJobHuntingPoint?'gray':'#01C5DE',
                        alignItems:'center',
                    }} onPress={()=> {
                                        {global.point<this.state.PublishJobHuntingPoint?null:this.publishClinicRequest()}
                                        }}>
                            <Text style={{
                                textAlign:'center',
                                color:'#FFF',
                                fontSize:20,
                                }}>
                                    {global.point<this.state.PublishJobHuntingPoint?"點數不足無法刊登":"確認"}
                                </Text>
                </TouchableOpacity> 
			</View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
export default Message;