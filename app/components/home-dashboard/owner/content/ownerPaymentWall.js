import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import SendReciept from './sendReciept.js';

export default class OwnerPaymentWall extends Component{

	paymentRecievedDisplay = ()=>{
	

	}

	state = {
		ownerCashWallOperation: 'none',
		currentPaymentMade    : []
	}
	getBackFromOwnerCashWall = ()=>{
		this.setState({ownerCashWallOperation:'none'});
	}

	operateOnSendingReciept = (payment)=>{
		this.setState({ownerCashWallOperation:'reciept'});
		this.setState({currentPaymentMade:payment});
	}

	getBackAfterSending = ()=>{
		this.props.doGetBack();
	}

	paymentRecieveDisplay = ()=>{
		if(this.props.doGetPaymentRecieved.length!=0){
			return	<FlatList
						data={this.props.doGetPaymentRecieved}
						renderItem={({item}) =>
							<View style={{
									height: 260,
									width: '100%',
									borderBottomWidth:2,
									position: 'relative'
							}}>
								<Text style={{
										fontWeight:'bold',
										fontSize: 13,
										position: 'relative',
										top: 5,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 70,
										left: 8
								}}>
									{item.date}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Remittance: {item.inputNameOfRemittance}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 2,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Remittance Location: {item.inputAddressOfRemittance}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Recipient: {item.inputRecipientName}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Recipient Contact #: {item.inputRecipientContactNumber}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Sender Contact #: {item.inputContactNumber}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										left: 8
								}}>
									Sender Name: {item.inputSenderName}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										fontWeight: 'bold',
										left: 8
								}}>
									Remittance Code: {item.inputRemittanceCode}
								</Text>
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:20,
										width: 270,
										fontWeight: 'bold',
										left: 8
								}}>
									Payment Mode: {item.inputPaymentMode} payment
								</Text>	
								<Text style={{
										fontSize: 12,
										position: 'relative',
										top: 1,
										paddingLeft:5,
										paddingTop:2,
										height:37,
										width: 270,
										left: 8,
										fontWeight: 'bold'
								}}>
									Sender Notes: {item.inputPaymentNotes}
								</Text>
								<TouchableWithoutFeedback
									onPress={()=> this.operateOnSendingReciept(item)}>
									<Text style={{
											borderWidth:2,
											top:3,
											position: 'relative',
											width: 100,
											height:30,
											paddingLeft: 8,
											paddingTop: 5,
											fontSize: 12.5,
											fontWeight: 'bold',
											borderColor: '#5ce24a',
											left: 248
									}}>
										 Send Reciept{' '}
										<Icon style={{fontSize:12}}
			               				name="ios-arrow-forward"
			               				type="Ionicons"/>
									</Text>
								</TouchableWithoutFeedback>
							</View>
						}
						keyExtractor={item => item.paymentID}/>

		}
		else return <Text style={{position:'relative',top:88,left:112}}>No payment recieved yet</Text>;
	}

	ownerCashwallDisplay = ()=>{
		if(this.state.ownerCashWallOperation == 'none'){
			return	<View style={{
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
		                          left:59,
		                          height: '100%',
		                          width: 200,
		                          fontSize:20,
		                          paddingTop:10
		                  	}}>
		                   		Payment Wall
		                  	</Text>
		                </View>
		                <View style={{
		               		height:39,
		               		position: 'relative',
		               		width:'100%',
		               		flexDirection: 'row',
		               		top:8,
		               		marginBottom:21
		               	}}>
		               		<Text style={{
		               			height:'100%',
		               			paddingTop: 5,
		               			paddingLeft: 10,
		               			width: 170,
		               			fontSize: 16
		               		}}>
		               			Payment Recieved{' '}
		               			<Icon style={{fontSize:18}}
		               				name="history"
		               				type="FontAwesome"/>
		               		</Text>
		               		<TouchableWithoutFeedback
		               			onPress={()=>console.log('Send reminder')}>
			               		<Text style={{
			               			borderWidth:2,
			               			height:'100%',
			               			paddingTop: 10,
			               			paddingLeft: 9,
			               			width: 130,
			               			left: 58,
			               			fontSize: 14,
			               			borderColor:'#5ce24a'
			               		}}>
			               			Send Reminder{' '}
			               			<Icon style={{fontSize:13}}
			               				name="ios-arrow-forward"
			               				type="Ionicons"/>
			               		</Text>
			               	</TouchableWithoutFeedback>

		               	</View>
		                {this.paymentRecieveDisplay()}
		            </View>
		}
		else if(this.state.ownerCashWallOperation == 'reciept'){
			return <SendReciept
					doGetBack               = {this.getBackFromOwnerCashWall}
					doGetCurrentPaymentMade = {this.state.currentPaymentMade}
					doGetTransactionDetails = {this.props.doGetTransactionDetails}
					doSendReciept           = {this.props.doSendReciept}
					doGetBackAfterSending   = {this.getBackAfterSending} />
		}
	}

	render() {
  		return (
  			<React.Fragment>
  				{this.ownerCashwallDisplay()}
  			</React.Fragment>
     	);
  	}
}