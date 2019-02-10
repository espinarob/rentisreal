import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import SignUpTitleComponent from './signupTitleComponent.js';
import SignUpInputComponent from './signupInputComponent.js';

const signUpWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1,
        backgroundColor: '#6785db'
	}
});

export default class SignUpComponent extends Component{
	render() {
    	return (
    		<View style={signUpWrapperStyle.mainWrapper}>
                <SignUpTitleComponent/>
                <SignUpInputComponent 
                    doProcessRegistration={this.props.doProcessRegistration}
                    errorMsg  = {this.props.errorMsg}
                    doChangeRegisterFlag = {this.props.doChangeRegisterFlag}/>
                    
    		</View>
    	);
	}
}