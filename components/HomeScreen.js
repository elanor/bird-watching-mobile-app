import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  ListItem,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Button
} from "react-native";

import dataStorage from "../storage/dataStorage";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Recorded Species"
  };

  // инициализировали state пустым массивом
  state = {
    birds: []
  };

  // когда компонент создан, загружаем данные
  async componentDidMount() {
    try {
      // когда обновится список птиц, вызовется this.setState и компонент перерисуется
      dataStorage.onBirdsUpdated = (birds) => this.setState({ birds });

      // запускаем загрузку птичек из localStorage
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
    // Читаем птиц из state компонента
    const { birds } = this.state;
    return birds.map((bird, index) => `${index}. bird, name: ${bird}`);
  }

  render() {
    console.log("HomeScreen render");
    return (
      <View style={styles.container}>
        <ScrollView>
          {/*

            <Button
              icon={{
                  name: "sort"
                  size: 15
                  color: "black"
                }}
              onPress={() => {
                birdArray.sort(function(a, b) {
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
                });
                console.log('sorting button pressed')}}
            />  */}

          <Text style={styles.text}>
            Here goes list of species: {this.createBirdListText()}
          </Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("Details")}
          >
            <Text style={styles.saveButtonText}>Add new</Text>
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
    height: 44
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },

  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  inputContainer: {
    paddingTop: 15
  },

  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    paddingBottom: 4,
    paddingStart: 4,
    paddingEnd: 4
  },

  text: {
    marginTop: 8,
    paddingStart: 24,
    fontSize: 18,
    alignItems: "center"
  },

  textInput: {
    borderColor: "#CCCCCC",
    marginTop: 8,
    marginStart: 16,
    marginEnd: 16,
    paddingStart: 8,
    borderWidth: 1,
    fontSize: 18,
    alignItems: "flex-start"
  },

  textInputContainer: {
    height: 150,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "stretch"
  },

  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
    marginEnd: 24,
    marginStart: 24,
    borderRadius: 25,
    elevation: 5
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center"
  }
});
