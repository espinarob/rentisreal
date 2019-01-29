import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import OwnersProperty from "../owner/content/ownersProperty.js";
import UpdateDetails  from "../commons/updateDetails.js";
import Constants from "../../Constants.js";
import ForMoreBody from "../commons/forMore.js";
import PropertyLists from "../commons/propertyLists.js"; 
import MyTransactions from "../owner/content/myTransactions.js";

export default class OwnersBody extends Component{


	viewBodyDisplay = ()=> {
		if(this.props.performOperation == Constants.OWNER_ACTIONS.MY_PROPERTY){
			return <React.Fragment>
				   	<OwnersProperty
				   		doAddPropertyOwner = {this.props.doAddPropertyOwner}
				   		doViewMyProperty   = {this.props.doViewMyProperty}
				   		doDeleteProperty   = {this.props.doDeleteProperty}
				   		doUpdateProperty   = {this.props.doUpdateProperty}
				   		addPropertyErrMSG  = {this.props.addPropertyErrMSG}
				   		doAcceptTenantReq  = {this.props.doAcceptTenantReq}
				   		doDeclineTenantReq = {this.props.doDeclineTenantReq}/>
				   </React.Fragment>
		}
		else if(this.props.performOperation == Constants.OWNER_ACTIONS.MY_ACCOUNT){
			return <React.Fragment>
				   	<UpdateDetails
				   		doProcessUpdate={this.props.doProcessUpdate}
				   		accountRole="owner" />
				   </React.Fragment>
		}
		else if( this.props.performOperation == Constants.OWNER_ACTIONS.MORE){
			return <React.Fragment>
				   	<ForMoreBody doChangeLoginFlag  = {this.props.doChangeLoginFlag}
				   				 doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
				   				 doGetMyAccount     = {this.props.doGetMyAccount}/>
				   </React.Fragment>

		}
		else if( this.props.performOperation == Constants.OWNER_ACTIONS.MY_HOME){
			return <React.Fragment>
				   	<PropertyLists
				   		Properties= {this.props.Properties}
				   		doGetMyAccount = {this.props.doGetMyAccount}/>
				   </React.Fragment>
		}
		else if( this.props.performOperation == Constants.OWNER_ACTIONS.TRANSACTIONS){
			return <React.Fragment>
					<MyTransactions
						doViewMyTransactions = {this.props.doViewMyTransactions} />
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