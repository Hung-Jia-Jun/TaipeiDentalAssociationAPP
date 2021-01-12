import React, { Component } from "react";
import { Dimensions,StyleSheet,Image,TouchableOpacity,Button,FlatList,ImageBackground,TextInput,Text, View } from "react-native";

const image = require('../assets/b-確認加入團購.png');
class Page extends Component {
  render() {
	return (
		<View style={styles.container,{flex: 3, flexDirection: 'column'}}>
			<ImageBackground source={image} style={styles.image,{width:375,height: 812}}>
				<View style={{flex: 0.17, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
					<TouchableOpacity style={styles.button,{
						marginLeft: 323,
						marginTop: 34,
						width: 50,
						height:50,
						borderWidth:1,
						borderColor:'black',
					}} onPress={()=>this.props.navigation.navigate('DentalGroupPurchase')}>
					</TouchableOpacity>
				</View>
				<View style={{flex:0.7, flexDirection: 'row' ,  flexWrap: 'wrap' }}>
					<TouchableOpacity style={styles.button,{
							marginLeft: 189,
							marginTop: 302,
							width: 88,
							height: 30,
							borderWidth:1,
							borderColor:'black',
					}} onPress={()=>this.props.navigation.navigate('DentalProcurementSussful')}>
					</TouchableOpacity>
				</View>
				<View style={{flex: 0.5, flexDirection: 'row'}}>
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