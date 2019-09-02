import React, { Component } from 'react';
import { View, Text, ListView, ListItem, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage, Button } from 'react-native'
import dataStorage from "../storage/dataStorage";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Recorded Species"
  };

  // initialize state with empty array
  state = {
    birds: []
  };

  // when component is created, upload data
  async componentDidMount() {
    try {
      // when list of birds updated, called this.setState and component updated
      dataStorage.onBirdsUpdated = birds => this.setState({ birds });

      // load all the birds from localStorage
      await dataStorage.loadBirds();

    } catch (e) {
      console.log("Could not load birds from local storage");
    }
  }

  constructor(props) {
    super(props);
    console.log("HomeScreen constructor");

    // тут всегда будет пусто, потому что когда запускается конструктор, данных еще нет
    console.log(this.createBirdListText());

  }

  createBirdListText() {
    // read birds from state of component
    const { birds } = this.state;
    return birds.map((bird, index) => `${index}. bird, name: ${bird.name}, rarity: ${bird.rarity}, comment: ${bird.comment}, created: ${bird.date}`).join('\n');
    
  }

  render() {
    console.log("HomeScreen render");
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* To fix this! */}
          
            <Button style = {styles.saveButton}
            
            title = "Sort birds"
              icon={{
                  name: '/assets/sort',
                  size: 15,
                  color: "black"
                }}
              onPress={() => {
                console.log("sorting button pressed")
                this.birds.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  // names must be equal
                  return 0;
                })
              }
                }
            />  

          <Text style={styles.text}>
            Here goes list of species: 
            </Text>
          <Text style={styles.text}>
            {this.createBirdListText()}
          </Text>
          
        </ScrollView>

        <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("Details")}
          >
            <Text style={styles.saveButtonText}>Add new</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5},
    inputContainer: {
    paddingTop: 15
  },

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