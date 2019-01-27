import React, { Component } from "react";
import { Platform, StyleSheet, View,TouchableOpacity, Text, Keyboard} from "react-native";
import { Container, Header, Item, Icon, Input, Button } from 'native-base';

const headerComponentWrapperStyle = StyleSheet.create({
	notificationSection:{
		position: 'relative',
		left: 10,
		width: 35
	},
	chatboxSection:{
		position: 'relative',
		left: 10,
		width: 37
	}
});



export default class HeaderComponent extends Component{
	state = {
		mainWrapperFlex: 12
	}


	render() {
    	return (
    		<View style={{flex:this.state.mainWrapperFlex}}>
            	<Container>
		       	 	<Header searchBar rounded style={{height:'100%',backgroundColor:'#758caf'}}>
		          		<Item>
           					<Icon name="ios-search" />
		            		<Input placeholder="Search"/>
		            		<Icon name="ios-home"/>
		          		</Item>
		          		<TouchableOpacity
		          			style={headerComponentWrapperStyle.notificationSection}>
		          			<Icon style={{fontSize:25,color:'#404244',paddingTop:13}} 
		          				name="bell" 
		          				type="MaterialCommunityIcons"/>
	          			</TouchableOpacity>
		          		<TouchableOpacity 
		          			style={headerComponentWrapperStyle.chatboxSection}>
		          			<Icon style={{fontSize:25,color:'#404244',paddingTop:14,paddingLeft:5}} 
		          				name="ios-chatboxes"/>
	          			</TouchableOpacity>
		        	</Header>
	      		</Container>
    		</View>
    	);
	}
}