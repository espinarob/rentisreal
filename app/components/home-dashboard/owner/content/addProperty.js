import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput, CheckBox, TouchableHighlight,Picker, TouchableWithoutFeedback} from "react-native";
import ImagePicker from 'react-native-image-picker';

const addPropertyWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 2,
		top: 20,
		color: '#000'
	},
	addPropertyLabel:{
		position: 'relative',
		height: 25
	},	
	nameSection:{
		position: 'relative',
		height: 30,
		top:5,
		flexDirection: 'row'
	},
	locationSection:{
		position: 'relative',
		height: 30,
		top: 7,
		flexDirection: 'row'
	},
	paymentSection:{
		position: 'relative',
		height: 30,
		top:9,
		flexDirection: 'row'
	},
	bedroomSection:{
		position: 'relative',
		height: 30,
		top: 11,
		flexDirection: 'row'
	},
	monthlyPriceSection:{
		position: 'relative',
		height: 30,	
		top: 13,
		flexDirection: 'row'
	},	
	priceSection:{
		position: 'relative',
		height: 30,	
		top: 15,
		flexDirection: 'row'
	},
	photoSection:{
		position: 'relative',
		height: 30,
		top: 17,
		flexDirection: 'row'
	},
	descriptionSection:{
		position: 'relative',
		height: 30,
		top: 19,
		flexDirection: 'row'
	},
	furtherDataSection:{
		position: 'relative',
		height: 30,
		top: 22,
		flexDirection: 'row'
	},
	propertyTypeSection:{
		position: 'relative',
		height: 35,
		top: 25,
		flexDirection: 'row'
	},
	errorSection:{
		position: 'relative',
		height: 30,
		top: 27,
		flexDirection: 'row'	
	},
	confirmSection:{
		position: 'relative',
		height: 35,
		top: 31,
		flexDirection: 'row'
	},
	propertyNameInputStyle:{
		width: 160,
		height: '100%',
		left: 50,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyLocationStyle:{
		width: 160,
		height: '100%',
		left: 35,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyLocationStyle:{
		width: 150,
		height: '100%',
		left: 35,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyPoolingSwitchStyle:{
		position: 'relative',
		left: 20
	},
	propertyPoolingInputStyle:{
		width: 80,
		height: '100%',
		left: 50,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyMonthlyPriceStyle:{
		width: 100,
		height: '100%',
		left: 30,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyDescriptionInputStyle: {
		width: 170,
		height: '100%',
		left: 40,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	propertyFurtherDataInputStyle: {
		width: 170,
		height: '100%',
		left: 40,
		alignItems: 'stretch',
		padding: 0,
		position: 'relative',
		borderRadius: 5,
		fontSize: 12,
		borderWidth:1
	},
	confirmButtonStyle: {
		position: 'relative',
		left: 120,
		width: '30%',
		height: '100%',
		borderColor:'#5ce24a',
		borderWidth:2
	}


});


const options = {
  title: 'Select Avatar',
  //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
};

export default class AddProperty extends Component{

	state = {
		propertyName:           '',
		propertyLocation:       '',
		propertyBedroomPooling: false,
		propertyPoolingQty:     '0',
		propertyMonthnlyPrice:  '0',
		propertyFinalPrice:     '',
		propertyPhotoSection:   '',
		propertyDescription:    '',
		propertyFurtherData:    '',
		addPropertyError   :    '',
		propertyType       :    'Boarding House',
		imagePath: '',
    	imageHeight: '',
    	imageWidth: ''

	}

	poolingCheckBox = () => {
		this.setState({
			propertyBedroomPooling:!this.state.propertyBedroomPooling
		});
	}

	getFinalPrice = ()=>{

		if( Number.isInteger(Number(this.state.propertyPoolingQty)) == false || 
			Number.isInteger(Number(this.state.propertyMonthnlyPrice)) == false){
			return;
		}
		else if( Number(this.state.propertyPoolingQty) == 0 ){
			let initFinalPrice = this.state.propertyMonthnlyPrice;
			return initFinalPrice;
		}	
		else if( Number(this.state.propertyPoolingQty)<0 ){
			return;
		}
		else if( Number(this.state.propertyPoolingQty)>0 ){
			let initFinalPrice = this.state.propertyMonthnlyPrice/this.state.propertyPoolingQty
			return initFinalPrice;
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
		    //const source = { uri: response.uri };

		    // You can also display the image using data:
		    //const source = { uri: 'data:image/jpeg;base64,' + response.data };
			//const source =	'data:image/jpeg;base64,'+String(response.data);
		    //const source = response.data;
		    this.setState({
		     	imagePath   : response.uri,
            	imageHeight : response.height,
            	imageWidth  : response.width
		    });
		  }
		});
	}

	onPropertyTypeChange = (itemValue,itemIndex)=>{
		this.setState({propertyType:itemValue});
	}

	doAddProperty = () =>{
		if(this.state.propertyName.length==0){
			this.setState({
			   	addPropertyError: 'Please input property name!'});
		}
		else if(this.state.propertyLocation.length==0){
			this.setState({
			   	addPropertyError: 'Please input property location!'});
		}
		else if(this.state.propertyMonthnlyPrice == 0){
			this.setState({
			   	addPropertyError: 'Please input monthly price!'});
		}
		else if( this.state.propertyBedroomPooling == false && this.state.propertyPoolingQty!= 0){
			this.setState({
			   	addPropertyError: 'Please check Pooling checkbox!'});
		}
		else if(this.state.propertyMonthnlyPrice == ''){
			this.setState({
			   	addPropertyError:'Monthly Price Should be an Integer!'});
		}
		else if( this.state.propertyPoolingQty == '' &&  this.state.propertyBedroomPooling!= false){
			this.setState({
			   	addPropertyError:'Pooling Quantity Should be an Integer!'});
		}
		else if( Number.isInteger(Number(this.state.propertyPoolingQty)) == false || 
			Number.isInteger(Number(this.state.propertyMonthnlyPrice)) == false){
			this.setState({
			   	addPropertyError:'Pooling Quantity/Monthly Price Should be an Integer!'});
		}
		else if( Number(this.state.propertyPoolingQty)<0 ){
			this.setState({
			   	addPropertyError:'Pooling Quantity Should not be a Negative!'});
		}
		else if( Number(this.state.propertyMonthnlyPrice)<0 ){
			this.setState({
			   	addPropertyError:'Pooling Quantity Should not be a Negative!'});
		}
		else{
			setTimeout( ()=>{
				this.setState({
			   	addPropertyError:''});
			   	this.props.doChangePropertyAction('avail-property');
			},2500);
			if(this.state.propertyBedroomPooling == false || this.state.propertyPoolingQty == 1 ){
				const passData = {
					propertyName:           this.state.propertyName,
					propertyLocation:       this.state.propertyLocation,
					propertyBedroomPooling: 'false',
					propertyPoolingQty:     '1',
					propertyMonthnlyPrice:  String(Math.ceil(this.state.propertyMonthnlyPrice)),
					propertyFinalPrice:     this.state.propertyFinalPrice,
					propertyDescription:    this.state.propertyDescription,
					propertyFurtherData:    this.state.propertyFurtherData,
					propertyFinalPrice:     String(Math.ceil(this.state.propertyMonthnlyPrice)),
					propertyType:           this.state.propertyType
				};
				this.props.doAddPropertyOwner(passData,this.state.imagePath);
				return;
			}
			else{
				let initFinalPrice = this.state.propertyMonthnlyPrice/this.state.propertyPoolingQty;
				initFinalPrice     = Math.ceil(initFinalPrice);
				const passData = {
					propertyName:           this.state.propertyName,
					propertyLocation:       this.state.propertyLocation,
					propertyBedroomPooling: this.state.propertyBedroomPooling,
					propertyPoolingQty:     this.state.propertyPoolingQty,
					propertyMonthnlyPrice:  String(Math.ceil(this.state.propertyMonthnlyPrice)),
					propertyFinalPrice:     this.state.propertyFinalPrice,
					propertyDescription:    this.state.propertyDescription,
					propertyFurtherData:    this.state.propertyFurtherData,
					propertyFinalPrice:     String(initFinalPrice),
					propertyType:           this.state.propertyType
				};
				this.props.doAddPropertyOwner(passData,this.state.imagePath);
				return;
			}
		}
	}

	propertyError = ()=>{
		if(this.props.addPropertyErrMSG.length!=0){
			return this.props.addPropertyErrMSG;
		}
		else{
			return this.state.addPropertyError;
		}

	}


	render() {
    	return (
    		<View style={addPropertyWrapperStyle.mainWrapper}>
    			<View style={addPropertyWrapperStyle.addPropertyLabel}>
    				<Text 
    					style={{fontSize:15,position:'relative',left:15}}>
    					Create Property Information: </Text>
    			</View>

    			<View style={addPropertyWrapperStyle.nameSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Name: </Text>
    				<TextInput
    					placeholder = "Input property name"
    					maxLength   = {25}
    					style={addPropertyWrapperStyle.propertyNameInputStyle}
    					onChangeText = { (propertyName) => this.setState({propertyName})}/>
    			</View>

    			<View style={addPropertyWrapperStyle.locationSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Address: </Text>
    				<TextInput
    					placeholder = "Input property location"
    					maxLength   = {40}
    					style={addPropertyWrapperStyle.propertyLocationStyle}
    					onChangeText = { (propertyLocation) => this.setState({propertyLocation})}/>
    			</View>

    			<View style={addPropertyWrapperStyle.bedroomSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Apply to Pool: </Text>
    				<CheckBox value={this.state.propertyBedroomPooling} 
    					onChange={this.poolingCheckBox} 
    					style={addPropertyWrapperStyle.propertyPoolingSwitchStyle} />
    				<Text
    					style={{fontSize:15,position:'relative',left:35,paddingTop:5}}>
    					Vacancy: </Text>
    				<TextInput
    					placeholder = "Good for [#]"
    					style={addPropertyWrapperStyle.propertyPoolingInputStyle}
    					onChangeText = { (propertyPoolingQty) => this.setState({propertyPoolingQty})}/>	
    			</View>

    			<View style={addPropertyWrapperStyle.monthlyPriceSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Monthly Price: </Text>
    				<TextInput
    					placeholder = "Price in Ph Peso"
    					style={addPropertyWrapperStyle.propertyMonthlyPriceStyle}
    					onChangeText = { (propertyMonthnlyPrice) => this.setState({propertyMonthnlyPrice})}/>	
    			</View>

    			<View style={addPropertyWrapperStyle.priceSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Final Price: </Text>
					<Text
    					style={{fontSize:15,position:'relative',left:17,paddingTop:5}}>
    					{this.getFinalPrice()} </Text>
    			</View>

    			<View style={addPropertyWrapperStyle.photoSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Upload Photo: </Text>
    				<TouchableWithoutFeedback
    					onPress={()=>this.selectPhoto()}>
	    				<Text style={{
	    						borderRadius:5,
	    						borderWidth:1,
	    						width: 70,
	    						left: 20,
	    						position: 'relative',
	    						height: '100%',
	    						fontSize: 12,
	    						fontWeight: 'bold',
	    						paddingLeft: 10,
	    						paddingTop: 5
	    				}}>
	    					...
	    				</Text>
	    			</TouchableWithoutFeedback>
	    			<Text style={{
	    					width: 130,
	    					position: 'relative',
	    					height: '100%',
	    					left: 23,
	    					fontSize: 14,
	    					fontWeight: 'bold',
	    					paddingTop: 6
	    			}}>
	    				{this.state.imagePath.length == 0 ? 'No selected photo' : 'One photo selected'}
	    			</Text>
    			</View>

    			<View style={addPropertyWrapperStyle.descriptionSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Caption: </Text>
    				<TextInput
    					placeholder = "Place Caption [optional]"
    					maxLength   = {45}
    					style={addPropertyWrapperStyle.propertyDescriptionInputStyle}
    					onChangeText = { (propertyDescription) => this.setState({propertyDescription})}/>
    			</View>

    			<View style={addPropertyWrapperStyle.furtherDataSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Add Info:</Text>
    				<TextInput
    					placeholder = "Further Information"
    					maxLength= {50}
    					style={addPropertyWrapperStyle.propertyFurtherDataInputStyle}
    					onChangeText = { (propertyFurtherData) => this.setState({propertyFurtherData})}/>
    			</View>

    			<View style={addPropertyWrapperStyle.propertyTypeSection}>
    				<Text
    					style={{fontSize:15,position:'relative',left:13,paddingTop:5}}>
    					Property Type:</Text>
    				<View style={{
    						width: 150,
    						left: 25,
    						position: 'relative',
    						height: '100%',
    						borderWidth :2
    				}}>
    					<Picker
	                		selectedValue = {this.state.propertyType}
	                		style={{height:'100%',width:150}}
	                		onValueChange={this.onPropertyTypeChange}>
	                		<Picker.Item label="Boarding House" value="Boarding House"/>
	                		<Picker.Item label="Dormitory" value="Dormitory"/>
	                		<Picker.Item label="Studio Type" value="Studio Type"/>
	                	</Picker>
    				</View>
    			</View>



    			<View style={addPropertyWrapperStyle.errorSection}>
    				<Text
    					style={{fontSize:12,position:'relative',left:16,paddingTop:5}}>
    					{this.propertyError()} </Text>
    			</View>

    			
    			<View style={addPropertyWrapperStyle.confirmSection}>
    				<TouchableHighlight style={addPropertyWrapperStyle.confirmButtonStyle}
    					 onPress={ ()=> this.doAddProperty() }
    					 underlayColor='#fff'>
    					<Text style= {{fontSize:16,fontWeight:'bold',paddingTop:5,paddingLeft:23 }}>
    						Confirm
    					</Text>
    				</TouchableHighlight>	
    			</View>

    		</View>	
    	);
	}
}