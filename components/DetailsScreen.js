import React, { Component } from 'react';
import { 
  Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Picker, Image, AsyncStorage, StyleSheet} from 'react-native';
import birddata from './BirdData';

// import styles from '../App';

// import Geolocation from 'react-native-geolocation-service';
//import App from '../App';
//import { getCurrentPositionAsync } from 'expo-location';
//import { CAMERA } from 'expo-permissions';
//import { isFrontCameraAvailable } from 'expo/build/AR';
// import console = require('console');

class DetailsScreen extends Component {
  birdName = "Name of a bird"
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

    this.state = {
      //defauilt value of the date time
      date: '',
    };

    /*
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); */
  }

  componentDidMount() {
    var that = this;

    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    var hours = new Date().getHours();
    var min = new Date().getMinutes(); 

    that.setState({
      
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min,
    });
  }

  static navigationOptions = {
    title: 'Details',
  };

  /* handleAddPhotosButtonPress = () => {
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
    }; */

    handleNameChange(name) {
      console.log("handleNameChange constructor");
      this.setState({ name });
      
      this.birdName = name;
    }

  // here goes rarity
  
  handleRarityChange(rarity) {
    console.log("picker works");
    this.setState({ rarity });
    this.birdRarity = rarity;
  }

  // here goes comment change
  handleCommentChange(comment){
    console.log("comment works");
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

    console.log("handleSubmit constructor");
    //saveSettings(this.state);
    if(!this.birdName.length>0){
      alert("Any bird should have a name!")
      return;
    }
    console.log("I dont hate you")
    //let birdDataInstance = new BirdData();
    var birdDataInstance = birddata;
    console.log("I hate you")
    newBird = {
      name: this.birdName,
      rarity: this.birdRarity,
      geolocation: this.birdGeolocation,
      imagelink: this.birdImagelink,
      comment: this.birdComment,
      timestamp: this.birdTimestamp
    } 
    
    console.log("I am confused")

    //birdDataInstance.addBird(newBird);

    console.log("bring da drinks")

    birdDataInstance.addBird(newBird)
  }

/* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} */
/* style={styles.inputContainer} */

render() {
  console.log("DetailsScreen render");
    return (
      <ScrollView> 
      <View style={styles.container}>

            <Image
              style={{width: 150, height: 150, alignSelf: "center"}}
              
              source={{uri: 'https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg'}}
            />
        
            <TextInput 
              style={styles.textInput}

              fontSize = {18}
              placeholder="Species' name"
              maxLength={20}

              onBlur={Keyboard.dismiss}
              value={this.birdName}
              onChangeText={this.handleNameChange}
            />

            <Text style = {styles.text}>Choose rarity</Text>
            
            <Picker style = {styles.text}
              selectedValue={this.handleRarityChange}
              placeholder="Choose rarity"
              
              onValueChange={(itemValue, itemIndex) => {
                this.setState({rarity: itemValue});
                // this.birdRarity = rarity; 
                rarity = this.birdRarity;
              }
              }>
                
                {/* maybe here value is wrong? */}
              <Picker.Item label="Common" value="Common"/>
              <Picker.Item label="Rare" value="Rare" />
              <Picker.Item label="Extremely rare" value="ExtremelyRare"/>
              
            </Picker>

            <TextInput
              style={styles.textInputContainer}
              style = {styles.textInput}
              itemStyle = "baseline"
              multiline = {true}
              numberOfLines = {4}
              placeholder="Comment"
              maxLength={170}
              onBlur={Keyboard.dismiss}
              value={this.handleCommentChange}
              // onChangeText={this.handleNameChange}
            />

          <Text
            style={styles.text}>Timestamp: {this.state.date}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5FCFF' }}>

          <Button style = {styles.saveButton}
            title="Save"
            raised = {true}
            onPress={this.handleSubmit}>
                
          </Button>
            
          <Button style = {styles.saveButton}
            type="outline"
            raised = {true}
            title="Go to Details... again"
            onPress={() => this.props.navigation.push('Details')}
          />
          <Button style = {styles.saveButton}
            title="Go to Home"
            raised = {true}
            type="outline"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button style = {styles.saveButton}
            title="Go back"
            raised = {true}
            type="outline"
            onPress={() => this.props.navigation.goBack()}
          />

        </View>
        
      
      </ScrollView>  
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingBottom: 16,
    paddingTop: 16,
    paddingStart: 16,
    paddingEnd: 16
  },

  text: {
    marginTop: 8,
    paddingStart: 8,
    
    fontSize: 20,
    alignItems: 'flex-start'
    
  },

  
  textInput: {
    borderColor: '#CCCCCC',
    marginTop: 8,
    paddingStart: 8,
    borderWidth: 1,
    fontSize: 20,
    alignItems: 'flex-start'
    
  },

  textInputContainer: {
    height: 150,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'stretch'


  },

  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    alignItems: 'center'
  },
});