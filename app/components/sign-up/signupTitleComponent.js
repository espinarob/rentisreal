import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const signupTitleWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 4
	},
	titleStyle:{
		position: 'relative',
		fontSize: 28,
		width: '50%',
		fontWeight: 'bold',
		color: '#617593',
		top: '20%',
		left: '27%'
	}
});

export default class SignUpTitleComponent extends Component{
	render() {
    	return (
    		<View style={signupTitleWrapperStyle.mainWrapper}>
    			<Text style={signupTitleWrapperStyle.titleStyle}>Registration</Text>
    		</View>
    	);
	}
}