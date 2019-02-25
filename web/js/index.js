const Constants = {
	USER_NAME_KEY       : "RENT_IS_REAL_USER_NAME_KEY",
	PASS_WORD_KEY       : "RENT_IS_REAL_PASS_WORD_KEY",
	API_KEY             : "RENT_IS_REAL_API_KEY",
	USER_ROLE           : "RENT_IS_REAL_USER_ROLE"
}

var allRegisteredAccounts      = [];
var globalCurrentSubscriptions = [];

$(document).ready(function(){
	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyAuDuWoZ_KhzLqr0jDK4SNZ-ZgGNoPS41c",
	    authDomain: "rentisreal-d9762.firebaseapp.com",
	    databaseURL: "https://rentisreal-d9762.firebaseio.com",
	    projectId: "rentisreal-d9762",
	    storageBucket: "rentisreal-d9762.appspot.com",
	    messagingSenderId: "428728662478"
  	};
  	firebase.initializeApp(config);
  	checkLoginLoad(); // checks if there's a current user logged in
});


var getAllRegisteredAccountsOnce = function(){
	firebase
		.database()
		.ref()
		.child("Accounts")
      	.once("value",function(snapshot){
      		data = snapshot.val();
  			Object
          		.keys(data)
            	.forEach(function(account){
                	allRegisteredAccounts.push(JSON.parse(String(JSON.stringify(data[account]))));
                });
      	})
      	.then(function(){
      		document.getElementById('loginErrorWrapper').innerHTML = '';
      		$('#loginPageWrapper').css("display","none");
			$('#homeContentWrapper').css("display","block");
			$('#loadingScreenWrapper').css("display","none");
			$('#loadingMessage').css("display","none");
			generateForAllUserDisplay();
      	})
      	.catch(function(error){
      		console.log('Error: '+error);
      	})
}

var generateForAllUserDisplay = function(){
	document.getElementById('homeContentBody').innerHTML = '';
	var generateDisplay = allRegisteredAccounts.map(function(currentAccount,index){
		var currentPropertyLength = 'no';
		if(currentAccount.role == 'owner'){
			if(currentAccount.property){
				var currentAllProperties = JSON.parse(JSON.stringify(currentAccount.property));
				currentPropertyLength    = Object.keys(currentAllProperties).length;
			}
		}

		var currentRentalLength = 'no';
		if(currentAccount.role == 'tenant'){
			if(currentAccount.rentals){
				var currentAllRentals  = JSON.parse(JSON.stringify(currentAccount.rentals));
				currentRentalLength = Object.keys(currentAllRentals).length;
			}
		}

		return 	'<div id=\'index-'+ String(index) + '\'>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Account Role: ' +
						String(currentAccount.role) + 
					'</p>' + 
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'First Name: ' +
						String(currentAccount.firstName) + 
					'</p>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Last Name: ' +
						String(currentAccount.lastName) + 
					'</p>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Birthdate: ' +
						String(currentAccount.birthdate) + 
					'</p>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Civil Status: ' +
						(String(currentAccount.civilStatus) 
							== 'null' ? 'not updated yet' : String(currentAccount.civilStatus) ) + 
					'</p>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Occupation: ' +
						(String(currentAccount.occupation) 
							== 'null' ? 'not updated yet' : String(currentAccount.occupation) ) + 
					'</p>' +
					(String(currentAccount.role) == 'admin' ? '' : ( 
						'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Subscription: ' +
						(String(currentAccount.paid) 
							== 'tenant' ? 'Not applicable to tenants'   : (String(currentAccount.paid) 
							== 'free'   ? 'Free, max upto 3 posts only' : String(currentAccount.max_post))) + 
						'</p>')) +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Number of Property: ' +
						(String(currentAccount.role) 
							== 'owner' ? String(currentPropertyLength)+' posted properties' : 'Applicable to owners only' )  + 
					'</p>' +
					'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;' + 
						'font-family:\'Nunito-Regular\';\'>' +
						'Number of Rentals: ' +
						(String(currentAccount.role) 
							== 'tenant' ? String(currentRentalLength)+' current rentals' : 'Applicable to tenants only' )  + 
					'</p>' +
					( String(currentAccount.role) == 'owner' ? 
						'<div onClick=\'viewSubscriptions('+ String(index)  +');\'' + 'style=\'cursor:pointer;position:relative;height:32px;border:solid;border-color:#6785db;top:20px;'+ 
						'width:150px;padding-left:10px;font-weight:bold;left:690px;padding-top:10px;\'>' +
						'SUBSCRIPTIONS &#8594;' +
						'</div>' : '') +
				'</div>' +
				'<style>' +
					'#index-'+String(index)+ 
					'{position: relative;' +
					'height: 310px;' +
					'width:99%;' +
					'border-bottom: solid;'  +
					'border-color:#6785db;' +
					'margin-bottom:5px' +
				'</style>';
	});
	generateDisplay
		.forEach(function(currentAccountDisplay){
			document.getElementById('homeContentBody').innerHTML+=currentAccountDisplay;
		});
}

var getBackFromViewingSubscription = function(){
	generateForAllUserDisplay();
} 

var generateSubscriptionDisplay = function(allSubscriptions){

	document.getElementById('homeContentBody').innerHTML =	'<div id=\'forReturnWrapper\'>' +
																'<p onClick=\'getBackFromViewingSubscription();\' id=\'forBackButton\'> ' +
																	'&#8592;Return' + 
																'</p>' +
															'</div>';
	var generateDisplay = allSubscriptions.map(function(currentSubscription,index){
		return 	'<div id=\'index-'+ String(index) + '\'>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'@' + String(currentSubscription.date) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Sent to Bank Account: ' + String(currentSubscription.bank) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Transaction Code: ' + String(currentSubscription.remittanceCode) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Remittance Center: ' + String(currentSubscription.remittanceName) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Sender: ' + String(currentSubscription.senderName) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Contact Number: ' + String(currentSubscription.contactNumber) + 
				'</p>' +
				'<p style=\'position:relative;font-size:17px;font-weight:bold;'+
						'top:5px;padding-left:15px;\'>' +
						'Subscription for 1 month paid: ' + String(currentSubscription.amount) + ' pesos'+
				'</p>' +
				'</div>' + 	
				( String(currentSubscription.status) == 'pending' ?
				'<div onClick=\'approveOwnerSubscription('+
					String(index) +
				');\' style=\'cursor:pointer;font-weight:bold;padding-top:10px;padding-left:10px;border:solid;font-size:15px;position:absolute;width:75px;height:30px;left:20px;top:310px;\'>' +
					'Approve'+
				'</div>' : '<div '+
					'style=\'cursor:pointer;font-weight:bold;padding-top:10px;padding-left:10px;border:solid;font-size:15px;position:absolute;width:75px;height:30px;left:20px;top:310px;\'>' +
					'Accepted' +
				'</div>' )+

				'<div style=\'font-size:15px;position:absolute;width:350px;height:380px;left:350px;top:20px;padding-left:110px;\'>' +
					'Loading Image..' +
				'</div>' + 

				'<div style=\'position:absolute;width:350px;height:380px;left:350px;top:10px;\'>' +
					'<img src=\''+ 
					String(currentSubscription.imgDLURL) +  
					'\'' +
					'style=\'object-fit:contain;position:relative;width:100%;height:100%;\''+

					'>'+
				'</div>' +

				'<style>' +
					'#index-'+String(index)+ 
					'{position: relative;' +
					'height: 400px;' +
					'width:99%;' +
					'border-bottom: solid;'  +
					'border-color:#6785db;' +	
					'margin-bottom:5px' +
				'</style>';
	});

	generateDisplay.map(function(currentSubDisplay){
		document.getElementById('homeContentBody').innerHTML+=currentSubDisplay;
	});

}


var approveOwnerSubscription = function(index){
	var today       = new Date();
	var getMonth    = today.getMonth();
	var getDay      = today.getDate();
	var getFullYear = today.getFullYear();


	var forNextMonth   = new Date(getFullYear,getMonth,getDay);
	var finalNextMonth = new Date(forNextMonth.setMonth(forNextMonth.getMonth()+1));

	var today = new Date();
  	var notifDate = String(today.getMonth()+1) + '/' + String(today.getDate()) + '/' + String(today.getFullYear());

	const subKey =	firebase
						.database()
						.ref("Accounts/"+String(globalCurrentSubscriptions[index].Account));
	subKey
		.update({
			expiration: String(finalNextMonth.getMonth()+1)+
			'/'+String(finalNextMonth.getDate())+
			'/'+String(finalNextMonth.getFullYear()),
			paid      : 'subscribe',
			max_post  : 'unlimited'
		})
		.then(function(){
			firebase
				.database()
				.ref("Accounts/"+String(globalCurrentSubscriptions[index].Account)+"/subscription/"+
					String(globalCurrentSubscriptions[index].subKey))
				.update({status:'accepted'})
				.then(function(){
					const pushNotifKey =  firebase
			                                  .database()
			                                  .ref("Accounts/"+String(globalCurrentSubscriptions[index].Account)+"/notifications")
			                                  .push();
			        const notificationMessage = 'One of your subscription payment has been approved';
			        pushNotifKey.update({notifID:pushNotifKey.key, 
		          	message:notificationMessage,
		          	notifStatus:'NOTIF_UNREAD',
		          	date:notifDate})
		          	.then(function(){    
		          		console.log('Successfully approved user');
						alert('Successfully approved user');
					});
				})
				.then(function(){
					//window.location.reload();
				})
				.catch(function(error){
					alert('Error in approving user');
				});	
		})
		.catch(function(error){
			console.log('Error:'+error);
		});
}


var viewSubscriptions = function(index){
	const currentOwnerAccount = allRegisteredAccounts[Number(index)];
	if(currentOwnerAccount.subscription){
		const allCurrentSubscriptions = JSON.parse(JSON.stringify(currentOwnerAccount.subscription));
		const initAllSubscriptions    = [];
		Object
			.keys(allCurrentSubscriptions)
			.forEach(function(subKey){
				initAllSubscriptions.push(allCurrentSubscriptions[subKey]);
			});
		globalCurrentSubscriptions = initAllSubscriptions;
		generateSubscriptionDisplay(initAllSubscriptions);
	}
	else{
		alert('User owner hasn\'t made any subscriptions yet');
	}
}

var checkLoginLoad = function(){
	$('#loadingScreenWrapper').css("display","block");
	$('#loadingMessage').css("display","block");
	if(typeof(Storage) !== "undefined"){		
		const usernameLocal    = localStorage.getItem(String(Constants.USER_NAME_KEY));
		const passwordLocal    = localStorage.getItem(String(Constants.PASS_WORD_KEY));
		const accountKeyLocal  = localStorage.getItem(String(Constants.API_KEY));
		const accountRoleLocal = localStorage.getItem(String(Constants.USER_ROLE));	

		if(usernameLocal =='' || usernameLocal == null || 
			passwordLocal == '' || passwordLocal == null ||
			accountKeyLocal == '' || accountKeyLocal == null ||
			accountRoleLocal == '' || accountRoleLocal == null){
			$('#loadingScreenWrapper').css("display","none");
			$('#loadingMessage').css("display","none");
			$('#loginPageWrapper').css("display","block");
			$('#homeContentWrapper').css("display","none");
		}
		else{
			getAllRegisteredAccountsOnce();
		}
	}	
	else{
		$('#loadingScreenWrapper').css("display","none");
		$('#loadingMessage').css("display","none");
		$('#loginPageWrapper').css("display","block");
		$('#homeContentWrapper').css("display","none");
	}
}




var saveCredentialData = function(username,password,accountKey,role){

	if(role == 'admin'){
		if(typeof(Storage) == "undefined"){
		  	document.getElementById('loginErrorWrapper').innerHTML = 'Logging in..Not saving credentials..';
			setTimeout(function(){
				checkLoginLoad();
			},2000);	
			return;
		}
		else{
			localStorage.setItem(String(Constants.USER_NAME_KEY),username);
			localStorage.setItem(String(Constants.PASS_WORD_KEY),password);
			localStorage.setItem(String(Constants.API_KEY),accountKey);
			localStorage.setItem(String(Constants.USER_ROLE),role);

			document.getElementById('loginErrorWrapper').innerHTML = 'Logging in...Saving credentials';
			setTimeout(function(){
				checkLoginLoad();
			},2000);	
			return;
		}
	}
	else{
		document.getElementById('loginErrorWrapper').innerHTML = 'For admin users only!';
	}
}

$('#forAccountWrapper').click(function(){


});


$('#forMoreWrapper').mouseenter(function(){
	$('#forMoreContentSelect').css("display","block");
	$('#forMoreContentWrapper').css("display","block");
});

$('#forMoreContentWrapper').mouseleave(function(){
	$('#forMoreContentSelect').css("display","none");
	$('#forMoreContentWrapper').css("display","none");
});

$('#forLogoutWrapper').click(function(){
	$('#loadingScreenWrapper').css("display","block");
	$('#loadingMessage').css("display","block");
	localStorage.setItem(String(Constants.USER_NAME_KEY),'');
	localStorage.setItem(String(Constants.PASS_WORD_KEY),'');
	localStorage.setItem(String(Constants.API_KEY),'');
	localStorage.setItem(String(Constants.USER_ROLE),'');
	allRegisteredAccounts = [];
	setTimeout(function(){
		checkLoginLoad();
	},2000);
});

$('#loginButtonWrapper').click(function(){
	const usernameInput = document.getElementById('usernameForAdmin').value;
	const passwordInput = document.getElementById('passwordForAdmin').value;
	document.getElementById('loginErrorWrapper').innerHTML = 'Please Wait....';
	firebase
		.database()
		.ref()
		.child("Accounts")
		.orderByChild("username")
      	.equalTo(String(usernameInput))
      	.once("value",function(snapshot){
      		if(snapshot.exists()){
      			firebase
		            .database()
		            .ref()
		            .child("Accounts")
		            .orderByChild("password")
		            .equalTo(String(passwordInput))
		            .once("value",function(snapshot){
		                if(snapshot.exists()){
		                	data = snapshot.val();
		                	Object
	                  			.keys(data)
	                  			.forEach( function(account){
	                  				currentLoginAccount = JSON.parse(String(JSON.stringify(data[account])));
	                  				if( String(currentLoginAccount.password) == String(passwordInput) 
	                        			&& String(currentLoginAccount.username) == String(usernameInput)){
	                  					saveCredentialData(currentLoginAccount.username,
	                  						currentLoginAccount.password,account,currentLoginAccount.role);
	                  				}
	                  				else{
	                  					document.getElementById('loginErrorWrapper').innerHTML = 'Incorrect username/password!';
	                  				}
	                  			});
		                }
		                else{
		                	document.getElementById('loginErrorWrapper').innerHTML = 'Incorrect username/password!';
		                }
		            });
      		}
      		else{
      			document.getElementById('loginErrorWrapper').innerHTML = 'Incorrect username/password!';
      		}
      	})
		.then(function(){
			document.getElementById('usernameForAdmin').value = '';
			document.getElementById('passwordForAdmin').value = '';
		})
		.catch(function(error){
			document.getElementById('loginErrorWrapper').innerHTML = 'Check your internet connection!';
		});
});