import React, { Component } from 'react';
import { Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Picker, AsyncStorage} from 'react-native';

// import Geolocation from 'react-native-geolocation-service';
//import App from '../App';
//import { getCurrentPositionAsync } from 'expo-location';
//import { CAMERA } from 'expo-permissions';
//import { isFrontCameraAvailable } from 'expo/build/AR';
// import console = require('console');

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
  
    this.handleRarityChange = this.handleRarityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Details',
  };

  handleAddPhotosButtonPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })

      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };

  handleNameChange(name) {
    this.setState({ name });
    this.birdName = name;
  }

  // here goes rarity
  handleRarityChange(rarity) {

    this.setState({ rarity });
    this.birdRarity = rarity;
  }

  // here goes comment change
  handleCommentChange(comment){
    this.setState({ comment });
    this.birdComment = comment;
  }

  // here goes geolocation. Have not checked yet if this works
  /* handleGeolocationChange(geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    }, err => console.log(err));
  } */
  
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
      <View style={styles.inputContainer}>

            <Image onPress = {this.handleAddPhotosButtonPress}
              style={{width: 50, height: 50}}
              source={{ uri: p.node.image.uri }}
            />
        
            <TextInput 
              style={styles.textInput}
              placeholder="Species' name"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.name}
              // onChangeText={this.handleNameChange}
            />
            
            <Picker
              selectedValue={this.state.rarity}
              placeholder="Choose rarity"
              style={{height: 50, width: 100}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({rarity: itemValue})
                this.birdRarity = rarity; 
              }
              }>
                
                {/* maybe here value is wrong? */}
              <Picker.Item label="Common" value={this.state.rarity} />
              <Picker.Item label="Rare" value={this.state.rarity} />
              <Picker.Item label="ExtremelyRare" value={this.state.rarity}/>
              
            </Picker>

            <TextInput 
              style={styles.textInput}
              placeholder="Comment"
              maxLength={170}
              onBlur={Keyboard.dismiss}
              value={this.state.comment}
              // onChangeText={this.handleNameChange}
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