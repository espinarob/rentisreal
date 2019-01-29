import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback,TextInput,Alert} from 'react-native';
import {Button,Icon} from "native-base";

const ownersIndividualPropertyWrapperStyle = StyleSheet.create({
  commonInputElemenStyle:{
    width: 160,
    height: '100%',
    left: 35,
    alignItems: 'stretch',
    padding: 0,
    position: 'relative',
    borderRadius: 5,
    fontSize: 12,
    borderWidth:1
  }
});



export default class OwnersIndividualProperty extends Component {
  state = {
      propertyFurtherData: '',
      propertyDescription: '',
      errorMessage:        ''
  }

  doDeleteNow = ()=>{
    this.props.doDeleteProperty(this.props.pressedPropertyDetails.propertyID,
                this.props.pressedPropertyDetails.Account);
    this.props.doGetBack();
  }

  doCreateAlertForDelete = ()=>{
    

    if( Number(this.props.pressedPropertyDetails.propertyPoolingQty)
              >Number(this.props.pressedPropertyDetails.propertyVacant) ){
       Alert.alert(
          'Warning',
          'There are present tenants',
        [
          {text: 'OK', onPress: () => console.log('There are present tenants')},
        ]);
    }
    else if(this.props.pressedPropertyDetails.requests){
       Alert.alert(
          'Warning',
          'Cannot process due to requests are present',
        [
          {text: 'OK', onPress: () => console.log('Cannot process due to requests are present')},
        ]);
    }
    else{
      Alert.alert(
          'Deleting Property',
          'Attempting to delete your property',
        [
          {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          {text: 'YES', onPress: () => this.doDeleteNow()},
        ]);
    }
  }

  doCreateAlertForUpdate = ()=>{
    Alert.alert(
      'Update',
      'Attempting to update your property',
    [
      {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
      {text: 'YES', onPress: () => this.doUpdateNow()},
    ]);
  }

  doUpdateNow = ()=>{
    if(this.state.propertyFurtherData == ''){
      this.setState({errorMessage:'Please input further information'});
      return;
    }
    else if(this.state.propertyDescription == ''){
      this.setState({errorMessage:'Please input a caption!'});
      return;
    }


    let data = {
      "propertyDescription": this.state.propertyDescription,
      "propertyFurtherData": this.state.propertyFurtherData
    }

    data = JSON.parse(String(JSON.stringify(data)));
    this.props.doUpdateProperty(data,this.props.pressedPropertyDetails.propertyID,
                this.props.pressedPropertyDetails.Account);
    this.props.doGetBack();
  }

  doesPropertyPool = ()=>{
    if(this.props.pressedPropertyDetails.propertyBedroomPooling == 'true'){
      return 'enabled';
    }
    else{
      return 'disabled';
    }
  }


  displayAvailability = ()=>{
    if(Number(this.props.pressedPropertyDetails.propertyVacant)<=0){
      return 'Full'
    }
    else{
      return String(this.props.pressedPropertyDetails.propertyVacant)+' slots available'
    }
  }

  render() {

    return (
        <React.Fragment>
          <View style={{
                  borderTopWidth: 2,
                  height: 41,
                  flexDirection: 'row',
                  color:'#8b8f96',
                  top:20,
                  borderColor:'#8b8f96'
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
                          {this.props.pressedPropertyDetails.propertyName}
                      </Text>
                  </View>
          </View>
          <View style={{
                  flexDirection: 'row',
                  height: 40,
                  top:36
          }}>
            <Text style={{
                  position: 'relative',
                  width:100,
                  height:'100%',
                  paddingTop:5,
                  left:15,
                  fontSize:12}}>
              Update Additional Information:
            </Text>
            <TextInput
              style={ownersIndividualPropertyWrapperStyle.commonInputElemenStyle}
              onChangeText= { (propertyFurtherData)=> this.setState({propertyFurtherData:propertyFurtherData})}/>
          </View> 

          <View style={{
                  flexDirection: 'row',
                  height: 40,
                  top:40
          }}>
            <Text style={{
                  position: 'relative',
                  width:100,
                  height:'100%',
                  paddingTop:5,
                  left:15,
                  fontSize:12}}>
              Update Property Caption:
            </Text>
            <TextInput
              style={ownersIndividualPropertyWrapperStyle.commonInputElemenStyle}
              onChangeText= { (propertyDescription)=> this.setState({propertyDescription:propertyDescription})}/>
          </View> 
          
          <View style={{
                  height: 25,
                  top:50
          }}>
            <Text style={{
                  position: 'relative',
                  width:200,
                  height:'100%',
                  paddingTop:5,
                  left:75,
                  fontSize:12}}>
              {this.state.errorMessage}
            </Text>
          </View>
          <View style={{
                  flexDirection: 'row',
                  height: 40,
                  top:65
          }}>
            <TouchableWithoutFeedback
              onPress={()=>this.doCreateAlertForUpdate()}>
              <View style={{
                width: 100,
                height: '100%',
                left: 55,
                borderRadius:5,
                backgroundColor:'#5f7391'
              }}>
                <Text style={{
                  width: 70,
                  position: 'relative',
                  top:5,
                  left:16,
                  fontSize: 20
                }}>
                  Update
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={()=> this.doCreateAlertForDelete() }>
              <View style={{
                width: 100,
                height: '100%',
                left: 90,
                borderRadius:5,
                backgroundColor:'#5f7391'
              }}>
                <Text style={{
                  width: 70,
                  position: 'relative',
                  top:5,
                  left:16,
                  fontSize: 20
                }}>
                  Delete
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 30,
                  top:105
          }}>
            <Text style={{
              position:'relative',
              fontSize:15,
              left:20,
              width: 180,
              paddingTop:2
            }}>Property Details</Text>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:110
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: 180,
              paddingTop:2
            }}>Property Address: {this.props.pressedPropertyDetails.propertyLocation}</Text>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:111
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: 180,
              paddingTop:2
            }}>Property Pooling: {this.doesPropertyPool()}</Text>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:112
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: 180,
              paddingTop:2
            }}>Monthly Price: {this.props.pressedPropertyDetails.propertyMonthlyPrice} </Text>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:113
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: 180,
              paddingTop:2
            }}>Pooling to: {this.props.pressedPropertyDetails.propertyPoolingQty} Person/s </Text>
          </View>

          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:114
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: '100%',
              paddingTop:2
            }}>Individual Price: {this.props.pressedPropertyDetails.propertyFinalPrice} </Text>
          </View>
          <View style={{
                  flexDirection: 'row',
                  height: 21,
                  top:114
          }}>
            <Text style={{
              position:'relative',
              fontSize:13,
              left:20,
              width: '100%',
              paddingTop:2
            }}>Vacant: {this.displayAvailability()}</Text>
          </View>

      </React.Fragment>
    );
  }
}
