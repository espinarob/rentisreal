import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import Constants from '../../Constants.js';
import LoadingScreen from '../../loadingScreen.js';
import UpdateDetails from './updateDetails.js';
import ChangePassword from './changePassword.js';


const forMoreWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	blockSectionStyle:{
		height: 40,
		borderBottomWidth:2,
		top:5,
		borderColor:'#9ea5af'
	},
	buttonStyle:{
		width:'100%',
		height: '100%',
		position:'relative',
		backgroundColor: '#fff',
		top:5
	},
	textContentStyle:{
		height: '100%',
		left: 10,
		width: 300,
		fontSize:20
	}
});

export default class ForMoreBody extends Component{
	componentDidMount(){

	}
	state = {
		flag: 'false',
		forMoreOperation: ''
	}

	doLogout = async() =>{
		await AsyncStorage.setItem(Constants.API_KEY,'null');
		await AsyncStorage.setItem(Constants.USER_NAME_KEY,'null');
		await AsyncStorage.setItem(Constants.PASS_WORD_KEY,'null');
		await AsyncStorage.setItem(Constants.ACCOUNT_ROLE,'null');
		this.props.doChangeLogoutFlag(true);
		await setTimeout( ()=>{
			this.props.doChangeLoginFlag(false);
			this.props.doChangeLogoutFlag(false);
		},3000);
		
	}

	changeOperation = (operation)=>{
		this.setState({forMoreOperation:String(operation)});
		this.setState({flag:'true'});
	}

	backPage = ()=>{
		this.setState({flag:'false'});
	}

	accountSubscriptionDisplay = ()=>{
		if(this.props.doGetMyAccount.role == 'owner'){
			return	<View style={forMoreWrapperStyle.blockSectionStyle} >
						<TouchableWithoutFeedback style={forMoreWrapperStyle.buttonStyle}
							onPress={() => this.changeOperation('account_subscription')}>
							<Text style={forMoreWrapperStyle.textContentStyle}>
			    				Account Subscription
			    			</Text>
						</TouchableWithoutFeedback>
					</View>
		}
		else return;
	}
	forMoreMainDisplay = ()=>{
		if(this.state.flag == 'false'){
			return	<React.Fragment>
						<View style={{
							backgroundColor: '#6785db',
							height: 42
						}}>

						</View>
						<View style={forMoreWrapperStyle.blockSectionStyle} >
							<TouchableWithoutFeedback style={forMoreWrapperStyle.buttonStyle}
								onPress={() => this.doLogout()}>
			    				<Text style={forMoreWrapperStyle.textContentStyle}>
			    					Logout
								</Text>
								
							</TouchableWithoutFeedback>
							
						</View>
						<View style={forMoreWrapperStyle.blockSectionStyle} >
							<TouchableWithoutFeedback style={forMoreWrapperStyle.buttonStyle}
								onPress={() => this.changeOperation('account_details')}>
								<Text style={forMoreWrapperStyle.textContentStyle}>
				    				Account Details
				    			</Text>
							</TouchableWithoutFeedback>
						</View>
						<View style={forMoreWrapperStyle.blockSectionStyle} >
							<TouchableWithoutFeedback style={forMoreWrapperStyle.buttonStyle}
								onPress={() => this.changeOperation('account_update')}>
								<Text style={forMoreWrapperStyle.textContentStyle}>
				    				Account Details Update
				    			</Text>
							</TouchableWithoutFeedback>
						</View>
						<View style={forMoreWrapperStyle.blockSectionStyle} >
							<TouchableWithoutFeedback style={forMoreWrapperStyle.buttonStyle}
								onPress={() => this.changeOperation('change_password')}>
								<Text style={forMoreWrapperStyle.textContentStyle}>
				    				Change Password
				    			</Text>
							</TouchableWithoutFeedback>
						</View>
						{this.accountSubscriptionDisplay()}
					</React.Fragment>
			
		}
		else if(this.state.forMoreOperation == 'change_password'){
			return	<ChangePassword
						doGetBack          = {this.backPage}
						doGetMyPassword    = {this.props.doGetMyAccount.password}
						doChangeMyPassword = {this.props.doChangeMyPassword} />
		}
		else if(this.state.forMoreOperation == 'account_update'){
			return <UpdateDetails 
						accountRole     = {this.props.doGetMyAccount.role}
						doProcessUpdate = {this.props.doProcessUpdate}
						doGetBack       = {this.backPage} />
		}
		else if(this.state.forMoreOperation == 'account_details'){
			return	<React.Fragment>
						<View style={{
							height: 41,
							flexDirection: 'row',
							color:'#8b8f96',
							backgroundColor: '#6785db'
						}}>
							<TouchableWithoutFeedback
                       			onPress={()=>this.backPage()}>
								<View style={{
										position: 'relative',
										height: '100%',
										width: 40}}>
									<Icon
					                    style={{fontSize:25,paddingTop:6,color:'#3a3a3a',paddingLeft:4}}
					                    name="arrowleft"
					                    type="AntDesign"/>
					            </View>
							</TouchableWithoutFeedback>
							<View style={{
								position:'relative',
								left: 65,
								width: 200,
								height: '100%'
							}}>
								<Text style={{fontSize:20,paddingTop:5}}>
									Account Details
								</Text>
							</View>
						</View>
						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								First Name: {this.props.doGetMyAccount.firstName}
							</Text>
						</View>
						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Middle Name: {this.props.doGetMyAccount.middleName == 'null' ? 'not updated' : this.props.doGetMyAccount.middleName }
							</Text>
						</View>
						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Last Name: {this.props.doGetMyAccount.lastName}
							</Text>
						</View>


						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Age: {this.props.doGetMyAccount.age}
							</Text>

						</View>

						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Birthday: {this.props.doGetMyAccount.birthdate}
							</Text>

						</View>

						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Gender: {this.props.doGetMyAccount.gender}
							</Text>
						</View>

						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Occupation: {this.props.doGetMyAccount.occupation == 'null' ? 'not updated' : this.props.doGetMyAccount.occupation }
							</Text>
						</View>

						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								Contact#: {this.props.doGetMyAccount.contactNumber == 'null' ? 'not updated' : this.props.doGetMyAccount.contactNumber }
							</Text>
						</View>

						<View style={{
							height:33,
							flexDirection: 'row',
							top:20,
							position: 'relative'
						}}>

							<Text style={{fontSize:14,
								paddingTop:5,
								position:'relative',
								left: 15,
								width:200}}>
								E-mail: {this.props.doGetMyAccount.email}
							</Text>
						</View>

					</React.Fragment>

		}
	}
	render() {
    	return (
    		<View style={forMoreWrapperStyle.mainWrapper}>
    			{this.forMoreMainDisplay()}
    		</View>
    	);
	}
}