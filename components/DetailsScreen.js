import React, { Component } from 'react';
import { 
  Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Picker, Image, AsyncStorage, StyleSheet} from 'react-native';
import birddata from './BirdData';
import { addBird } from '../src/storage/dataStorage';

// import styles from '../App';

// import Geolocation from 'react-native-geolocation-service';
//import App from '../App';
//import { getCurrentPositionAsync } from 'expo-location';
import CameraRoll from 'expo';
// import console = require('console');



class DetailsScreen extends Component {
  birdName = ""
  birdRarity = ""
  birdGeolocation= ""
  birdImagelink= ""
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
    //this.handleAddPhotosChange = this.handleAddPhotosChange.bind(this);

    // here goes adding pictures
    handleAddPhotosButtonPress = () => {
    console.log("handle_add_photo_change works")
     CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })

    .then(r => {
      this.setState({ imagelink: r.edges });
      this.birdImagelink = imagelink;
    })
    .catch((err) => {
       //Error Loading Images
    });
    
     };
    
    
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

  

    handleNameChange(name) {
      console.log("handleNameChange constructor");
      this.setState({ name });
      
      this.birdName = name;
    }

  // here goes rarity  
  handleRarityChange(rarity, index) {
    console.log("handleRarityChange: "+rarity+" i:"+index);
    this.birdRarity = rarity;
  }

  // here goes comment change
  handleCommentChange(comment){
    console.log("comment works");
    this.setState({ comment });
    this.birdComment = comment;
  }
  
  handleSubmit() {

    console.log("save button");
    //saveSettings(this.state);
    if(!this.birdName.length>0){
      alert("Any bird should have a name!")
      return;
    }
    console.log("I dont hate you")
    //let birdDataInstance = new BirdData();
    //var birdDataInstance = birddata;
    newBird = {
      name: this.birdName,
      rarity: this.birdRarity,
      geolocation: this.birdGeolocation,
      imagelink: this.birdImagelink,
      comment: this.birdComment,
      timestamp: this.birdTimestamp
    } 
    
    //birdDataInstance.addBird(newBird)
    addBird(this.state.newBird)
  }

render() {
  console.log("DetailsScreen render");
    return (
      <View style={styles.container}>
        <ScrollView> 
      

            <Image
              style={{width: 150, height: 150, marginTop: 8, alignSelf: "center"}}              
              source={{uri: 'https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg'}}
            />

            <TouchableOpacity 
              style = {styles.saveButton}              
              onPress={() => this.handleAddPhotosButtonPress} >            
              <Text style = {styles.saveButtonText}> Load image </Text>
            </TouchableOpacity>

                <ScrollView>
                  {this.state.imagelink}
                 {/*  {this.state.imagelink.map((p, i) => {
                  return (
                    <Image
                      key={i}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  );
                })} */}
                </ScrollView>
        
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
            
            <Picker style = {styles.textInput}
              selectedValue={this.birdRarity}
              placeholder="Choose rarity"
              onValueChange={(itemValue, itemIndex) => {
                this.setState({itemValue});
                this.handleRarityChange(itemValue, itemIndex)
                
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
        
          <TouchableOpacity style = {styles.saveButton}
            raised = {true}
            onPress={this.handleSubmit}
          >
            <Text style = {styles.saveButtonText}> Save </Text>
          </TouchableOpacity>
          
                
            
         {/*  <TouchableOpacity style = {styles.saveButton}   
            onPress={() => this.props.navigation.push('Details')}
          >
            <Text style = {styles.saveButtonText}> Go to Details... again </Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.saveButton}            
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style = {styles.saveButtonText}> Go to Home </Text>
          </TouchableOpacity> */}
            
          <TouchableOpacity style = {styles.saveButton}            
            //onPress={() => this.props.navigation.goBack()
            onPress={() => {this.cancel}}
          >
            <Text style = {styles.saveButtonText}> Cancel </Text>
          </TouchableOpacity>

        
      </ScrollView>  
      
    </View>   
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
    paddingBottom: 4,
  
    paddingStart: 4,
    paddingEnd: 4
  },

  text: {
    marginTop: 8,
    paddingStart: 24,

    fontSize: 18,
    alignItems: 'center'
    
  },

  
  textInput: {
    borderColor: '#CCCCCC',
    marginTop: 8,
    marginStart: 16,
    marginEnd: 16,
    paddingStart: 8,
    borderWidth: 1,
    fontSize: 18,
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
    marginEnd: 24,
    marginStart: 24,
    borderRadius: 25,
    elevation: 5
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center'
  },
});