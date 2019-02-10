import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback,Alert} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import {Button, Icon} from 'native-base';
import FontAwesome, { Icons } from "react-native-fontawesome";
import OwnerMailing from './ownerMailing.js';
import OwnerPaymentWall from './ownerPaymentWall.js';


export default class OwnersIndividualTransaction extends Component {

	state = {
		transactionOperation : 'none',
		sentMails            : [],
		paymentRecieved      : []
	}

	componentDidMount(){
		if(this.props.doGetTransactionDetails.mails){
			let currentMails = JSON.parse(JSON.stringify(this.props.doGetTransactionDetails.mails));
			const initSentMails = [];
			Object
				.keys(currentMails)
				.forEach((mailKey)=>{	
					initSentMails.push(currentMails[mailKey]);
				});
			this.setState({sentMails:initSentMails});	
		}
		else;

		if(this.props.doGetTransactionDetails.paymentRecieved){
			let currentPaymentRecieved = JSON.parse(JSON.stringify(this.props.doGetTransactionDetails.paymentRecieved));
			const initPaymentRecieved  = [];
			Object
				.keys(currentPaymentRecieved)
				.forEach((paymentRecieveKey)=>{
					initPaymentRecieved.push(currentPaymentRecieved[paymentRecieveKey]);
				});
			this.setState({paymentRecieved:initPaymentRecieved});
		}
		else;
	}

	getBackFromTransaction = ()=>{
		this.setState({transactionOperation:'none'});
	}

	getBackRefreshForSendingMail = ()=>{
		this.props.doGetBack();
	}


	doAlertForClearingAllSent = () =>{
		Alert.alert(
      		'Delete',
      		'Are you sure to clear all messages?',
        [
          	{text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          	{text: 'YES', onPress: () => this.doFinalDelete()},
        ]);
	}


	doFinalDelete = ()=>{
		this.props.doDeleteOwnerSent(this.props.doGetTransactionDetails.Account,
			this.props.doGetTransactionDetails.propertyID);
		Alert.alert(
            'Success',
            'Successfully deleted sent mails',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
		this.props.doGetBack();
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
		else{
			return;
		}
	}
	mailSentDisplay = ()=>{
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

	ownersTransactionDisplay = ()=>{
		if(this.state.transactionOperation == 'mail'){
			return <OwnerMailing
				doGetTransactionDetails = {this.props.doGetTransactionDetails}
				doGetBack               = {this.getBackFromTransaction}
				doOperateOwnerMail      = {this.props.doOperateOwnerMail}
				doRefreshBackAfterSend  = {this.getBackRefreshForSendingMail} />
		}
		else if(this.state.transactionOperation == 'call'){

		}
		else if(this.state.transactionOperation == 'cashwall'){
			return	<OwnerPaymentWall 
						doGetPaymentRecieved    = {this.state.paymentRecieved}
						doGetBack               = {this.getBackFromTransaction}
						doGetTransactionDetails = {this.props.doGetTransactionDetails}
						doSendReciept           = {this.props.doSendReciept} />

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
	                          left:55,
	                          height: '100%',
	                          width: 200,
	                          fontSize:20,
	                          paddingTop:10
	                  	}}>
	                   		Transaction View
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
	                		Accepted Tenant Information:
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
	                		Tenant Name: {this.props.doGetTransactionDetails.firstName} {this.props.doGetTransactionDetails.lastName}
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
	                		Tenant Age: {this.props.doGetTransactionDetails.age}
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
	                		Tenant Email: {this.props.doGetTransactionDetails.email}
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
	                		Tenant Gender: {this.props.doGetTransactionDetails.gender}
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
	                		Tenant Occupation: {this.props.doGetTransactionDetails.occupation}
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
	                		Tenant Contact #: {this.props.doGetTransactionDetails.contactNumber}
	                	</Text>
	                </View>

	                <View style={{
	                		height:40,
	                		top: 15,
	                		flexDirection: 'row',
	                		width:'100%'
	                }}>
	                	<TouchableWithoutFeedback
	                		onPress={ ()=>this.setState({transactionOperation:'mail'})}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 83,
		                		height: '100%',
		                		position:'relative',
		                		left: 10,
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
		                		left: 15,
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
	                		onPress={ ()=>this.setState({transactionOperation:'cashwall'})}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 83,
		                		height: '100%',
		                		position:'relative',
		                		left: 20,
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

		                <TouchableWithoutFeedback
	                		onPress={ ()=>console.log('cash wall')}>
		                	<Text style={{
		                		borderWidth:2,
		                		width: 80,
		                		height: '100%',
		                		position:'relative',
		                		left: 25,
		                		fontSize: 12,
		                		borderColor: '#5ce24a',
		                		paddingTop: 13,
		                		paddingLeft:8
		                	}}>
		                		Dismiss {' '}
		                		<Icon style={{fontSize:14}}
		                			name="trash"
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
	                {this.mailSentDisplay()}
	            </View>

	        </React.Fragment>
	    }
	}


	render(){
	    return (
	        <React.Fragment>
	        	{this.ownersTransactionDisplay()}
	        </React.Fragment>
	    );
 	}
}