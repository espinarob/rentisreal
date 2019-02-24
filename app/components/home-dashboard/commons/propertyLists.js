import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import IndividualProperty from './individualProperty.js';
import MyMessages from './myMessages.js';
import MyNotifications from './myNotifications.js';

const propertyListsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},

});

export default class PropertyLists extends Component{

    state = {
        searchFlag: false,
        somethingPressed: 'false',
        pressedPropertyDetails: [],
        filteredProperties: [],
        sortedProperties : [],
        messageIsPressed: 'false',
        notificationIsPressed: 'false',
        searchKeyWord: '',
        reverseFlag: 'false'
    }


    getProperties = ()=>{
        if(this.state.searchKeyWord.length!=0){
            return this.state.filteredProperties;
        }
        else if(this.props.Properties.length!=0){
            return this.state.sortedProperties;
        }
        else return [];
    }

    componentDidMount = ()=>{
        this.sortPropertyData();
    }

    getReverseData = (sortData)=>{
        if(sortData.length==0)return;
        let currentProperties   = sortData;
        const reverseProperties = [];
        for(index=(currentProperties.length-1);index>=0;index--){
            reverseProperties.push(currentProperties[index]);
        }
        this.setState({sortedProperties:reverseProperties});
    }

    sortPropertyData = ()=>{
        let sortData = this.props.Properties;
        sortData.sort( (a,b)=>{
            parseFloat(a.date) -  parseFloat(b.date)
        });
        this.getReverseData(sortData);
    }

    filterSearches = (keyWord)=>{
        this.setState({searchKeyWord:keyWord});
        const filteredData = this.props.Properties.filter( item=>{
            const propertyFields = `
                                    ${item.propertyName.toUpperCase()} ${item.propertyLocation.toUpperCase()}
                                    ${item.propertyType.toUpperCase()} ${item.propertyFurtherData.toUpperCase()}
                                    ${item.propertyFinalPrice.toUpperCase()}`;
            const textData       = keyWord.toUpperCase();
            return propertyFields.indexOf(textData) > -1;
        });
        console.log(this.props.Properties);
        this.setState({filteredProperties:filteredData});
    }

    viewMessages = ()=>{
        this.props.doChangeAlertMail('false');
        this.setState({messageIsPressed:'true'});
    }

    getbackFromMessage = ()=>{
        this.setState({messageIsPressed:'false'});
    }

    viewNotifications = ()=>{
        this.props.doChangeAlertNotif('false');
        this.setState({notificationIsPressed:'true'});
    }

    getbackFromNotifications = ()=>{
        this.setState({notificationIsPressed:'false'});
    }

    getAlertNotif = ()=>{
        if(this.props.doGetMyNotifAlert == 'true'){
            return '#e80000';
        }
        else return '#4f4f51';
    }

    getAlertMail = ()=>{
        if(this.props.doGetMyMailAlert == 'true'){
            return '#e80000';
        }
        else return '#4f4f51';
    }

    getNewMessage = ()=>{
        if(this.props.doGetMyMailAlert == 'true'){
            return '  new';
        }
        else{
            return ' ';
        }
    }

    getNewNotif = ()=>{
        if(this.props.doGetMyNotifAlert == 'true'){
            return '  new';
        }
        else{
            return ' ';
        }
    }


    renderHeader = ()=>{
        return <View style={{flexDirection:'row',backgroundColor:'#ccd5e5'}}>
                <View style={{flex:80}}>   
                    <SearchBar value={this.state.searchKeyWord} onChangeText={ (text)=>{this.filterSearches(text)}} placeholder="Type Here..." lightTheme round />
                </View>
                <View style={{flexDirection:'row',flex:26}}>
                    <TouchableWithoutFeedback
                        onPress={ ()=> this.viewNotifications()}>
                        <Text style={{
                                height: 45,
                                width:42,
                                position: 'relative',
                                paddingLeft:10,
                                paddingTop:11,
                                top:7,
                                fontSize:10
                        }}>
                            <Icon   style={{
                                        fontSize:25,
                                        color: this.getAlertNotif()
                                    }}
                                name="bell"
                                type="Entypo"/>{this.getNewNotif()}

                        </Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={ ()=>this.viewMessages()}>
                        <Text style={{
                                height: 45,
                                width:45,
                                position: 'relative',
                                paddingLeft:10,
                                paddingTop:11,
                                top:7,
                                left:2,
                                fontSize:10
                        }}>
                            <Icon   style={{
                                        fontSize:25,
                                        color: this.getAlertMail()
                                    }}
                                name="envelope"
                                type="FontAwesome"/>{this.getNewMessage()}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
               </View>
    }

    poolingDisplay = (flag)=>{
        if(flag == 'true'){
            return <View style={{
                position: 'relative',
                left: 85
                }}>
                <Icon
                    style={{fontSize:20,color:'#6785db'}}
                    name="ios-people"/>
            </View>
        }
        else return <View></View>
    }

    backPage = ()=>{
        this.setState({somethingPressed:'false'});
    }


    viewPressedProperty = (property)=>{
        //if(this.props.doGetMyAccount.role == 'owner')return;
        //else{
        this.setState({pressedPropertyDetails:property});
        this.setState({somethingPressed:'true'});
        //}
    }

    doDisplayAvailability = (quantity)=>{
        if(Number(quantity)<=0){
            return 'Full slot';
        }
        else{
            return String(quantity)+' slot/s available';
        }
    }

    displayVacantOnly = (vacancy,item)=> {
        if(vacancy>0){
            return  <TouchableWithoutFeedback
                        onPress={()=>this.viewPressedProperty(item)}>    
                        <ListItem 
                            title={ <Text style={{fontSize:15,paddingLeft:12}}>{item.propertyName}</Text>}
                            subtitle={
                                <View style={{
                                    paddingLeft:12
                                }}>
                                    <Text style={{fontSize:11}}>
                                        Address: {item.propertyLocation} 
                                    </Text>
                                    <Text style={{fontSize:11}}>
                                        Type: {item.propertyType} 
                                    </Text>
                                    <Text style={{fontSize:11,fontWeight:'bold'}}>
                                        Vacant: {this.doDisplayAvailability(item.propertyVacant)}
                                    </Text>
                                    <Text style={{fontSize:12,fontWeight:'bold',color:'#8ba823'}}>
                                        Rating: {item.ratingCount == 0 ? 'not rated yet ' : item.rating/item.ratingCount}
                                    </Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:11,width:175,height:30}}>
                                            {item.propertyDescription}
                                        </Text>
                                        {this.poolingDisplay(item.propertyBedroomPooling)}
                                    </View>
                                </View> 
                            }/>
                    </TouchableWithoutFeedback>
        }
        else{
            return;
        }
    }

    propertyListsMainDisplay = ()=> {
        if(this.state.messageIsPressed == 'true'){
            return <MyMessages
                    doGetBack     = {this.getbackFromMessage}
                    doGetMyMails  = {this.props.doGetMyMails}
                    doDeleteAMail = {this.props.doDeleteAMail} />
        } 
        else if(this.state.notificationIsPressed == 'true'){
            return <MyNotifications
                    doGetBack            = {this.getbackFromNotifications}
                    doGetMyNotifications = {this.props.doGetMyNotifications}
                    doClearAllMyNotif    = {this.props.doClearAllMyNotif} />

        }
        else if(this.state.somethingPressed=='false'){
            return <FlatList
                data={this.getProperties()}
                renderItem={ ({item}) =>     
                    this.displayVacantOnly(item.propertyVacant,item)                      
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
                        doViewMyRequests       = {this.props.doViewMyRequests}
                        doGetUserRole          = {this.props.doGetMyAccount.role} />

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