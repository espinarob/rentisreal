import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,AsyncStorage, TouchableOpacity} from "react-native";
import { Container, Icon, Button, Footer, FooterTab} from 'native-base';
import Constants from '../../Constants.js';

import HeaderComponent from "./headerComponent.js";
import TenantsBody from "../tenants/tenantsBody.js";
import TenantsTabs from "../tenants/tenantsTabs.js";


import OwnersBody from "../owner/ownersBody.js";
import OwnersTabs from "../owner/ownersTabs.js";

const homeWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	}
});

export default class HomeTemplate extends Component{

    state = {
        AccountDetails : null,
        role           : '',
        ownerOperation : Constants.OWNER_ACTIONS.MY_HOME,
        tenantOperation: Constants.TENANT_ACTIONS.MY_HOME
    }

    componentDidMount(){
        this.initializeLogin();
    }

    setOwnerOperation = (operation)=>{
        this.setState({ownerOperation:operation});
    }

    setTenantOperation = (operation)=>{
        this.setState({tenantOperation:operation});
    }

    initializeLogin = async() =>{
        try{
            let usernameLocal  = await AsyncStorage.getItem(Constants.USER_NAME_KEY);
            let passwordLocal  = await AsyncStorage.getItem(Constants.PASS_WORD_KEY);
            let role           = await AsyncStorage.getItem(Constants.ACCOUNT_ROLE);
            if( String(usernameLocal) == 'null' || String(passwordLocal) == 'null'){
                this.props.doChangeLoginFlag(false);
                throw new Error('Not Found in Local!!');
            }
            else{
                let AccountDetails = 'not_null';
                this.setState({role:String(role)});
                this.setState({AccountDetails});
            }
            
        }
        catch(error){
            console.log(error);
        }
    }

    contentDisplay = () =>{
        if(this.props.doesDataLoad == 'true'){
            return <View style={{flex:120}} > 
                    <Text style={{position:'relative',top:250,left:'29%'}}>    Loading Data...</Text>
                   </View>
        }
        else if(this.state.role == 'tenant'){
            return  <React.Fragment>
                        <TenantsBody 
                            performOperation   = {this.state.tenantOperation}
                            doChangeLoginFlag  = {this.props.doChangeLoginFlag}
                            doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
                            doProcessUpdate    = {this.props.doProcessUpdate}
                            Properties         = {this.props.Properties}
                            doGetMyAccount     = {this.props.doGetMyAccount}
                            doSendARequest     = {this.props.doSendARequest}
                            doViewMyRequests   = {this.props.doViewMyRequests}
                            doDeleteARequest   = {this.props.doDeleteARequest}
                            requestPropertyMSG = {this.props.requestPropertyMSG}/>
                        <TenantsTabs
                            doOperate          = {this.setTenantOperation}/>
                    </React.Fragment>;
                    
        }
        else if(this.state.role == 'owner'){            
            return  <React.Fragment>
                        <OwnersBody
                            performOperation     = {this.state.ownerOperation}
                            doChangeLoginFlag    = {this.props.doChangeLoginFlag}
                            doChangeLogoutFlag   = {this.props.doChangeLogoutFlag}
                            doProcessUpdate      = {this.props.doProcessUpdate}
                            doAddPropertyOwner   = {this.props.doAddPropertyOwner}
                            Properties           = {this.props.Properties}
                            doGetMyAccount       = {this.props.doGetMyAccount}
                            doViewMyProperty     = {this.props.doViewMyProperty}
                            doDeleteProperty     = {this.props.doDeleteProperty}
                            doUpdateProperty     = {this.props.doUpdateProperty}
                            doAcceptTenantReq    = {this.props.doAcceptTenantReq}
                            doViewMyTransactions = {this.props.doViewMyTransactions}
                            doDeclineTenantReq   = {this.props.doDeclineTenantReq}
                            addPropertyErrMSG    = {this.props.addPropertyErrMSG}/>
                            
                        <OwnersTabs 
                            doOperate            = {this.setOwnerOperation} />
                    </React.Fragment>;
        }
        else{
            return <View style={{flex:120}} > 
                    <Text style={{position:'relative',top:200,left:150}}>No Account...</Text>
                   </View>
        }
    }
	render() {
    	return (
            <View style={homeWrapperStyle.mainWrapper}>
                {this.contentDisplay()}
            </View>
    	);
	}
}