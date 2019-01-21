import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const myRequestsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	}
});

export default class MyRequests extends Component{
	render() {
    	return (
    		<View style={myRequestsWrapperStyle.mainWrapper}>
    		</View>
    	);
	}
}