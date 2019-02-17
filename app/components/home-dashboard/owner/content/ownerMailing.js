import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback,TextInput,Alert} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import {Button, Icon} from 'native-base';


export default class OwnerMailing extends Component {

	doCreateAlertForMail = ()=>{
		Alert.alert(
          'Send',
          'Confirm to send the message',
        [
          {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          {text: 'YES', onPress: () => this.doProcessSending()},
        ]);
	}


	state = {
		mailSubject: '',
		mailContent: '',
    sendingError: ''
	}



	doProcessSending = ()=>{
		if(this.state.mailSubject == '' || this.state.mailSubject == ''){
			this.setState({sendingError:'Please fill up subject and mail content'});
			setTimeout(()=>{
				this.setState({sendingError:''});
			},4000);
			return;
		}
		else{
			let today = new Date();
			finalDate = String(today.getMonth()+1) +
				"/" + 
				String(today.getDate()) + 
				"/" +
				String(today.getFullYear());
			let mail  = {
				mailSubject: this.state.mailSubject,
				mailContent: this.state.mailContent
			}

			let ownerDetails = {
				Account: this.props.doGetTransactionDetails.Account,
				transactionID: this.props.doGetTransactionDetails.requestID
			}
			this.props.doOperateOwnerMail(this.props.doGetTransactionDetails.propertyName,
				this.props.doGetTransactionDetails.tenantID,
				mail,
				finalDate,
				ownerDetails);
			this.setState({sendingError:'Please Wait..'});

			setTimeout(()=>{
				Alert.alert(
	            	'Alert',
	            	'Please check your sent mails',
		        	[
	         			{text: 'OK', onPress: () => console.log('OK')}
		        	]);
				this.props.doRefreshBackAfterSend();
			},2500);
		}
	}

	render(){
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
			                left:60,
			                height: '100%',
			                width: 150,
			                fontSize:20,
			                paddingTop:10
	              }}>
	                Send a Message
	              </Text>
	          </View>
	          <Text style={{
              			height:20,
              			width:100,
              			position:'relative',
              			top:30,
              			left: 45
              }}>
              	Mail Subject	
              </Text>

              <View style={{
              		width:'100%',
              		height:40,
            		position:'relative',
            		top:33
              }}>
              		<TextInput
              			style={{
              				width:200,
              				height:'100%',
              				fontSize: 14,
              				left: 50,
              				borderRadius:5,
              				borderWidth:1
              			}}
              			placeholder="Input subject message"
              			onChangeText={ (mailSubject) => this.setState({mailSubject:mailSubject})}/>
              </View>


              <Text style={{
              			height:20,
              			width:100,
              			position:'relative',
              			top:43,
              			left: 45
              }}>
              	Mail Content	
              </Text>

              <View style={{
              		width:'100%',
              		height:100,
            		position:'relative',
            		top:43
              }}>
              		<TextInput
              			style={{
              				width:200,
              				height:'100%',
              				fontSize: 14,
              				left: 50,
              				borderRadius:5,
              				borderWidth:1
              			}}
              			textAlignVertical = 'top'
              			multiline={true}
              			placeholder="Input mail content"
              			maxLength={120}
              			onChangeText={ (mailContent) => this.setState({mailContent:mailContent})} />
              </View>


              <Text style={{
              			height:20,
              			width:200,
              			position:'relative',
              			top:50,
              			left: 45,
              			fontWeight:'bold'
              }}>
              	Recipient: {this.props.doGetTransactionDetails.firstName} {this.props.doGetTransactionDetails.lastName}
              </Text>

              <TouchableWithoutFeedback
              	onPress = {()=>this.doCreateAlertForMail()}>

              	<Text style={{
              			height:40,
              			width:130,
              			position:'relative',
              			top:60,
              			left: 45,
              			paddingLeft: 15,
              			paddingTop: 10,
              			borderWidth:2,
              			borderColor: '#5ce24a',
              			fontSize:15
              	}}>
              		Send Message
              	</Text>

              </TouchableWithoutFeedback>

              <Text style={{
              		height: 35,
              		top:65,
              		width: 270,
              		fontSize: 15,
              		fontWeight: 'bold',
              		left: 45,
              		paddingTop: 7,
              		paddingLeft: 15
              }}>
              		{this.state.sendingError}
              </Text>
	        </View>
		);
 	}
}