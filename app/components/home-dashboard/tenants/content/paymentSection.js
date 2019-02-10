import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,Alert,TouchableWithoutFeedback,TextInput,CheckBox} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';



export default class PaymentSection extends Component{

	state = {
		inputNameOfRemittance       : '',
		inputAddressOfRemittance    : '',
		inputSenderName             : '',
		inputContactNumber          : '',
		inputRecipientContactNumber : '',
		inputRecipientName          : '',
		inputRemittanceCode         : '',
		inputPaymentNotes           : '',
		paymentMode                 : true,
		paymentSectionError         : ''
	}

	paymentModeChange = ()=>{
		this.setState({paymentMode:!this.state.paymentMode});
	}

	doAlertForSubmit = ()=>{
		Alert.alert(
        	'Confirm',
        	'Proceed with submitting the payment information?',
        [
      		{text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          	{text: 'YES', onPress: () => this.doSubmitPayment()},
        ]);
	}

	doSubmitPayment = ()=>{
		let finalData = {
			inputNameOfRemittance       : this.state.inputNameOfRemittance,
			inputAddressOfRemittance    : this.state.inputAddressOfRemittance,
			inputSenderName             : this.state.inputSenderName,
			inputContactNumber          : this.state.inputContactNumber,
			inputRecipientContactNumber : this.state.inputRecipientContactNumber,
			inputRecipientName          : this.state.inputRecipientName,
			inputRemittanceCode         : this.state.inputRemittanceCode,
			inputPaymentNotes           : this.state.inputPaymentNotes,
			inputPaymentMode            : this.state.paymentMode === true ? 'Full' : 'Partial'
		}	

		if(this.state.inputNameOfRemittance.length==0){
			this.setState({paymentSectionError:'Name of remittance must not be blank'});
			return;
		}
		else if(this.state.inputAddressOfRemittance.length==0){
			this.setState({paymentSectionError:'Address of remittance must not be blank'});
			return;
		}
		else if(this.state.inputSenderName.length==0){
			this.setState({paymentSectionError:'Sender name must not be blank'});
			return;
		}
		else if(this.state.inputContactNumber.length==0){
			this.setState({paymentSectionError:'Sender contact must not be blank'});
			return;
		}
		else if(this.state.inputRecipientContactNumber.length==0){
			this.setState({paymentSectionError:'Recipient contact must not be blank'});
			return;
		}
		else if(this.state.inputRecipientName.length==0){
			this.setState({paymentSectionError:'Name of recipient must not be blank'});
			return;
		}
		else if(this.state.inputRemittanceCode.length==0){
			this.setState({paymentSectionError:'Remittance code must not be blank'});
			return;
		}
		else if(this.state.inputPaymentNotes.length==0){
			this.setState({paymentSectionError:'Payment notes must not be blank'});
			return;
		}
		else if( this.state.inputContactNumber.length<11 || Number.isInteger(Number(this.state.inputContactNumber)) == false){
			this.setState({paymentSectionError:'Invalid sender contact number'});
			return;
		}
		else if( this.state.inputRecipientContactNumber.length<11 || Number.isInteger(Number(this.state.inputRecipientContactNumber)) == false){
			this.setState({paymentSectionError:'Invalid recipient contact number'});
			return;
		}
		else{
			this.setState({paymentSectionError:'Please Wait..'});
			this.props.doSubmitTenantPayment(finalData,this.props.doGetRentalDetails);
			setTimeout(()=>{
				Alert.alert(
		        	'Reminder',
		        	'You may now check your payment history',
		        [	      
		          	{text: 'OK', onPress: () => console.log('OK')},
		        ]);
		        this.props.doRefreshBackAfterPay();
			},4500);
		}

	}


  	render() {
  		return (
  			<View style={{
	        			flex:1
	        	}}>
		        	<View style={{
	                        backgroundColor: '#6785db',
	                        height: 42,
	                        flexDirection: 'row'
	                }}>
	                	<TouchableWithoutFeedback
	                		onPress={ ()=>{
	                			this.props.doGetBack()}}>
		                	<Text style={{
		                			position:'relative',
		                			width: 40,
		                			height :'100%',
		                			left: 5,
		                			paddingTop:9,
		                			paddingLeft:5
		                	}}>
		                		<Icon style={{fontSize:25,paddingTop:6,paddingLeft:4,color:'#3a3a3a'}}
			                    	name="arrowleft"
				                    type="AntDesign"/>
		                	</Text>
		                </TouchableWithoutFeedback>
	                  	<Text style={{
	                          position: 'relative',
	                          left:60,
	                          height: '100%',
	                          width: 255,
	                          fontSize:20,
	                          paddingTop:10
	                  	}}>
	                   		Payment Section
	                  	</Text>
	                </View>

	                <Text style={{
	                	top:12,
	                	position:'relative',
	                	height: 20,
	                	width:150,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Name of Remittance
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:12
	                	}}
	                	maxLength   = {25}
	                	placeholder = "name of remittance"
	                	onChangeText={(inputNameOfRemittance)=>this.setState({inputNameOfRemittance:inputNameOfRemittance})}/>
            		
            		<Text style={{
	                	top:17,
	                	position:'relative',
	                	height: 20,
	                	width:170,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Address of Remittance
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:17
	                	}}
	                	maxLength   = {30}
	                	placeholder = "address of remittance"
	                	onChangeText={(inputAddressOfRemittance)=>this.setState({inputAddressOfRemittance:inputAddressOfRemittance})}/>
            
	                <Text style={{
	                	top:22,
	                	position:'relative',
	                	height: 20,
	                	width:170,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Sender Name
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:22
	                	}}
	                	maxLength   = {30}
	                	placeholder = "name of sender"
	                	onChangeText={(inputSenderName)=>this.setState({inputSenderName:inputSenderName})}/>
            		
            		<Text style={{
	                	top:27,
	                	position:'relative',
	                	height: 20,
	                	width:210,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Submitted Sender Contact #
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:27
	                	}}
	                	maxLength   = {11}
	                	placeholder = "contact number of sender"
	                	onChangeText={(inputContactNumber)=>this.setState({inputContactNumber:inputContactNumber})}/>
            
	                <Text style={{
	                	top:32,
	                	position:'relative',
	                	height: 20,
	                	width:210,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Submitted Recipient Contact # 
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:32
	                	}}
	                	maxLength   = {11}
	                	placeholder = "contact number of recipient"
	                	onChangeText={(inputRecipientContactNumber)=>this.setState({inputRecipientContactNumber:inputRecipientContactNumber})}/>
           
	                <Text style={{
	                	top:37,
	                	position:'relative',
	                	height: 20,
	                	width:170,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Recipient Name
	                </Text>

	                <TextInput
	                	style={{
	                		width: 160,
	                		height: 30,
						    left: 20,
						    alignItems: 'stretch',
						    padding: 0,
						    position: 'relative',
						    borderRadius: 5,
						    fontSize: 12,
						    borderWidth:1,
						    top:37
	                	}}
	                	maxLength   = {30}
	                	placeholder = "name of recipient"
	                	onChangeText={(inputRecipientName)=>this.setState({inputRecipientName:inputRecipientName})}/>
            		<Text style={{
	                	top:42,
	                	position:'relative',
	                	height: 20,
	                	width:170,
	                	fontSize:13,
	                	left: 20
	                }}>
	                	Remittance Code
	                </Text>

	                <View style={{
	                	width:'100%',	
	                	height: 34,
	                	top: 42,
	                	position:'relative',
	                	flexDirection: 'row'
	                }}>
		                <TextInput
		                	style={{
		                		width: 160,
		                		height: '95%',
							    left: 20,
							    alignItems: 'stretch',
							    padding: 0,
							    position: 'relative',
							    borderRadius: 5,
							    fontSize: 12,
							    borderWidth:1
		                	}}
		                	maxLength   = {40}
		                	placeholder = "remittane code"
		                	onChangeText={(inputRemittanceCode)=>this.setState({inputRemittanceCode:inputRemittanceCode})}/>
            		
		                <CheckBox style={{
		                	position:'relative',
		                	left: 23,
		                	borderWidth: 2
		                }}
		                value={this.state.paymentMode}
		                onChange={()=>this.paymentModeChange()}/>
		                <Text style={{
		                	height:'100%',
		                	width: 53,
		                	left:20,
		                	fontSize:13,
		                	paddingTop:5,
		                	fontWeight: 'bold'
		                }}>
		                	Full-Pay
		                </Text>

		                <CheckBox style={{
		                	position:'relative',
		                	left: 21,
		                	borderWidth: 2
		                }}
		                value={!this.state.paymentMode}
		                onChange={()=>this.paymentModeChange()}/>
		                <Text style={{
		                	height:'100%',
		                	width: 57,
		                	left:20,
		                	fontSize:11,
		                	paddingTop:8,
		                	fontWeight: 'bold'
		                }}>
		                	Partial-Pay
		                </Text>

            		</View>	

            		<Text style={{
	                	top:45,
	                	position:'relative',
	                	height: 20,
	                	width:300,
	                	fontSize:11,
	                	left: 20,
	                	fontWeight: 'bold'
	                }}>
	                	Notes (required) (comments or message attach to payment)
	                </Text>

	                <View style={{
	                	flexDirection: 'row',
	                	width: '100%',
	                	height: 34,
	                	top: 44,
	                	position: 'relative',
	                }}>
		                <TextInput
		                	style={{
		                		width: 160,
		                		height: '100%',
							    left: 20,
							    alignItems: 'stretch',
							    padding: 0,
							    position: 'relative',
							    borderRadius: 5,
							    fontSize: 12,
							    borderWidth:1
		                	}}
		                	maxLength   = {35}
		                	placeholder = "attached payment note"
		                	onChangeText={(inputPaymentNotes)=>this.setState({inputPaymentNotes:inputPaymentNotes})}/>
            			
            			<TouchableWithoutFeedback
            				onPress={()=>this.doAlertForSubmit()}>
	            			<Text style={{
	            				borderWidth: 2,
	            				height:'100%',
	            				left: 102,
	            				borderColor: '#5ce24a',
	            				width : 75,
	            				paddingTop: 5,
	            				paddingLeft: 13,
	            				fontSize :15,
	            				fontWeight: 'bold'
	            			}}>
	            				Submit
	            			</Text>
	            		</TouchableWithoutFeedback>
		            </View>

		            <Text style={{
	            			height: 19,
	            			top: 45,
	            			width: 270,
	            			paddingLeft: 10,
	            			fontWeight: 'bold',
	            			position:'relative',
	            			left: 30
            		}}>
            			{this.state.paymentSectionError}
            		</Text>
            </View>
		);
  	}
}