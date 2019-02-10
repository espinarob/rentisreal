import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';



export default class MyMessages extends Component{

  render() {
    if(this.props.doGetMyMails.length!=0){
      return (
        <View style={{
                flex:1
        }}>
          <View style={{
              backgroundColor: '#6785db',
              height: 45,
              flexDirection: 'row'
            }}>

              <TouchableWithoutFeedback
                onPress={()=>this.props.doGetBack()}>
                <Text style={{
                        height: '100%',
                        width: 45,
                        position: 'relative',
                        left: 5,
                        paddingLeft: 5,
                        paddingTop:9
                }}>
                  <Icon style={{fontSize:25,paddingTop:6,paddingLeft:4,color:'#3a3a3a'}}
                    name="arrowleft"
                    type="AntDesign"/>
                </Text>
              </TouchableWithoutFeedback>
              <Text style={{
                position: 'relative',
                left:70,
                height: '100%',
                width: 150,
                fontSize:20,
                paddingTop:10
              }}>
                Mail Messages
              </Text>
          </View>

          <FlatList
            data={this.props.doGetMyMails}
            renderItem={({item}) => 
              <View style={{
                position:'relative',
                height:200,
                width:'100%',
                borderBottomWidth:2,
                borderColor:'#5ce24a'
              }}>
                <Text style={{
                  height:40,
                  width: '100%',
                  paddingLeft: 10,
                  position:'relative',
                  top: 10,
                  fontSize: 16
                }}>
                  Message From: {item.sender}
                </Text>

                <Text style={{
                  height:23,
                  width: '100%',
                  paddingLeft: 10,
                  position:'relative',
                  top: 10,
                  fontSize: 15
                }}>
                  Message Subject: {item.mailSubject}
                </Text>

                <Text style={{
                  height:23,
                  width: '100%',
                  paddingLeft: 10,
                  position:'relative',
                  top: 10,
                  fontWeight: 'bold',
                  fontSize: 14
                }}>
                  Message Content:
                </Text>

                <Text style={{
                  height:75,
                  width: '100%',
                  paddingLeft: 23,
                  position:'relative',
                  top: 10,
                  fontWeight: 'bold',
                  fontSize: 14
                }}>
                  {item.mailContent}
                </Text>
                <View style={{
                  height:20,
                  width: '100%',
                  paddingLeft: 10,
                  position:'relative',
                  flexDirection: 'row',
                  top: 15
                }}>
                  <TouchableWithoutFeedback
                    onPress={()=>{this.props.doDeleteAMail(item.messageID)}}>
                    <Text style={{
                      fontWeight: 'bold',
                      left: 212,
                      fontSize: 12,
                      borderWidth:2,
                      height: '100%',
                      position:'relative',
                      width: 60,
                      paddingLeft: 13,
                      borderColor:'#5ce24a'
                    }}>
                      Delete
                    </Text>
                  </TouchableWithoutFeedback>

                  <Text style={{
                    fontWeight: 'bold',
                    left: 219,
                    height: '100%',
                    position:'relative',
                    width: 67,
                    paddingLeft:5
                  }}>
                    {item.dateSent}
                  </Text>

                </View>
              </View>
            }
            keyExtractor={item => item.messageID}/>
        </View>
      );
    }
    else{
      return (
        <View style={{
                flex:1
        }}>
          <View style={{
              backgroundColor: '#6785db',
              height: 45,
              flexDirection: 'row'
            }}>

              <TouchableWithoutFeedback
                onPress={()=>this.props.doGetBack()}>
                <Text style={{
                        height: '100%',
                        width: 45,
                        position: 'relative',
                        left: 5,
                        paddingLeft: 5,
                        paddingTop:9
                }}>
                  <Icon style={{fontSize:25,paddingTop:6,paddingLeft:4,color:'#3a3a3a'}}
                    name="arrowleft"
                    type="AntDesign"/>
                </Text>
              </TouchableWithoutFeedback>
              <Text style={{
                position: 'relative',
                left:70,
                height: '100%',
                width: 150,
                fontSize:20,
                paddingTop:10
              }}>
                Mail Messages
              </Text>
          </View>
          <Text style={{position:'relative',top:250,left:95}}>No messages recieved yet</Text>
        </View>
      );
    }
  }
}