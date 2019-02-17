import React, { Component } from "react";
import { Platform, StyleSheet, Text, View,FlatList,TouchableWithoutFeedback,TextInput, Alert, CheckBox} from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';
import {Button, Icon} from 'native-base';

export default class AvailableProperty extends Component{

	state = {
		newPropertyName           : '',
		newPropertyLocation       : '',
		newPropertyVacant         : '0',
		newPropertyBedroomPooling : false,
		newPropertyMonthlyPrice   : '0',
		newPropertyCaption        : '',
		newPropertyFurtherData    : '',
        updatingError             : ''
	}



	changePropertyPooling = ()=>{
		this.setState({newPropertyBedroomPooling:!this.state.newPropertyBedroomPooling});
	}

	getFinalPrice = ()=>{

        if( Number.isInteger(Number(this.state.newPropertyVacant)) == false || 
			Number.isInteger(Number(this.state.newPropertyMonthlyPrice)) == false){
			return 'base on previous saved monthly price will be use';
		}
		else if( Number(this.state.newPropertyVacant)>0  && Number(this.state.newPropertyMonthlyPrice)>0){
			let initFinalPrice = this.state.newPropertyMonthlyPrice/this.state.newPropertyVacant
			return initFinalPrice;
		}	
        else if( Number(this.state.newPropertyMonthlyPrice)>0 && this.state.newPropertyBedroomPooling==false){
            return this.state.newPropertyMonthlyPrice;
        }
        else{
            return 'base on previous saved monthly price will be use';
        }
	}      


    doCreateAlertForUpdate = ()=>{
        Alert.alert(
          'Update',
          'Attempting to update your property',
        [
          {text: 'NO', onPress: () => console.log('Cancelled'), style: 'cancel'},
          {text: 'YES', onPress: () => this.doUpdateNow()},
        ]);
    }

    doUpdateNow = ()=>{
        let updateData = {};   
        this.setState({updatingError:''});
        if(this.state.newPropertyName!=''){
            updateData['propertyName'] = this.state.newPropertyName;
        }

        if(this.state.newPropertyLocation!=''){
            updateData['propertyLocation'] = this.state.newPropertyLocation;
        }


        if(Number.isInteger(Number(this.state.newPropertyMonthlyPrice)) == false && this.state.newPropertyMonthlyPrice!='0'){
            this.setState({updatingError:'Invalid input for monthly price'});
            return;
        }

        if(this.state.newPropertyBedroomPooling == true
            && (Number.isInteger(Number(this.state.newPropertyVacant)) == false || this.state.newPropertyVacant=='0' ||  this.state.newPropertyVacant=='')){
            this.setState({updatingError:'Fill in valid input slots for pooling'});
            return;
        }

        if(this.state.newPropertyBedroomPooling == false
            && (Number(this.state.newPropertyVacant)>1) ){
            console.log('true');
            this.setState({updatingError:'Please enable apply to pool'});
            return;
        }

        updateData['propertyBedroomPooling'] = false;
        updateData['propertyPoolingQty']     = '1';
        updateData['propertyVacant']         = '1';
        
        if(this.state.newPropertyBedroomPooling == true && this.state.newPropertyVacant!=1){
            updateData['propertyBedroomPooling'] = true;
            updateData['propertyPoolingQty']     = this.state.newPropertyVacant;
            updateData['propertyVacant']         = this.state.newPropertyVacant;
        }

        if(this.state.newPropertyMonthlyPrice!='0' && this.state.newPropertyMonthlyPrice!='' ){
            updateData['propertyMonthlyPrice'] = this.state.newPropertyMonthlyPrice;
            updateData['propertyFinalPrice']   = String(Number(updateData['propertyMonthlyPrice'])/Number(updateData['propertyPoolingQty']));
        }
        else{
            updateData['propertyMonthlyPrice'] = this.props.pressedPropertyDetails.propertyMonthlyPrice;
            updateData['propertyFinalPrice']   = String(Number(updateData['propertyMonthlyPrice'])/Number(updateData['propertyPoolingQty']));
        }


        if(this.state.newPropertyCaption!=''){
            updateData['propertyDescription'] = this.state.newPropertyCaption;
        }

        if(this.state.newPropertyFurtherData!=''){
            updateData['propertyFurtherData'] = this.state.newPropertyFurtherData;
        }

        this.props.doUpdateProperty(this.props.pressedPropertyDetails.propertyID,
            this.props.pressedPropertyDetails.Account,
            updateData);
        this.props.doGetBackAfterUpdate();
    }


	render() {
    	return (
    		<React.Fragment>
    			<View style={{
    					top: 20,
    					height: 30,
    					width:'100%'
    			}}>
    				<Text style={{
    						height: '100%',
    						position : 'relative',
    						width: 150,
    						left: 126,
    						fontSize: 15
    				}}>
    					Property Update
    				</Text>
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 24
    			}}>
    				<Text style={{
    						width: 120,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Update Name:
    				</Text>

    				<TextInput 
    					placeholder='new property name'
    					maxLength  = {25}
    					style      = {{
    						height: '100%',
    						width: 160,
    						left: 20,
    						borderWidth:1,
    						fontSize: 11,
    						alignItems: 'stretch',
    						borderRadius:5,
    					}}
    					onChangeText = {(newPropertyName)=>this.setState({newPropertyName:newPropertyName})}/>
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 26
    			}}>
    				<Text style={{
    						width: 120,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Update Location:
    				</Text>

    				<TextInput 
    					placeholder='new property address'
    					maxLength  = {40}
    					style      = {{
    						height: '100%',
    						width: 160,
    						left: 20,
    						borderWidth:1,
    						fontSize: 11,
    						alignItems: 'stretch',
    						borderRadius:5,
    					}}
    					onChangeText = {(newPropertyLocation)=>this.setState({newPropertyLocation:newPropertyLocation})}/>
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 28
    			}}>
    				<Text style={{
    						width: 105,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Apply to Pool:
    				</Text>

    				<CheckBox value={this.state.newPropertyBedroomPooling} 
    					onChange={this.changePropertyPooling} 
    					style={{
    						position: 'relative',
    						left:15
    					}} />


    				<Text style={{
    						width: 70,
    						height: '100%',
    						left: 25,
    						position: 'relative',
    						paddingTop: 5
    				}}>	
    					Good for: 
    				</Text>

    				<TextInput
    					placeholder= '# of person/s'
    					style      = {{
    						height: '100%',
    						width: 90,
    						borderWidth: 1,
    						left: 26,
    						fontSize: 11,
    						borderRadius: 5
    					}}
    					onChangeText = {(newPropertyVacant)=>this.setState({newPropertyVacant:newPropertyVacant})} />
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 30
    			}}>
    				<Text style={{
    						width: 150,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Update Monthly Price:
    				</Text>

    				<TextInput 
    					placeholder='new monthly price'
    					maxLength  = {10}
    					style      = {{
    						height: '100%',
    						width: 130,
    						left: 21,
    						borderWidth:1,
    						fontSize: 11,
    						alignItems: 'stretch',
    						borderRadius:5,
    					}}
    					onChangeText = {(newPropertyMonthlyPrice)=>this.setState({newPropertyMonthlyPrice:newPropertyMonthlyPrice})}/>
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 32
    			}}>
    				<Text style={{
    						width: 270,
    						height: '100%',
    						left:15,
    						fontSize: 11,
    						position: 'relative',
    						paddingTop: 5,
                            fontWeight:'bold'
    				}}>
    					Updated Final Price:{' '}
    					{this.getFinalPrice()}
    				</Text>

    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 34
    			}}>
    				<Text style={{
    						width: 120,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Update Caption:
    				</Text>
    				<TextInput 
    					placeholder='new property caption'
    					maxLength  = {45}
    					style      = {{
    						height: '100%',
    						width: 180,
    						left: 20,
    						borderWidth:1,
    						fontSize: 11,
    						alignItems: 'stretch',
    						borderRadius:5,
    					}}
    					onChangeText = {(newPropertyCaption)=>this.setState({newPropertyCaption:newPropertyCaption})}/>
    			</View>

    			<View style={{
    					height: 36,
    					width:'100%',
    					flexDirection: 'row',
    					position: 'relative',
    					top: 36
    			}}>
    				<Text style={{
    						width: 133,
    						height: '100%',
    						left:15,
    						fontSize: 13,
    						position: 'relative',
    						paddingTop: 5
    				}}>
    					Update Property Info:
    				</Text>
    				<TextInput 
    					placeholder='new property information'
    					maxLength  = {50}
    					style      = {{
    						height: '100%',
    						width: 170,
    						left: 20,
    						borderWidth:1,
    						fontSize: 11,
    						alignItems: 'stretch',
    						borderRadius:5
    					}}
    					onChangeText = {(newPropertyFurtherData)=>this.setState({newPropertyFurtherData:newPropertyFurtherData})}/>
    			</View>


                <View style={{
                        height: 38,
                        width:'100%',
                        flexDirection: 'row',
                        position: 'relative',
                        top: 38
                }}>
                    <Text style={{
                            width: 150,
                            height: '100%',
                            left:100,
                            fontSize: 13,
                            position: 'relative',
                            paddingTop: 5,
                            paddingLeft: 10,
                            fontWeight: 'bold'
                    }}>
                        {this.state.updatingError}
                    </Text>
                </View>

                <View style={{
                        height: 36,
                        width:'100%',
                        flexDirection: 'row',
                        position: 'relative',
                        top: 55
                }}>
                    <TouchableWithoutFeedback  
                        onPress={()=>this.props.doCancelUpdate()}>
                        <Text style={{
                                borderWidth:2,
                                height: '100%',
                                left: 15,
                                fontSize: 14,
                                fontWeight: 'bold',
                                paddingTop: 6,
                                paddingLeft: 12,
                                borderColor:'#5ce24a',
                                width: 80
                        }}>
                            <Icon style={{fontSize:14,color:'#8b8f96'}}
                              name="ios-arrow-back"
                              type="Ionicons"/>
                            {' '}Cancel
                        </Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                    onPress= {()=>this.doCreateAlertForUpdate()}>
                    <Text style={{
                            width: 80,
                            height: '100%',
                            borderWidth: 2,
                            position: 'relative',
                            left: 180,
                            paddingLeft: 11,
                            paddingTop:8,
                            fontSize: 15,
                            fontWeight : 'bold',
                            borderColor:'#5ce24a'
                    }}>
                        Submit{' '}
                        <Icon style={{fontSize:15,color:'#8b8f96'}}
                              name="ios-arrow-forward"
                              type="Ionicons"/>
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
    		</React.Fragment>
    	);
	}
}