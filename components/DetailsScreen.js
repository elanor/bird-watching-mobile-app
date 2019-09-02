import React, { Component } from 'react';
import { 
  View, Text, ScrollView, CameraRoll, TextInput, TouchableOpacity, Keyboard, Picker, Image, AsyncStorage, StyleSheet} from 'react-native';

import dataStorage from "../storage/dataStorage";

class DetailsScreen extends Component {
  birdName = "";
  birdRarity = "";
  birdImagelink = "";
  birdComment = "";
  birdTimestamp = "";

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRarityChange = this.handleRarityChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      rarity: "common",
      comment: "",
      date: ""
    };  
  }

  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();

    this.setState({
      date: date + "/" + month + "/" + year + " " + hours + ":" + min
    });
  }

  static navigationOptions = {
    title: "Details"
  };

  // here goes adding pictures
  handleAddPhotosButtonPress = () => {
    console.log("handle_add_photo_change works");
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos"
    })
      .then(r => {
        this.setState({ imagelink: r.edges });
        this.birdImagelink = imagelink;
      })
      .catch(err => {
        //Error Loading Images
      });
  };

  handleNameChange(name) {
    console.log("handleNameChange");
    this.setState({ name });
    this.birdName = name;
  }

  // here goes rarity
  handleRarityChange(rarity) {
    console.log("handleRarityChange: " + rarity);
    
    this.setState({ rarity });
    this.birdRarity = rarity;    
    
  }

  // here goes comment change
  handleCommentChange(comment) {
    console.log("handleCommentChange");
    this.setState({ comment });
    this.birdComment = comment;
  }

  handleSubmit() {
    console.log("handleSubmit save button");
    if (!this.birdName.length > 0) {
      alert("Any bird should have a name!");
      return;
    }

    // all fields of a bird written to this.state. So it is a description of a bird
    const newBird = this.state;

    //saving to storage
    dataStorage.addBird(newBird);
  }

  render() {
    console.log("DetailsScreen render");
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{
              width: 150,
              height: 150,
              marginTop: 8,
              alignSelf: "center"
            }}
            source={{
              uri:
                "https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg"
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.handleAddPhotosButtonPress}
          >
            <Text style={styles.saveButtonText}> Load image </Text>
          </TouchableOpacity>

          <ScrollView>
            {this.state.imagelink}
            {/*  to fix this!!! */}
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
            fontSize={18}
            placeholder="Species' name"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            returnKeyType="done"
            value={this.birdName}
            onChangeText={this.handleNameChange}
          />

          <Text style={styles.text}>Choose rarity</Text>

          <Picker
            style={styles.textInput}
            selectedValue={this.birdRarity}
            placeholder="Choose rarity"
            onValueChange={(itemValue, itemIndex) => {              
              this.handleRarityChange(itemValue, itemIndex);
            }}
          >
            <Picker.Item label='Please select an option...' value="0"/>
            <Picker.Item label="Common" value="Common" />
            <Picker.Item label="Rare" value="Rare" />
            <Picker.Item label="Extremely rare" value="ExtremelyRare" />
          </Picker>

          <TextInput
            style={styles.textInputContainer}
            style={styles.textInput}
            itemStyle="baseline"
            multiline={true}
            numberOfLines={4}
            placeholder="Comment"
            maxLength={170}
            returnKeyType="done"
            onBlur={Keyboard.dismiss}
            value={this.birdComment}
            onChangeText={this.handleCommentChange}
          />

          <Text style={styles.text}>Timestamp: {this.state.date}</Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.saveButtonText}> Save </Text>
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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.saveButtonText}> Cancel </Text>
        </TouchableOpacity>
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