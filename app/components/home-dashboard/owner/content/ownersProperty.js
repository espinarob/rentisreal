import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableHighlight} from "react-native";
import {Icon, Button} from "native-base";
import AddProperty from './addProperty.js';



const ownersPropertyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	viewAddSection: {
		position:'relative',
		flex: 10,
		flexDirection: 'row',
		top: 5
	},
	addPropertyStyle:{
		position: 'relative',
		left: 50,
		width: '30%',
		height: '100%',
		backgroundColor:'#5f7391',
		borderRadius: 5
	},
	viewRequestsStyle:{
		position: 'relative',
		left: 65,
		width: '36%',
		height: '100%',
		backgroundColor:'#5f7391',
		borderRadius: 5
	},
	contentSection:{
		position: 'relative',
		flex: 100
	}
});

export default class OwnersProperty extends Component{

	state = {
		ownerPropertyAction: 'avail-property'
	}
	ownersPropertyBody = () => {
		if(this.state.ownerPropertyAction == 'avail-property'){
			return <React.Fragment>

				   </React.Fragment>

		}
		else if(this.state.ownerPropertyAction == 'add-property'){
			return <React.Fragment>
				   	<AddProperty 
				   		doAddPropertyOwner = {this.props.doAddPropertyOwner}
				   		AccountDetails     = {this.props.AccountDetails}/>
				   </React.Fragment>
		}
		else if(this.state.ownerPropertyAction == 'view-requests'){
			return <React.Fragment>
				   </React.Fragment>
		}

	}
	render() {
    	return (
    		<View style={ownersPropertyWrapperStyle.mainWrapper}>

    			<View style={ownersPropertyWrapperStyle.viewAddSection}>
    				<Button style={ownersPropertyWrapperStyle.addPropertyStyle}
    					 onPress={ ()=> this.setState({ownerPropertyAction:'add-property'}) }
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:3,paddingLeft: '10%'}}>
    						Add Property
    					</Text>
    				</Button>

    				<Button style={ownersPropertyWrapperStyle.viewRequestsStyle}
    					 onPress={ ()=> this.setState({ownerPropertyAction:'view-requests'}) }
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:3,paddingLeft: '10%'}}>
    						View Requests
    					</Text>
    				</Button>
    			</View>

    			<View style={ownersPropertyWrapperStyle.contentSection}>
    				{this.ownersPropertyBody()}
    			</View> 

    		</View>
    	);
	}
}