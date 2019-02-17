import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import PaymentSection from './paymentSection.js';
import ViewReciept    from './viewReciept.js';


export default class PaymentWall extends Component{

	state ={
		paymentOperation      : 'none',
		pressedPaymentDetails : []
	}

	getBackFromPaymentWall = ()=>{
		this.setState({paymentOperation:'none'});
	}

	viewPressedReciept = (item)=>{
		this.setState({paymentOperation:'view_reciept'});
		this.setState({pressedPaymentDetails:item});
	}

	paymentMadeDisplay = ()=>{
		if(this.props.doGetAllPaymentMade.length!=0){
			return	<React.Fragment>
						<FlatList
							data={this.props.doGetAllPaymentMade}
							renderItem={({item}) =>
								<View style={{
										height: 210,
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
											width: 70
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
											width: 270
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
											width: 270
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
											width: 270
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
											width: 270
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
											width: 270
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
											width: 270
									}}>
										Amount Sent: {item.inputAmountSent} in pesos
									</Text>
									<Text style={{
											fontSize: 12,
											position: 'relative',
											top: 1,
											paddingLeft:5,
											paddingTop:2,
											height:20,
											width: 270,
											fontWeight: 'bold'
									}}>
										Remittance Code: {item.inputRemittanceCode}
									</Text>
									<TouchableWithoutFeedback
										onPress={()=>this.viewPressedReciept(item)}>
										<Text style={{
												borderWidth:2,
												top:5,
												position: 'relative',
												width: 100,
												height:30,
												paddingLeft: 8,
												paddingTop: 5,
												fontSize: 12.5,
												fontWeight: 'bold',
												borderColor: '#5ce24a',
												left: 246
										}}>
											View Reciept{' '}
											<Icon style={{fontSize:12}}
				               				name="ios-arrow-forward"
				               				type="Ionicons"/>
										</Text>
									</TouchableWithoutFeedback>
								</View>
							}
							keyExtractor={item => item.paymentID}/>
					</React.Fragment>
		}
		else return <Text style={{position:'relative',top:100,left:115}}>No payment made yet</Text>;
	}

	paymentWallMainDisplay = ()=>{
		if(this.state.paymentOperation == 'none'){
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
		                          left:70,
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
		               		marginBottom:18
		               	}}>
		               		<Text style={{
		               			height:'100%',
		               			paddingTop: 5,
		               			paddingLeft: 10,
		               			width: 150,
		               			fontSize: 16
		               		}}>
		               			Payment History{' '}
		               			<Icon style={{fontSize:18}}
		               				name="history"
		               				type="FontAwesome"/>
		               		</Text>
		               		<TouchableWithoutFeedback
		               			onPress={()=>this.setState({paymentOperation:'payment_section'})}>
			               		<Text style={{
			               			borderWidth:2,
			               			height:'100%',
			               			paddingTop: 10,
			               			paddingLeft: 7,
			               			width: 140,
			               			left: 50,
			               			fontSize: 14,
			               			borderColor:'#5ce24a'
			               		}}>
			               			Payment Section{' '}
			               			<Icon style={{fontSize:13}}
			               				name="ios-arrow-forward"
			               				type="Ionicons"/>
			               		</Text>
			               	</TouchableWithoutFeedback>

		               	</View>
		               	{this.paymentMadeDisplay()}
	           		</View>
		}
		else if(this.state.paymentOperation == 'payment_section'){
			return	<PaymentSection
						doGetRentalDetails    = {this.props.doGetRentalDetails}
						doGetBack             = {this.getBackFromPaymentWall}
						doSubmitTenantPayment = {this.props.doSubmitTenantPayment}
						doRefreshBackAfterPay = {this.props.doRefreshBackAfterPay} />
		}
		else if(this.state.paymentOperation == 'view_reciept'){
			return <ViewReciept
						doGetBack             = {this.getBackFromPaymentWall}
						doGetPaymentDetails   = {this.state.pressedPaymentDetails} />
		}
	}
  	render() {
  		return (
  			<React.Fragment>
  				{this.paymentWallMainDisplay()}
  			</React.Fragment>
     	);
  	}
}