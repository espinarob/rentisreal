import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import SignUpTitleComponent from './signupTitleComponent.js';
import SignUpInputComponent from './signupInputComponent.js';

const signUpWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1,
        backgroundColor: '#758caf'
	}
});

export default class SignUpComponent extends Component{
	render() {
    	return (
    		<View style={signUpWrapperStyle.mainWrapper}>
                <SignUpTitleComponent/>
                <SignUpInputComponent 
                    Accounts = {this.props.Accounts}
                    doChangeRegisterFlag={this.props.doChangeRegisterFlag}
                    doProcessRegistration={this.props.doProcessRegistration}/>
                    
    		</View>
    	);
	}
}