import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput, TouchableHighlight,TouchableOpacity,AsyncStorage} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../Constants.js';

const loginInputWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 50
	},
	userNameSection:{
		position:'relative',
		height: 70,
		width: '84%',
		left: '8%',
		top: 55, 
		borderWidth:1,
		flexDirection:'row',
		borderRadius: 10
	},
	passwordSection:{
		position:'relative',
		height: 70,
		width: '84%',
		left: '8%',
		top: 65, 
		borderWidth:1,
		flexDirection:'row',
		borderRadius: 10
	},
	loginButtonSection:{
		position:'relative',
		height: 65,
		top: 80
	},
	registrationLinkSection:{
		position:'relative',
		height: 30,
		top: 92
	},
	errorSection:{
		position:'relative',
		height: 25,
		top: 75
	},
	userNameLabel:{
		position: 'relative',
		paddingTop: 15,
		paddingLeft: 10,
		left: '20%',
		width: '20%'
	},
	userNameInput:{
		position: 'relative',
		fontSize: 20,
		left: '33%',
		width: '70%'
	},
	passwordLabel:{
		position: 'relative',
		paddingTop: 15,
		paddingLeft: 10,
		left: '20%',
		width: '20%'
	},
	passwordInput:{
		position: 'relative',
		fontSize: 20,
		left: '33%',
		width: '70%'
	},
	loginButtonStyle:{
		position: 'relative',
		left: '8%',
		width: '84%',
		height: '85%',
		backgroundColor:'#5f7391',
		borderRadius: 5
	},
	registrationLabel:{
		position: 'relative',
		left: '28%',
		width: '40%',
		height: '85%'
	}
});

const USER_NAME_KEY = "RENT_IS_REAL_USER_NAME_KEY";
const PASS_WORD_KEY = "RENT_IS_REAL_PASS_WORD_KEY";
const API_KEY       = "RENT_IS_REAL_API_KEY";

export default class LoginInputComponent extends Component{

	state = {
			username: '',
			password: '',
			errorMessage: ''
	}

	onLogin = async () =>{
		let found = false;
		if(this.state.username == '' || this.state.password == '' ){
			this.setState({errorMessage:'Please input password or username!'});
		}
		else if(this.props.Accounts.length === 0){
			this.setState({errorMessage:'No Accounts Detected!'});
		} 
		else{
			let index = -1;
			for(index=0;index<this.props.Accounts.length;index++){
				let currentAccount = this.props.Accounts[index];
				if(currentAccount.username == this.state.username 
					&& currentAccount.password == this.state.password){
					found = true;
					break;
				}
			}

			if(found){
				try{
					await AsyncStorage.setItem(Constants.API_KEY,String(this.props.IDs[index]));
					await AsyncStorage.setItem(Constants.USER_NAME_KEY,String(this.state.username));
					await AsyncStorage.setItem(Constants.PASS_WORD_KEY,String(this.state.password));
					await AsyncStorage.setItem(Constants.ACCOUNT_INDEX,String(index));
				}
				catch(error){
					console.log('Failed to save data!');
					return;
				}
				await setTimeout(()=>console.log('Logging in!'),2000);
					this.setState({errorMessage:'Successfully Login!'});
					this.props.doChangeLoginFlag(true);
			}
			else{
				this.props.doChangeLoginFlag(false);
				this.setState({errorMessage:'Incorrect username or password!'});
				return;
			}
		}
	}
	render() {
    	return (
    		<View style={loginInputWrapperStyle.mainWrapper}>
    			<View style={loginInputWrapperStyle.userNameSection}>
    				<Text style={loginInputWrapperStyle.userNameLabel}>  
    					<Icon name='user' style={{fontSize:44}} />
    				</Text>
    				<TextInput
    					placeholder = "Username"
    					style={loginInputWrapperStyle.userNameInput}
    					onChangeText = { (username) => this.setState({username})}/>
    			</View>

    			<View style={loginInputWrapperStyle.passwordSection}>
    				<Text style={loginInputWrapperStyle.passwordLabel}>  
    					<Icon name='lock' style={{fontSize:44}} />
    				</Text>
    				<TextInput
    					secureTextEntry={true}
    					placeholder="Password"
    					style={loginInputWrapperStyle.passwordInput}
    					onChangeText = { (password) => this.setState({password})}/>
    			</View>
    			<View style={loginInputWrapperStyle.errorSection}>
					<Text style= {{fontSize:12,fontWeight:'bold',paddingTop:8,paddingLeft: '24%'}}>
						{this.state.errorMessage}
					</Text>
    			</View>
    			<View style={loginInputWrapperStyle.loginButtonSection}>
    				<TouchableHighlight style={loginInputWrapperStyle.loginButtonStyle}
    					 onPress={this.onLogin}
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:25,fontWeight:'bold',paddingTop:10,paddingLeft: '37%'}}>
    						Login
    					</Text>
    				</TouchableHighlight>
    			</View>

    			<View style={loginInputWrapperStyle.registrationLinkSection}>
    				<TouchableOpacity style={loginInputWrapperStyle.registrationLabel}
    					 onPress={ () => this.props.doChangeRegisterFlag(true) }>
    					<Text style= {{fontSize:13,fontWeight:'bold',paddingTop:3,paddingLeft:15}}>
    						Click here to Sign up
    					</Text>
    				</TouchableOpacity >
    			</View>

    		</View>
    	);
	}
}