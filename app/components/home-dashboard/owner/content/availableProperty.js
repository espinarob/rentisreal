import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const availablePropertyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	}
});

export default class AvailableProperty extends Component{

	render() {
    	return (
    		<View style={availablePropertyWrapperStyle.mainWrapper}>
    			<Text> AVAILABLE PROPERTY NI </Text>
    		</View>
    	);
	}
}