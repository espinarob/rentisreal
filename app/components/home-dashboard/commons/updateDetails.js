import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,TextInput, CheckBox,TouchableWithoutFeedback} from "react-native";
import {Button} from 'native-base';
import Constants from '../../Constants.js';

const updateDetailsWrapperStyle = StyleSheet.create({
	mainWrapper: {
		flex: 1
	},
	updateLabelSection:{
		position: 'relative',
		height: 42,
    flexDirection: 'row',
    backgroundColor: '#6785db'
	},
	firstNameSection:{
		position: 'relative',
		height: 36,
		top: 10,
    flexDirection: 'row'
	},
	lastNameSection:{
		position: 'relative',
		height: 36,
		top: 12,
    flexDirection: 'row'
	},
	middleNameSection:{
		position: 'relative',
		height: 36,
		top: 14,
    flexDirection: 'row'
	},
	contactNumberSection:{
		position: 'relative',
		height: 36,
		top: 16,
    flexDirection: 'row'
	},
	emailAddSection:{
		position: 'relative',
		height: 36,
		top: 18,
    flexDirection: 'row'
	},
	ageSection:{
		position: 'relative',
		height: 36,
		top: 20,
    flexDirection: 'row'
	},
	civilStatusSection:{
		position: 'relative',
		height: 36,
		top: 22,
    flexDirection: 'row'
	},
	occupationSection:{
		position: 'relative',
		height: 36,
		top: 24,
    flexDirection: 'row'
	},
	genderSection:{
		position: 'relative',
		height: 36,
		top: 26,
    flexDirection: 'row'
	},
  errorSection:{
    position: 'relative',
    height: 36,
    top: 28,
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
    let toUpdate  = {};
    let toChangeFlag = false;
    if( Number.isInteger(Number(this.state.contactNumber)) == false 
        && this.state.contactNumber!='null' ){
      this.setState({errorMsg:'Invalid Contact Number!'});
      return;
    }
    else if(this.state.contactNumber == ''){
      this.setState({errorMsg:'Invalid Contact Number!'});
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
    if(this.state.age!='null'){
      toUpdate['age'] = this.state.age;
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
    if(this.state.gender == true){
      toUpdate['gender'] = 'male';
    }
    else{
      toUpdate['gender'] = 'female';
    }

    
    toChangeFlag = true;
    if(toChangeFlag == true){
      this.setState({errorMsg:'Submitting now,Please wait...'});
      setTimeout(()=>{
        this.setState({errorMsg:''});
        this.props.doProcessUpdate(JSON.parse(JSON.stringify(toUpdate)));
      },2000);
    }
  }

	render() {
    	return (
    		<View style={ updateDetailsWrapperStyle.mainWrapper}>
    			<View style={updateDetailsWrapperStyle.updateLabelSection}>
    				<Text style={{
                    position: 'relative',
                    left:95,
                    height: '100%',
                    width: 200,
                    fontSize:20,
                    paddingTop:10
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