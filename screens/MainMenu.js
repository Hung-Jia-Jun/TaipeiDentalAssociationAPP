import React, { Component } from "react";
import {Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-主選單.png');
const item_image = require('../assets/b-主選單.png');
class MainMenu extends Component {
  render() {
	const renderItem = ({ item }) => (
		<Item title={item.title} />
	);

	return (
		<View style={styles.container,{flex: 4, flexDirection: 'column'}}>
			<ImageBackground source={image} style={styles.image}>
				<View style={{flex: 1.63, flexDirection: 'column'}}>

				</View>
				<View style={{flex: 8.4, flexDirection: 'column'}}>
					<FlatList
						contentContainerStyle={{ marginTop: 0}}
						data={DATA}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 24,
						marginTop:14,
					}} onPress={()=>this.props.navigation.navigate('MainMenu')}>
					</TouchableOpacity> 
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 11,
						marginTop:14,
					}} onPress={()=>this.props.navigation.navigate('Search')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 28,
						marginTop:14,
					}} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 24,
						marginTop:14,
					}} onPress={()=>this.props.navigation.navigate('Message')}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button,{
						height: 50,
						width:50,
						borderWidth:1,
						borderColor:'black',
						marginStart: 15,
						marginTop:14,
					}} onPress={()=>this.props.navigation.navigate('Profile')}>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
  }
};


const DATA = [
	{
		id: '0',
		title: '校友會公告',
	},
	{
		id: '1',
		title: '學術活動',
	},
	{
		id: '2',
		title: '牙材選購',
	},
	{
		id: '3',
		title: '人力交流',
  	},
	{
		id: '4',
		title: '牙醫學生',
	},
	{
		id: '5',
		title: '服務與協助',
	},
	{
		id: '6',
		title: '意見反映',
	},
];


const Item = ({ title }) => (
	<ImageBackground style={styles.MainMenuItemBackground}>
		<TouchableOpacity style={styles.button,{
			height: 87,
			width:Dimensions.get('window').width,
			borderWidth:1,
			borderColor:'black',
			marginStart: 0,
			marginTop:2,
		}} onPress={()=>this.props.navigation.navigate('OverviewMap')}>
		<text style={{
						marginTop: 30,
						marginLeft: 117,
						fontSize:18,
						color:'#FFFFFF'}}>
					{title}
		</text>
		</TouchableOpacity>
	</ImageBackground>
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
		background: "#000000a0"
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
	MainMenuItemBackground:{
		width:Dimensions.get('window').width,
		// backgroundColor: "#43D1E3"
	}
});
export default MainMenu;