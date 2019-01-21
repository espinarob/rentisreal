import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MyRequests from "../tenants/content/myRequests.js";
import UpdateDetails  from "../commons/updateDetails.js";
import Constants from "../../Constants.js";
import ForMoreBody from "../commons/forMore.js";


const tenantsBodyWrapperStyle = StyleSheet.create({
	mainWrapper:{
		flex:105
	}
});

export default class TentantsBody extends Component{

	viewBodyDisplay = ()=> {
		if(this.props.performOperation == Constants.TENANT_ACTIONS.MY_REQUESTS){
			return <React.Fragment>
				   	
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
				   	<ForMoreBody doChangeLoginFlag = {this.props.doChangeLoginFlag}
				   				 doChangeLogoutFlag = {this.props.doChangeLogoutFlag}/>
				   </React.Fragment>
		}
		else if( this.props.performOperation == Constants.TENANT_ACTIONS.MY_HOME){
			console.log('home');
		}
	}

	render() {
    	return (
    		<View style={tenantsBodyWrapperStyle.mainWrapper}>
    			{this.viewBodyDisplay()}
    		</View>
    	);
	}
}