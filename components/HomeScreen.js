import React, { Component } from 'react';
import { View, Text, ListView, ListItem, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { AsyncStorage } from 'react-native';

//const asyncId = 'bird-1234567890-1';

const STORAGE_KEY = 'BIRD_DATAS';

const parseBirdDatas = (birdDatas) =>
  JSON.parse(birdDatas).map((birdData) => {
    birdData.createdAt = new Date(birdData.createdAt)
    return birdData;
  });
  
const getBirdArray = async () => {
  try {
    let birdDatas = await AsyncStorage.getItem(STORAGE_KEY);
    if (birdDatas === null) { return []; }
    return parseBirdDatas(birdDatas);
  } catch (error) {
    console.log('Error fetching High Scores', error);
  }
}

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Recorded Species',
  };

  constructor(props) {
    super(props);
    console.log("HomeScreen constructor");
    //this.birdArray = [];
    this.birdArray = getBirdArray();
    console.log("array["+ this.birdArray.length +"] content: " + this.birdArray)
    console.log( this.createBirdListText() )
    //this.birdDataInstance = birddata;
    /*var birdArray = [
      { id: 1, 
        name: "Pigeon Mike", 
        imagelink: "https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg", 
        rarity: "philps", 
        timestamp: "today", 
        comment: "New York"
      },
      { id: 2, 
        name: "Pigeon Steve", 
        imagelink: "https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg", 
        rarity: "Square", 
        timestamp: "today", 
        comment: "Chicago"
      },
      { id: 3, 
        name: "Pigeon John", 
        imagelink: "https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg", 
        rarity: "market", 
        timestamp: "today", 
        comment: "New York"
      },   
    ];  

    console.log('main test array created');

    var newBird = 
    { id: 4, 
      name: "Pigeon John", 
      imagelink: "https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg", 
      rarity: "market", 
      timestamp: "today", 
      comment: "New York"
    };

    console.log('test newBird created')
    birdArray[birdArray.length] = newBird;

    console.log('item added to test array');
    */
  }
  
  createBirdListText() {
    console.log("createBirdListText")
    //var birdArray = birdDataInstance.getData()
    var text = "\b"

    for (var i=0; i < this.birdArray.length; i++) {
      console.log("for loop");
      text= text + "\n"+ i +". bird, name: "+ this.birdArray[i].name + " ";
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
            <Text style = {styles.text}>Here goes list of species: {this.createBirdListText()}</Text>
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