import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import FontAwesome, { Icons } from "react-native-fontawesome";
import SeeAllRequests from './seeAllRequests.js';


const viewRequestsWrapperStyle = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    top:20
  }

});


export default class ViewRequests extends Component {
  
  componentDidMount(){

    //this.doRefreshData();
  }
  state = {
    propertyIsPress: 'false',
    pressedPropertyRequests: []
  }

  doRefreshData = ()=>{
    let initRequests = []
    let maxLength    = this.props.doViewMyProperty.length;

    for(index=0;index<maxLength;index++){
      if(this.props.doViewMyProperty[index].requests){
        let currentRequests = this.props.doViewMyProperty[index].requests;
        const propertyRequests = [];
        Object
        .keys(currentRequests)
        .forEach( requestKey =>{
          propertyRequests.push(JSON.parse(String(JSON.stringify(currentRequests[requestKey]))));
        }); 
        initRequests.push(propertyRequests);
      }
      else continue;
    }
    this.setState({allAccountRequests:initRequests});
  }

  doAdjustRequest = (allRequests)=>{
    this.setState({pressedPropertyRequests:allRequests});
    this.setState({propertyIsPress:'true'});
  }

  backPage = ()=>{
    this.setState({propertyIsPress:'false'});
  }



  mainDisplay= ()=>{
    if(this.props.doViewMyProperty.length==0){
      return  <View style={viewRequestsWrapperStyle.mainWrapper}>
                <Text style={{position:'relative',top:250,left:115}}>No current Requests</Text>
              </View>
    }
    else if(this.state. propertyIsPress == 'false'){
      return <View style={viewRequestsWrapperStyle.mainWrapper}>
              <FlatList
                data={this.props.doViewMyProperty}
                renderItem={({item})=>
                  <TouchableWithoutFeedback
                    onPress={()=>this.doAdjustRequest(item.requests)}>
                    <View style={{
                            borderWidth:2,
                            height: 50,
                            width:'100%',
                            borderColor:'#5ce24a'
                    }}>
                      <Text style={{
                              width: 250,
                              height:22,
                              position:'relative',
                              fontSize: 13,
                              left: 10,
                              top:6
                      }}>
                        Property Name: {item.propertyName}
                      </Text>

                      <Text style={{
                              width: 250,
                              height:22,
                              position:'relative',
                              fontSize: 13,
                              left: 10,
                      }}>
                        View Now
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                }
              keyExtractor={item => item.propertyID}/>
            </View>
    }
    else{
      return  <View style={viewRequestsWrapperStyle.mainWrapper}>
                <SeeAllRequests
                  doGetBack = {this.backPage}
                  doGetAllRequests = {this.state.pressedPropertyRequests} />
              </View>
    }
  }


  render() {
    return (
        <React.Fragment>
          {this.mainDisplay()}
        </React.Fragment>
    );
  }
}
