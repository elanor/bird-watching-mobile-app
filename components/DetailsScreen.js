import React, { Component } from 'react';
import { 
  Button, View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Picker, Image, AsyncStorage, StyleSheet} from 'react-native';

//import birddata from './BirdData';

//import { addBird } from '../src/storage/dataStorage';

// import styles from '../App';

// import Geolocation from 'react-native-geolocation-service';
//import App from '../App';
//import { getCurrentPositionAsync } from 'expo-location';
import CameraRoll from 'expo';
import HomeScreen from './HomeScreen';
// import console = require('console');

const asyncId = 'bird-1234567890-2';
const STORAGE_KEY = 'BIRD_DATAS';
/* const getBirdArray =  async () => {
  var array = []
  try {
    array += JSON.parse(await AsyncStorage.getItem('asyncId') || 'none');
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return array;
} */
const getBirdArray = async () => {
  try {
    let birdDatas = await AsyncStorage.getItem(STORAGE_KEY);

    if (birdDatas === null) { return []; }

    return parseBirdDatas(birdDatas);
  } catch (error) {
    console.log('Error fetching High Scores', error);
  }
}

const fetchBirdDatas = async () => {
  try {
    let birdDatas = await AsyncStorage.getItem(STORAGE_KEY);

    if (birdDatas === null) { return []; }

    return parseBirdDatas(birdDatas);
  } catch (error) {
    console.log('Error fetching BirdDatas', error);
  }
}

const parseBirdDatas = (birdDatas) =>
  JSON.parse(birdDatas).map((birdData) => {
    birdData.createdAt = new Date(birdData.createdAt)
    return birdData;
  });

const updateBirdDatas = async (birdArray) => {
  try {
    let birdDatas = await fetchBirdDatas();
    highScores = mergeBirdDatas(birdDatas, birdArray);
    saveBirdDatas(birdDatas);

    this.setState({ birdDatas });

    console.log('Bird Datas', this.state.birdDatas);
  } catch (error) {
    console.log('Error fetching Bird Datas', error);
  }
}


const mergeBirdDatas = (birdDatas, birdArray) => {
  const score = {
    score: birdArray,
    createdAt: new Date()
  };

  return [...birdDatas, score];
}


const saveBird = async inBirdArray => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(inBirdArray));
  }

class DetailsScreen extends Component {
  birdName = ""
  birdRarity = ""
  birdGeolocation= ""
  birdImagelink= ""
  birdComment = ""
  birdTimestamp = ""

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this); 
    this.handleRarityChange = this.handleRarityChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      //defauilt value of the date time
      name: '',
      rarity: '',
      comment: '',
      date: '',
    };
    //this.handleAddPhotosChange = this.handleAddPhotosChange.bind(this);

  this.birdArray = [];
    this.birdArray = this.birdArray + getBirdArray();
    console.log("array content: " + this.birdArray)

    // here goes adding pictures
    handleAddPhotosButtonPress = () => {
      console.log("handle_add_photo_change works")
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })

      .then(r => {
        this.setState({ imagelink: r.edges });
        this.birdImagelink = imagelink;
      })
      .catch((err) => {
        //Error Loading Images
      });
    };
        
  }

  componentDidMount() {
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    var hours = new Date().getHours();
    var min = new Date().getMinutes(); 

    this.setState({      
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min,
    });
  }

  static navigationOptions = {
    title: 'Details',
  };

    handleNameChange(name) {
      console.log("handleNameChange");
      this.setState({ name });
      this.birdName = name;
    }

  // here goes rarity  
  handleRarityChange(rarity, index) {
    console.log("handleRarityChange: "+rarity+" i:"+index);
    this.birdRarity = rarity;
  }

  // here goes comment change
  handleCommentChange(comment){
    console.log("handleCommentChange");
    this.setState({ comment });
    this.birdComment = comment;
  }
  
  handleSubmit() {
    console.log("handleSubmit save button");
    //saveSettings(this.state);
    if(!this.birdName.length>0){
      alert("Any bird should have a name!")
      return;
    }
    console.log("handleSubmit 2");
    newBird = {
      name: this.birdName,
      rarity: this.birdRarity,
      //imagelink: this.birdImagelink,
      comment: this.birdComment,
      timestamp: this.birdTimestamp
    } 

    this.birdArray[this.birdArray.length] = newBird;
    console.log("handleSubmit add new bird: " + this.birdArray.toString() );
    updateBirdDatas(this.birdArray);
    console.log("handleSubmit bird array length:" + this.birdArray.length);
    console.log("handleSubmit save bird :" + this.birdArray);
  }

render() {
  console.log("DetailsScreen render");
    return (
      <View style={styles.container}>
        <ScrollView> 

            <Image
              style={{width: 150, height: 150, marginTop: 8, alignSelf: "center"}}              
              source={{uri: 'https://www.allaboutbirds.org/guide/assets/photo/66031271-480px.jpg'}}
            />

            <TouchableOpacity 
              style = {styles.saveButton}              
              onPress={() => this.handleAddPhotosButtonPress} >            
              <Text style = {styles.saveButtonText}> Load image </Text>
            </TouchableOpacity>

                <ScrollView>
                  {this.state.imagelink}
                 {/*  {this.state.imagelink.map((p, i) => {
                  return (
                    <Image
                      key={i}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  );
                })} */}
                </ScrollView>
        
            <TextInput 
              style={styles.textInput}
              fontSize = {18}
              placeholder="Species' name"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              returnKeyType="done"
              value={this.birdName}
              onChangeText={this.handleNameChange}
            />

            <Text style = {styles.text}>Choose rarity</Text>
            
            <Picker style = {styles.textInput}
              selectedValue={this.birdRarity}
              placeholder="Choose rarity"
              onValueChange={(itemValue, itemIndex) => {
                this.setState({itemValue});
                this.handleRarityChange(itemValue, itemIndex)
                
                }
              }>

              <Picker.Item label="Common" value="Common"/>
              <Picker.Item label="Rare" value="Rare" />
              <Picker.Item label="Extremely rare" value="ExtremelyRare"/>
            </Picker>

            <TextInput
              style={styles.textInputContainer}
              style = {styles.textInput}
              itemStyle = "baseline"
              multiline = {true}
              numberOfLines = {4}
              placeholder="Comment"
              maxLength={170}
              returnKeyType="done"
              onBlur={Keyboard.dismiss}
              value={this.birdComment}
              onChangeText={this.handleCommentChange}
            />

          <Text
            style={styles.text}>Timestamp: {this.state.date}
          </Text>
        
          <TouchableOpacity style = {styles.saveButton}
            raised = {true}
            onPress={this.handleSubmit}
          >
            <Text style = {styles.saveButtonText}> Save </Text>
          </TouchableOpacity>
          
                
            
         {/*  <TouchableOpacity style = {styles.saveButton}   
            onPress={() => this.props.navigation.push('Details')}
          >
            <Text style = {styles.saveButtonText}> Go to Details... again </Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.saveButton}            
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style = {styles.saveButtonText}> Go to Home </Text>
          </TouchableOpacity> */}
            
          <TouchableOpacity style = {styles.saveButton}            
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style = {styles.saveButtonText}> Cancel </Text>
          </TouchableOpacity>

        
      </ScrollView>  
      
    </View>   
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({

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