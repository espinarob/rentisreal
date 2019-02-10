import React, { Component } from "react";
import { Platform, StyleSheet, Text, View} from "react-native";
import { Spinner} from "native-base";

const splashScreenWrapperStyle = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#6785db'
  }
});

export default class SplashScreen extends Component{
  render() {
      return (
        <View style={splashScreenWrapperStyle.mainWrapper}>
          <Text style={{
            position:'relative',
            width:'100%',
            height: 70,
            top: 150,
            fontWeight:'bold',
            fontSize: 60,
            paddingLeft: 55
          }}>
            RENT
          </Text>
          <Text style={{
            position:'relative',
            width:'100%',
            height: 70,
            top: 150,
            fontWeight:'bold',
            fontSize: 60,
            paddingLeft: 100,
            color: '#fff'
          }}>
            IS
          </Text>
          <Text style={{
            position:'relative',
            width:'100%',
            height: 65,
            top: 150,
            fontWeight:'bold',
            fontSize: 60,
            paddingLeft: 105,
            color: '#fff',
            paddingTop:0
          }}>
            REAL
          </Text>

          <Spinner style={{ position:'relative',top: 190}} color='#435572'/>
        </View>
      );
  }
}