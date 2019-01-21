import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, 
	TextInput, Switch, TouchableHighlight, CheckBox, TouchableOpacity} from "react-native";

const signupInputWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 40
	},
	userNameSection:{
		position:'relative',
		height: 50,
		top: 25, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10	
	},
	userNameInput:{
		position: 'relative',
		fontSize: 18,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	passwordSection:{
		position:'relative',
		height: 50,
		top: 30, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10	
	},
	passwordInput:{
		position: 'relative',
		fontSize: 18,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	confirmPasswordSection:{
		position:'relative',
		height: 50,
		top: 40, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	confirmPasswordInput:{
		position: 'relative',
		fontSize: 18,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	regEmailSection:{
		position:'relative',
		height: 50,
		top: 45, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	cancelSection:{
		position:'relative',
		height: 30,
		top: 90
	},
	viewTermsSection:{
		position:'relative',
		height: 30,
		top:85
	},
	regEmailInput:{
		position: 'relative',
		fontSize: 18,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	roleSection:{
		position:'relative',
		height: 25,
		top: 55,
		flexDirection: 'row'
	},
	errorSection:{
		position:'relative',
		height: 25,
		top: 67
	},
	roleSwitchStyle:{
		position: 'relative',
		left: 50
	},
	roleLabelStyle:{
		position: 'relative',
		left: 55,
		fontSize: 12,
		paddingTop: 8
	},
	termServiceSection:{
		position:'relative',
		height:25,
		top: 65,
		flexDirection: 'row'
	},
	termServiceSwitchStyle:{
		position: 'relative',
		left: 50
	},
	termServiceLabelStyle:{
		position: 'relative',
		left: 55,
		fontSize: 12,
		paddingTop: 8
	},
	signupButtonSection: {
		position:'relative',
		height: 65,
		top: 70
	},
	signupButtonStyle:{
		position: 'relative',
		left: '8%',
		width: '84%',
		height: '85%',
		backgroundColor:'#5f7391',
		borderRadius: 5
	},
	cancelLabel:{
		position: 'relative',
		left: '28%',
		width: '40%',
		height: '85%'
	},
	viewTermsLabel:{
		position: 'relative',
		left: '27%',
		width: '60%',
		height: '85%'
	}


});

export default class SignUpInputComponent extends Component{

	onSignup = async() =>{
		for(accountIndex=0;accountIndex<this.props.Accounts.length;accountIndex++){
			let currentAccount = this.props.Accounts[accountIndex];
			if(currentAccount.email == this.state.email){
				this.setState({errorMessage:'Email is already taken!'});
				return;
			}
			else if(currentAccount.username == this.state.username){
				this.setState({errorMessage:'Username is already taken!'});
				return;
			}
		}

		if(this.state.termsFlag == false){
			this.setState({errorMessage:'Please agree to terms of service!'});
		}	
		else if(this.state.username == '' || this.state.password == ''){
			this.setState({errorMessage:'Please input password or username!'});
		}
		else if(this.state.email == ''){
			this.setState({errorMessage:'Please input your email!'});
		}
		else if(this.state.confirmPassword == ''){
			this.setState({errorMessage:'Please confirm password!'});
		}	
		else if((this.state.confirmPassword != this.state.password)){
			this.setState({errorMessage:'Incorrect confirm password!'});
		}
		else if(this.state.password == 'null' || this.state.username == 'null'){
			this.setState({errorMessage:'Please get a new username!'});
		}
		else{
			let toRegisterAccount = {
				username: this.state.username,
				password: this.state.password,
				role: this.state.tenantRole,
				email: this.state.email
			}
			this.props.doProcessRegistration(toRegisterAccount);
			this.props.doChangeRegisterFlag(false);
		}	
	}


	tenantCheckBox = () =>{
		this.setState({
			tenantRole:!this.state.tenantRole
		});
	}

	termsCheckBox = () =>{
		this.setState({
			termsFlag:!this.state.termsFlag
		});
	}

	state = {
		tenantRole: false,
		termsFlag: false,
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
		errorMessage: ''
	}



	render() {
    	return (
    		<View style={signupInputWrapperStyle.mainWrapper}>
    			<View style={signupInputWrapperStyle.userNameSection}>
    				<TextInput
    					placeholder = "Input username"
    					style={signupInputWrapperStyle.userNameInput}
    					onChangeText = { (username) => this.setState({username})}/>
    			</View>

    			<View style={signupInputWrapperStyle.passwordSection}>
    				<TextInput
    					secureTextEntry={true}
    					placeholder = "Input password"
    					style={signupInputWrapperStyle.passwordInput}
    					onChangeText = { (password) => this.setState({password})}/>
    			</View>


    			<View style={signupInputWrapperStyle.confirmPasswordSection}>
    				<TextInput
    					secureTextEntry={true}
    					placeholder = "Confirm password"
    					style={signupInputWrapperStyle.confirmPasswordInput}
    					onChangeText = { (confirmPassword) => this.setState({confirmPassword})}/>
    			</View>

    			<View style={signupInputWrapperStyle.regEmailSection}>
    				<TextInput
    					placeholder = "Input E-mail"
    					style={signupInputWrapperStyle.regEmailInput}
    					onChangeText = { (email) => this.setState({email})}/>
    			</View>

    			<View style={signupInputWrapperStyle.roleSection}>
    				<CheckBox value={this.state.tenantRole} onChange={this.tenantCheckBox} style={signupInputWrapperStyle.roleSwitchStyle}/>
				    <Text style={signupInputWrapperStyle.roleLabelStyle}>
    					Register as Tenant (Default to Owner)
    				</Text>
    			</View>

    			<View style={signupInputWrapperStyle.termServiceSection}>
    				<CheckBox value={this.state.termsFlag} onChange={this.termsCheckBox} style={signupInputWrapperStyle.termServiceSwitchStyle} />
    				<Text style={signupInputWrapperStyle.termServiceLabelStyle}>
    					Agree to Terms of Service
    				</Text>
    			</View>

    			<View style={signupInputWrapperStyle.errorSection}>
					<Text style= {{fontSize:12,fontWeight:'bold',paddingTop:5,paddingLeft: '24%'}}>
						{this.state.errorMessage}
					</Text>
    			</View>

    			<View style={signupInputWrapperStyle.signupButtonSection}>
    				<TouchableHighlight style={signupInputWrapperStyle.signupButtonStyle}
    					 onPress={this.onSignup}
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:25,fontWeight:'bold',paddingTop:8,paddingLeft: '33%'}}>
    						Sign-Up
    					</Text>
    				</TouchableHighlight>
    			</View>


    			<View style={signupInputWrapperStyle.viewTermsSection}>
    				<TouchableOpacity style={signupInputWrapperStyle.viewTermsLabel}
    					 onPress={() => console.log('Viewed') }>
    					<Text style= {{fontSize:13,fontWeight:'bold',paddingTop:3,paddingLeft:15}}>
    						View Terms of Service
    					</Text>
    				</TouchableOpacity >
    			</View>
    			<View style={signupInputWrapperStyle.cancelSection}>
    				<TouchableOpacity style={signupInputWrapperStyle.cancelLabel}
    					 onPress={() => this.props.doChangeRegisterFlag(false) }>
    					<Text style= {{fontSize:13,fontWeight:'bold',paddingTop:3,paddingLeft:15}}>
    						Cancel Registration
    					</Text>
    				</TouchableOpacity >
    			</View>
    		</View>
    	);
	}
}