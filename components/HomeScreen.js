import React, { Component } from 'react';
import { Button, View, Text, ListView, ListItem } from 'react-native'

import styles from '../App';
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here goes list of species{this.createBirdListText}</Text>
        <Button 
          style = {styles.saveButton}
          title="Add new"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      
      </View>
    );
  }
}

export default HomeScreen;