import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, 
	TextInput, Switch, TouchableHighlight, CheckBox, TouchableOpacity, Picker} from "react-native";

const signupInputWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 40
	},
	userNameSection:{
		position:'relative',
		height: 35,
		top: 20, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10	
	},
	userNameInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	passwordSection:{
		position:'relative',
		height: 35,
		top: 25, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10	
	},
	passwordInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	confirmPasswordSection:{
		position:'relative',
		height: 35,
		top: 30, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	confirmPasswordInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	regEmailSection:{
		position:'relative',
		height: 35,
		top: 35, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	firstNameSection:{
		position:'relative',
		height: 35,
		top: 40, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	lastNameSection:{
		position:'relative',
		height: 35,
		top: 45, 
		borderWidth:1,
		width: '84%',
		left: '8%',
		borderRadius: 10
	},
	cancelSection:{
		position:'relative',
		height: 27,
		top: 72
	},
	viewTermsSection:{
		position:'relative',
		height: 25,
		top:68
	},
	regEmailInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	firstNameInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	lastNameInput:{
		position: 'relative',
		fontSize: 11,
		height: '100%',
		left: '5%',
		width: '90%'
	},
	roleSection:{
		position:'relative',
		height: 25,
		top: 52,
		flexDirection: 'row'
	},
	errorSection:{
		position:'relative',
		height: 23,
		top: 60
	},
	roleSwitchStyle:{
		position: 'relative',
		left: 50
	},
	roleLabelStyle:{
		position: 'relative',
		left: 55,
		fontSize: 12,
		paddingTop: 7
	},
	termServiceSection:{
		position:'relative',
		height:25,
		top: 56,
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
		paddingTop: 7
	},
	signupButtonSection: {
		position:'relative',
		height: 39,
		top: 63
	},
	signupButtonStyle:{
		position: 'relative',
		left: '20%',
		width: '60%',
		height: '85%',
		backgroundColor:'#315cb2',
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
	},
	genderSection:{
		position: 'relative',
		height: 36,
		top: 48,
    	flexDirection: 'row'
	},
	birthdaySection:{
		position: 'relative',
		height: 33,
		top: 52,
    	flexDirection: 'row'
	}
});

export default class SignUpInputComponent extends Component{

	onSignup = () =>{

		let getAge = this.validateBirthday();
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
		else if(this.state.firstName == '' || this.state.lastName == ''){
			this.setState({errorMessage:'Please input first name and last name'});
		}
		else if(this.state.userBirthday == '' || getAge == false){
			this.setState({errorMessage:'Please input your birthday as format indicated'});
		}
		else{
			let toRegisterAccount = {
				username  : this.state.username,
				password  : this.state.password,
				role      : this.state.tenantRole,
				email     : this.state.email,
				firstName : this.state.firstName,
				lastName  : this.state.lastName,
				gender    : this.state.gender ? 'male' : 'female',
				age       : String(getAge),
				birthday  : this.state.userBirthday
			}
			this.props.doProcessRegistration(toRegisterAccount);
		}
	}

	validateBirthday = ()=>{
		let currentBirthday = this.state.userBirthday;
		let today           = new Date();
		if(currentBirthday.length<10){
			console.log('length');
			return false;
		}
		let birthMonth      = currentBirthday[0] + currentBirthday[1];
		let day				= currentBirthday[3] + currentBirthday[4];
		let year            = currentBirthday[6] + currentBirthday[7] + currentBirthday[8] + currentBirthday[9];
		
		if( Number.isInteger(Number(birthMonth)) == false ||
			Number.isInteger(Number(day))        == false ||
			Number.isInteger(Number(year))       == false ){
			return false;
		}
		else if( Number(birthMonth)<=0 || Number(birthMonth)>12){
			return false;
		}
		else if( Number(day)<=0 || Number(day)>31){
			return false;
		}
		else if( Number(year) > Number(today.getFullYear()) ){
			return false;
		}
		else{
			return Number(today.getFullYear()) - Number(year);
		}
	}

	verifySignUpError = ()=>{
		if(this.props.errorMsg.length!=0){
			return this.props.errorMsg;
		}
		else
			return this.state.errorMessage;
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
		tenantRole      : false,
		termsFlag       : false,
		username        : '',
		password        : '',
		confirmPassword : '',
		email           : '',
		firstName       : '',
		lastName        : '',
		errorMessage    : '',
		userBirthday    : '',
		gender          : true
	}

	genderChange = () => {
	    this.setState({gender:!this.state.gender});
	}

	onMonthChange = (itemValue,itemIndex)=>{
		this.setState({monthBirthday:itemValue});
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
    					maxLength = {20}
    					onChangeText = { (password) => this.setState({password})}/>
    			</View>


    			<View style={signupInputWrapperStyle.confirmPasswordSection}>
    				<TextInput
    					secureTextEntry={true}
    					placeholder = "Confirm password"
    					maxLength = {20}
    					style={signupInputWrapperStyle.confirmPasswordInput}
    					onChangeText = { (confirmPassword) => this.setState({confirmPassword})}/>
    			</View>

    			<View style={signupInputWrapperStyle.regEmailSection}>
    				<TextInput
    					placeholder = "Input E-mail"
    					style={signupInputWrapperStyle.regEmailInput}
    					onChangeText = { (email) => this.setState({email})}/>
    			</View>
    			<View style={signupInputWrapperStyle.firstNameSection}>
    				<TextInput
    					placeholder = "Input first name"
    					style={signupInputWrapperStyle.firstNameInput}
    					onChangeText = { (firstName) => this.setState({firstName})}/>
    			</View>
    			<View style={signupInputWrapperStyle.lastNameSection}>
    				<TextInput
    					placeholder = "Input last name"
    					style={signupInputWrapperStyle.lastNameInput}
    					onChangeText = { (lastName) => this.setState({lastName})}/>
    			</View>

    			<View style={signupInputWrapperStyle.genderSection}>
	    			<Text style={{
		                  position: 'relative',
		                  width:55,
		                  height:'100%',
		                  paddingTop:5,
		                  left:35 }}>
		                Gender:
		            </Text>
    				<CheckBox style={{
		                position:'relative',
		                left:50,
		                borderWidth:2}}
		                value={this.state.gender}
		                onChange={ ()=>this.genderChange()}/>
		            <Text style={{
		                  position: 'relative',
		                  width:40,
		                  height:'100%',
		                  paddingTop:5,
		                  left:50 }}>
		              Male
		            </Text>
		            <CheckBox style={{
		                position:'relative',
		                left:56,
		                borderWidth:2}}
		                value={!this.state.gender}
		                onChange={ ()=>this.genderChange()}/>
		            <Text style={{
		                  position: 'relative',
		                  width:60,
		                  height:'100%',
		                  paddingTop:5,
		                  left:56}}>
		              Female
		            </Text>
    			</View>

    			<View style={signupInputWrapperStyle.birthdaySection}>

    				<Text style={{
    						height: '100%',
    						width: 63,
    						position: 'relative',
    						left:34,
    						paddingTop:5
    				}}>
    					Birthday:
    				</Text>
    				<TextInput
    					placeholder = "mm/dd/yyyy"
    					style={{
    						width: 86,
    						fontSize: 11,
    						borderWidth:1,	
    						borderRadius:5,
    						height: '100%',
    						left: 37,
    						position: 'relative'
    					}}
    					onChangeText = { (userBirthday) => this.setState({userBirthday})}/>
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
					<Text style= {{fontSize:11,fontWeight:'bold',paddingTop:5,paddingLeft: '24%'}}>
						{this.verifySignUpError()}
					</Text>
    			</View>

    			<View style={signupInputWrapperStyle.signupButtonSection}>
    				<TouchableHighlight style={signupInputWrapperStyle.signupButtonStyle}
    					 onPress={this.onSignup}
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:17,fontWeight:'bold',paddingTop:5,paddingLeft: '33.6%'}}>
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