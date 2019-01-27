import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import {Button, Icon} from 'native-base';
import OwnersIndividualProperty from './ownersIndividualProperty.js';

const availablePropertyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 90,
		top: 25,
		color: '#000'
	}
});

export default class AvailableProperty extends Component{


	poolingDisplay = (flag)=>{
		if(flag == 'true'){
            return <View style={{
                position: 'relative',
                left: 127
                }}>
                <Icon
                    style={{fontSize:19}}
                    name="ios-people"/>
            </View>
        }
        else return <View></View>
	}
	
	state = {
		propertyIsPress: 'false',
		pressedPropertyDetails: []
	}

	doAdjustProperty = (property)=>{
		this.setState({pressedPropertyDetails:property});
		this.setState({propertyIsPress:'true'});
	}

	backPage = ()=>{
		this.setState({propertyIsPress:'false'});
	}

	availablePropertyDisplay = ()=>{
		if(this.props.doViewMyProperty.length == 0){
			return <Text style={{position:'relative',top:250,left:115}}>No created Property</Text>
		}

		else if(this.state.propertyIsPress == 'false'){
			return <React.Fragment>
		    		<Text style={{flex:5,top:20,paddingLeft:15,fontSize:19}}>Your Properties</Text>
		    		<View style={availablePropertyWrapperStyle.mainWrapper}>
					     <FlatList
		                    data={this.props.doViewMyProperty}
		                    renderItem={({item}) => 
		                        <TouchableWithoutFeedback
		                            onPress={()=>this.doAdjustProperty(item)}>
	                                <View style={{
	                                        paddingLeft:12,
	                                        borderWidth:2,
	                                        width:'100%',
	                                        height: 70,
	                                        borderColor:'#6e8fd1'
	                                    }}>
	                                    <Text style={{fontSize:11}}>
	                                        Address: {item.propertyLocation} 
	                                    </Text>
	                                    <View style={{flexDirection:'row'}}>
	                                        <Text style={{fontSize:11,width:175,height:20}}>
	                                        	{item.propertyDescription}
	                                        </Text>
	                                        {this.poolingDisplay(item.propertyBedroomPooling)}
	                                    </View>
	                                    <View style={{height:20}}>
	                                    	<Text style={{fontSize:11,width:'100%'}}>
	                                    		Information: {item.propertyFurtherData}
                                    		</Text>
	                                    </View>
	                                </View>
		                        </TouchableWithoutFeedback>
		                    }
		                    keyExtractor={item => item.propertyID}/> 
		    		</View>
		    	</React.Fragment>
		}
		else{
			return <OwnersIndividualProperty
				doGetBack              = {this.backPage}
				pressedPropertyDetails = {this.state.pressedPropertyDetails}
				doDeleteProperty       = {this.props.doDeleteProperty}
				doUpdateProperty       = {this.props.doUpdateProperty}/>
		}
	}


	render() {
    	return (
    		<React.Fragment>
    			{this.availablePropertyDisplay()}
    		</React.Fragment>
    	);
	}
}