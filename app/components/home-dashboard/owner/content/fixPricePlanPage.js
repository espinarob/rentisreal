import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage,FlatList,TouchableWithoutFeedback,TextInput} from "react-native";
import {Button, Icon} from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SeeFixPaymentStatus from './seeFixPaymentStatus.js';


const options = {
  title: 'Select Avatar',
  //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
};

export default class FixPricePlanPage extends Component{


	state = {
		remittanceName   : '',
		contactNumber    : '',
		senderName       : '',
		imagePath        : '',
		imageHeight      : '',
		imageWidth       : '',
		imageType        : 'invalid',
		errorMsg         : '',
		subscription     : [],
		fixPlanOperation : 'none',
		remittanceCode   : ''
	}

	componentDidMount(){
		if(this.props.doGetMyAccount.subscription){
			const currentSubscriptions = JSON.parse(JSON.stringify(this.props.doGetMyAccount.subscription));
			const initSubscription     = [];
			Object
				.keys(currentSubscriptions)
				.forEach((subKey)=>{
					initSubscription.push(currentSubscriptions[subKey]);
				});
			this.setState({subscription:initSubscription});
		}
		else{
			this.setState({subscription:[]});
		}
	}

	selectPhoto = ()=>{
		ImagePicker.showImagePicker(options, (response) => {
		  //console.log('Response = ', response);
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  } else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  } else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  } else {
		    this.setState({
		     	imagePath   : response.uri,
            	imageHeight : response.height,
            	imageWidth  : response.width,
		    });
		    if(response.type){
		    	if(response.type == 'image/jpeg' || response.type == 'jpeg' ||  
		    		response.type == 'image/jpg'){
		    		this.setState({
			    		imageType: response.type
			    	});
		    	}
		    	else{
			    	this.setState({
			    		imageType: 'invalid'
			    	});
			    }
		    }
		    else{
		    	this.setState({
		    		imageType: 'invalid'
		    	});
		    }
		  }
		});
	}

	submitOwnerPayment = ()=>{
		let today = new Date();
 	 	let payDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
		const data = {
			'date': payDate,
			'remittanceName' : this.state.remittanceName,
			'senderName'     : this.state.senderName,
			'contactNumber'  : this.state.contactNumber,
			'amount'         : '100',
			'remittanceCode' : this.state.remittanceCode,
			'bank'           : this.props.doGetAdminDetails.bank
		}
		if( this.state.imagePath.length!=0 && this.state.imageType == 'invalid'){
			this.setState({errorMsg:'Invalid photo type, select another type of image'});
			setTimeout(()=>{
				this.setState({errorMsg:''});
			},2500);
			return;
		}
		else if(this.state.remittanceName == ''){
			this.setState({errorMsg:'Please fill in the remittance name'});
			setTimeout(()=>{
				this.setState({errorMsg:''});
			},2500);
			return;
		}
		else if(this.state.senderName == ''){
			this.setState({errorMsg:'Please fill in the sender name for the payment'});
			setTimeout(()=>{
				this.setState({errorMsg:''});
			},2500);
			return;
		}
		else if(Number.isInteger(Number(this.state.contactNumber)) == false ||
			this.state.contactNumber.length<11 ){
			this.setState({errorMsg:'Invalid contact number, check your input number'});
			setTimeout(()=>{
				this.setState({errorMsg:''});
			},2500);
			return;
		}
		else{
			this.setState({
				remittanceName : '',
				contactNumber  : '',
				senderName     : '',
				imagePath      : '',
				imageType      : '',
				imageWidth     : '',
				imageHeight    : '',
				remittanceCode : ''
			});

			this.setState({errorMsg:'Submitting..Please Wait...'});
			setTimeout(()=>{
				this.setState({errorMsg:''});
			},3500);
			this.props.doSubmitFixPay(data,this.state.imagePath);
		}
	}


	getBackFromFixPlanPage = ()=>{
		this.setState({fixPlanOperation:'none'});
	}

	fixPricePlanMainDisplay = ()=>{
		if(this.state.fixPlanOperation == 'none'){
			return	<React.Fragment>
		    			<View style={{
				              	backgroundColor: '#6785db',
				              	height: 41,
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
					                width: 220,
					                fontSize:20,
					                paddingTop:10
			             	}}>
			                	Fix Price Plan
			              	</Text>
			          	</View>

			          	<Text style={{
			          			height:27,
			          			width:200,
			          			position:'relative',
			          			left: 20,
			          			top: 20,
			          			fontSize: 16,
			          			fontWeight: 'bold'
			          	}}>	
			          		Admin Payment Recipient:
			          	</Text>
			          	<Text style={{
			          			height:22,
			          			width:250,
			          			position:'relative',
			          			left: 27,
			          			top: 20,
			          			fontSize: 14,
			          	}}>	
			          		Bank Account: {this.props.doGetAdminDetails.bank}
			          	</Text>
			          	<Text style={{
			          			height:22,
			          			width:305,
			          			position:'relative',
			          			left: 27,
			          			top: 20,
			          			fontSize: 14,
			          	}}>	
			          		E-mail Address: {this.props.doGetAdminDetails.email}
			          	</Text>

			          	<Text style={{
			          			height:22,
			          			width:305,
			          			position:'relative',
			          			left: 20,
			          			top: 40,
			          			fontSize: 16,
			          			fontWeight: 'bold'
			          	}}>	
			          		Submit Subscription Payment
			          	</Text>


			          	<View style={{
			          			width: '100%',
			          			height: 37,
			          			position: 'relative',
			          			top: 50,
			          			flexDirection : 'row'
			          	}}>
			          		<Text style={{
			          				width: 120,
			          				height: '100%',
			          				fontSize: 14,
			          				position: 'relative',
			          				left:20,
			          				paddingTop: 6
			          		}}>
			          			Remittance Name:
			          		</Text>

			          		<TextInput
			          			style={{
			          				borderRadius:5,
			          				width: 160,
			          				height: '100%',
			          				fontSize: 12,
			          				left: 22,
			          				borderWidth: 1
			          			}}
			          			placeholder  = 'Input name of remittance'
			          			maxLength    = {45}
			          			value        = {this.state.remittanceName}
			          			onChangeText = {(remittanceName)=>this.setState({remittanceName})}/>
			          	</View>

			          	<View style={{
			          			width: '100%',
			          			height: 37,
			          			position: 'relative',
			          			top: 55,
			          			flexDirection : 'row'
			          	}}>
			          		<Text style={{
			          				width: 120,
			          				height: '100%',
			          				fontSize: 14,
			          				position: 'relative',
			          				left:20,
			          				paddingTop: 6
			          		}}>
			          			Remittance Code
			          		</Text>

			          		<TextInput
			          			style={{
			          				borderRadius:5,
			          				width: 160,
			          				height: '100%',
			          				fontSize: 12,
			          				left: 22,
			          				borderWidth: 1
			          			}}
			          			placeholder  = 'Input transaction code'
			          			maxLength    = {45}
			          			value        = {this.state.remittanceCode}
			          			onChangeText = {(remittanceCode)=>this.setState({remittanceCode})}/>
			          	</View>

			          	<View style={{
			          			width: '100%',
			          			height: 37,
			          			position: 'relative',
			          			top: 60,
			          			flexDirection : 'row'
			          	}}>
			          		<Text style={{
			          				width: 120,
			          				height: '100%',
			          				fontSize: 14,
			          				position: 'relative',
			          				left:20,
			          				paddingTop: 6
			          		}}>
			          			Sender Name:
			          		</Text>

			          		<TextInput
			          			style={{
			          				borderRadius:5,
			          				width: 160,
			          				height: '100%',
			          				fontSize: 12,
			          				left: 22,
			          				borderWidth: 1
			          			}}
			          			placeholder  = 'Input name of sender'
			          			maxLength    = {45}
			          			value        = {this.state.senderName}
			          			onChangeText = {(senderName)=>this.setState({senderName})}/>
			          	</View>
			          	<View style={{
			          			width: '100%',
			          			height: 37,
			          			position: 'relative',
			          			top: 65,
			          			flexDirection : 'row'
			          	}}>
			          		<Text style={{
			          				width: 120,
			          				height: '100%',
			          				fontSize: 14,
			          				position: 'relative',
			          				left:20,
			          				paddingTop: 6
			          		}}>
			          			Contanct Number:
			          		</Text>

			          		<TextInput
			          			style={{
			          				borderRadius:5,
			          				width: 160,
			          				height: '100%',
			          				fontSize: 12,
			          				left: 22,
			          				borderWidth: 1
			          			}}
			          			placeholder  = 'Input contact # of sender'
			          			maxLength    = {11}
			          			value        = {this.state.contactNumber}
			          			onChangeText = {(contactNumber)=>this.setState({contactNumber})}/>
			          	</View>


			          	<View style={{
			          			width: '100%',
			          			height: 34,
			          			position: 'relative',
			          			top: 65,
			          			flexDirection : 'row'
			          	}}>
			          		<Text style={{
			          				width: 280,
			          				height: '100%',
			          				fontSize: 13,
			          				fontWeight: 'bold',
			          				position: 'relative',
			          				left:15,
			          				paddingTop: 6
			          		}}>
			          			Upload Photo (Reciept of Remittance) :
			          		</Text>
			          	</View>

			          	<View style={{
			          			width: '100%',
			          			height: 34,
			          			position: 'relative',
			          			top: 67,
			          			flexDirection : 'row',
			          	}}>
			          		<TouchableWithoutFeedback
			          			onPress={()=>this.selectPhoto()}>
				          		<Text style={{
				          				width: 63,
				          				height: '100%',
				          				fontSize: 14,
				          				fontWeight: 'bold',
				          				position: 'relative',
				          				left:80,
				          				paddingTop: 6,
				          				borderWidth: 1,
				          				borderRadius: 5,
				          				paddingLeft: 20
				          		}}>
				          			....
				          		</Text>
				          	</TouchableWithoutFeedback>
				          	<Text style={{
			          				width: 150,
			          				height: '100%',
			          				fontSize: 14,
			          				fontWeight: 'bold',
			          				position: 'relative',
			          				left:85,
			          				paddingTop: 6,
			          				borderRadius: 5,
			          				paddingLeft: 10
			          		}}>
			          			{this.state.imagePath.length == 0 ? 'No selected photo' : 
			          				( this.state.imageType == 'invalid' ? 'Invalid Photo' : 'One photo selected') }
			          		</Text>
			          	</View>
			          	<Text style={{
		          				width: 300,
		          				height:25,
		          				fontSize: 13,
		          				fontWeight: 'bold',
		          				position: 'relative',
		          				left:30,
		          				paddingTop:2,
		          				top: 75,
		          				paddingLeft:10
		          		}}>
		          			{this.state.errorMsg}
		          		</Text>

		          		<View style={{
		          				width: '100%',
		          				flexDirection: 'row',
		          				position : 'relative',
		          				top: 81,
		          				height:40
		          		}}>

		          			<TouchableWithoutFeedback
				          		onPress={()=>this.setState({fixPlanOperation:'check_status'})}>
					          	<Text style={{
				          				width: 125,
				          				paddingLeft: 12,
				          				borderWidth: 2,
				          				paddingTop:8,
				          				left: 15,
				          				height: 40,
				          				fontWeight: 'bold',
				          				fontSize: 15,
				          				borderColor: '#5ce24a'
				          		}}>
				          			Subscriptions{' '}
				          			<Icon style={{fontSize:13}}
				           				name="ios-arrow-forward"
				           				type="Ionicons"/>
				          		</Text>
				          	</TouchableWithoutFeedback>


				          	<TouchableWithoutFeedback
				          		onPress={()=>this.submitOwnerPayment()}>
					          	<Text style={{
				          				width: 85,
				          				paddingLeft: 12,
				          				borderWidth: 2,
				          				paddingTop:8,
				          				left: 130,
				          				height: 40,
				          				fontWeight: 'bold',
				          				fontSize: 15,
				          				borderColor: '#5ce24a'
				          		}}>
				          			Submit{' '}
				          			<Icon style={{fontSize:13}}
				           				name="ios-arrow-forward"
				           				type="Ionicons"/>
				          		</Text>
				          	</TouchableWithoutFeedback>
				        </View>
		    		</React.Fragment>
		}
		else if(this.state.fixPlanOperation == 'check_status'){
			return <SeeFixPaymentStatus
						doGetMySubscription = {this.state.subscription}
						doGetBack           = {this.getBackFromFixPlanPage} />
		}
	}

	render() {
    	return (
    		<React.Fragment>
    			{this.fixPricePlanMainDisplay()}
    		</React.Fragment>
    	);
	}
}