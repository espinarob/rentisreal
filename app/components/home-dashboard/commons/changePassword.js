import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,AsyncStorage, TouchableOpacity, TextInput,TouchableWithoutFeedback} from "react-native";
import { Container, Icon, Button, Footer, FooterTab} from 'native-base';


export default class ChangePassword extends Component{


	state = {
		currentPassword    : '',
		newPassword        : '',
		confirmNewPassword : '',
		errorMsg           : ''
	}

	finalChangePassword = ()=>{
		if(this.state.currentPassword == ''){
			this.setState({errorMsg: 'Please fill in current password'});
			setTimeout(()=>this.setState({errorMsg:''}),3500);
			return;
		}
		else if(this.state.confirmNewPassword == ''){
			this.setState({errorMsg: 'Please fill in new password'});
			setTimeout(()=>this.setState({errorMsg:''}),3500);
			return;
		}
		else if(this.state.newPassword!=this.state.confirmNewPassword){
			this.setState({errorMsg: 'Confirm password does not match'});
			setTimeout(()=>this.setState({errorMsg:''}),3500);
			return;
		}
		else if(this.state.currentPassword!=this.props.doGetMyPassword){
			this.setState({errorMsg: 'Current input password is incorrect'});
			setTimeout(()=>this.setState({errorMsg:''}),3500);
			return;
		}
		else{
			this.setState({errorMsg:'Updating Password, Please wait..'});
			this.props.doChangeMyPassword(this.state.confirmNewPassword);
			setTimeout(()=>{
				this.props.doGetBack();
			},2500);
		}
	}

	render() {
    	return (
    		<View style={{flex:1}}>
    			<View style={{
	    				position: 'relative',
						height: 41,
					    flexDirection: 'row',
					    backgroundColor: '#6785db'}}>
					<TouchableWithoutFeedback
	                  	onPress={()=>this.props.doGetBack()}>
	                  	<Text style={{
	                      		height: '100%',
	                      		width: 45,
	                      		position: 'relative',
	                      		left: 5,
	                      		paddingLeft: 5,
	                      		paddingTop:9
	                  	}}>
		                    <Icon style={{fontSize:25,paddingTop:6,paddingLeft:4,color:'#3a3a3a'}}
		                      name="arrowleft"
		                      type="AntDesign"/>
	                  	</Text>
                	</TouchableWithoutFeedback>
	                <Text style={{
	                  		position: 'relative',
	                  		left:56,
	                  		height: '100%',
	                  		width: 200,
	                  		fontSize:20,
	                  		paddingTop:7
	                }}>
	                  Change Password
	                </Text>
    			</View>
    			<View style={{
                		height: 40,
                		width: '100%',
                		top: 20,
                		flexDirection: 'row'
                }}>
                	<Text style={{
                			width: 122,
                			height: '100%',
                			position :'relative',
                			left: 20,
                			fontSize: 14,
                			paddingTop: 6
                	}}>
                		Current Password:
                	</Text>

                	<TextInput
                		placeholder = 'current password'
                		style={{
                			borderWidth: 1,
                			height: '100%',
                			width: 150,
                			position: 'relative',
                			left: 27,
                			fontSize: 13,
                			borderRadius: 5
                		}}
                		maxLength    = {20}
                		onChangeText = {(currentPassword)=> this.setState({currentPassword:currentPassword})}/>
                </View>

                <View style={{
                		height: 40,
                		width: '100%',
                		top: 23,
                		flexDirection: 'row'
                }}>
                	<Text style={{
                			width: 122,
                			height: '100%',
                			position :'relative',
                			left: 20,
                			fontSize: 14,
                			paddingTop: 6
                	}}>
                		New Password:
                	</Text>

                	<TextInput
                		placeholder = 'new password'
                		style={{
                			borderWidth: 1,
                			height: '100%',
                			width: 150,
                			position: 'relative',
                			left: 27,
                			fontSize: 13,
                			borderRadius: 5
                		}}
                		maxLength    = {20}
                		onChangeText = {(newPassword)=> this.setState({newPassword:newPassword})}/>
                </View>

             	<View style={{
                		height: 40,
                		width: '100%',
                		top: 27,
                		flexDirection: 'row'
                }}>
                	<Text style={{
                			width: 122,
                			height: '100%',
                			position :'relative',
                			left: 20,
                			fontSize: 14,
                			paddingTop: 6
                	}}>
                		Confirm Password:
                	</Text>

                	<TextInput
                		placeholder = 'confirm new password'
                		style={{
                			borderWidth: 1,
                			height: '100%',
                			width: 150,
                			position: 'relative',
                			left: 27,
                			fontSize: 13,
                			borderRadius: 5
                		}}
                		maxLength    = {20}
                		onChangeText = {(confirmNewPassword)=> this.setState({confirmNewPassword:confirmNewPassword})}/>
                </View>

                <View style={{
                		height: 43,
                		width: '100%',
                		top: 33,
                		flexDirection: 'row'
                }}>	
                	<Text 	style={{
                				height: '100%',
                				width: 200,
                				left: 80
                	}}>
                		{this.state.errorMsg}
                	</Text>
                </View>

                <View style={{
                		height: 40,
                		width: '100%',
                		top: 40,
                		flexDirection: 'row'
                }}>
                	<TouchableWithoutFeedback
                		onPress= {()=>this.finalChangePassword()}>
                		<Text 	style={{
                					height: '100%',
                					width: 140,
                					left: 110,
                					borderColor: '#5ce24a',
                					fontWeight: 'bold',
                					paddingTop: 7,
                					paddingLeft: 11,
                					borderWidth: 2
                		}}>
                			Change Password
                		</Text>
                	</TouchableWithoutFeedback>
                </View>
    		</View>
    	);
	}
}