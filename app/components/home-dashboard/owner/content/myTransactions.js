import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import OwnersIndividualTransaction from './ownersIndividualTransaction.js';


export default class MyTransactions extends Component {


  state = {
    transactionIsPressed: 'false',
    transactionPressedDetails: []

  }


  doAdjustTransaction = (transaction)=>{
    this.setState({transactionPressedDetails:transaction});
    this.setState({transactionIsPressed:'true'});
  }

  getBacktoTransactions = ()=>{
    this.setState({transactionIsPressed:'false'});
  }

  myTransactionMainDisplay = ()=>{
      if(this.props.doViewMyTransactions.length == 0){
        return <View style={{
                      flex:1
               }}>
                <View style={{
                        backgroundColor: '#6785db',
                        height: 42
                }}>
                  <Text style={{
                          position: 'relative',
                          left:95,
                          height: '100%',
                          width: 200,
                          fontSize:20,
                          paddingTop:10
                  }}>
                    Transactions Made
                  </Text>
                </View>
                <Text style={{position:'relative',top:250,left:115}}>No transactions yet</Text>
               </View>
      }
      else if(this.state.transactionIsPressed == 'false'){
        return <View style={{
                      flex:1
               }}>
                <View style={{
                        backgroundColor: '#6785db',
                        height: 42
                }}>
                  <Text style={{
                          position: 'relative',
                          left:95,
                          height: '100%',
                          width: 200,
                          fontSize:20,
                          paddingTop:10
                  }}>
                    Transactions Made
                  </Text>
                </View>
                <FlatList
                  data={this.props.doViewMyTransactions}
                  renderItem={({item})=>
                    <View style={{
                            borderBottomWidth:2,
                            height: 113
                    }}>
                      <Text style={{
                              width: 300,
                              height: 20,
                              fontSize: 14,
                              fontWeight: 'bold',
                              position:'relative',
                              left: 9,
                              top: 7 ,
                              marginBottom:3
                      }}> 
                        Tenant: {item.firstName} {item.lastName}
                      </Text>
                      <Text style={{
                              width: 300,
                              height: 15,
                              fontSize: 13,
                              position:'relative',
                              left: 10
                      }}> 
                        Property Address: {item.propertyLocation}
                      </Text>
                      <Text style={{
                              width: 300,
                              height: 15,
                              fontSize: 13,
                              position:'relative',
                              left: 10
                      }}> 
                        Property Price: {item.propertyFinalPrice} pesos per person
                      </Text>

                      <Text style={{
                              width: 300,
                              height: 15,
                              fontSize: 13,
                              position:'relative',
                              left: 10
                      }}> 
                        Slots: Good For {item.propertyPoolingQty} person/s
                      </Text>
                      <Text style={{
                              width: 300,
                              height: 15,
                              fontSize: 13,
                              position:'relative',
                              left: 10
                      }}> 
                        Property Name: {item.propertyName}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={()=> this.doAdjustTransaction(item)}>
                        <Text style={{
                                width: 45,
                                height: 22,
                                paddingLeft:6,
                                fontSize: 13,
                                position:'relative',
                                left: 300,
                                borderWidth:2,
                                paddingTop: 2
                        }}>
                          More
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  }
                  keyExtractor={item => item.propertyID}/>
               </View>
      }
      else{
        return  <View style={{
                        flex:1
                }}>
                  <OwnersIndividualTransaction
                    doGetTransactionDetails = {this.state.transactionPressedDetails}
                    doGetBack               = {this.getBacktoTransactions}
                    doOperateOwnerMail      = {this.props.doOperateOwnerMail} 
                    doDeleteOwnerSent       = {this.props.doDeleteOwnerSent}
                    doSendReciept           = {this.props.doSendReciept} />
                </View>
      }
  }


  render(){
    return (
        <React.Fragment>
          {this.myTransactionMainDisplay()}
        </React.Fragment>
    );
  }
}
