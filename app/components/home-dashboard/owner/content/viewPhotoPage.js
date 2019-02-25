import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback, Image} from 'react-native';
import {Button,Icon, Spinner} from "native-base";


export default class ViewPhotoPage extends Component {

	displayPhoto = ()=>{
		if(this.props.pressedPropertyDetails.imgDLURL){
			return 	<Image
	              		source = {{uri:this.props.pressedPropertyDetails.imgDLURL}}
	              		placeholder='Loading Image...'
	              		style = {{width:'100%',position:'relative',height:'70%',resizeMode:'contain',backgroundColor:'#babbbc',top:50}}/>
		}
		else{
			return 	<Text style={{position:'relative',top:250,left:115}}>No photo uploaded</Text>
		}
	}
	render() {
	    return (
	        <React.Fragment>
          		<View style={{
          			flex:1
          		}}>
	          		<TouchableWithoutFeedback
	          			onPress={()=>this.props.doGetBack()}>
		          		<Text style={{
		          				width: 80,
		          				top: 5,
		                        height: 35,
		                        borderWidth: 2,
		                        position: 'relative',
		                        left: 15,
		                        paddingLeft: 11,
		                        paddingTop:6,
		                        fontSize: 15,
		                        fontWeight : 'bold',
		                        borderColor:'#5ce24a'
		          		}}>
		          			<Icon style={{fontSize:15,color:'#8b8f96'}}
		                      name="ios-arrow-back"
		                      type="Ionicons"/>{' '}Return
		          		</Text>
		          	</TouchableWithoutFeedback>
		          	{this.displayPhoto()}
          		</View>
        	</React.Fragment>
	    );
  	}
}
