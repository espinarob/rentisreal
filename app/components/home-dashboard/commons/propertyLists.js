import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import IndividualProperty from './individualProperty.js';

const propertyListsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},

});

export default class PropertyLists extends Component{

    state = {
        searchFlag: false,
        somethingPressed: 'false',
        pressedPropertyDetails: []
    }
    getProperties = ()=>{
        if(this.props.Properties.length!=0){
            return this.props.Properties;
        }
        else return [];
    }

    renderHeader = ()=>{
        return <View style={{flexDirection:'row',backgroundColor:'#ccd5e5'}}>
                <View style={{flex:80}}>   
                    <SearchBar placeholder="Type Here..." lightTheme round />
                </View>
                <View style={{flex:25}}>

                </View>
               </View>
    }

    poolingDisplay = (flag)=>{
        if(flag == 'true'){
            return <View style={{
                position: 'relative',
                left: 70
                }}>
                <Icon
                    style={{fontSize:20}}
                    name="ios-people"/>
            </View>
        }
        else return <View></View>
    }

    backPage = ()=>{
        this.setState({somethingPressed:'false'});
    }


    viewPressedProperty = (property)=>{
        if(this.props.doGetMyAccount.role == 'owner')return;
        else{
            this.setState({pressedPropertyDetails:property});
            this.setState({somethingPressed:'true'});
        }
    }

    propertyListsMainDisplay = ()=> {
        if(this.state.somethingPressed=='false'){
            return <FlatList
                data={this.getProperties()}
                renderItem={({item}) => 
                    <TouchableWithoutFeedback
                        onPress={()=>this.viewPressedProperty(item)}>
                    <ListItem 
                        roundAvatar
                        title={ <Text style={{fontSize:15,paddingLeft:12}}>{item.propertyName}</Text>} 
                        subtitle={
                            <View style={{
                                    paddingLeft:12
                                }}>
                                <Text style={{fontSize:11}}>
                                    Address: {item.propertyLocation} 
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:11,width:175,height:30}}>
                                        {item.propertyDescription}
                                    </Text>
                                    {this.poolingDisplay(item.propertyBedroomPooling)}
                                </View>
                            </View>
                        }
                        avatar={{}}/>
                    </TouchableWithoutFeedback>
                }
                keyExtractor={item => item.propertyID}
                ListHeaderComponent={this.renderHeader}/> 
        }
        else{
            return <IndividualProperty
                        pressedPropertyDetails = {this.state.pressedPropertyDetails}
                        doGetBack              = {this.backPage}
                        doSendARequest         = {this.props.doSendARequest}
                        requestPropertyMSG     = {this.props.requestPropertyMSG}
                        doViewMyRequests       = {this.props.doViewMyRequests}  />

        }
    }
	render() {
    	return (
            <View style={propertyListsWrapperStyle.mainWrapper}> 
        		{this.propertyListsMainDisplay()}
            </View>
    	);
	}
}