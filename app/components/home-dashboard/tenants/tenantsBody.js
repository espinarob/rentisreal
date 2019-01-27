import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MyRequests from "../tenants/content/myRequests.js";
import UpdateDetails  from "../commons/updateDetails.js";
import Constants from "../../Constants.js";
import ForMoreBody from "../commons/forMore.js";
import PropertyLists from "../commons/propertyLists.js"; 

export default class TentantsBody extends Component{

	viewBodyDisplay = ()=> {
		if(this.props.performOperation == Constants.TENANT_ACTIONS.MY_REQUESTS){
			return <React.Fragment>
				   	<MyRequests
				   		doViewMyRequests   = {this.props.doViewMyRequests}
				   		doDeleteARequest   = {this.props.doDeleteARequest} />
				   </React.Fragment>
		}
		else if(this.props.performOperation == Constants.TENANT_ACTIONS.MY_RENTALS){
			return <React.Fragment>
				    
				   </React.Fragment>
		}
		else if(this.props.performOperation == Constants.TENANT_ACTIONS.MY_ACCOUNT){
			return <React.Fragment>
				   	<UpdateDetails
				   		doProcessUpdate = {this.props.doProcessUpdate}
				   		accountRole     = "tenant"/>
				   </React.Fragment>
		}
		else if( this.props.performOperation == Constants.TENANT_ACTIONS.MORE){
			return <React.Fragment>
				   	<ForMoreBody doChangeLoginFlag  = {this.props.doChangeLoginFlag}
				   				 doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
				   				 doGetMyAccount     = {this.props.doGetMyAccount}/>
				   </React.Fragment>
		}
		else if( this.props.performOperation == Constants.TENANT_ACTIONS.MY_HOME){

			return <React.Fragment>
				   	<PropertyLists
				   		Properties= {this.props.Properties}
				   		doGetMyAccount = {this.props.doGetMyAccount}
				   		doSendARequest = {this.props.doSendARequest}
				   		requestPropertyMSG = {this.props.requestPropertyMSG}
				   		doViewMyRequests   = {this.props.doViewMyRequests} />
				   </React.Fragment>
		}
	}

	render() {
    	return (
    		<View style={{flex:115}}>
    			{this.viewBodyDisplay()}
    		</View>
    	);
	}
}