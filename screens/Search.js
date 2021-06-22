import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-搜尋.png');
const searchTopper_image = require('../assets/searchTopper.png');
const Footer_image = require('../assets/Footer_blank.png');
const addressIcon_image = require('../assets/addressIcon.png');


//TODO 新增診所停車場篩選
class Page extends Component {
    constructor(props) {
        super(props);
        const MemberStoreList = require('../MemberStoreList.json');
        const ClinicTEL_List = require('../ClinicTEL_List.json');
        const carParkList = require('../CarParkList.json');
        this.state={
            showItem : true,
            MemberStoreList: MemberStoreList,
            ClinicTELs : ClinicTEL_List,
            CarParkMark : carParkList,

            //篩選
            filterShowAll:true,
            filterClinic:false,
            filterFood:false,

            searchString:'',
            DATA : [
                // {
                //     key: '0',
                //     title: '泰泰茶餐廳 內湖店',
                //     item_image : require('../assets/Bitmap.png'),
                //     address:'台北市中山區內湖路一段99號',
                //     status : '營業中',
                //     openTime:'下午5:00-下午9:00',
                // },
            ],

            //備用的，要顯示所有診所用的篩選
            baseDATA:[],
        }
    }
    componentDidMount()
    {
        this.loadAllListData()
    }
    loadAllListData()
    {
        this.state.MemberStoreList.forEach(e=>{
            this.state.DATA.push({
                key:this.state.DATA.length,
                title : e.title,
                detailAddress : e.detailAddress,
                item_image : e.education=="北醫"?require('../assets/Marker_TaipeiGroup.png'):require('../assets/otherStore.png'),
                status : '營業中',
                openTime : e.openTime,
                TEL : this.clinicGetTEL(e.title),
                education : e.education,
                coordinates : { latitude : e.coordinates.latitude,
                                longitude : e.coordinates.longitude},
                type:'clinic',
            });
        })

        //停車位
        this.state.CarParkMark.forEach(e=>{
            this.state.DATA.push({
                key:this.state.DATA.length,
                title : e.title,
                detailAddress : e.detailAddress,
                item_image : require('../assets/uspaceLogo.png'),
                status : '',
                openTime : '',
                TEL : '',
                coordinates : { latitude : e.coordinates.latitude,
                                longitude : e.coordinates.longitude},
                type:'park',
            });
        })
        this.setState({
                        DATA : this.state.DATA,
                        baseDATA : this.state.DATA,
                        })
    }
    loadClinicListData()
    {
        this.state.MemberStoreList.forEach(e=>{
            this.state.DATA.push({
                key:this.state.DATA.length,
                title : e.title,
                detailAddress : e.detailAddress,
                item_image : e.education=="北醫"?require('../assets/Marker_TaipeiGroup.png'):require('../assets/otherStore.png'),
                status : '營業中',
                openTime : e.openTime,
                TEL : this.clinicGetTEL(e.title),
                education : e.education,
                coordinates : { latitude : e.coordinates.latitude,
                                longitude : e.coordinates.longitude},
                type:'clinic',
            });
        })

        //停車位
        this.state.CarParkMark.forEach(e=>{
            this.state.DATA.push({
                key:this.state.DATA.length,
                title : e.title,
                detailAddress : e.detailAddress,
                item_image : require('../assets/uspaceLogo.png'),
                status : '',
                openTime : '',
                TEL : '',
                coordinates : { latitude : e.coordinates.latitude,
                                longitude : e.coordinates.longitude},
                type:'park',
            });
        })
        this.setState({
                        DATA : this.state.DATA,
                        baseDATA : this.state.DATA,
                        });
    }

    //只載入食物的內容
    loadFoodListData()
    {
        this.setState({
            DATA : [],
            baseDATA : [],
            });
    }
    //從診所名稱輸出電話
    clinicGetTEL(clinicName)
    {
        var i=0;
        for (i = 0; i < this.state.ClinicTELs.length; i++) {
            //找到符合的診所了
            if (this.state.ClinicTELs[i]["clinicName"] == clinicName)
            {
                return this.state.ClinicTELs[i]["TEL"];
            }
        }
    }
    doSearch()
    {
        var searchStr = this.state.searchString.toString();
        
        //顯示所有內容，因為搜尋列沒有文字了
        if (searchStr=='')
        {
            this.setState({DATA : this.state.baseDATA});
        }
        else
        {
            //每次篩選前都要回歸原本的列表，不然可能會找不到
            this.setState({DATA : this.state.baseDATA},()=>{
                //要進行篩選的內容
                var filterData=[]
                this.state.DATA.forEach(e=>{
                    //用正則表達式搜尋
                    var re = searchStr;
                    var matchArr = e.title.match(re);
        
                    //只要matchArr有內容，就代表有這個物件，那就加入新的列表
                    if (matchArr != null)
                    {
                        filterData.push(e);
                    }
                });
                this.setState({DATA : filterData});
            });
        }
    }
    render() {
        const renderItem = ({ item }) => (
            <Item _this={this} item={item} title={item.title} TEL={item.TEL} item_image={item.item_image} detailAddress = {item.detailAddress} status = {item.status} openTime = {item.openTime} />
        );
    
    return (
        <View style={styles.container,{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 0.07, flexDirection: 'column'}}>
                    <Image source={searchTopper_image} style={styles.image,
                                                                {zIndex:1,
                                                                    resizeMode:'stretch',
                                                                    height:Dimensions.get('window').height*0.21,
                                                                    width:Dimensions.get('window').width,
                                                                    marginTop:0}}></Image>
                </View>
                <View style={{flex: 0.05,
                                flexDirection: 'column'}}>
                   
                    <View style={{flex: 0.02,
                                     flexDirection: 'row',}}>
                        <TextInput 
                                returnKeyType='go'
                                style={{marginStart:30,
                                            paddingHorizontal:30,
                                            marginTop:0,
                                            backgroundColor:'#ECF0F6',
                                            borderRadius:30,
                                            height:Dimensions.get('window').height*0.8,
                                            width:Dimensions.get('window').width*0.70,
                                            height:43,
                                            zIndex:2}}
                                placeholder = '搜尋'
                                class = 'placeholder'
                                onChangeText={(text) => {
                                    // this.setState({searchString:text});
                                    this.setState({searchString:text},()=>this.doSearch());
                                }}
                                // onSubmitEditing = {()=>{this.doSearch()}}
                                value={this.state.searchString}
                        />    
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:20,
                                                    zIndex:0,
                                                    backgroundColor:'#ECF0F6',
                                                    borderRadius:30,
                                                    width:Dimensions.get('window').width*0.11,
                                                    height:40}}
                                                    onPress={()=>{
                                                                this.setState({searchString:''},()=>this.doSearch());
                                                                
                                                            }}
                                                    >
                            <Text style={{marginTop:12,fontSize:15,color:'gray',textAlign:'center'}}>取消</Text>
                        </TouchableOpacity>
                    </View>                
                    
                </View>
                <View style={{flex: 0.05,
                                flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginTop:0,
                                                    marginStart:30,
                                                    alignItems:'center',
                                                    zIndex:0,
                                                    justifyContent:'center',
                                                    width:100,
                                                    height:40}}
                                            onPress={()=>{
                                                    this.setState({filterShowAll:true,filterClinic:false,filterFood:false});
                                                    this.loadAllListData()}}>
                            <Text style={{justifyContent:'center',
                                            textAlign:'center',
                                            fontSize:15,
                                            color:this.state.filterShowAll==true?'#3FEEEA':'gray',
                                            textAlign:'center'}}>全部</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:0,
                                                    alignItems:'center',
                                                    marginStart:0,
                                                    justifyContent:'center',
                                                    zIndex:0,
                                                    width:100,
                                                    height:40}}
                                                    onPress={()=>{
                                                        this.setState({filterShowAll:false,filterClinic:true,filterFood:false});
                                                        this.loadClinicListData()}}>
                            <Text style={{justifyContent:'center',
                                            textAlign:'center',
                                            fontSize:15,
                                            color:this.state.filterClinic==true?'#3FEEEA':'gray',
                                            textAlign:'center'}}>診所/停車場</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:0,
                                                    alignItems:'center',
                                                    marginStart:3,
                                                    justifyContent:'center',
                                                    zIndex:0,
                                                    width:100,
                                                    height:40}}
                                                    onPress={()=>{
                                                        this.setState({filterShowAll:false,filterClinic:false,filterFood:true});
                                                        this.loadFoodListData()}}>
                                                        
                            <Text style={{justifyContent:'center',
                                            textAlign:'center',
                                            fontSize:15,
                                            color:this.state.filterFood==true?'#3FEEEA':'gray',
                                            textAlign:'center'}}>食衣住行</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:0.735, 
                                flexDirection: 'column',
                                }}>
                    {this.state.showItem?
                        <FlatList
                        style={{width:Dimensions.get('window').width,marginStart:0,backgroundColor:'#EBF0F3'}}
                        contentContainerStyle={{ marginTop: 0}}
                        data={this.state.DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.key.toString()}
                        />
                    :null}
                </View>
                <View style={{flex: 0.01, flexDirection: 'column'}}>
                    <Image source={Footer_image} style={{marginStart:0,marginTop:0,width:Dimensions.get('window').width}}></Image>
                </View>
                <View style={{flex: 0.05, flexDirection: 'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.02,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.push('MainMenu')}>
                            <Image source={require('../assets/footerIcon/Home.png')}></Image>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.03,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.push('Search')}>
                            <Image source={require('../assets/footerIcon/Search.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.08,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.push('OverviewMap')}>
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
                    }} onPress={()=>this.props.navigation.push('Notifycation')}>
                            <Image source={require('../assets/footerIcon/Msg.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button,{
                        height: 50,
                        width:50,justifyContent:'center',
                        alignItems:'center',
                        marginStart: Dimensions.get('window').width*0.03,
                        marginEnd: Dimensions.get('window').width*0.01,
                        marginTop:12,
                    }} onPress={()=>this.props.navigation.push('Profile')}>
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




const Item = ({ _this,title,item,item_image,detailAddress, status, openTime,TEL }) => (
        <TouchableOpacity style={{  marginTop:0,
                        flex: 1,
                        width:Dimensions.get('window').width,
                        flexDirection:'row',
                        height:100,
                        marginBottom:10,
                        backgroundColor:'white'}}
                        onPress={() => {
                                            _this.props.navigation.push('OverviewMap',{passMarker:item,zoomLevel:18});
                                        }}>
            <View style={styles.container,{ 
                                            flex: 0.2,
                                            flexDirection: 'row',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            }}>
                <Image source={ item_image } style={{  
                                                        width:item.education=="北醫"?80:50,
                                                        height:item.education=="北醫"?80:50,
                                                        resizeMode:'contain',
                                                        }}></Image>
            </View>
            <View style={styles.container,{flex: 0.8,flexDirection: 'column'}}>
                <Text style={{
                    width:230,
                    height:30,
                    marginTop: 10,
                    fontSize:18,
                    color:'black'}}>
                        {title}
                </Text>
                <Image source={addressIcon_image} 
                        style={{marginStart:5,width:15,height:15}}>
                </Image>
                <Text style={{
                    width:230,
                    height:30,
                    marginTop: -15,
                    marginLeft: 20,
                    fontSize:12,
                    color:'black'}}>
                        {detailAddress}
                </Text>
                <Text style={{
                    width:230,
                    height:20,
                    marginTop: -15,
                    marginLeft: 20,
                    fontSize:12,
                    color:'black'}}>
                        {TEL}
                </Text>
                <Text style={{
                    width:230,
                    height:30,
                    marginTop: 0,
                    fontSize:14,
                    color:'#3FEEEA'}}>
                        {status}
                </Text>
                <Text style={{
                    width:230,
                    height:30,
                    marginTop: -31,
                    marginLeft: 50,
                    fontSize:12,
                    color:'black'}}>
                        {openTime}
                </Text>
            </View>
            
        </TouchableOpacity>
    // </View>
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