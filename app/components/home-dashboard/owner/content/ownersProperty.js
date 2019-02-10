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
		flexDirection: 'row',
	},
	addPropertyStyle:{
		position: 'relative',
		left: 50,
		width: '30%',
		height: '100%',
		borderColor:'#5ce24a',
		borderWidth:2,
		top:3
	},
	viewRequestsStyle:{
		position: 'relative',
		left: 65,
		width: '38%',
		height: '100%',
		borderColor:'#5ce24a',
		borderWidth:2,
		top:3
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

	changePropertyAction = (action)=>{
		this.setState({ownerPropertyAction:String(action)});
	}
	ownersPropertyBody = () => {

		if(this.state.ownerPropertyAction == 'avail-property'){
			return <React.Fragment>
					<AvailableProperty
						doViewMyProperty       = {this.props.doViewMyProperty}
						doDeleteProperty       = {this.props.doDeleteProperty}
						doUpdateProperty       = {this.props.doUpdateProperty}/>
				   </React.Fragment>

		}
		else if(this.state.ownerPropertyAction == 'add-property'){
			return <React.Fragment>
				   	<AddProperty 
				   		doAddPropertyOwner     = {this.props.doAddPropertyOwner}
				   		AccountDetails         = {this.props.AccountDetails}
				   		addPropertyErrMSG      = {this.props.addPropertyErrMSG}
				   		doChangePropertyAction = {this.changePropertyAction}/>
				   </React.Fragment>
		}
		else if(this.state.ownerPropertyAction == 'view-requests'){
			return <React.Fragment>
					<ViewRequests
						doViewMyProperty   = {this.props.doViewMyProperty}
						doAcceptTenantReq  = {this.props.doAcceptTenantReq}
						doDeclineTenantReq = {this.props.doDeclineTenantReq} />
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
    			<View style={{
                        backgroundColor: '#6785db',
                        flex:10
                }}>
                  <Text style={{
                          position: 'relative',
                          left:95,
                          height: '100%',
                          width: 200,
                          fontSize:20,
                          paddingTop:10
                  }}>
                    Property Operation
                  </Text>
                </View>
    			<View style={ownersPropertyWrapperStyle.viewAddSection}>
    				<TouchableWithoutFeedback 
    					 onPress={ ()=> this.operateAddorView()}>
    					<View style={ownersPropertyWrapperStyle.addPropertyStyle}>
	    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:12,paddingLeft: 20}}>
	    						Add/View
	    					</Text>
	    				</View>
    				</TouchableWithoutFeedback>

    				<TouchableWithoutFeedback
    					 onPress={ ()=> this.setState({ownerPropertyAction:'view-requests'}) }>
    					<View style={ownersPropertyWrapperStyle.viewRequestsStyle}>
	    					<Text style= {{fontSize:15,fontWeight:'bold',paddingTop:12,paddingLeft: 18}}>
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