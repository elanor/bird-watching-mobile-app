import React, { Component, console } from 'react';
import { Button, View, Text, FlatList, ListRenderItem, List, AsyncStorage } from 'react-native';
import BirdData from 'src/BirdData';

class HomeScreen extends Component {

  birdDataInstance;

  constructor(props) {
    super(props);
    this.birdDataInstance = new BirdData();
  }

  static navigationOptions = {
    title: 'Recorded species',
  };

  createBirdListText() {
    console.log('in createBirdListText()')
    //var birdArray = this.birdDataInstance.getData()
    var text = "\b"
    
    // this is wrong, should be changed!
    /*for (var i=0; i < birdArray.length; i++) {
      var currentBird = birdArray[i];
      text =+ ("round:" + i)
    }*/
    //console.log("cannot get array data from file")

    return text;
  }

        /* <FlatList style = {styles.container}>
          ListRenderItem = {this.createBirdListText}
        </FlatList> */

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <List style = {styles.container}>
          {this.createBirdListText}
        </List>

        <Button
          title="Add new"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default HomeScreen;