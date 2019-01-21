import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import OwnersProperty from "../owner/content/ownersProperty.js";
import UpdateDetails  from "../commons/updateDetails.js";
import Constants from "../../Constants.js";
import ForMoreBody from "../commons/forMore.js";

const ownersBodyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex:105
	}
});

export default class OwnersBody extends Component{


	viewBodyDisplay = ()=> {
		if(this.props.performOperation == Constants.OWNER_ACTIONS.MY_PROPERTY){
			return <React.Fragment>
				   	<OwnersProperty
				   		doAddPropertyOwner = {this.props.doAddPropertyOwner}
				   		AccountDetails     = {this.props.AccountDetails}/>
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
				   	<ForMoreBody doChangeLoginFlag = {this.props.doChangeLoginFlag}
				   				 doChangeLogoutFlag = {this.props.doChangeLogoutFlag}/>
				   </React.Fragment>

		}
		else if( this.props.performOperation == Constants.OWNER_ACTIONS.MY_HOME){
		}
	}

	render() {
    	return (
    		<View style={ownersBodyWrapperStyle.mainWrapper}>
    			{this.viewBodyDisplay()}
    		</View>
    	);
	}
}