import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, NetInfo,Alert} from 'react-native';
import { Container} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import Constants from './Constants.js';
import LoginComponent from './login/loginComponent.js';
import SignUpComponent from './sign-up/signupComponent.js';
import HomeTemplate from './home-dashboard/commons/homeTemplate.js';
import Base64       from './home-dashboard/commons/Base64.js';
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


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class MainComponent extends Component {

  state = {
      Accounts                : [],
      myAccountDetails        : [],
      onHandKeyReference      : '',
      myProperty              : [],
      Properties              : [],
      myRequests              : [],
      myTransactions          : [],
      myNotifications         : [],
      myMails                 : [],
      myRentals               : [],
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
      loadingData             : 'true',
      notificationAlertFlag   : 'false',
      mailingAlertFlag        : 'false',
      getAdminDetails         : []
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
          console.log('Success Internet Connection');
          this.setState({haveInternetConnection: 'true'});
        }
      })
      .catch( (error)=>{
        console.log('Failed to Connect');
        this.setState({haveInternetConnection: 'false'});
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
                            return;
                          }
                        }).
                        catch( (error)=>{
                          this.setState({loginError:'An error occured..Try Again'});
                          this.changeLoginFlag(false);
                          return;
                        });
                      return;
                    }
                    else{
                      this.setState({loginError:'Incorrect Username/Password'});
                      this.changeLoginFlag(false);
                    }
                  });
              }
              else{
                this.setState({loginError:'Incorrect Username/Password'});
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
    	 		  const initAccounts        = [];
            const finalProperties     = []; 
            const finalRequests       = [];
            const initMyProperty      = [];
            const initMyRequests      = [];
            const initMyTransactions  = [];
            const initMyNotifications = [];
            const initMyMails         = [];
            const initMyRentals       = [];
            let initMyAccount         = [];
            let index                 = 0;
            let adminDetails = [];
           	Object
          		.keys(data)
            	.forEach(account => {
                initAccounts.push(JSON.parse(String(JSON.stringify(data[account]))));


                if(String(this.state.onHandKeyReference) == String(account)){
                  initMyAccount = JSON.parse(String(JSON.stringify(data[account])));
                }

                if(initAccounts[index].role == 'admin'){
                  adminDetails['bank']  = initAccounts[index].bank;
                  adminDetails['email'] = initAccounts[index].email;
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

                if(initAccounts[index].transactions){
                  if(String(account) == String(this.state.onHandKeyReference)){
                    currentAccountTransaction = JSON.parse(JSON.stringify(initAccounts[index].transactions));
                    Object
                      .keys(currentAccountTransaction)
                      .forEach( (transactionKey)=>{
                        initMyTransactions.push(currentAccountTransaction[transactionKey]);
                      });
                  }
                }

                if(initAccounts[index].notifications){
                  if(String(account) == String(this.state.onHandKeyReference)){
                    currentNotification = JSON.parse(JSON.stringify(initAccounts[index].notifications));
                    Object
                      .keys(currentNotification)
                      .forEach( (notificationKey)=>{
                        if(currentNotification[notificationKey].notifStatus 
                            == Constants.NOTIFICATION_STATUS.UNREAD ){
                          this.setState({notificationAlertFlag:'true'});
                        }
                        else;
                        initMyNotifications.push(currentNotification[notificationKey]);
                      });
                  }
                }

                if(initAccounts[index].mails){
                  if(String(account) == String(this.state.onHandKeyReference)){
                    currentMails = JSON.parse(JSON.stringify(initAccounts[index].mails));
                    Object
                      .keys(currentMails)
                      .forEach( (mailKey)=>{
                        if(currentMails[mailKey].mailStatus == Constants.MAIL_STATUS.UNREAD){
                          this.setState({mailingAlertFlag:'true'});
                        }
                        initMyMails.push(currentMails[mailKey]);
                      });
                  }
                }

                if(initAccounts[index].rentals){
                  if(String(account) == String(this.state.onHandKeyReference)){
                    currentRentals = JSON.parse(JSON.stringify(initAccounts[index].rentals));
                    Object
                      .keys(currentRentals)
                      .forEach( (rentalKey)=>{
                        initMyRentals.push(currentRentals[rentalKey]);
                      });
                  }
                }

                index++;
              });
            this.setState({
              Accounts         : initAccounts,
              myAccountDetails : initMyAccount, 
              Properties       : finalProperties,
              myProperty       : initMyProperty,
              myRequests       : initMyRequests,
              myTransactions   : initMyTransactions,
              myNotifications  : initMyNotifications,
              myMails          : initMyMails,
              myRentals        : initMyRentals,
              getAdminDetails  : adminDetails
            });
            console.log('Success Firebase...');
          }
          //const haveInternetConnection = 'true'; 
          //this.setState({haveInternetConnection});
          this.setState({loadingData:'false'});

        });
    }
    catch(error){
      console.log('Failed Firebase Database..');
    }

  }

  accountRegistration = (currentAccount) =>{
    if(currentAccount){
      let today = new Date();
      let notifDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
      let onRegisterCycle = 'true';
      let processFlag     = false;
      this.setState({onRegisterCycle});
      const newAccount    = firebase
                              .database()
                              .ref("Accounts")
                              .push();
      if(currentAccount.role) currentAccount.role = 'tenant';
      else currentAccount.role = 'owner';
      finalData = {
        "username"      : currentAccount.username,
        "password"      : currentAccount.password,
        "role"          : currentAccount.role,
        "email"         : currentAccount.email,
        "firstName"     : currentAccount.firstName,
        "lastName"      : currentAccount.lastName,
        "middleName"    : 'null',
        "contactNumber" : 'null',
        "age"           : currentAccount.age,
        "civilStatus"   : 'null',
        "occupation"    : 'null',
        "gender"        : currentAccount.gender,
        "paid"          : currentAccount.role == 'owner' ? 'free' : 'tenant',
        "expiration"    : currentAccount.role == 'owner' ? 'free' : 'tenant',
        "max_post"      : currentAccount.role == 'owner' ? '4'    : 'tenant',
        "birthdate"     : currentAccount.birthday
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
        .then(()=>{
          const pushNotifKey =  firebase
                                  .database()
                                  .ref("Accounts/"+String(newAccount.key)+"/notifications")
                                  .push();
          let notificationMessage = 'Welcome user, you may proceed in updating your account details. ';
          if(currentAccount.role == 'owner')notificationMessage+='Please avail for account Subscription';
          pushNotifKey.update({notifID:pushNotifKey.key, 
          message:notificationMessage,
          notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
          date:notifDate})
          .then(()=>{
            console.log('Success sending user a notification for register reminder');
          })
          .catch((error)=>{
            console.log('Failed sending user a notification for register reminder');
          });

        })
        .catch( (error) =>{
          console.log(error);
        });
      
    }
    else return;
  }

  accountUpdate = (updateDetails)=>{
    console.log('Updating...');
    AsyncStorage.getItem(Constants.API_KEY)
      .then((res)=>{
        const currentDetails = updateDetails;
        const keyAccount = firebase
                            .database()
                            .ref("Accounts/"+String(res));  
        keyAccount.update(updateDetails)
        .then( ()=>{
          console.log('Successfully Updated!');
          Alert.alert(
            'Success',
            'Successfully updated your account',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
        })
        .catch( (error)=>{
          Alert.alert(
            'Update failed',
            'Failed to update, check your internet connection',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
          console.log('Error connecting update with firebase!');
        });  
      }).catch( (error) =>{
        Alert.alert(
          'Update failed',
          'Failed to update, check your internet connection',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
        console.log('Failed Update!');
        console.log(error);
      }); 
      
  }

  
  addProperty = async(propertyData,imageFile)=>{
    console.log('Adding Property!');
    this.setState({addPropertyError: 'Successfully Added! Please Wait..Don\'t Close the tab yet!'});
    let apiKey        = await AsyncStorage.getItem(Constants.API_KEY);
    const keyAccount = firebase
                        .database()
                        .ref("Accounts/"+String(apiKey)+"/property")
                        .push();
    newProperty  = {
      "propertyID"             : keyAccount.key,
      "Account"                : apiKey,
      "propertyName"           : propertyData.propertyName,
      "propertyLocation"       : propertyData.propertyLocation,
      "propertyBedroomPooling" : propertyData.propertyBedroomPooling,
      "propertyPoolingQty"     : propertyData.propertyPoolingQty,
      "propertyMonthlyPrice"   : propertyData.propertyMonthnlyPrice,
      "propertyFinalPrice"     : propertyData.propertyFinalPrice,
      "propertyDescription"    : propertyData.propertyDescription,
      "propertyFurtherData"    : propertyData.propertyFurtherData,
      "propertyVacant"         : propertyData.propertyPoolingQty,
      "propertyType"           : propertyData.propertyType,
      "contactNumber"          : this.state.myAccountDetails.contactNumber,
      "firstName"              : this.state.myAccountDetails.firstName,
      "lastName"               : this.state.myAccountDetails.lastName,
      "email"                  : this.state.myAccountDetails.email,
      "rating"                 : '0',
      "ratingCount"            : '0',
      "date"                   : firebase.database.ServerValue.TIMESTAMP
    }

    newProperty = await JSON.parse(String(JSON.stringify(newProperty)));
    keyAccount.update(newProperty)
    .then( ()=>{
      this.uploadPropertyPhoto(imageFile,keyAccount.key,'image/jpg')
      .then((response)=>{
        this.setState({addPropertyError: 'Please Wait..'});
        firebase
          .database()
          .ref("Accounts/"+String(apiKey)+"/property/"+String(keyAccount.key))
          .update({imgDLURL:String(response)})
          .then(()=>{
            Alert.alert(
              'Success',
              'Successfully added property',
            [
              {text: 'OK', onPress: () => console.log('OK')}
            ]);
            this.setState({addPropertyError: 'Successfully added'});
            setTimeout(()=>{
              this.setState({addPropertyError:''});
            },3000);
            console.log('Success in getting URL');
          })
          .catch((error)=>{
            Alert.alert(
              'Error',
              'Failed to submit property information, check your internet connection',
            [
              {text: 'OK', onPress: () => console.log('OK')}
            ]);
            this.setState({addPropertyError: 'Failed to submit property photo, check your internet connection'});
            console.log(error);
          });
      })
      .catch((error)=>{
        Alert.alert(
          'Error',
          'Failed to submit property photo, check your internet connection',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
        this.setState({addPropertyError: 'Failed to submit property photo, check your internet connection'});
        console.log(error);
      });
    })
    .catch( (error)=>{
      Alert.alert(
        'Error',
        'Failed to submit property information, check your internet connection',
      [
        {text: 'OK', onPress: () => console.log('OK')}
      ]);
      this.setState({addPropertyError: 'Failed to submit property photo, check your internet connection'});
      console.log(error);
    });
  }

  deleteOneProperty = (propertyKey,accountKey,imageName)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/property/"+String(propertyKey))
      .remove()
      .then((res)=>{
        console.log('Property removed!');
        Alert.alert(
          'Success',
          'Successfully deleted property',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      })
      .then(()=>{
        this.deletePropertyPhoto(imageName);
      })
      .catch((error)=>{
        console.log('Error in deleting, check your internet connection!');
        Alert.alert(
          'Error',
          'Failed in deleting the property',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      });
  }

  updateOneProperty =  (propertyKey,accountKey,data)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/property/"+String(propertyKey))
      .update(data)
      .then((res)=>{
        console.log('updated');
        Alert.alert(
          'Success',
          'Successfully updated the property',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      })
      .catch((error)=>{
        Alert.alert(
          'Error',
          'Failed in updating your property',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
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
    let notificationMessage = "A new request sent by " + 
                              String(this.state.myAccountDetails.firstName)+ ' ' +
                              String(this.state.myAccountDetails.lastName);


    let newRequest = {
      "Account": String(accountKey),
      "propertyID": String(propertyKey),
      "tenantID": String(this.state.onHandKeyReference),
      "requestID": String(dataKey.key), 
      "firstName": String(this.state.myAccountDetails.firstName),
      "lastName": String(this.state.myAccountDetails.lastName),
      "age": String(this.state.myAccountDetails.age),
      "contactNumber":String(this.state.myAccountDetails.contactNumber),
      "email":String(this.state.myAccountDetails.email),
      "gender": String(this.state.myAccountDetails.gender),
      "occupation": String(this.state.myAccountDetails.occupation),
      "civilStatus": String(this.state.myAccountDetails.civilStatus),
      "ownerContactNumber"     : data.contactNumber,
      "ownerFirstName"         : data.firstName,
      "ownerLastName"          : data.lastName,
      "ownerMiddleName"        : data.middleName,
      "ownerEmail"             : data.email
    }

    let today = new Date();
    let notifDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
    newRequest = await JSON.parse(String(JSON.stringify(newRequest)));
    dataKey.update(newRequest)
    .then( ()=>{
      this.setState({requestPropertyError:'Successfully Requested!Please Wait..'});
      setTimeout(()=>{
        this.setState({requestPropertyError:''});
        this.processTenantRequest(data,accountKey,propertyKey,dataKey.key);
      },2500);  
    })  
    .then( ()=>{
      const pushNotifKey =  firebase
                              .database()
                              .ref("Accounts/"+String(accountKey)+"/notifications")
                              .push();
     
      pushNotifKey.update({notifID: pushNotifKey.key, 
        message:notificationMessage,
        notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
        date:notifDate})
      .catch((error)=>{
        console.log('Sending notification failed!');
      });

    })
    .catch( (error)=>{
      console.log('Error Requests!');
    });
  }

  processTenantRequest = async(data,accountKey,propertyKey,ownerRequestID)=>{
    console.log(data);
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
      "propertyPoolingQty": data.propertyPoolingQty,
      "ownerContactNumber"     : data.contactNumber,
      "ownerFirstName"         : data.firstName,
      "ownerLastName"          : data.lastName,
      "ownerMiddleName"        : data.middleName,
      "ownerEmail"             : data.email
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


  acceptTenantRequest= (property,request)=>{
    let data = [];

    let notificationMessage = "One of your request is accepted by " +
                               String(property.propertyName);
    let today = new Date();
    let notifDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
    firebase
      .database()
      .ref("Accounts/"+
        String(request.tenantID)+
        "/requests/"+
        String(request.requestID))
      .update({requestStatus:Constants.STATUS.ACCEPTED})
      .then(()=>{
        request.requestStatus = Constants.STATUS.ACCEPTED;
        data = request;
        data['propertyName']          = property.propertyName;
        data['propertyLocation']      = property.propertyLocation;
        data['propertyFinalPrice']    = property.propertyFinalPrice;
        data['propertyMonthnlyPrice'] = property.propertyMonthnlyPrice;
        data['propertyDescription']   = property.propertyDescription;
        data['propertyFurtherData']   = property.propertyFurtherData;
        data['propertyPoolingQty']    = property.propertyPoolingQty;
        data['propertyType']          = property.propertyType;
        data['date']                  = notifDate;
        data['ownerFirstName']        = request.ownerFirstName;
        data['ownerLastName']         = request.ownerLastName;
        data['ownerMiddleName']       = request.ownerMiddleName;
        data['ownerEmail']            = request.ownerEmail;
        data['ownerContactNumber']    = request.ownerContactNumber;
        data['rated']                 = 'none';
        data = JSON.parse(String(JSON.stringify(data)));
        let currentVacant = Number(property.propertyVacant);
        currentVacant-=1;
        property.propertyVacant = String(currentVacant);
       })
      .then(()=>{
        const accountKey = firebase
                            .database()
                            .ref("Accounts/"+
                              String(request.tenantID)+
                              "/rentals/"+
                              String(request.requestID))
        accountKey.update(data)
        .then(()=>{
          firebase
            .database()
            .ref("Accounts/"+String(property.Account)+"/property/"+String(property.propertyID))
            .update({propertyVacant:property.propertyVacant})
            .then(()=>{
              firebase
                .database()
                .ref("Accounts/"+String(property.Account)+"/transactions/"+String(request.requestID))
                .update(data)
                .then(()=>{
                  firebase
                    .database()
                    .ref("Accounts/"+
                      String(property.Account)+
                      "/property/"+
                      String(property.propertyID)+
                      "/requests/"+
                      String(request.requestID))
                    .remove();
                })
                .then(()=>{
                  const pushNotifKey = firebase
                                        .database()
                                        .ref("Accounts/"+
                                          String(request.tenantID)+
                                          "/notifications/")
                                        .push();
                  pushNotifKey.update({notifID:pushNotifKey.key,
                    message:notificationMessage,
                    notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
                    date:notifDate})
                  .catch((error)=>{
                    console.log('Error in sending accepted notification');
                  });
                })
                .catch((error)=>{
                  console.log('Error in updating owner transactions!');
                });
            });
        })
        .catch( (error) =>{
          console.log('Accepting Request [OWNER PROPERTY][1]: Check your internet connection!');
        });
      })
      .catch( (error)=>{
        console.log('Accepting Request: Check your internet connection!');
      }); 
  }

  declineTenantRequest = (property,request)=>{
   let notificationMessage = "A recent request has been declined by " + String(property.propertyName);
   let today = new Date();
   let notifDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
   firebase
      .database()
      .ref("Accounts/"+
        String(request.tenantID)+
        "/requests/"+
        String(request.requestID))
      .update({requestStatus:Constants.STATUS.DECLINE})
      .then(()=>{
        firebase
          .database()
          .ref("Accounts/"+
            String(property.Account)+
            "/property/"+
            String(property.propertyID)+
            "/requests/"+
            String(request.requestID))
          .remove();

      })
      .then(()=>{
        const pushNotifKey = firebase
                              .database()
                              .ref("Accounts/"+
                                    String(request.tenantID)+
                                    "/notifications")
                              .push();
        pushNotifKey.update({notifID:pushNotifKey.key,
          message:notificationMessage,
          notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
          date:notifDate})
        .catch((error)=>{
          console.log('Error sending decline notification');
        })
      })
      .catch((error)=>{
        console.log('First Step Decline: Error!');
      })
  }

  removeMyRequest = (request)=>{
    firebase
      .database()
      .ref("Accounts/"+
        String(request.Account)+
        "/requests/"+
        String(request.myRequestID))
      .remove()
      .then(()=>{
        console.log('Success removing history request!');
      })
      .catch( (error)=>{
        console.log('Error in deleting history request!');
      });
  }


  changeAlertNotif = (result)=>{
    let allNotifications = this.state.myNotifications;
    let finalData        = {};
    for(index=0;index<allNotifications.length;index++){
      currentNotification = allNotifications[index];
      currentNotification.notifStatus = Constants.NOTIFICATION_STATUS.MARKED_READ;
      finalData[String(currentNotification.notifID)] = currentNotification;
    }
    finalData  = JSON.parse(JSON.stringify(finalData));
    this.submitChangeNotif(finalData);
    this.setState({notificationAlertFlag:String(result)});
  }

  submitChangeNotif = (data)=>{
    firebase
      .database()
      .ref("Accounts/"+String(this.state.onHandKeyReference)+"/notifications")
      .set(data)
      .catch((error)=>{
        console.log('Error in updating notifications');
      });
  }

  ownerMailing = (propertyName,tenantAccountKey,mail,date,ownerDetails)=>{
    const mailKey = firebase
                      .database()
                      .ref("Accounts/"+String(tenantAccountKey)+"/mails")
                      .push();
    mailKey.update({messageID:mailKey.key,
      sender:String(propertyName),
      mailSubject: mail.mailSubject,
      mailContent: mail.mailContent,
      dateSent: String(date),
      mailStatus: Constants.MAIL_STATUS.UNREAD})
    .then(()=>{
      const transactionMailKey = firebase
                                  .database()
                                  .ref("Accounts/"+
                                        String(ownerDetails.Account)+
                                        "/transactions/"+
                                        String(ownerDetails.transactionID)+
                                        "/mails")
                                  .push();
      transactionMailKey.update({messageID:transactionMailKey.key,
        sender:String(propertyName),
        mailSubject: mail.mailSubject,
        mailContent: mail.mailContent,
        dateSent: String(date)})
      .catch((error)=>{
        console.log('Error saving sent mails!');
      })
    })
    .catch((error)=>{
      console.log('Error in sending message!');
    });

  }

  tenantMailing = (tenantName,ownerAccountKey,mail,date,tenantDetails)=>{
    const mailKey = firebase
                      .database()
                      .ref("Accounts/"+String(ownerAccountKey)+"/mails")
                      .push();
    mailKey.update({messageID:mailKey.key,
      sender:String(tenantName),
      mailSubject: mail.mailSubject,
      mailContent: mail.mailContent,
      dateSent: String(date),
      mailStatus: Constants.MAIL_STATUS.UNREAD})
    .then(()=>{
      const rentalMailKey = firebase
                                  .database()
                                  .ref("Accounts/"+
                                        String(tenantDetails.Account)+
                                        "/rentals/"+
                                        String(tenantDetails.rentalID)+
                                        "/mails")
                                  .push();
      rentalMailKey.update({messageID:rentalMailKey.key,
        sender:String(tenantName),
        mailSubject: mail.mailSubject,
        mailContent: mail.mailContent,
        dateSent: String(date)})
      .catch((error)=>{
        console.log('Error saving sent mails!');
      })
    })
    .catch((error)=>{
      console.log('Error in sending message!');
    });
  }

  changeAlertMails = (result)=>{
    let allMails = this.state.myMails;
    let finalData        = {};
    for(index=0;index<allMails.length;index++){
      currentMail = allMails[index];
      currentMail.mailStatus = Constants.MAIL_STATUS.READ;
      finalData[String(currentMail.messageID)] = currentMail;
    }

    finalData  = JSON.parse(JSON.stringify(finalData));
    this.submitChangeMail(finalData);
    this.setState({mailingAlertFlag:String(result)});
  }

  submitChangeMail = (data)=>{
    firebase
      .database()
      .ref("Accounts/"+String(this.state.onHandKeyReference)+"/mails")
      .set(data)
      .catch((error)=>{
        console.log('Error in updating notifications');
      });
  }

  clearAllNotifications = ()=>{
    firebase
      .database()
      .ref("Accounts/"+String(this.state.onHandKeyReference)+"/notifications")
      .remove()
      .catch((error)=>{
        console.log('Error in clearing all notifications');
      });
  }

  submitTenantPayment = (paymentInformation,rentalInformation)=>{
    let finalPaymentData = paymentInformation;
    let today = new Date();
    let paymentDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
    let notificationMessage = 'A tenant payment was in for your property, '+
      String(rentalInformation.propertyName);
    const tenantPaymentKey = firebase
                        .database()
                        .ref("Accounts/"+
                          String(rentalInformation.tenantID)+
                          "/rentals/"+
                          String(rentalInformation.requestID)+
                          "/paymentMade")
                        .push();
    finalPaymentData['paymentID'] = tenantPaymentKey.key;
    finalPaymentData['date']      = paymentDate;
    tenantPaymentKey.update(finalPaymentData)
    .then(()=>{
      const ownerRecieveKey = firebase
                                .database()
                                .ref("Accounts/"+
                                  String(rentalInformation.Account)+
                                  "/transactions/"+
                                  String(rentalInformation.requestID)+
                                  "/paymentRecieved/"+
                                  String(tenantPaymentKey.key))
                                .update(finalPaymentData)
                                .catch((error)=>{
                                  console.log('Error submitting payment in owner transcation')
                                });
    })
    .then(()=>{
      const pushNotifKey =  firebase
                              .database()
                              .ref("Accounts/"+
                                String(rentalInformation.Account)+
                                "/notifications")
                              .push();

      pushNotifKey.update({notifID:pushNotifKey.key,
          message:notificationMessage,
          notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
          date:paymentDate})
      .then(()=>{
        console.log('Success sending notification to owner');
      })
      .catch((error)=>{
        console.log('Error in sending notification to owner');
      });

    })
    .catch((error)=>{
      console.log('Error submitting payment in tenant rentals');
    });
  }

  deleteTenantSentMails = (accountKey,rentalKey)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/rentals/"+String(rentalKey)+"/mails")
      .remove()
      .then(()=>{
        console.log('Success deleting tenant mails!');
      })
      .catch( (error)=>{
        console.log('Error in deleting tenant mails!');
      });
  } 

  deleteOwnerSentMails = (accountKey,transactionKey)=>{
    firebase
      .database()
      .ref("Accounts/"+String(accountKey)+"/transactions/"+String(transactionKey)+"/mails")
      .remove()
      .then(()=>{
        console.log('Success deleting owner mails!');
      })
      .catch( (error)=>{
        console.log('Error in deleting owner mails!');
      });
  }

  
  deleteAMail = (mailKey)=>{
    firebase
      .database()
      .ref("Accounts/"+String(this.state.onHandKeyReference)+"/mails/"+String(mailKey))
      .remove()
      .catch( (error)=>{
        console.log('Error in deleting one mail!');
      });
  }

  submitTenantRating = (ownerKey,propertyKey,rate,minus,tenantKey,rentalKey,rateminus)=>{
    let propertyDetails    = [];

    let currentRating      = '';
    let currentCount       = '';

    let presentCount       = '';
    let presentRating      = '';

    console.log(rateminus);

    const propertyOwnerKey = firebase
                        .database()
                        .ref("Accounts/"+String(ownerKey)+"/property/"+String(propertyKey));
    propertyOwnerKey.once("value",snapshot=>{
      propertyDetails = snapshot.val();
      if(propertyDetails){
        propertyDetails   = JSON.parse(JSON.stringify(propertyDetails));
        currentRating  = Number(propertyDetails.rating)- Number(rateminus);
        currentCount   = Number(propertyDetails.ratingCount);

        presentCount   = Number(currentCount)+Number(minus);
        presentRating  = Number(currentRating)+Number(rate);
      }
      else return;
    })
    .then(()=>{
      propertyOwnerKey.update({rating:String(presentRating),ratingCount:String(presentCount)})
        .then(()=>{
          firebase
            .database()
            .ref("Accounts/"+String(tenantKey)+"/rentals/"+String(rentalKey))
            .update({rated:rate})
            .then(()=>{
              Alert.alert(
                'Success',
                'Successfully submitted your rate',
              [
                {text: 'OK', onPress: () => console.log('OK')}
              ]);
              console.log('Success in updating rate!');
            })
            .catch((error)=>{
              console.log('Error in updating rate in tenant side!');
            });
        })
        .catch((error)=>{
          Alert.alert(
            'Error',
            'Check your internet connection',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
        })
    })
    .catch((error)=>{
      Alert.alert(
          'Error',
          'Check your internet connection',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      console.log('Error in getting property details!');
    });
  }

  sendReciept = (propertyName,accountKey,rentalKey,paymentMadeKey,data)=>{
    let today               = new Date();
    let notifDate           = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());
    let notificationMessage = 'A reciept was sent by property named '+String(propertyName);
    const sendRecieptKey =  firebase
                              .database()
                              .ref("Accounts/"+
                                String(accountKey)+
                                "/rentals/"+
                                String(rentalKey)+
                                "/paymentMade/"+
                                String(paymentMadeKey)+
                                "/reciept/one_reciept");
    sendRecieptKey.remove()
    .then(()=>{
      sendRecieptKey.push()
      .then(()=>{
        sendRecieptKey.update({
          ORNumber    : data.ORNumber,
          RecieptNote : data.RecieptNote,
          recieptKey  : sendRecieptKey.key,
          date        : notifDate
        })
          .then(()=>{
            Alert.alert(
              'Success',
              'Successfully submitted payment reciept',
            [
              {text: 'OK', onPress: () => console.log('OK')}
            ]);
            console.log('Successful sending reciept');
          })
          .then(()=>{
            let notifSendRecieptKey = firebase
                                        .database()
                                        .ref("Accounts/"+String(accountKey)+"/notifications")
                                        .push();            
            notifSendRecieptKey.update({notifID:notifSendRecieptKey.key, 
            message:notificationMessage,
            notifStatus:Constants.NOTIFICATION_STATUS.UNREAD,
            date:notifDate});
          })
          .catch((error)=>{
            console.log('Failed sending reciept');
          });
      });
    })
    .catch((error)=>{
      console.log('Error in removing reciept stack');
    });
  }

  changePassword = (newPassword)=>{
    firebase
      .database()
      .ref("Accounts/"+String(this.state.onHandKeyReference))
      .update({password:newPassword})
      .then(()=>{
        console.log('Successfully updated password');
        Alert.alert(
          'Success',
          'Successfully changed your password',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      })
      .catch(()=>{
        console.log('Error in updating password');
        Alert.alert(
          'Failed',
          'Failed to update your password',
        [
          {text: 'OK', onPress: () => console.log('OK')}
        ]);
      });
  }

  deletePropertyPhoto = (imageName)=>{
    const imageRef = firebase.storage().ref('properties').child(imageName);
    imageRef.delete()
    .then(()=>{
      console.log('Successfully deleted property photo');
    })
    .catch((error)=>{
      console.log('Error in deleting property photo');
    });
  }

  uploadPropertyPhoto = (uri, imageName,mime = 'image/jpg')=>{
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('properties').child(imageName);
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
    });
  }

  uploadSubscriptionPhoto = (uri,imageName,mime = 'image/jpg')=>{
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('subscription').child(imageName);
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
    });
  }

  submitFixSubscription = (data,imageFile)=>{
    console.log('Submitting Subscription.. Please Wait...');
    this.uploadSubscriptionPhoto(imageFile,this.state.onHandKeyReference,'image/jpg')
    .then((response)=>{
        data['imgDLURL']   = String(response);
        const subscribeKey =  firebase
                                .database()
                                .ref("Accounts/"+String(this.state.onHandKeyReference)+
                                  "/subscription/")
                                .push();
        data['subKey']     = String(subscribeKey.key);
        data['Account']    = String(this.state.onHandKeyReference);
        data['status']     = 'pending';
        subscribeKey.update(data)
        .then(()=>{
          Alert.alert(
            'Success',
            'Successfully sent subscription details',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
          console.log('Successfully paid subscription');
        })
        .catch((error)=>{
          Alert.alert(
            'Error',
            'Please check your internet connection',
          [
            {text: 'OK', onPress: () => console.log('OK')}
          ]);
          console.log('Error in submitting subscription details');
        });
    })
    .catch((error)=>{
      Alert.alert(
        'Error',
        'Please check your internet connection',
      [
        {text: 'OK', onPress: () => console.log('OK')}
      ]);
      console.log('Error in submitting subscription photo remittance');
    });
  }


  updateAge = ()=>{
    let today = new Date();
    const ageKey =  firebase
                      .database()
                      .ref("Accounts/"+String(this.state.onHandKeyReference));
    let currentMonth = this.state.myAccountDetails.birthdate[0] + this.state.myAccountDetails.birthdate[1];
    let currentDay   = this.state.myAccountDetails.birthdate[3] + this.state.myAccountDetails.birthdate[4];
    let currentYear   = this.state.myAccountDetails.birthdate[6] + this.state.myAccountDetails.birthdate[7] + 
      this.state.myAccountDetails.birthdate[8] + this.state.myAccountDetails.birthdate[9];

    if( Number(today.getMonth()+1) == Number(currentMonth) 
      && Number(today.getDate()) == Number(currentDay) 
      && Number(today.getFullYear()) == Number(Number(currentYear)+1) ){
      ageKey.update({age:String(Number(this.state.myAccountDetails.age)+1)})
      .then(()=>{
        console.log('Success updating age');
      })
      .catch((error)=>{
        console.log('Age Update Error: '+error);
      });
    }
    else{
      console.log(currentMonth+'/'+currentDay+'/'+currentYear);
      console.log('Not past birthday yet');
    }

  }

  dismissTenantFromTransaction = (tenantKey,rentalKey,ownerKey,transactionKey)=>{
    firebase 
      .database()
      .ref("Accounts/"+String(tenantKey)+"/rentals/"+String(rentalKey))
      .remove()
      .then(()=>{
        firebase
          .database()
          .ref("Accounts/"+String(ownerKey)+"/transactions/"+String(transactionKey))
          .remove()
          .then(()=>{
            console.log('Successfully removed transaction');
            Alert.alert(
              'Success',
              'Successfully removed transcation',
            [
              {text: 'OK', onPress: () => console.log('OK')}
            ]);
          })
          .catch((error)=>{
            console.log('Error in dismissing transaction');
          });
      })
      .catch((error)=>{
        console.log('Error in dismissing transaction');
      });
  }

  updateOwnerMaxPost = ()=>{
    let today    = new Date();

    let getMonth = String(today.getMonth()+1);
    let getDay   = String(today.getDate());
    let getYear  = String(today.getFullYear());

    const subKey =  firebase
                      .database()
                      .ref("Accounts/"+String(this.state.onHandKeyReference));

    if( Number(getMonth) == Number(this.state.myAccountDetails.expiration[0]+
      this.state.myAccountDetails.expiration[1]) &&
      Number(getDay) == Number(this.state.myAccountDetails.expiration[3]+
        this.state.myAccountDetails.expiration[4]) &&
      Number(getYear) == Number(this.state.myAccountDetails.expiration[6]+
        this.state.myAccountDetails.expiration[7]+
        this.state.myAccountDetails.expiration[8]+
        this.state.myAccountDetails.expiration[9]) ){
      subKey
        .update({
          max_post: '3',
          paid: 'free',
          expiration:'free'
        })
        .then(()=>{
          console.log('Updated subscription');
        })
        .catch((error)=>{
          console.log('Error in updating subscription: '+error);
        });
    }
    else{
      console.log('Not past due for subscription');
    }

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

  checkLoginLoad = () =>{
    try{
      let usernameLocal = '';
      let passwordLocal = '';
      let apikeyLocal   = '';
      AsyncStorage.getItem(Constants.USER_NAME_KEY)
        .then((username)=>{
          usernameLocal = username;
        })
        .then(()=>{
          AsyncStorage.getItem(Constants.PASS_WORD_KEY)
            .then((password)=>{
              passwordLocal = password;
            })
            .then(()=>{
              AsyncStorage.getItem(Constants.API_KEY)
                .then((apikey)=>{
                  apikeyLocal = apikey;
                })
                .then(()=>{
                  if(!(String(usernameLocal) == 'null' || String(passwordLocal) == 'null')){
                    this.setState({onHandKeyReference:apikeyLocal});
                    let successfullyLogin = 'true';
                    this.setState({successfullyLogin});
                    this.firebaseInitialization();
                  }
                });
            })
        })
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
              errorMsg              = {this.state.signUpError}
              doChangeRegisterFlag  = {this.changeRegisterFlag}/>
              
    }
    else if(this.state.successfullyLogin == 'true'){
      return <HomeTemplate
              Properties            = {this.state.Properties}
              doChangeLoginFlag     = {this.changeLoginFlag}
              doChangeLogoutFlag    = {this.changeLoggingOutFlag}
              doProcessUpdate       = {this.accountUpdate}
              doAddPropertyOwner    = {this.addProperty}
              doesDataLoad          = {this.state.loadingData}
              doViewMyProperty      = {this.state.myProperty}
              doGetMyAccount        = {this.state.myAccountDetails}
              doDeleteProperty      = {this.deleteOneProperty}
              doUpdateProperty      = {this.updateOneProperty}
              doSendARequest        = {this.requestAProperty}
              doViewMyRequests      = {this.state.myRequests}
              doDeleteARequest      = {this.deleteARequestProperty}
              doAcceptTenantReq     = {this.acceptTenantRequest}
              doDeclineTenantReq    = {this.declineTenantRequest}
              doViewMyTransactions  = {this.state.myTransactions}
              doRemoveMyRequest     = {this.removeMyRequest}
              doGetMyNotifications  = {this.state.myNotifications}
              doGetMyNotifAlert     = {this.state.notificationAlertFlag}
              doChangeAlertNotif    = {this.changeAlertNotif}
              doClearAllMyNotif     = {this.clearAllNotifications}
              doOperateOwnerMail    = {this.ownerMailing}
              doGetMyMails          = {this.state.myMails}
              doGetMyMailAlert      = {this.state.mailingAlertFlag}
              doChangeAlertMail     = {this.changeAlertMails}
              doDeleteAMail         = {this.deleteAMail}
              doGetMyRentals        = {this.state.myRentals}
              doOperateTenantMail   = {this.tenantMailing}
              doSubmitTenantPayment = {this.submitTenantPayment}
              doDeleteTenantSent    = {this.deleteTenantSentMails}
              doDeleteOwnerSent     = {this.deleteOwnerSentMails}
              doSubmitTenantRate    = {this.submitTenantRating}
              doSendReciept         = {this.sendReciept}
              doChangeMyPassword    = {this.changePassword}
              doUploadPropertyPhoto = {this.uploadPropertyPhoto}
              doGetAdminDetails     = {this.state.getAdminDetails}
              doSubmitFixPay        = {this.submitFixSubscription}
              doSubmitFreeSub       = {this.submitFreeSubscription}
              doUpdateAge           = {this.updateAge}
              doDismissTenant       = {this.dismissTenantFromTransaction}
              doUpdateMaxPost       = {this.updateOwnerMaxPost}
              addPropertyErrMSG     = {this.state.addPropertyError}
              requestPropertyMSG    = {this.state.requestPropertyError}/>
    }
    else{
      return <LoginComponent
              doProcessLogin        = {this.processLogin}
              doChangeRegisterFlag  = {this.changeRegisterFlag}
              errorMessage          = {this.state.loginError}/>
              
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
