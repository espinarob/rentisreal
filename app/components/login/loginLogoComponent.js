import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const loginLogoWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 30
	}
});

export default class LoginLogoComponent extends Component{
	render() {
    	return (
    		<View style={loginLogoWrapperStyle.mainWrapper}>
    			
    		</View>
    	);
	}
}