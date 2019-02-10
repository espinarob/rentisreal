import React, { Component } from "react";
import { Platform, StyleSheet, Text, View} from "react-native";
import { Spinner} from "native-base";

const loadingScreenWrapperStyle = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#6785db'
  }
});

export default class LoadingScreen extends Component{
  render() {
      return (
        <View style={loadingScreenWrapperStyle.mainWrapper}>
          <Spinner style={{ position:'relative',top: 200}} color='#435572'/>
         <Text style={{ position:'relative',top: 230,left: 150}}> Loading... </Text>
         <Text style={{ position:'relative',top: 235,left: '30%'}}> {this.props.ConsoleMessage} </Text>
        </View>
      );
  }
}