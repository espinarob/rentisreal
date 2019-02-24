import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const loginLogoWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 27
	}
});

export default class LoginLogoComponent extends Component{
	render() {
    	return (
    		<View style={loginLogoWrapperStyle.mainWrapper}>
    			<Text style={{
		            position:'relative',
		            width:'100%',
		            height: 70,
		            top: 7,
		            fontWeight:'bold',
		            fontSize: 60,
		            paddingLeft: 55
	          	}}>
	            	RENT
	          	</Text>
	          	<Text style={{
            			position:'relative',
			            width:'100%',
			            height: 70,
			            top: 8,
			            fontWeight:'bold',
			            fontSize: 60,
			            paddingLeft: 100,
			            color: '#fff'
	         	}}>
		            IS
	          	</Text>
	          	<Text style={{
			            position:'relative',
			            width:'100%',
			            height: 65,
			            top: 9,
			            fontWeight:'bold',
			            fontSize: 60,
			            paddingLeft: 105,
			            color: '#fff',
			            paddingTop:0
	          	}}>
		            REAL
	          	</Text>
    		</View>
    	);
	}
}