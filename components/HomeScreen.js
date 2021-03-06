import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import dataStorage from "../storage/dataStorage";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Recorded Species"
  };

  // initialize state with empty array
  state = {
    birds: [],
    sorting: "asc"
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
  }

  createBirdListText() {
    // read birds from state of component
    const { birds } = this.state;
    return birds
      .map(
        (bird, index) =>
          `${index + 1}. bird\nname: ${bird.name}\nrarity: ${
            bird.rarity
          }\ncreated: ${bird.date}\ncomment: ${bird.comment}\n`
      )
      .join("\n");
  }

  render() {
    console.log("HomeScreen render");
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>Tap the list to change sorting order</Text>

          <TouchableOpacity
            onPress={() => {
              const { sorting, birds } = this.state;
              const sortedBirds = [...birds].sort((a, b) => {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
              });
              const newSorting = sorting === "asc" ? "desc" : "asc";
              if (newSorting === "desc") {
                sortedBirds.reverse();
              }
              this.setState({
                sorting: newSorting,
                birds: sortedBirds
              });
            }}
          >
            <Text style={styles.text}>{this.createBirdListText()}</Text>
          </TouchableOpacity>
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
    marginTop: 8,
    fontSize: 18,
    alignItems: "flex-start"
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
