import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import FixPricePlanPage from '../owner/content/fixPricePlanPage.js';
import FreePlanPage     from '../owner/content/freePlanPage.js';

export default class AccountSubscription extends Component{

	state = {
		accountSubscriptionOperation: 'none'
	}

	getBackFromAccountSubscription = ()=>{
		this.setState({accountSubscriptionOperation: 'none'});
	}

	accountSubscriptionMainDisplay = ()=>{
		if(this.state.accountSubscriptionOperation == 'none'){
			return	<React.Fragment>	
						<View style={{
					              backgroundColor: '#6785db',
					              height: 41,
					              flexDirection: 'row'
			            }}>
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
					                left:45,
					                height: '100%',
					                width: 220,
					                fontSize:20,
					                paddingTop:10
			             	}}>
			                	Subscription Details
			              	</Text>
			          	</View>
			          	<View style={{
			          			height: 135,
			          			width: '100%',
			          			borderBottomWidth:2
			          	}}>
			          		<Text style={{
			          				fontWeight: 'bold',
			          				fontSize: 17,
			          				height: 25,
			          				width:90,
			          				position: 'relative',
			          				left:10,
			          				top:10
			          		}}>
			          			Free Plan
			          		</Text>
			          		<Text style={{
			          				fontWeight: 'bold',
			          				fontSize: 13,
			          				height: 53,
			          				width:260,
			          				position: 'relative',
			          				left:10,
			          				top:10
			          		}}>
			          			The free plan module offers owner users to create property 
			          			with a limitation upto three to be advertised ownership only.
			          		</Text>

		          			<Text style={{
		          					borderWidth:2,
		          					width: 90,
		          					height: 35,
		          					position: 'relative',
		          					paddingLeft: 13,
		          					paddingTop: 8,
		          					fontSize: 15,
		          					top: 13,
		          					left: 245,
		          					fontWeight: 'bold',
		          					borderColor: '#5ce24a'
		          			}}>
		          				Default{'  '}
		          				<Icon style={{fontSize:14}}
		               				name="ios-arrow-forward"
		               				type="Ionicons"/>
		          			</Text>
			          	</View>
			          	<View style={{
			          			height: 150,
			          			width: '100%',
			          			position: 'relative',
			          			top: 10,
			          			borderBottomWidth: 2
			          	}}>
			          		<Text style={{
			          				fontWeight: 'bold',
			          				fontSize: 17,
			          				height: 25,
			          				width:110,
			          				position: 'relative',
			          				left:10,
			          				top:10
			          		}}>
			          			Fix Price Plan
			          		</Text>
			          		<Text style={{
			          				fontWeight: 'bold',
			          				fontSize: 13,
			          				height: 65,
			          				width:260,
			          				position: 'relative',
			          				left:10,
			          				top:10
			          		}}>
			          			The fix price plan module offers owner users to create property 
			          			with no limitation in advertising their available properties. Starts at
			          			100 pesos per month.
			          		</Text>
			          		<TouchableWithoutFeedback
			          			onPress={()=>this.setState({accountSubscriptionOperation:'fix_price'})}>
			          			<Text style={{
			          					borderWidth:2,
			          					width: 90,
			          					height: 35,
			          					position: 'relative',
			          					paddingLeft: 18,
			          					paddingTop: 8,
			          					fontSize: 15,
			          					top: 18	,
			          					left: 245,
			          					fontWeight: 'bold',
			          					borderColor: '#5ce24a'
			          			}}>
		          					Try it{'  '}
			          				<Icon style={{fontSize:14}}
			               				name="ios-arrow-forward"
			               				type="Ionicons"/>
			          			</Text>
			          		</TouchableWithoutFeedback>
			          	</View>

					</React.Fragment>
		}
		else if(this.state.accountSubscriptionOperation == 'fix_price'){
			return <FixPricePlanPage
					doGetBack         = {this.getBackFromAccountSubscription}
					doGetAdminDetails = {this.props.doGetAdminDetails}
					doSubmitFixPay    = {this.props.doSubmitFixPay}
					doGetMyAccount    = {this.props.doGetMyAccount} />
		}
	}	

	render() {
    	return (
    		<React.Fragment>
    			{this.accountSubscriptionMainDisplay()}
    		</React.Fragment>
    	);
	}
}