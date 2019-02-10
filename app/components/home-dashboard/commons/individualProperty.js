import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native';
import {Button,Icon, Spinner} from "native-base";
import Constants from "../../Constants.js";


export default class IndividualProperty extends Component {

  operateRequest = ()=>{
    let data = {
      propertyName         : this.props.pressedPropertyDetails.propertyName,
      propertyLocation     : this.props.pressedPropertyDetails.propertyLocation,
      propertyFinalPrice   : this.props.pressedPropertyDetails.propertyFinalPrice,
      propertyPoolingQty   : this.props.pressedPropertyDetails.propertyPoolingQty,
      contactNumber        : this.props.pressedPropertyDetails.contactNumber,
      firstName            : this.props.pressedPropertyDetails.firstName,
      lastName             : this.props.pressedPropertyDetails.lastName,
      middleName           : this.props.pressedPropertyDetails.middleName,
      email                : this.props.pressedPropertyDetails.email
    }
    this.setState({onProcess:'true'});
    this.props.doSendARequest(data,this.props.pressedPropertyDetails.Account
      ,this.props.pressedPropertyDetails.propertyID);
    setTimeout(()=>{
      this.setState({onProcess:'false'});
      this.props.doGetBack()
    },4500);
  }

  requestErrorDisplay = ()=>{
    if(this.props.requestPropertyMSG.length!=0){
      return this.props.requestPropertyMSG;
    }
    else{
      return;
    }
  }

  displayRating = ()=>{
    if(this.props.pressedPropertyDetails.rating == 0){
      return 'Not rated yet';
    }
    else{
      let finalRate =  String( Number(this.props.pressedPropertyDetails.rating)/ 
                              Number(this.props.pressedPropertyDetails.ratingCount) );
      let appendRateDescription = '';
      if(Number(this.props.pressedPropertyDetails)>1){
        appendRateDescription = ' people';  
      }
      else appendRateDescription = ' person';
      
      finalRate+= ' out of 5 rated by '+String(this.props.pressedPropertyDetails.ratingCount)+String(appendRateDescription);
      return finalRate;
    }
  }

  state = {
    operationLoading: 'true',
    currentRequest: [],
    onProcess:        'false'
  }

  componentDidMount(){
    
    for(index=0;index<this.props.doViewMyRequests.length;index++){
      let currentRequest = this.props.doViewMyRequests[index];
      if(String(currentRequest.propertyID) == String(this.props.pressedPropertyDetails.propertyID)){
        this.setState({currentRequest:currentRequest});
        setTimeout( ()=>this.setState({operationLoading:'false'}),500);
        return;
      }
    }
    setTimeout( ()=>this.setState({operationLoading:'false'}),500);

  }

  validOperation = ()=>{
    if( Number(this.props.pressedPropertyDetails.propertyVacant)<=0){
      return  <View style={{
                borderRadius:2,
                width: 100,
                position:'relative',
                left: 120,
                borderWidth:2,
                borderColor: '#42f46e'
              }}>
                <Text style={{
                        position:'relative',
                        fontSize: 13,
                        width: 80,
                        left: 11,
                        paddingTop:3,
                        color: "#000"
                }}>Property Full</Text>
              </View>
    }
    else if(this.state.operationLoading== 'true'){
      return  <View style={{
                borderRadius:2,
                width: 100,
                position:'relative',
                left: 120,
                borderWidth:2,
                borderColor: '#42f46e'
              }}>
                <Text style={{
                        position:'relative',
                        fontSize: 15,
                        width: 70,
                        left: 20,
                        paddingTop:3,
                        color: "#000"
                }}>Loading..</Text>
              </View>
    }
    else if(this.state.currentRequest.requestStatus == Constants.STATUS.PENDING ){
      
      return  <View style={{
                borderRadius:2,
                width: 100,
                position:'relative',
                left: 120,
                borderWidth:2,
                borderColor: '#42f46e'
              }}>
                <Text style={{
                        position:'relative',
                        fontSize: 15,
                        width: 70,
                        left: 20,
                        paddingTop:3,
                        color: "#000"
                }}>Pending</Text>
              </View> 
    }
    else if(this.state.currentRequest.requestStatus == Constants.STATUS.ACCEPTED ){
      
      return  <View style={{
                borderRadius:2,
                width: 230,
                position:'relative',
                left: 70,
                borderWidth:2,
                borderColor: '#42f46e'
              }}>
                <Text style={{
                        position:'relative',
                        fontSize: 15,
                        width: 219,
                        left: 19,
                        paddingTop:3,
                        color: "#000"
                }}>YOU ARE ACCEPTED HERE</Text>
              </View> 
    }
    else{
      return <TouchableWithoutFeedback
              onPress={()=>this.operateRequest()}>
              <View style={{
                borderRadius:2,
                width: 84,
                position:'relative',
                left: 130,
                borderWidth:2,
                borderColor: '#42f46e'
              }}>
                <Text style={{
                        position:'relative',
                        fontSize: 15,
                        width: 50,
                        left: 20,
                        paddingTop:3,
                        color: "#000"
                }}>Apply</Text>
              </View>
            </TouchableWithoutFeedback>
    }
  }

  individualPropertyMainDisplay = ()=>{
    if(this.state.onProcess == 'true'){
      return <React.Fragment>
          <Spinner style={{ position:'relative',top: 200}} color='#435572'/>
         <Text style={{ position:'relative',top: 230,left: 150}}> Loading... </Text>
         <Text style={{ position:'relative',top: 235,left: 70}}> {this.requestErrorDisplay()} </Text>
      </React.Fragment>
    }
    else{
      return <React.Fragment>
          <View style={{
                  height: 41,
                  flexDirection: 'row',
                  backgroundColor: '#6785db'
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
                          Property View
                      </Text>
                  </View>
          </View>
          <View style={{
                  height: 100,
                  flexDirection: 'row',
                  color:'#8b8f96'
              }}>
              <Text>For Photo</Text>
          </View>      

          <View style={{
                  height: 30,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:15,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 20
              }}>Property Information</Text>
          </View>    


          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Property Name: {this.props.pressedPropertyDetails.propertyName}</Text>
          </View> 
          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Property Address: {this.props.pressedPropertyDetails.propertyLocation}</Text>
          </View> 

          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Property Type: {this.props.pressedPropertyDetails.propertyType}</Text>
          </View> 

          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Good For: {this.props.pressedPropertyDetails.propertyPoolingQty} Persons</Text>
          </View>
          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Vacant: {this.props.pressedPropertyDetails.propertyVacant}</Text>
          </View> 

          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Monthly Price: {this.props.pressedPropertyDetails.propertyMonthlyPrice}</Text>
          </View>     

          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
              }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>Individual Price: {this.props.pressedPropertyDetails.propertyFinalPrice}</Text>
          </View> 
          <View style={{
                  height: 20,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15
          }}>
              <Text style={{
                fontSize:12,
                width: 200,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 25
              }}>
                Additional Information:
              </Text>
          </View>   

          <View style={{
                  height: 35,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:15,
          }}> 
              <Text style={{
                fontSize:12,
                width: 250,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 45
              }}> 
                {this.props.pressedPropertyDetails.propertyFurtherData}
              </Text>
          </View>   

          <View style={{
                  height: 30,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:16
          }}> 
              <Text style={{
                fontSize:13,
                width: 250,
                height: '100%',
                paddingTop:2,
                position: 'relative',
                left: 24,
                fontWeight: 'bold'
              }}> 
                Rating: {this.displayRating()}
              </Text>
          </View>   

          <View style={{
                  height: 30,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:40
          }}>   
            {this.validOperation()}
          </View>
        </React.Fragment>
    }
  }

  render() {
    return (
        <React.Fragment>
          {this.individualPropertyMainDisplay()}
        </React.Fragment>
    );
  }
}
