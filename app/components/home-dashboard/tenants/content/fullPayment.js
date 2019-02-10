import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';



export default class FullPayment extends Component{

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
	                          left:50,
	                          height: '100%',
	                          width: 200,
	                          fontSize:20,
	                          paddingTop:10
	                  	}}>
	                   		Full Payment Section
	                  	</Text>
	                </View>
            </View>
		);
  	}
}