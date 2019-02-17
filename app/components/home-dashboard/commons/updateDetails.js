import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,TextInput, CheckBox,TouchableWithoutFeedback, Picker} from "react-native";
import {Button,Icon} from 'native-base';
import Constants from '../../Constants.js';

const updateDetailsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	updateLabelSection:{
		position: 'relative',
		height: 41,
    flexDirection: 'row',
    backgroundColor: '#6785db'
	}, 
	firstNameSection:{
		position: 'relative',
		height: 36,
		top: 20,
    flexDirection: 'row'
	},
	lastNameSection:{
		position: 'relative',
		height: 36,
		top: 23,
    flexDirection: 'row'
	},
	middleNameSection:{
		position: 'relative',
		height: 36,
		top: 26,
    flexDirection: 'row'
	},
	contactNumberSection:{
		position: 'relative',
		height: 36,
		top: 29,
    flexDirection: 'row'
	},
	emailAddSection:{
		position: 'relative',
		height: 36,
		top: 32,
    flexDirection: 'row'
	},
	birthdaySection:{
		position: 'relative',
		height: 36,
		top: 35,
    flexDirection: 'row'
	},
	civilStatusSection:{
		position: 'relative',
		height: 36,
		top: 38,
    flexDirection: 'row'
	},
	occupationSection:{
		position: 'relative',
		height: 36,
		top: 41,
    flexDirection: 'row'
	},
  commonInputElemenStyle:{
    width: 160,
    height: '100%',
    left: 35,
    alignItems: 'stretch',
    padding: 0,
    position: 'relative',
    borderRadius: 5,
    fontSize: 12,
    borderWidth:1
  }

});

export default class updateDetailsWrapperStyleails extends Component{
	state = {
		firstName    : 'null',
		lastName     : 'null',
		middleName   : 'null',
		contactNumber: 'null',
		email        : 'null',
		civilStatus  : 'Single',
		occupation   : 'null',
		gender       : true, // true defaults to male
    userBirthday : '',
    errorMsg     : ''
	}	

  genderChange = () => {
    this.setState({gender:!this.state.gender});
  }


  doUpdate = () => {
    let toUpdate     = {};
    let toChangeFlag = false;
    let getAge       = this.validateBirthday();
    if( Number.isInteger(Number(this.state.contactNumber)) == false 
        && this.state.contactNumber!='null' ){
      this.setState({errorMsg:'Invalid Contact Number!'});
      return;
    }
    else if(this.state.contactNumber == ''){
      this.setState({errorMsg:'Invalid Contact Number!'});
      return;
    }
    else if( getAge == false ){
      this.setState({errorMsg:'Please fill in your birthday as indicated!'});
      return;
    } 

    if(this.state.firstName!='null'){
      toUpdate['firstName'] = this.state.firstName;
    }
    if(this.state.lastName!='null'){
      toUpdate['lastName'] = this.state.lastName;
    }
    if(this.state.middleName!='null'){
      toUpdate['middleName'] = this.state.middleName;
    }
    if( getAge!=false && getAge!=true){
      toUpdate['birthdate'] = this.state.userBirthday;
      toUpdate['age']       = getAge;
    }
    if(this.state.contactNumber!='null'){
      toUpdate['contactNumber'] = this.state.contactNumber;
    }
    if(this.state.email!='null'){
      toUpdate['email'] = this.state.email;
    }
    if(this.state.civilStatus!='null'){
      toUpdate['civilStatus'] = this.state.civilStatus;
    }
    if(this.state.occupation!='null'){
      toUpdate['occupation'] = this.state.occupation;
    }
    toChangeFlag = true;
    if(toChangeFlag == true){
      this.setState({errorMsg:'Submitting now,Please wait...'});
      setTimeout(()=>{
        this.setState({errorMsg:''});
        this.props.doProcessUpdate(JSON.parse(JSON.stringify(toUpdate)));
      },2000);
      setTimeout(()=>{
        this.props.doGetBack();
      },3000);
    }

  }

  onCivilStatusChange = (itemValue,itemIndex)=>{
    this.setState({civilStatus:itemValue});
  }

  validateBirthday = ()=>{
    let currentBirthday = this.state.userBirthday;
    let today           = new Date();
    if(currentBirthday == '')return true;

    if(currentBirthday.length<10){
      console.log('length');
      return false;
    }
    let birthMonth      = currentBirthday[0] + currentBirthday[1];
    let day       = currentBirthday[3] + currentBirthday[4];
    let year            = currentBirthday[6] + currentBirthday[7] + currentBirthday[8] + currentBirthday[9];
    
    if( Number.isInteger(Number(birthMonth)) == false ||
      Number.isInteger(Number(day))        == false ||
      Number.isInteger(Number(year))       == false ){
      return false;
    }
    else if( Number(birthMonth)<=0 || Number(birthMonth)>12){
      return false;
    }
    else if( Number(day)<=0 || Number(day)>31){
      return false;
    }
    else if( Number(year) > Number(today.getFullYear()) ){
      return false;
    }
    else{
      return Number(today.getFullYear()) - Number(year);
    }
  }



	render() {
    	return (
    		<View style={ updateDetailsWrapperStyle.mainWrapper}>
    			<View style={updateDetailsWrapperStyle.updateLabelSection}>
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
                  left:63,
                  height: '100%',
                  width: 150,
                  fontSize:20,
                  paddingTop:7
                }}>
                  Account Update
                </Text>
    			</View>
    			<View style={updateDetailsWrapperStyle.firstNameSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					First Name:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (firstName)=> this.setState({firstName:firstName})}/>

    			</View> 
    			<View style={updateDetailsWrapperStyle.lastNameSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Last Name:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (lastName)=> this.setState({lastName:lastName})}/>
    			</View>
    			<View style={updateDetailsWrapperStyle.middleNameSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Middle Name:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (middleName)=> this.setState({middleName:middleName})}/>
    			</View> 
    			<View style={updateDetailsWrapperStyle.contactNumberSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Contact #:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (contactNumber)=> this.setState({contactNumber:contactNumber})}/>
    			</View> 
    			<View style={updateDetailsWrapperStyle.emailAddSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					E-mail Address:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (email)=> this.setState({email:email})}/>
    			</View>
    			<View style={updateDetailsWrapperStyle.birthdaySection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Birthday
					  </Text>
            <TextInput
              placeholder="mm/dd/yyyy"
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (userBirthday)=> this.setState({userBirthday:userBirthday})}/>
    			</View>  
    			<View style={updateDetailsWrapperStyle.civilStatusSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Civil Status:
					  </Text>
            <View style={{
                    position: 'relative',
                    height: '100%',
                    width: 140,
                    left: 35,
                    borderWidth: 2
            }}>
              <Picker
                selectedValue = {this.state.civilStatus}
                style={{height:'100%',width:140}}
                onValueChange = {this.onCivilStatusChange}>
                <Picker.Item label="Single" value="Single"/>
                <Picker.Item label="Married" value="Married"/>
                <Picker.Item label="Widowed" value="Widowed"/>
              </Picker>
            </View>
    			</View> 
    			<View style={updateDetailsWrapperStyle.occupationSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:15}}>
    					Occupation:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (occupation)=> this.setState({occupation:occupation})}/>
    			</View> 
          <View style={{
            top:45 ,
            height:40}}>
            <Text style={{
                  position: 'relative',
                  width:180,
                  height:'100%',
                  left:85,
                  paddingLeft:5}}>
              {this.state.errorMsg }
            </Text>
          </View>
          <View style={{
            top:50,
            height:40}}>
            <TouchableWithoutFeedback
                    onPress={ () =>this.doUpdate() }>
              <Text style= {{
                      fontSize:16,
                      fontWeight:'bold',
                      paddingTop:8,
                      paddingLeft: 20,
                      position: 'relative',
                      left: 130,
                      width: 100,
                      height: '100%',
                      borderColor: '#5ce24a',
                      borderWidth:3
                      }}>
                Confirm
              </Text>
            </TouchableWithoutFeedback>
          </View>
    		</View>
    	);
	}
}