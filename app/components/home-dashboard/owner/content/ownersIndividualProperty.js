import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback,TextInput,Alert} from 'react-native';
import {Button,Icon} from "native-base";
import OwnerUpdatePage from './ownersUpdatePage.js';

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
      errorMessage:        '',
      updateIsPressed    : 'false'
  }

  doDeleteNow = ()=>{
    this.props.doDeleteProperty(this.props.pressedPropertyDetails.propertyID,
                this.props.pressedPropertyDetails.Account,this.props.pressedPropertyDetails.propertyID);
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

  getBackAfterUpdate = ()=>{
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

  showUpdatePage = ()=>{
    this.setState({updateIsPressed:'true'});
  }

  cancelUpdate = ()=>{
    this.setState({updateIsPressed:'false'});
  }

  individualPropertyMainDisplay = ()=>{
    if( this.state.updateIsPressed == 'false'){
      return  <React.Fragment>
                <View style={{
                        height: 41,
                        flexDirection: 'row',
                        color:'#8b8f96',
                        top:20,
                        borderColor:'#5ce24a'
                    }}>
                        <View style={{
                            position:'relative',
                            left: 78,
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
                        height: 25,
                        top:30
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:15,
                    left:20,
                    width: 180
                  }}>
                    Property Details
                  </Text>
                </View>

                <View style={{
                        flexDirection: 'row',
                        height: 40,
                        top:33
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: 300
                  }}>
                    Property Address: {this.props.pressedPropertyDetails.propertyLocation}
                  </Text>
                </View>

                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:35
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: 180
                  }}>Property Pooling: {this.doesPropertyPool()}</Text>
                </View>

                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:37
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: 180
                  }}>Monthly Price: {this.props.pressedPropertyDetails.propertyMonthlyPrice} </Text>
                </View>

                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:39
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: 180
                  }}>Pooling to: {this.props.pressedPropertyDetails.propertyPoolingQty} Person/s </Text>
                </View>

                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:41
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: '100%'
                  }}>Individual Price: {this.props.pressedPropertyDetails.propertyFinalPrice} </Text>
                </View>
                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:43
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: '100%'
                  }}>Vacant: {this.displayAvailability()}</Text>
                </View>
                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:45
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: '100%'
                  }}>Property Type: {this.props.pressedPropertyDetails.propertyType} </Text>

                </View>
                <View style={{
                        flexDirection: 'row',
                        height: 20,
                        top:47
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: '100%',
                    fontWeight: 'bold'
                  }}>Rating: {this.props.pressedPropertyDetails.ratingCount == 0 ? 'not rated yet' : this.props.pressedPropertyDetails.rating}</Text>
                </View>
                <View style={{
                        flexDirection: 'row',
                        height: 40,
                        top:49
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:13,
                    left:20,
                    width: '100%',
                    fontWeight: 'bold'
                  }}>Interior Information: {this.props.pressedPropertyDetails.propertyFurtherData}</Text>
                </View>
                

                <View style={{
                        flexDirection: 'row',
                        height: 35,
                        top:85
                }}>

                  <TouchableWithoutFeedback
                    onPress= {()=>this.props.doGetBack()}>
                    <Text style={{
                            width: 80,
                            height: '100%',
                            borderWidth: 2,
                            position: 'relative',
                            left: 15,
                            paddingLeft: 11,
                            paddingTop:6,
                            fontSize: 15,
                            fontWeight : 'bold',
                            borderColor:'#5ce24a'
                    }}>
                     
                      <Icon style={{fontSize:15,color:'#8b8f96'}}
                              name="ios-arrow-back"
                              type="Ionicons"/>{' '}Return
                    </Text>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress= {()=>this.doCreateAlertForDelete()}>
                    <Text style={{
                            width: 50,
                            height: '100%',
                            borderWidth: 2,
                            position: 'relative',
                            left: 78,
                            paddingLeft: 18,
                            paddingTop:8,
                            fontSize: 19,
                            fontWeight : 'bold',
                            borderColor:'#5ce24a'
                    }}>
                      <Icon style={{fontSize:26}}
                              name="ios-trash"
                              type="Ionicons"/>
                    </Text>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress= {()=>this.showUpdatePage()}>
                    <Text style={{
                            width: 80,
                            height: '100%',
                            borderWidth: 2,
                            position: 'relative',
                            left: 136,
                            paddingLeft: 11,
                            paddingTop:8,
                            fontSize: 15,
                            fontWeight : 'bold',
                            borderColor:'#5ce24a'
                    }}>
                      Update{' '}
                      <Icon style={{fontSize:15,color:'#8b8f96'}}
                              name="ios-arrow-forward"
                              type="Ionicons"/>
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
            </React.Fragment>
    }
    else{
      return  <OwnerUpdatePage
                pressedPropertyDetails = {this.props.pressedPropertyDetails} 
                doCancelUpdate         = {this.cancelUpdate}
                doUpdateProperty       = {this.props.doUpdateProperty}
                doGetBackAfterUpdate   = {this.getBackAfterUpdate} />
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
