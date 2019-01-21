import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, NetInfo} from 'react-native';
import { Container} from 'native-base';
import Constants from './Constants.js';
import FontAwesome, { Icons } from "react-native-fontawesome";
import LoginComponent from './login/loginComponent.js';
import SignUpComponent from './sign-up/signupComponent.js';
import HomeTemplate from './home-dashboard/commons/homeTemplate.js';
import LoadingScreen from './loadingScreen.js';
import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAuDuWoZ_KhzLqr0jDK4SNZ-ZgGNoPS41c",
	authDomain: "rentisreal-d9762.firebaseapp.com",
	databaseURL: "https://rentisreal-d9762.firebaseio.com",
	projectId: "rentisreal-d9762",
	storageBucket: "rentisreal-d9762.appspot.com",
	messagingSenderId: "428728662478"
};
firebase.initializeApp(config);

export default class MainComponent extends Component {

  state = {
      AccountIndex: -1,
      Accounts: [],
      IDs: [],
      haveInternetConnection: 'false',
      successfullyLogin: 'false',
      onRegisterCycle: 'false',
      showRegisterPage: 'false',
      successRegistration: 'false',
      loggingOut         : 'false'
  }

  componentDidMount(){
    this.firebaseInitialization();
    this.checkLoginLoad();
  }

  firebaseInitialization = () =>{
   firebase
    .database()
  	.ref()
  	.child("Accounts")
  	.on("value", snapshot => { 
   		const data = snapshot.val();
      if(data){
	 		  const initAccounts  = [];
        const finalKeys     = []; 
        let index           = 0;
       	Object
      		.keys(data)
        	.forEach(account => {
            if(account != 'property') initAccounts.push(JSON.parse(String(JSON.stringify(data[account]))));
            finalKeys.push(String(account));
            index++;
          });
        this.setState({
          Accounts: initAccounts,
          IDs: finalKeys
        });
        console.log('Success Firebase...');
      }
      const haveInternetConnection = 'true'; 
      this.setState({haveInternetConnection});
    });

  }

  accountRegistration = (currentAccount) =>{
    if(currentAccount){
      let onRegisterCycle = 'true';
      let processFlag     = false;
      this.setState({onRegisterCycle});
      const newAccount    = firebase
                              .database()
                              .ref()
                              .child("Accounts")
                              .push();
      if(currentAccount.role) currentAccount.role = 'tenant';
      else currentAccount.role = 'owner';
      finalData = {
        "username"      : currentAccount.username,
        "password"      : currentAccount.password,
        "role"          : currentAccount.role,
        "email"         : currentAccount.email,
        "firstName"     : 'null',
        "lastName"      : 'null',
        "middleName"    : 'null',
        "contactNumber" : 'null',
        "age"           : 'null',
        "civilStatus"   : 'null',
        "occupation"    : 'null',
        "gender "       : 'null',
        "requests"      :  '[]',
        "property"      :  '[]'
      }
      finalData = JSON.stringify(finalData);
      finalData = JSON.parse(finalData);

      newAccount.update(finalData)
        .then(()=>{
          setTimeout( ()=> this.setState({onRegisterCycle:'false'
                            ,successRegistration:'true'}) ,2000);
        })
        .catch( (error) =>{
          console.log(error);
        });
      
    }
    else return;
  }

  accountUpdate = (updateDetails)=>{
    console.log('Updating...');
    let finalGender  = '';
    if(updateDetails.gender == true){
      finalGender = 'male';
    }
    else{
      finalGender = 'female';
    }
    
    AsyncStorage.getItem(Constants.API_KEY)
      .then((res)=>{
        const currentDetails = updateDetails;
        const keyAccount = firebase
                            .database()
                            .ref("Accounts/"+String(res));  
        keyAccount.update({
          firstName    : currentDetails.firstName,
          lastName     : currentDetails.lastName,
          middleName   : currentDetails.middleName,
          contactNumber: currentDetails.contactNumber,
          email        : currentDetails.email,
          age          : currentDetails.age,
          civilStatus  : currentDetails.civilStatus,
          occupation   : currentDetails.occupation,
          gender       : finalGender
        })
        .then( ()=>console.log('Successfully Updated!'))
        .catch( (error)=>{
          console.log('Error connecting update with firebase!');
        });  
      }).catch( (error) =>{
        console.log('Failed Update!');
        console.log(error);
      }); 
      
  }

  
  addProperty = async(propertyData)=>{
    console.log('Adding Property!');
    if(propertyData.propertyBedroomPooling){
      propertyData.propertyBedroomPooling = 'true';
    }
    else{
      propertyData.propertyBedroomPooling = 'false';
    }
    let apiKey        = await AsyncStorage.getItem(Constants.API_KEY);
    let accIndex      = await AsyncStorage.getItem(Constants.ACCOUNT_INDEX); 
    let finalProperty = [];
    const keyAccount = firebase
                        .database()
                        .ref("Accounts/"+String(apiKey)); 

    
        
         
    finalProperty = this.state.Accounts[accIndex].property;
    //finalProperty.push(JSON.stringify(propertyData)); 
    console.log(finalProperty);
        /*  
    keyAccount.update({
      property: finalProperty
    }) */

  }

  verifyAccountsExist = () =>{
    if(this.state.Accounts.length!=0){
      return this.state.Accounts;
    }
    else return [];
  }

  verifyKeysExist = ()=>{
    if(this.state.IDs.length!=0){
      return this.state.IDs;
    }
    else return [];
  }

  changeLoginFlag = (success) =>{
    if(success===true){
      let successfullyLogin = 'true';
      this.setState({successfullyLogin});
    }
    else{
      let successfullyLogin = 'false';
      this.setState({successfullyLogin});
    }
  }

  changeRegisterFlag = (flag) =>{
    if(flag===true){
      let showRegisterPage = 'true';
      this.setState({showRegisterPage});
    }
    else if(flag===false){
      let showRegisterPage = 'false';
      this.setState({showRegisterPage});
    }
  }

  checkLoginLoad = async () =>{
    try{
      let usernameLocal = await AsyncStorage.getItem(Constants.USER_NAME_KEY);
      let passwordLocal = await AsyncStorage.getItem(Constants.PASS_WORD_KEY);

      if(!(String(usernameLocal) == 'null' || String(passwordLocal) == 'null')){
        let successfullyLogin = 'true';
        this.setState({successfullyLogin});
      }
    }
    catch(error){
      console.log('Failed to load data');
    }
  }

  changeLoggingOutFlag  = (ongoing)=>{
    if(ongoing == true){
      this.setState({loggingOut:'true'});
    }
    else{
      this.setState({loggingOut:'false'});
    }
  }


  mainViewDisplay = () =>{
    if(this.state.loggingOut == 'true'){
      return <LoadingScreen ConsoleMessage= {Constants.CONSOLE_MESSAGES.LOGGING_OUT}/>
    }
    else if(this.state.haveInternetConnection == 'false'){
      return <LoadingScreen ConsoleMessage= {Constants.CONSOLE_MESSAGES.NO_INTERNET}/>
    }
    else if(this.state.onRegisterCycle == 'true'){
      return <LoadingScreen ConsoleMessage= {Constants.CONSOLE_MESSAGES.ON_REGISTER_CYCLE}/>
    }
    else if(this.state.showRegisterPage == 'true'){
      return <SignUpComponent 
              Accounts={this.verifyAccountsExist()}
              doChangeRegisterFlag={this.changeRegisterFlag}
              doProcessRegistration={this.accountRegistration}/>
              
    }
    else if(this.state.successfullyLogin == 'true'){
      return <HomeTemplate  
              IDs={this.verifyKeysExist()} 
              Accounts={this.verifyAccountsExist()} 
              doChangeLoginFlag={this.changeLoginFlag}
              doChangeLogoutFlag={this.changeLoggingOutFlag}
              doProcessUpdate={this.accountUpdate}
              doAddPropertyOwner= {this.addProperty}/>
    }
    else{
      return <LoginComponent 
              Accounts={this.verifyAccountsExist()}
              IDs={this.verifyKeysExist()} 
              doChangeLoginFlag={this.changeLoginFlag}
              doChangeRegisterFlag={this.changeRegisterFlag}/>
    }
  }


  render() {
    return (
      <React.Fragment>
        {this.mainViewDisplay()}
      </React.Fragment>

    );
  }


}
