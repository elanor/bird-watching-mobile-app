import React, { Component } from 'react';
import { Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import styles from '../App';
import App from '../App';

class DetailsScreen extends Component {
  birdName = ""
  birdRarity = ""
  birdGeolocation= ""
  birdImagelink=""
  birdComment = ""
  birdTimestamp = ""

  constructor(props) {
    super(props);
    //this.state = { name: '' }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  static navigationOptions = {
    title: 'Details',
  };

  handleNameChange(name) {
    this.setState({ name });
    this.birdName=name;
  }
  
  handleSubmit() {
    //saveSettings(this.state);
    var birdDataInstance = new BirdData();
    newBird = {
      name: this.birdName,
      rarity: this.birdRarity,
      geolocation: this.birdGeolocation,
      imagelink: this.birdImagelink,
      comment: this.birdComment,
      timestamp: this.birdTimestamp
    }

    birdDataInstance.addBird(newBird)
  }

/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} */
/* style={styles.inputContainer} */

render() {
    return (
      <ScrollView> 
      <View>
        
            <TextInput 
              style={styles.textInput}
              placeholder="Species' name"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.name}
              onChangeText={this.handleNameChange}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.saveButtonText}>Save</Text>
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
        
      </View>
      </ScrollView>  
    );
  }
}

export default DetailsScreen;