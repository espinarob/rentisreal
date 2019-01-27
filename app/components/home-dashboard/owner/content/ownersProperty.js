import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback} from "react-native";
import {Icon, Button} from "native-base";
import AddProperty from './addProperty.js';
import AvailableProperty from './availableProperty.js';
import ViewRequests from './viewRequests.js';


const ownersPropertyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	viewAddSection: {
		position:'relative',
		flex: 10,
		flexDirection: 'row'
	},
	addPropertyStyle:{
		position: 'relative',
		left: 50,
		width: '30%',
		height: '100%',
		backgroundColor:'#5f7391',
		borderRadius: 5,
		top:5
	},
	viewRequestsStyle:{
		position: 'relative',
		left: 65,
		width: '36%',
		height: '100%',
		backgroundColor:'#5f7391',
		borderRadius: 5,
		top:5
	},
	contentSection:{
		position: 'relative',
		flex: 100
	}
});

export default class OwnersProperty extends Component{

	state = {
		ownerPropertyAction: 'avail-property',
		viewOrAddFlag      : 'true'
	}
	ownersPropertyBody = () => {

		if(this.state.ownerPropertyAction == 'avail-property'){
			return <React.Fragment>
					<AvailableProperty
						doViewMyProperty = {this.props.doViewMyProperty}
						doDeleteProperty = {this.props.doDeleteProperty}
						doUpdateProperty = {this.props.doUpdateProperty}/>
				   </React.Fragment>

		}
		else if(this.state.ownerPropertyAction == 'add-property'){
			return <React.Fragment>
				   	<AddProperty 
				   		doAddPropertyOwner = {this.props.doAddPropertyOwner}
				   		AccountDetails     = {this.props.AccountDetails}
				   		addPropertyErrMSG  = {this.props.addPropertyErrMSG}/>
				   </React.Fragment>
		}
		else if(this.state.ownerPropertyAction == 'view-requests'){
			return <React.Fragment>
					<ViewRequests
						doViewMyProperty = {this.props.doViewMyProperty} />
				   </React.Fragment>
		}

	}

	operateAddorView = ()=>{
		if(this.state.viewOrAddFlag == 'true'){
			this.setState({viewOrAddFlag:'false'});
			this.setState({ownerPropertyAction:'add-property'});
		}
		else{
			this.setState({viewOrAddFlag:'true'});
			this.setState({ownerPropertyAction:'avail-property'});
		}
	}


	render() {
    	return (
    		<View style={ownersPropertyWrapperStyle.mainWrapper}>

    			<View style={ownersPropertyWrapperStyle.viewAddSection}>
    				<TouchableWithoutFeedback 
    					 onPress={ ()=> this.operateAddorView()}>
    					<View style={ownersPropertyWrapperStyle.addPropertyStyle}>
	    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:15,paddingLeft: 20}}>
	    						Add/View
	    					</Text>
	    				</View>
    				</TouchableWithoutFeedback>

    				<TouchableWithoutFeedback
    					 onPress={ ()=> this.setState({ownerPropertyAction:'view-requests'}) }>
    					<View style={ownersPropertyWrapperStyle.viewRequestsStyle}>
	    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:15,paddingLeft: 18}}>
	    						View Requests
	    					</Text>
	    				</View>
    				</TouchableWithoutFeedback>
    			</View>

    			<View style={ownersPropertyWrapperStyle.contentSection}>
    				{this.ownersPropertyBody()}
    			</View> 

    		</View>
    	);
	}
}