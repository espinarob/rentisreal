import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import {Button,Icon} from "native-base";
import FontAwesome, { Icons } from "react-native-fontawesome";


const seeAllRequestsWrapperStyle = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    top:20
  }
});


export default class SeeAllRequests extends Component {

	componentDidMount(){
		this.doParseData();
	}

	doParseData = ()=>{
		if(this.props.doGetAllRequests){
			const initAllRequests = [];
			Object
				.keys(this.props.doGetAllRequests)
				.forEach( (requestKey)=>{
					let currentRequest = JSON.parse(JSON.stringify(this.props.doGetAllRequests[requestKey]));
					initAllRequests.push(currentRequest);
				});
			this.setState({allRequests:initAllRequests});
		}
		else return;
	}

	state = {
		allRequests: []
	}

	render() {
		return (
	        <React.Fragment>
	        	<View style={{
                  borderTopWidth: 2,
                  height: 41,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  borderColor:'#8b8f96',
                  marginBottom: 3
              	}}>
              		<TouchableWithoutFeedback
                      onPress={()=>this.props.doGetBack()}>
                  		<View style={{
			                      position: 'relative',
			                      height: '100%',
			                      width: 40}}>
                      		<Icon
                              style={{fontSize:25,paddingTop:6,paddingLeft:4}}
                              name="arrowleft"
                              type="AntDesign"/>
                      	</View>
                  	</TouchableWithoutFeedback>
                  	<View style={{
                      position:'relative',
                      left: 58,
                      width: 200,
                      height: '100%',
                  	}}>
                  		<Text style={{fontSize:20,paddingTop:5}}>
                      		Property Requests
                      	</Text>
                  	</View>
              	</View>

              	<FlatList
              		data={this.state.allRequests}
              		renderItem={({item}) =>
              			<View style={{
              				borderWidth:2,
                            height: 100,
                            width:'100%',
                            borderColor:'#5ce24a'
              			}}>
              				<Text style={{
              					fontSize: 12,
              					height: 15,
              					left: 40,
              					position: 'relative',
              					width: 200,
              					top: 10
              				}}>
              					Request From: {item.firstName} {item.lastName}
          					</Text>
          					<Text style={{
              					fontSize: 12,
              					height: 15,
              					left: 40,
              					position: 'relative',
              					width: 200,
              					top: 10
              				}}>
              					Age: {item.age}
          					</Text>
          					<Text style={{
              					fontSize: 12,
              					height: 15,
              					left: 40,
              					position: 'relative',
              					width: 200,
              					top: 10
              				}}>
              					Email: {item.email}
          					</Text>

          					<Text style={{
              					fontSize: 12,
              					height: 15,
              					left: 40,
              					position: 'relative',
              					width: 200,
              					top: 10
              				}}>
              					Contact #: {item.contactNumber}
          					</Text>
              			</View>	
              		}
          			keyExtractor={item => item.requestID}/> 
	        </React.Fragment>
	    );
  	}
}