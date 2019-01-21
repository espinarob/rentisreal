import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import {Button} from 'native-base';
import Constants from '../../Constants.js';
import LoadingScreen from '../../loadingScreen.js';

const forMoreWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	blockSectionStyle:{
		height: 40,
		borderBottomWidth:2,
		top:5
	},
	buttonStyle:{
		width:'100%',
		height: '100%',
		position:'relative',
		backgroundColor: '#fff'
	},
	textContentStyle:{
		height: '100%',
		left: 10,
		width: 100,
		fontSize:20
	}
});

export default class ForMoreBody extends Component{
	componentDidMount(){

	}

	doLogout = async() =>{
		await AsyncStorage.setItem(Constants.API_KEY,'null');
		await AsyncStorage.setItem(Constants.USER_NAME_KEY,'null');
		await AsyncStorage.setItem(Constants.PASS_WORD_KEY,'null');
		this.props.doChangeLogoutFlag(true);
		await setTimeout( ()=>{
			this.props.doChangeLoginFlag(false);
			this.props.doChangeLogoutFlag(false);
		},3000);
		
	}
	render() {
    	return (
    		<View style={forMoreWrapperStyle.mainWrapper}>
    			<View style={forMoreWrapperStyle.blockSectionStyle} >
    				<Button style={forMoreWrapperStyle.buttonStyle}
    					onPress={() => this.doLogout()}>
	    				<Text style={forMoreWrapperStyle.textContentStyle}>
	    					Logout
						</Text>
					</Button>
    			</View>
    		</View>
    	);
	}
}