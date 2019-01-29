import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Container, Header, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import Constants from "../../Constants.js";
const ownersTabsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 11
	},
	textStyleCommon:{
		color: '#404244'
	}
});


export default class OwnersTabs extends Component{

	render() {
    	return (
    		<View style={ownersTabsWrapperStyle.mainWrapper}>
				<Container>
        			<Footer>
          				<FooterTab style={{backgroundColor:'#758caf'}}>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.OWNER_ACTIONS.MY_HOME) }>
            					<Icon style={ownersTabsWrapperStyle.textStyleCommon} 
                                    name="ios-home"/>
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.OWNER_ACTIONS.MY_ACCOUNT)}>
            					<Icon style={ownersTabsWrapperStyle.textStyleCommon} 
            						name="person-pin-circle"
            						type="MaterialIcons" />
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.OWNER_ACTIONS.MY_PROPERTY) }>
            					<Icon style={ownersTabsWrapperStyle.textStyleCommon} 
            						name="newsletter"
            						type="Entypo" />
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.OWNER_ACTIONS.TRANSACTIONS)}>
            					<Icon style={ownersTabsWrapperStyle.textStyleCommon} 
            						name="home-currency-usd"
            						type="MaterialCommunityIcons" />
            				</Button>
            				<Button
                                onPress={()=>this.props.doOperate(Constants.OWNER_ACTIONS.MORE) }>
            					<Icon style={ownersTabsWrapperStyle.textStyleCommon} 
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