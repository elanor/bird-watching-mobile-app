import React, { Component } from 'react';
import { Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard} from 'react-native';
//import styles from '../App';
// BirdData =require( './BirdData');
//import BirdData from './BirdData';

import birddata from './BirdData';


class DetailsScreen extends Component {
  birdName = "a"
  birdRarity = "a"
  birdGeolocation= "a"
  birdImagelink="a"
  birdComment = "a"
  birdTimestamp = "a"

  constructor(props) {
    super(props);
    console.log("details constructor");
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Details',
  };

  handleNameChange(name) {
    console.log("handleNameChange constructor");
    this.setState({ name });
    this.birdName=name;
  }
  
  handleSubmit() {
    console.log("handleSubmit constructor");
    //saveSettings(this.state);
    if(!this.birdName.length>0){
      alert("hulabaloo")
      return;
    }
    console.log("I dont hate you")
    //let birdDataInstance = new BirdData();
    var birdDataInstance = birddata;
    console.log("I hate you")
    /* newBird = {
      name: this.birdName,
      rarity: this.birdRarity,
      geolocation: this.birdGeolocation,
      imagelink: this.birdImagelink,
      comment: this.birdComment,
      timestamp: this.birdTimestamp
    } */
    console.log("I am confused")

    //birdDataInstance.addBird(newBird);

    console.log("bring da drinks")
  }

/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} */
/* style={styles.inputContainer} */

render() {
  console.log("DetailsScreen render");
    return (
      
      <View>
        <ScrollView> 
        
            <TextInput 
              //style={styles.textInput}
              placeholder="Species' name"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.birdName}
              onChangeText={this.handleNameChange}
            />

            <TouchableOpacity
              // style={styles.saveButton}
              onPress={this.handleSubmit}
            >
              <Text 
              //style={styles.saveButtonText}
              >Save</Text>
            </TouchableOpacity>
          
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
    </ScrollView> 
      </View>
       
    );
  }
}

export default DetailsScreen;