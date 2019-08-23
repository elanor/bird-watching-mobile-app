//Singleton class
class BirdData{
  static instance;

  constructor(){
    if (instance) {
      return instance;
    }

    this.instance = this;
    birdArray = this.readBirdsArrayFromFile()
  }

  /*
  bird = {
      name: "Pigeon",
      rarity: "Common",
      geolocation: "Finland"
      imagelink: "/Eddard_Amoka.jpg",
      comment:"blah",
      timestamp: "1667899",
    };
  */
  birdArray =[]

  // give current array to outside
  getData() {
    return this.birdArray;
  }

  //read birdArray from file
  readBirdsArrayFromFile(){
    var newBirdArray //= read from file :)
    return newBirdArray
  }

  // only for internal use
  updateFile(){
    
    // save current birdArray to file
  }

  //takes in ONE new bird object and add it to array
  addBird(newBird) {
    this.birdArray.push(newBird)
    this.updateFile()
  }

}