import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback,Alert} from "react-native";
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


  doPromptforAccept = (request)=>{
    Alert.alert(
        'Accept Request',
        'Attempting to accept tenant request',
        [
          {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          {text: 'YES', onPress: () => this.doFinalAccept(request)},
        ]);
  }

  doFinalAccept= (request) =>{
    this.props.doAcceptTenantReq(this.props.pressedPropertyDetails,request);
    this.props.doGetBack();
    Alert.alert(
      'Done',
      'You can now view it in your transactions',
      [
        {text: 'OK', onPress: () => console.log('OK REQUEST')},
      ]);
  }

  doPromptforDecline= (request)=>{
    Alert.alert(
      'Decline Request',
      'Attempting to decline tenant request',
      [
        {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
        {text: 'YES', onPress: () => this.doFinalDecline(request)},
      ]);
  }

  doFinalDecline= (request)=>{
    this.props.doDeclineTenantReq(this.props.pressedPropertyDetails,request);
    this.props.doGetBack();
    Alert.alert(
      'Done',
      'The request is now remove from lists',
      [
        {text: 'OK', onPress: () => console.log('OK DECLINE REQUEST')},
      ]);
  }

	state = {
		allRequests: []
	}

  allRequestDisplay = ()=>{
    if(this.state.allRequests.length!=0){
      return <React.Fragment>
            <View style={{
                  borderTopWidth: 2,
                  height: 41,
                  flexDirection: 'row',
                  borderColor:'#5ce24a',
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
                    <View style={{
                          height: 22,
                          flexDirection: 'row',
                          position: 'relative',
                          top:12
                    }}>
                      <TouchableWithoutFeedback
                        onPress={()=>{this.doPromptforAccept(item)}}>
                        <Text style={{
                                borderWidth:2,
                                position: 'relative',
                                left: 240,
                                fontSize: 11,
                                width:50,
                                paddingLeft: 7,
                                paddingTop:2
                        }}>
                          Accept
                        </Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={()=>this.doPromptforDecline(item)}>
                        <Text style={{
                                borderWidth:2,
                                position: 'relative',
                                left: 245,
                                fontSize: 11,
                                width:50,
                                paddingLeft: 7,
                                paddingTop:2
                        }}>
                          Decline
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>


                  </View>
                }
                keyExtractor={item => item.requestID}/> 
          </React.Fragment>
    }
    else{
      return <View style={{
                  borderTopWidth: 2,
                  height: 41,
                  flexDirection: 'row',
                  borderColor:'#5ce24a',
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
              <Text style={{position:'relative',top:250,left:90}}>No requests yet</Text>
             </View>
    }
  }

	render() {
		return (
	       <React.Fragment>
          {this.allRequestDisplay()}
         </React.Fragment>
	    );
  	}
}