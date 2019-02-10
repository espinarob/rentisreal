import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';



export default class MyNotifications extends Component{
  render() {
    if(this.props.doGetMyNotifications.length!=0){
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
                  left:80,
                  height: '100%',
                  width: 150,
                  fontSize:20,
                  paddingTop:10
                }}>
                  Notifications
                </Text>

            </View>
            <FlatList
            	data= {this.props.doGetMyNotifications}
            	renderItem={({item}) =>	
            		<View style={{
            				position:'relative',
            				height: 45,
            				borderBottomWidth:2,
            				borderColor:'#6e8fd1',
                    flexDirection:'row'
            		}}>
            			<Text style={{
            					fontSize:13,
            					width: 270,
            					left: 10,
            					top: 5,
            					position:'relative'
            			}}>
            				{item.message}
            			</Text>

                  <Text style={{
                      fontSize: 12,
                      width:60,
                      height:30,
                      position: 'relative',
                      paddingTop:10,
                      paddingLeft:5,
                      left: 30,
                      top:10
                  }}>
                    {item.date}
                  </Text>
            		</View>
            	}
            	keyExtractor={item => item.notifID}/>
            <TouchableWithoutFeedback
              onPress={ ()=>this.props.doClearAllMyNotif()}>
              <View style={{
                    position:'absolute',
                    width: 60,
                    borderWidth:2,
                    top: 491,
                    height: 25,
                    left: 295,
                    borderColor:'#6e8fd1'
              }}>
                <Text style={{
                      height:'100%',
                      width: '90%',
                      position:'relative',
                      fontSize:15,
                      paddingLeft:10,
                }}>
                  Clear
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
                  left:80,
                  height: '100%',
                  width: 150,
                  fontSize:20,
                  paddingTop:10
                }}>
                  Notifications
                </Text>

            </View>
            <Text style={{position:'relative',top:250,left:90}}>No notifications recieved yet</Text>
          </View>
      );
    }
  }
}