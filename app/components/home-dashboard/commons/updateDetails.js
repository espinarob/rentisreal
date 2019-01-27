import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,TextInput, CheckBox} from "react-native";
import {Button} from 'native-base';
import Constants from '../../Constants.js';

const updateDetailsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	updateLabelSection:{
		position: 'relative',
		height: 36,
		top: 5,
    flexDirection: 'row'
	},
	firstNameSection:{
		position: 'relative',
		height: 36,
		top: 7,
    flexDirection: 'row'
	},
	lastNameSection:{
		position: 'relative',
		height: 36,
		top: 9,
    flexDirection: 'row'
	},
	middleNameSection:{
		position: 'relative',
		height: 36,
		top: 11,
    flexDirection: 'row'
	},
	contactNumberSection:{
		position: 'relative',
		height: 36,
		top: 13,
    flexDirection: 'row'
	},
	emailAddSection:{
		position: 'relative',
		height: 36,
		top: 13,
    flexDirection: 'row'
	},
	ageSection:{
		position: 'relative',
		height: 36,
		top: 15,
    flexDirection: 'row'
	},
	civilStatusSection:{
		position: 'relative',
		height: 36,
		top: 17,
    flexDirection: 'row'
	},
	occupationSection:{
		position: 'relative',
		height: 36,
		top: 19,
    flexDirection: 'row'
	},
	genderSection:{
		position: 'relative',
		height: 36,
		top: 21,
    flexDirection: 'row'
	},
  errorSection:{
    position: 'relative',
    height: 36,
    top: 21,
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
		firstName    :'null',
		lastName     :'null',
		middleName   :'null',
		contactNumber:'null',
		email        :'null',
		age          :'null',
		civilStatus  :'null',
		occupation   :'null',
		gender       :true, // true defaults to male
    errorMsg     :''
	}	

  genderChange = () => {
    this.setState({gender:!this.state.gender});
  }


  doUpdate = () => {
    console.log('now changed!!!');
    if( Number.isInteger(Number(this.state.contactNumber)) == false 
        && this.state.contactNumber!='null' ){
      this.setState({errorMsg:'Invalid Contact Number!'});
    }
    else if(this.state.contactNumber == ''){
      this.setState({errorMsg:'Invalid Contact Number!'});
    }
    else{
      this.setState({errorMsg:'Successfully Edited'});
      setTimeout(()=>{
        this.setState({errorMsg:''});
        let toUpdate = {
          firstName    : this.state.firstName,
          lastName     : this.state.lastName,
          middleName   : this.state.middleName,
          contactNumber: this.state.contactNumber,
          email        : this.state.email,
          age          : this.state.age,
          civilStatus  : this.state.civilStatus,
          occupation   : this.state.occupation,
          gender       : this.state.gender
        }
        this.props.doProcessUpdate(toUpdate);
      },3000);

    }

  }

	render() {
    	return (
    		<View style={ updateDetailsWrapperStyle.mainWrapper}>
    			<View style={updateDetailsWrapperStyle.updateLabelSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:170,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	paddingLeft:10,
  						  	left:95,
  						  	fontSize:20}}>
    					Account Update
					  </Text>
              
    			</View>
    			<View style={updateDetailsWrapperStyle.firstNameSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:5}}>
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
  						  	left:5}}>
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
  						  	left:5}}>
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
  						  	left:5}}>
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
  						  	left:5}}>
    					E-mail Address:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (email)=> this.setState({email:email})}/>
    			</View>
    			<View style={updateDetailsWrapperStyle.ageSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:5}}>
    					Age:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (age)=> this.setState({age:age})}/>
    			</View>  
    			<View style={updateDetailsWrapperStyle.civilStatusSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:5}}>
    					Civil Status:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (civilStatus)=> this.setState({civilStatus:civilStatus})}/>
    			</View> 
    			<View style={updateDetailsWrapperStyle.occupationSection}>
    				<Text style={{
  						  	position: 'relative',
  						  	width:100,
  						  	height:'100%',
  						  	paddingTop:5,
  						  	left:5}}>
    					Occupation:
					  </Text>
            <TextInput
              style={updateDetailsWrapperStyle.commonInputElemenStyle}
              onChangeText= { (occupation)=> this.setState({occupation:occupation})}/>
    			</View> 
    			<View style={updateDetailsWrapperStyle.genderSection}>
            <CheckBox style={{
                position:'relative',
                left:110,
                borderWidth:2}}
                value={this.state.gender}
                onChange={ ()=>this.genderChange()}/>

            <Text style={{
                  position: 'relative',
                  width:40,
                  height:'100%',
                  paddingTop:5,
                  left:110 }}>
              Male
            </Text>
            <CheckBox style={{
                position:'relative',
                left:120,
                borderWidth:2}}
                value={!this.state.gender}
                onChange={ ()=>this.genderChange()}/>
            <Text style={{
                  position: 'relative',
                  width:60,
                  height:'100%',
                  paddingTop:5,
                  left:120}}>
              Female
            </Text>
          </View>
          <View style={{
            top:27,
            height:20}}>
            <Text style={{
                  position: 'relative',
                  width:220,
                  height:'100%',
                  left:110,
                  paddingLeft:5}}>
              {this.state.errorMsg }
            </Text>
          </View>
          <View style={{
            top:32,
            height:40}}>
            <Button style={{
                      position: 'relative',
                      left: 130,
                      width: 100,
                      height: '100%',
                      backgroundColor:'#5f7391',
                      borderRadius: 5}}
                    underlayColor='#fff'
                    onPress={ () =>this.doUpdate() }>
              <Text style= {{fontSize:15,fontWeight:'bold',paddingTop:3,paddingLeft: 20}}>
                Confirm
              </Text>
            </Button>
          </View>
    		</View>
    	);
	}
}