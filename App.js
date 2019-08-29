import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
}); */

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    elevation: 5
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center'
  },
});