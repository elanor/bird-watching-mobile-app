import React, { Component } from 'react';
import { Button, View, Text, ListView } from 'react-native';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.birdDataInstance = new BirdData();
  }

  createBirdListText() {
    var birdArrray = this.birdDataInstance.getData()
    var text = "\b"
    /* var l = birdArrray.length
    var i=0
    while (l<i){

      i++;

    } */

    for (var i=0; i < birdArrray.length; i++) {
      
    }

    return 
  }
  static navigationOptions = {
    title: 'Recorded species',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here goes list of species{this.createBirdListText}</Text>
        <Button
          title="Add new"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default HomeScreen;