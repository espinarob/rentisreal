import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback, Alert} from "react-native";
import {Icon} from 'native-base';
import { List, ListItem} from 'react-native-elements';
import Constants from "../../../Constants.js";
import TenantIndividulRentals from "./tenantIndividualRentals.js";


export default class MyRentals extends Component{

	state = {
		aRentalIsPressed: 'false',
		pressedRentalDetails: []
		
	}

	doAdjustRental = (rental)=>{
		this.setState({pressedRentalDetails:rental});
		this.setState({aRentalIsPressed:'true'});
	}

	getBackFromMyRentals = ()=>{
		this.setState({aRentalIsPressed:'false'});
	}

	myRentalsDisplay = ()=>{
		if(this.props.doGetMyRentals.length == 0){
			return <View style={{
		                  flex:1
		           }}>
		            <View style={{
		                backgroundColor: '#6785db',
		                height: 45,
		                flexDirection: 'row'
		              }}>
		                <Text style={{
		                  position: 'relative',
		                  left:120,
		                  height: '100%',
		                  width: 150,
		                  fontSize:20,
		                  paddingTop:10
		                }}>
		                  My Rentals
		                </Text>

		            </View>
			            <Text style={{position:'relative',top:250,left:115}}>No current rentals</Text>
			        </View>
		}
		else if(this.state.aRentalIsPressed == 'false'){
			return <View style={{
		                  flex:1
		           }}>
		            <View style={{
		                backgroundColor: '#6785db',
		                height: 45,
		                flexDirection: 'row'
		              }}>
		                <Text style={{
		                  position: 'relative',
		                  left:120,
		                  height: '100%',
		                  width: 150,
		                  fontSize:20,
		                  paddingTop:10
		                }}>
		                  My Rentals
		                </Text>

		            </View>
		            <FlatList
		            	data= {this.props.doGetMyRentals}
		            	renderItem={({item}) =>
		            		<View style={{
		            			height:110,
		            			width:'100%',
		            			borderBottomWidth:2
		            		}}>
		            			<Text style={{
		            					height: 20,
		            					position:'relative',
		            					width: 250,
		            					top:5,
		            					fontWeight: 'bold',
		            					paddingLeft:10,
		            					left: 10,
		            					fontSize:14
		            			}}>
		            				{item.propertyName}
		            			</Text>
		            			<Text style={{
		            					height: 19,
		            					position:'relative',
		            					width: 200,
		            					top:4,
		            					paddingLeft:10,
		            					left: 10,
		            					fontSize:12
		            			}}>
		            				{item.propertyLocation}
		            			</Text>
		            			<Text style={{
		            					height: 19,
		            					position:'relative',
		            					width: 200,
		            					top:4,
		            					paddingLeft:10,
		            					left: 10,
		            					fontSize:12
		            			}}>
		            				{item.propertyFurtherData}
		            			</Text>
		            			<Text style={{
		            					height: 19,
		            					position:'relative',
		            					width: 250,
		            					top:4,
		            					paddingLeft:10,
		            					left: 10,
		            					fontSize:12
		            			}}>
		            				{item.propertyType}
		            			</Text>

		            			<TouchableWithoutFeedback
		            				onPress={()=>this.doAdjustRental(item)}>
		            				<Text style={{
		            					borderWidth:2,
		            					height: 20,
		            					position:'relative',
		            					top:7,
		            					width: 50,
		            					fontSize: 13,
		            					fontWeight:'bold',
		            					paddingLeft: 10,
		            					left: 295
		            				}}>
		            					More
		            				</Text>
		            			</TouchableWithoutFeedback>
		            		</View>
		            	}
		            	keyExtractor={item => item.requestID}/>
		          </View>	
        }
        else{
        	return <TenantIndividulRentals
        			doGetMyAccount        = {this.props.doGetMyAccount}
        			doGetBack             = {this.getBackFromMyRentals}
        			doSubmitTenantPayment = {this.props.doSubmitTenantPayment} 
        			doGetRentalDetails    = {this.state.pressedRentalDetails}
        			doOperateTenantMail   = {this.props.doOperateTenantMail}
        			doDeleteTenantSent    = {this.props.doDeleteTenantSent}
        			doSubmitTenantRate    = {this.props.doSubmitTenantRate} />
        }
	}



	render() {
    	return (
    		<React.Fragment>
    			{this.myRentalsDisplay()}
    		</React.Fragment>
    	);
	}
}