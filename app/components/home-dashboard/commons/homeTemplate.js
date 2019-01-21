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
        ID             : null,
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
            if( String(usernameLocal) == 'null' || String(passwordLocal) == 'null'){
                this.props.doChangeLoginFlag(false);
                throw new Error('Not Found in Local!!');
            }
            else{
                let AccountDetails = this.searchAccountDetails(usernameLocal,passwordLocal);
                if(AccountDetails === null){
                    throw new Error('Not Found in Cloud!!');
                }
                else{
                    this.setState({AccountDetails});
                }
            }
            
        }
        catch(error){
            console.log(error);
        }
    }

    searchAccountDetails = (username,password) =>{
        for(index=0;index<this.props.Accounts.length;index++){
            let currentAccount = this.props.Accounts[index];
            if(currentAccount.username == username 
                && currentAccount.password == password){
                this.setState({ID:this.props.IDs[index]});
                return currentAccount;
            }
        }
        return null;
    }

    contentDisplay = () =>{
        if(this.state.AccountDetails === null){
            return <View style={{flex:120}} > 
                    <Text style={{position:'relative',top:200,left:'29%'}}>No Internet Connection :(</Text>
                   </View> 
           /* return  <React.Fragment>
                        <OwnersBody
                            performOperation   = {this.state.ownerOperation}
                            doChangeLoginFlag  = {this.props.doChangeLoginFlag}
                            doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
                            doProcessUpdate    = {this.props.doProcessUpdate}/>
                        <OwnersTabs 
                            doOperate= {this.setOwnerOperation} />
                    </React.Fragment>;    */    
        }
        else if(this.state.AccountDetails.role == 'tenant'){
            return  <React.Fragment>
                        <TenantsBody 
                            performOperation = {this.state.tenantOperation}
                            doChangeLoginFlag  = {this.props.doChangeLoginFlag}
                            doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
                            doProcessUpdate    = {this.props.doProcessUpdate}
                            AccountDetails     = {this.state.AccountDetails}/>
                        <TenantsTabs
                            doOperate= {this.setTenantOperation}/>
                    </React.Fragment>;
                    
        }
        else if(this.state.AccountDetails.role == 'owner'){            
            return  <React.Fragment>
                        <OwnersBody
                            performOperation   = {this.state.ownerOperation}
                            doChangeLoginFlag  = {this.props.doChangeLoginFlag}
                            doChangeLogoutFlag = {this.props.doChangeLogoutFlag}
                            doProcessUpdate    = {this.props.doProcessUpdate}
                            doAddPropertyOwner = {this.props.doAddPropertyOwner}
                            AccountDetails     = {this.state.AccountDetails}/>
                        <OwnersTabs 
                            doOperate= {this.setOwnerOperation} />
                    </React.Fragment>;
        }
    }
    headerDisplay = () =>{
        if(this.state.tenantOperation != Constants.TENANT_ACTIONS.MY_HOME){
            return <View style={{backgroundColor:'#758caf',flex:12}}>
                        <FooterTab>
                            <Button
                                style={{backgroundColor:'#758caf'}}
                                onPress={()=> console.log('back') }>
                                <Icon
                                    name="ios-home"/>
                            </Button>
                        </FooterTab>
                    </View>
        }
        else if(this.state.ownerOperation != Constants.OWNER_ACTIONS.MY_HOME){

            return <View style={{backgroundColor:'#758caf',flex:12}}>
                        <FooterTab>
                            <Button
                                style={{backgroundColor:'#758caf'}}
                                onPress = {() => this.setState({ownerOperation:Constants.TENANT_ACTIONS.MY_HOME}) }>
                                <Icon
                                    name="ios-home"/>
                            </Button>
                        </FooterTab>
                    </View>
        }
        else{
            return <HeaderComponent/>
        }
    }
	render() {
    	return (
    		<View style={homeWrapperStyle.mainWrapper}>
                {this.headerDisplay()}
                {this.contentDisplay()}
    		</View>
    	);
	}
}