import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Container, Header, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import Constants from "../../Constants.js";


const tenantsTabsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 11
	},
	textStyleCommon:{
		color: '#404244'
	}
});

export default class TenantsTabs extends Component{
	render() {
    	return (
    		<View style={tenantsTabsWrapperStyle.mainWrapper}>
				<Container>
        			<Footer>
          				<FooterTab style={{backgroundColor:'#6785db'}}>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.TENANT_ACTIONS.MY_HOME)}>
            					<Icon style={tenantsTabsWrapperStyle.textStyleCommon} name="ios-home"/>
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.TENANT_ACTIONS.MY_REQUESTS)}>
            					<Icon style={tenantsTabsWrapperStyle.textStyleCommon} 
            						name="arrow-with-circle-right"
            						type="Entypo" />
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.TENANT_ACTIONS.MY_RENTALS)}>
            					<Icon style={tenantsTabsWrapperStyle.textStyleCommon} 
            						name="home-currency-usd"
            						type="MaterialCommunityIcons" />
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.TENANT_ACTIONS.MORE)}>
            					<Icon style={tenantsTabsWrapperStyle.textStyleCommon} 
            						name="circle-with-plus"
            						type="Entypo" />
            				</Button>
      					</FooterTab>
    				</Footer>
	      		</Container>
    		</View>
    	);
	}
}