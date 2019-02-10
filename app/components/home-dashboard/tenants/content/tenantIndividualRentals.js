import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback,Alert,Picker} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import TenantMailing from "./tenantMailing.js";
import PaymentWall   from "./paymentWall.js";



export default class TenantIndividulRentals extends Component{


	state = {
		rentalOperation: 'none',
		sentMails    : [],
		rating       : '1',
		ratedFlag    : '',
		currentRated : '',
		paymentMade  : []
	}

	componentDidMount(){
		if(this.props.doGetRentalDetails.mails){
			let currentMails = JSON.parse(JSON.stringify(this.props.doGetRentalDetails.mails));
			const initSentMails = [];
			Object
				.keys(currentMails)
				.forEach((mailKey)=>{	
					initSentMails.push(currentMails[mailKey]);
				});
			this.setState({sentMails:initSentMails});
		}
		else;

		if(this.props.doGetRentalDetails.rated == 'none'){
			this.setState({ratedFlag:'false'});
		}
		else{
			this.setState({ratedFlag:'true'});
			this.setState({currentRated:this.props.doGetRentalDetails.rated});
		}

		if(this.props.doGetRentalDetails.paymentMade){
			let allPaymentMade    = JSON.parse(JSON.stringify(this.props.doGetRentalDetails.paymentMade));
			const initPaymentMade = []; 
			Object
				.keys(allPaymentMade)
				.forEach((paymentKey)=>{
					initPaymentMade.push(allPaymentMade[paymentKey]);
				});
			this.setState({paymentMade:initPaymentMade});
		}
		else;
	}

	getBackFromRental = ()=>{
		this.setState({rentalOperation:'none'});
	}

	getBackRefreshForSendingMail = ()=>{
		this.props.doGetBack();
	}

	getBackRefreshForSendingPayment = ()=>{
		this.props.doGetBack();
	}

	doAlertForClearingAllSent = ()=>{
		Alert.alert(
      		'Delete',
      		'Are you sure to clear all messages?',
        [
          	{text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          	{text: 'YES', onPress: () => this.doFinalDelete()},
        ]);
	}

	doFinalDelete = ()=>{
		this.props.doDeleteTenantSent(this.props.doGetRentalDetails.tenantID,
			this.props.doGetRentalDetails.requestID);
		Alert.alert(
            'Success',
            'Successfully deleted sent mails',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
		this.props.doGetBack();
	}

	doSubmitRating = ()=>{
		if(this.state.ratedFlag == 'false'){
			this.props.doSubmitTenantRate(this.props.doGetRentalDetails.Account,
				this.props.doGetRentalDetails.propertyID,
				this.state.rating,
				1,
				this.props.doGetRentalDetails.tenantID,
				this.props.doGetRentalDetails.requestID,
				0);
			this.setState({ratedFlag:'true'});
			this.props.doGetBack();
		}
		else{
			this.props.doSubmitTenantRate(this.props.doGetRentalDetails.Account,
				this.props.doGetRentalDetails.propertyID,
				this.state.rating,
				0,
				this.props.doGetRentalDetails.tenantID,
				this.props.doGetRentalDetails.requestID,
				this.state.currentRated);
			this.props.doGetBack();
		}

	}


	onRatingValueChange = (itemValue,itemIndex) =>{
		this.setState({rating:itemValue});
	}
	clearSentDisplay = ()=>{
		if(this.state.sentMails.length!=0){
			return	<TouchableWithoutFeedback
                		onPress={()=>this.doAlertForClearingAllSent()}>
	                	<Text style={{
	                		borderWidth: 2,
	                		width: 76,
	                		height: 24,
	                		position:'relative',
	                		left: 103,
	                		fontSize: 14,
	                		top:4,
	                		paddingTop:2,
	                		paddingLeft:12
	                	}}>
	                		Clear All
	                	</Text>
	                </TouchableWithoutFeedback>
		}
		else return;
	}

	mainSentDisplay = ()=>{
		if(this.state.sentMails.length!=0){
			return	<FlatList
	                	data={this.state.sentMails}
	                	renderItem={({item}) =>
	                		<View style={{
	                			height:96,
	                			width: '100%',
	                		}}>
	                			<Text style={{
	                				position: 'relative',
	                				height:19,
	                				left: 10,
	                				width: 100,
	                				fontSize:12,
	                				paddingLeft:5,
	                				fontWeight: 'bold'
	                			}}>	
	                				Date: {item.dateSent}
	                			</Text>

	                			<Text style={{
	                				position: 'relative',
	                				height:22,
	                				left: 10,
	                				width:250,
	                				fontSize: 14,
	                				paddingLeft:5,
	                				fontWeight: 'bold'
	                			}}>
	                				Subject: {item.mailSubject}
	                			</Text>
	                			<Text style={{
	                				position: 'relative',
	                				height:50,
	                				left: 10,
	                				width:300,
	                				fontSize: 12,
	                				paddingLeft:5,
	                				fontWeight: 'bold'
	                			}}>
	                				Content: {item.mailContent}
	                			</Text>

	                		</View>
	                	}
	                	keyExtractor={item => item.messageID}/>
		}
		else{
			return <Text style={{position:'relative',top:60,left:115}}>No sent mails yet</Text>;
		}
	}


	individualRentalMainDisplay = ()=>{
		if(this.state.rentalOperation == 'mail'){
			return <TenantMailing
						doGetRentalDetails      = {this.props.doGetRentalDetails}
						doGetBack               = {this.getBackFromRental}
						doOperateTenantMail     = {this.props.doOperateTenantMail}
						doRefreshBackAfterSend  = {this.getBackRefreshForSendingMail} />
		}
		else if(this.state.rentalOperation == 'call'){

		}
		else if(this.state.rentalOperation == 'cashwall'){
			return <PaymentWall
						doGetRentalDetails    = {this.props.doGetRentalDetails}
						doGetBack             = {this.getBackFromRental}
						doSubmitTenantPayment = {this.props.doSubmitTenantPayment} 
						doGetAllPaymentMade   = {this.state.paymentMade}
						doRefreshBackAfterPay = {this.getBackRefreshForSendingPayment} />
		}
		else{
			return <React.Fragment>
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
	                          left:45,
	                          height: '100%',
	                          width: 200,
	                          fontSize:20,
	                          paddingTop:10
	                  	}}>
	                   		Property Rental View
	                  	</Text>
	                </View>
	                <View style={{
	                		height: 25,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:15,
	                			height:'100%',
	                			position:'relative',
	                			left: 20
	                	}}>
	                		Property Owner Information:
	                	</Text>
	                </View>
	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Owner Name: {this.props.doGetRentalDetails.ownerFirstName}{' '}
	                		{this.props.doGetRentalDetails.ownerMiddleName}{' '}
	                		{this.props.doGetRentalDetails.ownerLastName}
	                	</Text>
	                </View>

	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Owner Email: {this.props.doGetRentalDetails.ownerEmail}
	                	</Text>
	                </View>

	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Owner Contact #: {this.props.doGetRentalDetails.ownerContactNumber}
	                	</Text>
	                </View>

	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Property Name: {this.props.doGetRentalDetails.propertyName}
	                	</Text>
	                </View>

	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Property Address: {this.props.doGetRentalDetails.propertyLocation}
	                	</Text>
	                </View>
	                <View style={{
	                		height:20,
	                		top:7
	                }}>
	                	<Text style={{
	                			width:250,
	                			fontSize:12,
	                			height:'100%',
	                			position:'relative',
	                			left: 22
	                	}}>
	                		Property Details: {this.props.doGetRentalDetails.propertyFurtherData}
	                	</Text>
	                </View>

	                <View style={{
	                		height:30,
	                		top:7,
	                		flexDirection: 'row'
	                }}>
	                	<Text style={{
	                			width: 100,
	                			height: '100%',
	                			position: 'relative',
	                			left: 20,
	                			fontWeight: 'bold',
	                			paddingTop:7
	                	}}>
	                		Rate Property
	                	</Text>

	                	<View style={{
	                			width:100,
	                			height: '100%',
	                			left:40,
	                			position:'relative',
	                			paddingLeft: 20,
	                			borderWidth:2,
	                			borderColor: '#5ce24a'
	                	}}>
		                	<Picker
		                		selectedValue = {this.state.rating}
		                		style={{height:'100%',width:90}}
		                		onValueChange={this.onRatingValueChange}>
		                		<Picker.Item label="1" value="1"/>
		                		<Picker.Item label="2" value="2"/>
		                		<Picker.Item label="3" value="3"/>
		                		<Picker.Item label="4" value="4"/>
		                		<Picker.Item label="5" value="5"/>
		                	</Picker>
		                </View>

		                <TouchableWithoutFeedback
		                	onPress={()=>this.doSubmitRating()}>
			               	<Text style={{
			               		width: 90,
			               		fontSize: 12,
			               		fontWeight: 'bold',
			               		height: '100%',
			               		position: 'relative',
			               		left: 55,
			               		borderWidth: 2,
			               		paddingTop:7,
			               		paddingLeft:7,
			               		borderColor: '#5ce24a'
			               	}}>
			               		Submit Rating
			               	</Text>
			            </TouchableWithoutFeedback>
	                </View>

	                <View style={{
	                		height:40,
	                		top: 15,
	                		flexDirection: 'row',
	                		width:'100%'
	                }}>
	                	<TouchableWithoutFeedback
	                		onPress={ ()=>this.setState({rentalOperation:'mail'})}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 83,
		                		height: '100%',
		                		position:'relative',
		                		left: 40,
		                		fontSize: 11,
		                		borderColor: '#5ce24a',
		                		paddingTop: 13,
		                		paddingLeft:8
		                	}}>
		                		Send Mail {' '}
		                		<Icon style={{fontSize:14}}
		                			name="envelope"
		                			type="FontAwesome"/>
		                		
		                	</Text>
		                </TouchableWithoutFeedback>

		                <TouchableWithoutFeedback
	                		onPress={ ()=>console.log('calling')}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 83,
		                		height: '100%',
		                		position:'relative',
		                		left: 55,
		                		fontSize: 11,
		                		borderColor: '#5ce24a',
		                		paddingTop: 13,
		                		paddingLeft:8
		                	}}>
		                		Video Call {' '}
		                		<Icon style={{fontSize:14}}
		                			name="video-camera"
		                			type="Entypo"/>
		                	</Text>
		                </TouchableWithoutFeedback>

		                <TouchableWithoutFeedback
	                		onPress={ ()=>this.setState({rentalOperation:'cashwall'})}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 83,
		                		height: '100%',
		                		position:'relative',
		                		left: 70,
		                		fontSize: 11,
		                		borderColor: '#5ce24a',
		                		paddingTop: 13,
		                		paddingLeft:8
		                	}}>
		                		Cash Wall {' '}
		                		<Icon style={{fontSize:14}}
		                			name="money"
		                			type="FontAwesome"/>
		                	</Text>
		                </TouchableWithoutFeedback>
	                </View>

	                <View style={{
	                	  	height: 35,
	                	  	top:20,
	                	  	position: 'relative',
	                	  	flexDirection: 'row',
	                	  	marginBottom: 27
	                }}>

	                	<Text style={{
	                		height: '100%',
	                		width: 170,
	                		left: 10,
	                		position: 'relative',
	                		fontSize: 15,
	                		paddingTop: 6,
	                		paddingLeft:5
	                	}}>
	                		Mails Sent {' '}
	                		<Icon style={{fontSize:17}}
	                			name="envelope-open"
	                			type="FontAwesome"/> {' '}
                			<Icon style={{fontSize:15}}
	                			name="checkcircle"
	                			type="AntDesign"/>
	                	</Text>
	                	{this.clearSentDisplay()}
	                </View>
	                {this.mainSentDisplay()}
	            </View>
	        </React.Fragment>
		}
	}

  	render() {
		return (
			<React.Fragment>
				{this.individualRentalMainDisplay()}
			</React.Fragment>	
		);
	}
}