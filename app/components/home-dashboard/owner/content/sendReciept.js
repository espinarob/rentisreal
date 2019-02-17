import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback, TextInput} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';

export default class SendReciept extends Component{

	state = {
		inputORNumber: '',
		inputRecieptNotes: '',
    recieptError:  ''
	}


  sendPaymentReciept = ()=>{
    if(this.state.inputORNumber == ''){
      this.setState({recieptError:'Invalid Official Reciept Number'});
      setTimeout(()=>{
        this.setState({recieptError:''});
      },3500);
      return;
    }
    if(this.state.inputRecieptNotes == ''){
      this.setState({recieptError:'Please fill in reciept notes'});
      setTimeout(()=>{
        this.setState({recieptError:''});
      },3500);
      return;
    } 
    let finalRecieptData = {
      ORNumber    : this.state.inputORNumber,
      RecieptNote : this.state.inputRecieptNotes
    }

    this.props.doSendReciept(this.props.doGetTransactionDetails.propertyName,
      this.props.doGetTransactionDetails.tenantID,
      this.props.doGetTransactionDetails.requestID,
      this.props.doGetCurrentPaymentMade.paymentID,
      finalRecieptData);
    this.props.doGetBackAfterSending();
  }


	render() {
  		return (
  			<View style={{
        			flex:1
        	}}>
	        	<View style={{
                    backgroundColor: '#6785db',
                    height: 42,
                    flexDirection: 'row',
                    marginBottom: 15
            }}>
            	<TouchableWithoutFeedback
            		onPress={ ()=>{
            			this.props.doGetBack()}}>
              	<Text style={{
              			position:'relative',
              			width: 40,
              			height :'100%',
              			left: 5,
              			paddingTop:9,
              			paddingLeft:5
              	}}>
              		<Icon style={{fontSize:25,paddingTop:6,paddingLeft:4,color:'#3a3a3a'}}
                    	name="arrowleft"
                      type="AntDesign"/>
              	</Text>
              </TouchableWithoutFeedback>
              	<Text style={{
                      position: 'relative',
                      left:83,
                      height: '100%',
                      width: 200,
                      fontSize:20,
                      paddingTop:10
              	}}>
               		Send Reciept
              	</Text>
            </View>
            <Text style={{
                    height: 40,
                    width: 290,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 10,
                    marginBottom: 7
            }}>
              Warning to Owners: Reciepts stacked to only one, valid are those recently sent reciepts only.
            </Text>
            <Text style={{
                    height: 17,
                    width: 130,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 10
            }}>
              Official Reciept #
            </Text>
            <TextInput
              style={{
                borderWidth:2,
                borderRadius:5,
                width: 150,
                left: 22,
                position: 'relative',
                height:35,
                fontSize:10,
                top:13
              }}
              placeholder="OR number"
              maxLength={15}
              onChangeText = {(ORnumber)=>this.setState({inputORNumber:ORnumber})}/>
            <Text style={{
                    height: 17,
                    width: 130,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 13.9
            }}>
              Notes
            </Text>

            <TextInput
              style={{
                borderWidth:2,
                borderRadius:5,
                width: 150,
                left: 22,
                position: 'relative',
                height:35,
                fontSize:10,
                top:14
              }}
              placeholder="notes for reciept"
              maxLength={15}
              onChangeText = {(recieptNote)=>this.setState({inputRecieptNotes:recieptNote})}/>
            <Text style={{
                    height: 17,
                    width: 270,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 20
            }}>
              Sender Name: {this.props.doGetCurrentPaymentMade.inputSenderName}
            </Text>
            <Text style={{
                    height: 17,
                    width: 270,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 20
            }}>
              Sender Contact #: {this.props.doGetCurrentPaymentMade.inputContactNumber}
            </Text>
            <Text style={{
                    height: 17,
                    width: 320,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 20
            }}>
              Sender Payment Notes: {this.props.doGetCurrentPaymentMade.inputPaymentNotes}
            </Text>
            <Text style={{
                    height: 17,
                    width: 320,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 20
            }}>
              Paid Amount: {this.props.doGetCurrentPaymentMade.inputAmountSent} in pesos
            </Text>

            <Text style={{
                    height: 17,
                    width: 280,
                    fontSize: 12,
                    fontWeight: 'bold',
                    position: 'relative',
                    left: 20,
                    top: 30
            }}>
              {this.state.recieptError}
            </Text>

            <TouchableWithoutFeedback
              onPress={()=> this.sendPaymentReciept()}>
              <Text style={{
                      height: 30,
                      width: 70,
                      borderWidth:2,
                      fontSize: 14,
                      fontWeight: 'bold',
                      position: 'relative',
                      left: 20,
                      paddingLeft: 15,
                      paddingTop: 5,
                      top:40,
                      borderColor: '#5ce24a'
              }}>
                Send{' '}
                <Icon style={{fontSize:12}}
                        name="ios-arrow-forward"
                        type="Ionicons"/>
              </Text>
            </TouchableWithoutFeedback>
        </View>
     	);
  	}
}