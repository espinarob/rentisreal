import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback, Alert} from "react-native";
import {Icon} from 'native-base';


export default class ViewReciept extends Component{

	state = {
		recieptDetails: []
	}

	componentDidMount(){
		let initFinalReciept = [];
		if(this.props.doGetPaymentDetails){
			initFinalReciept = JSON.parse(JSON.stringify(this.props.doGetPaymentDetails.reciept.one_reciept));
			this.setState({recieptDetails:initFinalReciept});
		}
		
	}

	recieptMainDisplay = ()=>{
		if(this.state.recieptDetails.length!=0){
			return	<View style={{
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
			                	Payment Reciept
			              	</Text>
			          	</View>

			          	<View style={{
			          			position: 'relative',
			          			top:10,
			          			height: 23,
			          			width: '100%'
			          	}}>
			          		<Text style={{
			          				fontSize: 12,
			          				fontWeight: 'bold',
			          				width:220,
			          				height: '100%',
			          				paddingLeft: 7,
			          				left:15
			          		}}>
			          			{this.state.recieptDetails.date}
			          		</Text>

			          	</View>

			          	<View style={{
			          			position: 'relative',
			          			top:10,
			          			height: 29,
			          			width: '100%'
			          	}}>
			          		<Text style={{
			          				fontSize: 14,
			          				fontWeight: 'bold',
			          				width:220,
			          				height: '100%',
			          				paddingTop: 2,
			          				paddingLeft: 7,
			          				left:15
			          		}}>
			          			OR number: {this.state.recieptDetails.ORNumber}
			          		</Text>
			          	</View>

			          	<View style={{
			          			position: 'relative',
			          			top:10,
			          			height: 25,
			          			width: '100%'
			          	}}>
			          		<Text style={{
			          				fontSize: 12,
			          				fontWeight: 'bold',
			          				width:220,
			          				height: '100%',
			          				paddingLeft: 7,
			          				left:15
			          		}}>
			          			Amount: {this.props.doGetPaymentDetails.inputAmountSent}
			          		</Text>
			          	</View>

			          	<View style={{
			          			position: 'relative',
			          			top:10,
			          			height: 40,
			          			width: '100%'
			          	}}>
			          		<Text style={{
			          				fontSize: 12,
			          				fontWeight: 'bold',
			          				width:220,
			          				height: '100%',
			          				paddingLeft: 7,
			          				left:15
			          		}}>
			          			Reciept Note: {this.state.recieptDetails.RecieptNote}
			          		</Text>
			          	</View>
			        </View>
		}
		else{
			return	<View style={{
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
			                	Payment Reciept
			              	</Text>
			          	</View>
			          	<Text style={{position:'relative',top:250,left:134}}>No reciept yet</Text>
			        </View>
		}
	}


	render() {
		
    	return (
    		<React.Fragment>
    			{this.recieptMainDisplay()}
    		</React.Fragment>
    	);
	}
}