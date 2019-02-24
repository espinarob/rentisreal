import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback,TextInput} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';

export default class SeeFixPaymentStatus extends Component{

	componentDidMount(){
		console.log(this.props.doGetMySubscription);
	}

	seeFixStatusMainDisplay = ()=>{
		if(this.props.doGetMySubscription.length!=0){
			return	<View style={{
		                flex:1
		        	}}>
		          		<View style={{
			              		backgroundColor: '#6785db',
			              		height: 45,
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
			                	left:50,
			                	height: '100%',
			                	width: 170,
			                	fontSize:19,
			                	paddingTop:10
			              	}}>
			                	Subscriptions Made
			              	</Text>
			          	</View>
			          	<FlatList
			          		data={this.props.doGetMySubscription}
			                renderItem={ ({item}) =>     
			                     <View style={{
			                     		height: 150,
			                     		width: '100%',
			                     		position: 'relative',
			                     		borderBottomWidth: 2
			                     }}>
			                     	<Text style={{
			                     			width: 120,
			                     			height:23,
			                     			fontSize: 14,
			                     			fontWeight: 'bold',
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		{item.date}
			                     	</Text>
			                     	<Text style={{
			                     			width: 280,
			                     			height:23,
			                     			fontSize: 14,
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		Remittance Name: {item.remittanceName}
			                     	</Text>
			                     	<Text style={{
			                     			width: 280,
			                     			height:23,
			                     			fontSize: 14,
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		Transaction Code: {item.remittanceCode}
			                     	</Text>
			                     	<Text style={{
			                     			width: 280,
			                     			height:23,
			                     			fontSize: 14,
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		Sender Name: {item.senderName}
			                     	</Text>
			                     	<Text style={{
			                     			width: 280,
			                     			height:23,
			                     			fontSize: 14,
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		Sender Contact #: {item.contactNumber}
			                     	</Text>
			                     	<Text style={{
			                     			width: 280,
			                     			height:23,
			                     			fontSize: 14,
			                     			fontWeight: 'bold',
			                     			position: 'relative',
			                     			left: 10,
			                     			top: 7
			                     	}}>
			                     		Sent to Bank Account: {item.bank}
			                     	</Text>
			                     </View>
			                }
			                keyExtractor={item =>item.subKey} />
			        </View>
		}
		else{
			return	<View style={{
		                flex:1
		        	}}>
		          		<View style={{
			              		backgroundColor: '#6785db',
			              		height: 45,
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
			                	left:50,
			                	height: '100%',
			                	width: 170,
			                	fontSize:19,
			                	paddingTop:10
			              	}}>
			                	Fix Payment Status
			              	</Text>
			          	</View>
			          	<Text style={{position:'relative',top:250,left:120}}>No made payments</Text>
			        </View>
		}
	}
	render() {
    	return (
    		<React.Fragment>
    			{this.seeFixStatusMainDisplay()}
    		</React.Fragment>
    	);
	}
}