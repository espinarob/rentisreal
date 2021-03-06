import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback, Alert} from "react-native";
import {Icon} from 'native-base';
import { List, ListItem} from 'react-native-elements';
import Constants from "../../../Constants.js";


const myRequestsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	}
});

export default class MyRequests extends Component{


	doFinalDelete = (request)=>{
		this.props.doDeleteARequest(request.propertyOwnerKey,
			request.propertyID,request.ownerRequestID,request.Account,request.myRequestID);
	}

	doCreateAlertForDelete = (item)=>{
		Alert.alert(
  			'Cancel Request',
  			'Attempting to delete your request',
  		[
		    {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
		    {text: 'YES', onPress: () => this.doFinalDelete(item)},
  		]);
	}

	doFinalRemove = (request)=>{
		this.props.doRemoveMyRequest(request);
	}

	doCreateAlertForRemoveDeclined = (item)=>{
		Alert.alert(
  			'Remove',
  			'Attempting to remove request data (Declined)',
  		[
		    {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
		    {text: 'YES', onPress: () => this.doFinalRemove(item)},
  		]);
	}


	doCreateAlertForRemoveAccepted = (item)=>{
		Alert.alert(
  			'Remove',
  			'Attempting to remove request data (Accepted)',
  		[
		    {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
		    {text: 'YES', onPress: () => this.doFinalRemove(item)},
  		]);
	}


	statusOperate = (status,item)=>{
		if(status == Constants.STATUS.PENDING){
			return <TouchableWithoutFeedback
					onPress={ ()=>this.doCreateAlertForDelete(item) } >
					<Text style={{
						position: 'relative',
						width: 56,
						left: 90,
						fontSize:15,
						height:'100%',
						borderWidth: 2,
						paddingLeft: 5,
						borderColor:'#c9060f'
				    }}>
				    	Cancel
				   </Text>
				  </TouchableWithoutFeedback>
		}
		else if(status == Constants.STATUS.ACCEPTED){
			return	<React.Fragment>
						<TouchableWithoutFeedback
							onPress={()=>this.doCreateAlertForRemoveAccepted(item)}>
							<Text style={{
								position: 'relative',
								width: 68,
								borderWidth:2,
								fontSize:15,
								height:'100%',
								borderWidth: 2,
								paddingLeft: 6,
								left:10,
								borderColor:'#42f46e'
							}}>
								Remove
							</Text>	
						</TouchableWithoutFeedback>
						<Text style={{
							position: 'relative',
							width: 74,
							left: 20,
							fontSize:15,
							height:'100%',
							borderWidth: 2,
							paddingLeft: 5,
							borderColor:'#42f46e'
					    }}>
					    	Accepted
					   </Text>
					</React.Fragment>
		}
		else{
			return 	<React.Fragment>
						<TouchableWithoutFeedback
							onPress={()=>this.doCreateAlertForRemoveDeclined(item)}>
							<Text style={{
								position: 'relative',
								width: 68,
								borderWidth:2,
								fontSize:15,
								height:'100%',
								borderWidth: 2,
								paddingLeft: 6,
								left:10,
								borderColor:'#c9060f'
							}}>
								Remove
							</Text>	
						</TouchableWithoutFeedback>
						<Text style={{
							position: 'relative',
							width: 69,
							left: 20,
							fontSize:15,
							height:'100%',
							borderWidth: 2,
							paddingLeft: 5,
							borderColor:'#c9060f'
					    }}>
					    	Declined
					   </Text>
					</React.Fragment>
		}
	}

	myRequestDisplay = ()=>{
		if(this.props.doViewMyRequests.length!=0){
			return 	<React.Fragment>	
						<View style={{
							backgroundColor: '#6785db',
							height: 42
						}}>
							<Text style={{
								position: 'relative',
								left:98,
								height: '100%',
								width: 150,
								fontSize:20,
								paddingTop:10
							}}>
								Requests Made
							</Text>
						</View>
						<FlatList
	    				   	data={this.props.doViewMyRequests}
	    					renderItem={({item}) =>
	    					<View style={{
	    						borderBottomWidth:3,
	    						borderColor: 
	    							item.requestStatus == Constants.STATUS.ACCEPTED ? '#42f46e' : '#c9060f',
	    						height:82,
	    						marginTop:3
	    					}}>
	    						<View style={{
	    								flexDirection: 'row',
	    								height:22,
	    								top:5
									  }}>
		    						<Text style={{
		    							position: 'relative',
		    							width: 190,
		    							left: 15,
		    							fontSize:15,
		    							height:'100%'
		    						}}>
		    							{item.propertyName}
		    						</Text>
		    						{this.statusOperate(item.requestStatus,item)}
		    					</View>

	    						<Text style={{
	    							position: 'relative',
	    							width: 220,
	    							left: 15,
	    							fontSize:11,
	    							top:3,
	    							height:18
	    						}}>
	    							{item.propertyLocation}
	    						</Text>

	    						<Text style={{
	    							position: 'relative',
	    							width: 220,
	    							left: 15,
	    							fontSize:11,
	    							height:18
	    						}}>
	    							{item.propertyFinalPrice} per person each month
	    						</Text>

	    						<Text style={{
	    							position: 'relative',
	    							width: 220,
	    							left: 15,
	    							fontSize:11,
	    							height:18
	    						}}>
	    							Serve to {item.propertyPoolingQty} person/s
	    						</Text>
	    					</View>
	       				}
	       				keyExtractor={item => item.myRequestID}/>
	       			</React.Fragment>
		}
		else{	
			return 	<React.Fragment>
						<View style={{
								backgroundColor: '#6785db',
								height: 42
						}}>
							<Text style={{
								position: 'relative',
								left:98,
								height: '100%',
								width: 150,
								fontSize:20,
								paddingTop:10
							}}>
								Requests Made
							</Text>
						</View>
						<Text style={{position:'relative',top:250,left:92}}>No current Requests history</Text>
					</React.Fragment>
		}
	}



	render() {
    	return (
    		<View style={myRequestsWrapperStyle.mainWrapper}>
    			{this.myRequestDisplay()}
    		</View>
    	);
	}
}