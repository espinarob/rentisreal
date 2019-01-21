import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import LoginLogoComponent from './loginLogoComponent.js';
import LoginInputComponent from './loginInputComponent.js';

const loginWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1,
        backgroundColor: '#758caf'
	}
});

export default class LoginComponent extends Component{
	render() {
    	return (
    		<View style={loginWrapperStyle.mainWrapper}> 
    			<LoginLogoComponent/>
    			<LoginInputComponent 
                    Accounts={this.props.Accounts} 
                    IDs     ={this.props.IDs}
                    doChangeLoginFlag={this.props.doChangeLoginFlag}
                    doChangeRegisterFlag={this.props.doChangeRegisterFlag}/>
                   
                    
    		</View>
    	);
	}
}