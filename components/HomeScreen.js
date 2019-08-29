import React, { Component } from 'react';
import { View, Text, ListView, ListItem, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import birddata from './BirdData';



class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Recorded Species',
  };

  constructor(props) {
    super(props);
    console.log("HomeScreen constructor");
    this.birdDataInstance = birddata;
  }

  
  
  createBirdListText() {
    console.log("createBirdListText")
    var birdArray = birdDataInstance.getData()
    var text = "\b"
    /* var l = birdArrray.length
    var i=0
    while (l<i){

      i++;

    } */

    for (var i=0; i < birdArray.length; i++) {
      console.log("for loop");
      if(i>500){
        console.log("InfiniteLoop!!!! or 100000+ birds")
        return "";
      }
    }
    return text;
  }

  render() {
    console.log("bird constructor");
    return (
        <View style={styles.container}>
          <ScrollView >
            <Text style = {styles.text}>Here goes list of species{this.createBirdListText}</Text>
            {/* <ListView>
              {this.birdDataInstance.getData(name)}

            </ListView> */}

            <TouchableOpacity 
              style = {styles.saveButton}
              onPress={() => this.props.navigation.navigate('Details')}
            >
              <Text style = {styles.saveButtonText}>Add new</Text>
            </TouchableOpacity>
          </ScrollView>
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