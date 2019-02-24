import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback, Image} from 'react-native';
import {Button,Icon, Spinner} from "native-base";


export default class FreePlanPage extends Component {

	submitOwnerFreePayment = ()=>{
		let today = new Date();
 	 	let payDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
		const data = {
			'date' : payDate,
			'info' : 'free subscription'
		}
		this.setState({errorMsg:'Submitting information.. Please Wait..'});
		this.props.doSubmitFreeSub(data);
		setTimeout(()=>{
			this.setState({errorMsg:''});
		},3000);
	}

	state = {
		errorMsg: ''
	}

	render() {
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
                			left:40,
			                height: '100%',
			                width: 220,
			                fontSize:20,
			                paddingTop:10
          			}}>
                		Free Subscription Plan
              		</Text>
          	</View>
          	<TouchableWithoutFeedback
          		onPress={()=>this.submitOwnerFreePayment()}>
	          	<Text style={{
          				width: 100,
          				paddingLeft: 12,
          				borderWidth: 2,
          				paddingTop:8,
          				left: 130,
          				height: 40,
          				fontWeight: 'bold',
          				fontSize: 15,
          				borderColor: '#5ce24a',
          				top: 30
          		}}>
          			Avail Now{' '}
          			<Icon style={{fontSize:13}}
           				name="ios-arrow-forward"
           				type="Ionicons"/>
          		</Text>
          	</TouchableWithoutFeedback>

          	<Text style={{
      				width: 300,
      				height:25,
      				fontSize: 13,
      				fontWeight: 'bold',
      				position: 'relative',
      				left:30,
      				paddingTop:2,
      				top: 35,
      				paddingLeft:10
      		}}>
      			{this.state.errorMsg}
      		</Text>

        </View>
	    );
  	}
}