import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';


export default class ServiceAgreement extends Component{
	render() {
    	return (
    		<View style={{
                flex:45
	        }}>
          		<View style={{
	              		backgroundColor: '#6785db',
	              		height: 45,
	              		flexDirection: 'row'
	            }}>
             	 	<Text style={{
	                		position: 'relative',
	                		left:65,
	                		height: '100%',
	                		width: 280,
	                		fontSize:18,
	                		paddingTop:10,
	                		fontWeight: 'bold'
	              	}}>
	                	Terms of Service Agreement
	              	</Text>
	         	</View>
	          	<Text style={{
	          			position:'relative',
	          			top:25,
	          			left:40,
	          			fontSize:16,
	          			width:280,
	          			height:67}}>
	          		1. The system is not responsible for cost accounting of the registered property owners.
	          	</Text>
	          	<Text style={{
	          			position:'relative',
	          			top:30,
	          			left:40,
	          			fontSize:16,
	          			width:280,
	          			height:81}}>
	          		2. Refund and Cancellation issues will be dealt by the Property Owners and the Property seekers, not the system administrator.
	          	</Text>
	          	<Text style={{
	          			position:'relative',
	          			top:35,
	          			left:40,
	          			fontSize:16,
	          			width:280,
	          			height:81}}>
	          		3. Damages of the properties are dealt between the property owner and property seekers not the system administrator
	          	</Text>

	          	<TouchableWithoutFeedback
	          		onPress={()=>this.props.doGetBack()}>
		          	<Text style={{
		          			position:'relative',
		          			top:100,
		          			left:75,
		          			fontSize:16,
		          			width:197,
		          			paddingTop: 8,
		          			paddingLeft: 10,
		          			height:35}}>
		          		Return to sign-up page{' '}
		          		<Icon
		          			style={{fontSize:15,color:'#3d3c3c'}}
		          			type='AntDesign'
		          			name='arrowright'/>

		          	</Text>
		        </TouchableWithoutFeedback>
	        </View>
    	);
	}
}