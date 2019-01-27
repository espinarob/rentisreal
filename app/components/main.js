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
import SplashScreen from './splashScreen.js';

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
      Accounts                : [],
      myAccountDetails        : [],
      onHandKeyReference      : '',
      myProperty              : [],
      Properties              : [],
      myRequests              : [],
      signUpError             : '',
      loginError              : '',
      addPropertyError        : '', 
      requestPropertyError    : '',
      splashScreen            : 'true',
      haveInternetConnection  : 'false',
      successfullyLogin       : 'false',
      onRegisterCycle         : 'false',
      showRegisterPage        : 'false',
      successRegistration     : 'false',
      loggingOut              : 'false',
      loggingIn               : 'false',
      loadingData             : 'true'
  }

  componentDidMount(){
    this.testInternet();
    this.checkLoginLoad();
    setTimeout(()=>{
      this.setState({splashScreen:'false'});
    },3500);
  }


  testInternet = ()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response =>{
        if(response.json().length!=0){
          const haveInternetConnection = 'true'; 
          this.setState({haveInternetConnection});
        }
      })
      .catch( (error)=>{
          const haveInternetConnection = 'false'; 
          this.setState({haveInternetConnection});
      });
  }


  processLogin = (username,password)=>{
    this.setState({loginError:'Please Wait..'});
    firebase
      .database()
      .ref()
      .child("Accounts")
      .orderByChild("username")
      .equalTo(String(username))
      .once("value",snapshot =>{
        if(snapshot.exists()){
          firebase
            .database()
            .ref()
            .child("Accounts")
            .orderByChild("password")
            .equalTo(String(password))
            .once("value",snapshot =>{
              if(snapshot.exists()){
                data = snapshot.val();
                Object
                  .keys(snapshot.val())
                  .forEach( account =>{
                    currentLoginAccount = JSON.parse(String(JSON.stringify(data[account])));
                    if( String(currentLoginAccount.password) == String(password) 
                        && String(currentLoginAccount.username) == String(username)){
                      this.doSaveLocalData(currentLoginAccount.username,
                        currentLoginAccount.password,account,currentLoginAccount.role).
                        then( (result)=>{
                          if(result==true){
                            this.setState({loggingIn:'true'});
                            setTimeout( ()=>{
                              this.setState({loggingIn:'false'});
                              this.changeLoginFlag(true);
                            },2500);
                            this.firebaseInitialization();
                            this.setState({loginError:''});
                          }
                        }).
                        catch( (error)=>{
                          this.changeLoginFlag(false);
                        });
                      return;
                    }
                  });
              }
              else{
                console.log('Incorrect Password!');
                this.changeLoginFlag(false);
              }
            });
        }
        else{
          this.setState({loginError:'Incorrect Username/Password'});
          console.log('Incorrect Username!');
          this.changeLoginFlag(false);
        }
    })
    .catch( (error)=>{
      this.setState({loginError:'Error connecting to the internet'});
      console.log('Error Login Firebase!');
      this.changeLoginFlag(false);
    });
  }

  doSaveLocalData = async(username,password,apikey,role)=>{
    await AsyncStorage.setItem(Constants.API_KEY,String(apikey));
    await AsyncStorage.setItem(Constants.USER_NAME_KEY,String(password));
    await AsyncStorage.setItem(Constants.PASS_WORD_KEY,String(username));
    await AsyncStorage.setItem(Constants.ACCOUNT_ROLE,String(role));
    this.setState({onHandKeyReference:String(apikey)});
    return true;
  }


  processSignup = async (currentAccount)=>{
    firebase
      .database()
      .ref()
      .child("Accounts")
      .orderByChild("username")
      .equalTo(String(currentAccount.username))
      .once("value",snapshot =>{
        if(snapshot.exists()){
          this.setState({signUpError:'Useraname is already taken!'});
        }
        else{
          firebase
            .database()
            .ref()
            .child("Accounts")
            .orderByChild("email")
            .equalTo(String(currentAccount.email))
            .once("value",snapshot =>{
              if(snapshot.exists()){
                this.setState({signUpError:'Email is already taken!'});
              }
              else{
                this.accountRegistration(currentAccount);
              }
            })
            .catch( (error)=>{
              this.setState({signUpError:'Error connecting to Internet..'});
            });
        }
    })
    .then( ()=>{
      console.log('Completing Registration...');
    })
    .catch( (error)=>{
      this.setState({signUpError:'Error connecting to Internet..'});
      console.log('Error Signup Firebase!');
    });
  }


  firebaseInitialization = async() =>{
    try{
      console.log('Entering...');
      await firebase
        .database()
      	.ref()
      	.child("Accounts")
      	.on("value", snapshot => { 
       		const data = snapshot.val();
          if(data){
    	 		  const initAccounts    = [];
            const finalProperties = []; 
            const finalRequests   = [];
            const initMyProperty  = [];
            const initMyRequests  = [];
            let initMyAccount     = [];
            let index             = 0;
           	Object
          		.keys(data)
            	.forEach(account => {
                initAccounts.push(JSON.parse(String(JSON.stringify(data[account]))));
                if(String(this.state.onHandKeyReference) == String(account)){
                  initMyAccount = JSON.parse(String(JSON.stringify(data[account])));
                }

                if(initAccounts[index].property){
                  currentAccountProperty       = JSON.parse(JSON.stringify(initAccounts[index].property));
                  Object
                    .keys(currentAccountProperty)
                    .forEach((propertyKey)=>{
                      finalProperties.push(currentAccountProperty[propertyKey]);
                      if(String(account) == String(this.state.onHandKeyReference)){
                        initMyProperty.push(currentAccountProperty[propertyKey]);
                      }
                    });
                  
                }
                else if(initAccounts[index].requests){
                  if( String(account) == String(this.state.onHandKeyReference)){
                    currentAccountRequests      = JSON.parse(JSON.stringify(initAccounts[index].requests));
                    Object
                      .keys(currentAccountRequests)
                      .forEach( (requestKey)=>{
                        initMyRequests.push(currentAccountRequests[requestKey]);
                      });
                  }
                }
                index++;
              });
            this.setState({
              Accounts: initAccounts,
              myAccountDetails:initMyAccount, 
              Properties: finalProperties,
              myProperty: initMyProperty,
              myRequests: initMyRequests

            });
            console.log('Success Firebase...');
          }
          const haveInternetConnection = 'true'; 
          this.setState({haveInternetConnection});
          this.setState({loadingData:'false'});

        });
    }
    catch(error){
      console.log('Failed Firebase Database..');
    }

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
        "gender"       : 'null'
      }
      finalData = JSON.stringify(finalData);
      finalData = JSON.parse(finalData);

      newAccount.update(finalData)
        .then(()=>{
          setTimeout( ()=> {
            this.setState({onRegisterCycle:'false'
              ,successRegistration:'true'});
            this.changeRegisterFlag(false);
            this.setState({signUpError:''}); 
          },2000);
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
    this.setState({addPropertyError: 'Successfully Added! Please Wait..Don\'t Close the tab yet!'});
    if(propertyData.propertyBedroomPooling){
      propertyData.propertyBedroomPooling = 'true';
    }
    else{
      propertyData.propertyBedroomPooling = 'false';
    }
    let apiKey        = await AsyncStorage.getItem(Constants.API_KEY);
    const keyAccount = firebase
                        .database()
                        .ref("Accounts/"+String(apiKey)+"/property")
                        .push();
    newProperty  = {
      "propertyID":             keyAccount.key,
      "Account":                apiKey,
      "propertyName":           propertyData.propertyName,
      "propertyLocation":       propertyData.propertyLocation,
      "propertyBedroomPooling": propertyData.propertyBedroomPooling,
      "propertyPoolingQty":     propertyData.propertyPoolingQty,
      "propertyMonthlyPrice":   propertyData.propertyMonthnlyPrice,
      "propertyFinalPrice":     propertyData.propertyFinalPrice,
      "propertyDescription":    propertyData.propertyDescription,
      "propertyFurtherData":    propertyData.propertyFurtherData,
      "propertyVacant":         propertyData.propertyPoolingQty,
      "date": firebase.database.ServerValue.TIMESTAMP
    }

    newProperty = await JSON.parse(String(JSON.stringify(newProperty)));
    keyAccount.update(newProperty)
    .then( ()=>{
      this.setState({addPropertyError: ''});
    })
    .catch( (error)=>{
      this.setState({addPropertyError: 'Check your internet connection!'});
    });
  }

  deletOneProperty = (propertyKey,accountKey)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/property/"+String(propertyKey))
      .remove()
      .then((res)=>console.log('removed!'))
      .catch((error)=>{
        console.log('Error in deleting, check your internet connection!');
      });
  }

  updateOneProperty =  (data,propertyKey,accountKey)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/property/"+String(propertyKey))
      .update(data)
      .then((res)=>console.log('updated'))
      .catch((error)=>{
        console.log('Error in updating, check your internet connection!');
      });
  }

  deleteARequestProperty = (ownerKey,propertyKey,ownerRequestKey,tenantKey,tenantRequestKey)=>{
   
    firebase
      .database()
      .ref("Accounts/"+String(ownerKey)+"/property/"+String(propertyKey)+"/requests/"+String(ownerRequestKey))
      .remove()
      .then(()=>{
        console.log('Owner request list edited!');
        firebase
          .database()
          .ref("Accounts/"+String(tenantKey)+"/requests/"+String(tenantRequestKey))
          .remove()
          .then(()=>{
            console.log('Tenant request removed!');
          })
          .catch( (error)=>{
            console.log('Error in cancelling request!');
          })
      })
      .catch( (error)=>{
        console.log('Error in deleting owner request lists!');
      });
    

  }
  requestAProperty = async(data,accountKey,propertyKey)=>{

    console.log('Adding Property!');
    this.setState({requestPropertyError:'Loading..Please Wait..'});
    const dataKey = firebase
                      .database()
                      .ref("Accounts/"+String(accountKey)+"/property/"+String(propertyKey)+"/requests")
                      .push();

    let newRequest = {
      "Account": String(accountKey),
      "propertyID": String(propertyKey),
      "tenantID": String(this.state.onHandKeyReference),
      "requestID": String(dataKey.key), 
      "firstName": String(this.state.myAccountDetails.firstName),
      "lastName": String(this.state.myAccountDetails.lastName),
      "age": String(this.state.myAccountDetails.age),
      "contactNumber":String(this.state.myAccountDetails.contactNumber),
      "email":String(this.state.myAccountDetails.email)
    }
    newRequest = await JSON.parse(String(JSON.stringify(newRequest)));
    dataKey.update(newRequest)
    .then( ()=>{
      this.setState({requestPropertyError:'Successfully Requested!Please Wait..'});
      setTimeout(()=>{
        this.setState({requestPropertyError:''});
        this.processTenantRequest(data,accountKey,propertyKey,dataKey.key);
      },2500);  
    })  
    .catch( (error)=>{
      console.log('Error Requests!');
    });
  }

  processTenantRequest = async(data,accountKey,propertyKey,ownerRequestID)=>{
    const dataKey = firebase
                      .database()
                      .ref("Accounts/"+String(this.state.onHandKeyReference)+"/requests/"+String(ownerRequestID));
    let myRequest = {
      "Account": String(this.state.onHandKeyReference),
      "propertyOwnerKey": String(accountKey),
      "propertyID": String(propertyKey),
      "ownerRequestID": String(ownerRequestID),
      "myRequestID": String(dataKey.key),
      "requestStatus": Constants.STATUS.PENDING,
      "propertyName":       data.propertyName,
      "propertyLocation":   data.propertyLocation,
      "propertyFinalPrice": data.propertyFinalPrice,
      "propertyPoolingQty": data.propertyPoolingQty  
    }

    myRequest = await JSON.parse(String(JSON.stringify(myRequest)));
    dataKey.update(myRequest)
    .then( ()=>{
      console.log('Done tenant request!')
    })
    .catch( (error)=>{
      console.log('Error tenant requests!');
    });
  }

  verifyAccountsExist = () =>{
    if(this.state.Accounts.length!=0){
      return this.state.Accounts;
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
      let apikeyLocal = await AsyncStorage.getItem(Constants.API_KEY);

      if(!(String(usernameLocal) == 'null' || String(passwordLocal) == 'null')){
        this.setState({onHandKeyReference:apikeyLocal});
        let successfullyLogin = 'true';
        this.setState({successfullyLogin});
        this.firebaseInitialization();
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
    if(this.state.splashScreen == 'true'){
      return <SplashScreen/>
    }
    else if(this.state.loggingIn == 'true'){
      return <LoadingScreen ConsoleMessage= {Constants.CONSOLE_MESSAGES.LOGGING_IN}/>
    }
    else if(this.state.loggingOut == 'true'){
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
              doProcessRegistration = {this.processSignup}
              errorMsg = {this.state.signUpError}
              doChangeRegisterFlag= {this.changeRegisterFlag}/>
              
    }
    else if(this.state.successfullyLogin == 'true'){
      return <HomeTemplate
              Properties={this.state.Properties}
              doChangeLoginFlag={this.changeLoginFlag}
              doChangeLogoutFlag={this.changeLoggingOutFlag}
              doProcessUpdate={this.accountUpdate}
              doAddPropertyOwner= {this.addProperty}
              doesDataLoad      = {this.state.loadingData}
              doViewMyProperty  = {this.state.myProperty}
              doGetMyAccount    = {this.state.myAccountDetails}
              doDeleteProperty  = {this.deletOneProperty}
              doUpdateProperty  = {this.updateOneProperty}
              doSendARequest    = {this.requestAProperty}
              doViewMyRequests  = {this.state.myRequests}
              doDeleteARequest  = {this.deleteARequestProperty}
              addPropertyErrMSG = {this.state.addPropertyError}
              requestPropertyMSG = {this.state.requestPropertyError}/>
    }
    else{
      return <LoginComponent
              doProcessLogin      = {this.processLogin}
              doChangeRegisterFlag={this.changeRegisterFlag}
              errorMessage        ={this.state.loginError}/>
              
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
