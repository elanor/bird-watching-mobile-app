import React, { Component } from 'react';
import { Button, View, Text, ListView } from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Recorded species',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here goes list of species</Text>
        <Button
          title="Add new"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default HomeScreen;