import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-團購確認.png');
class Page extends Component {
  render() {
	return (
		<View style={styles.container,{flex: 3, flexDirection: 'column'}}>
			<ImageBackground source={image} style={styles.image}>
				<View style={{flex: 0.17, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
					<TouchableOpacity style={styles.button,{
						marginLeft: 23,
						marginTop: 57,
						width: 50,
						height: 50,
						borderWidth:1,
						borderColor:'black',
					}} onPress={()=>this.props.navigation.push('DentalGroupPurchase')}>
					</TouchableOpacity>
				</View>
				<View style={{flex:0.7, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
					<TouchableOpacity style={styles.button,{
						marginLeft: 133,
						marginTop: 187,
						width: 111,
						height: 41,
						borderWidth:1,
						borderColor:'black',
					}} onPress={()=>this.props.navigation.push('ShoppingCart')}>
					</TouchableOpacity>
				</View>
				<View style={{flex: 0.5, flexDirection: 'row'}}>
					<TouchableOpacity style={styles.button,{
							height: 68,
							marginLeft: 0,
							marginTop: 226,
							width: 373,
							borderWidth:1,
							borderColor:'black',
					}} onPress={()=>this.props.navigation.push('DentalGroupPurchase')}>
					</TouchableOpacity>
				</View>
			</ImageBackground>
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
export default Page;