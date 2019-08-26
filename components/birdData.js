class BirdData {
  //static instance;

  constructor() {
    console.log("birdData constructor");
/*     const instance= this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this; */
    //this.instance = this;

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
   
    var birdArray = [];    
    //
    birdArray = this.readBirdsArrayFromFile();
  }

    // give current array to outside
    get birdArray() {
      console.log("birdArray");
      return this.birdArray;
    }

    //read birdArray from file
    readBirdsArrayFromFile() {
      console.log("readBirdsArrayFromFile");
      /* newBird = {
        name: "B",
        rarity: "B",
        geolocation: "B",
        imagelink: "B",
        comment: "B",
        timestamp: "B"
      }
      var newBirdArray = {newBird}; //= read from file :)
      return newBirdArray; */
    }

    // only for internal use
    updateFile() {
      console.log("updateFile");
      // save current birdArray to file
    }

    //takes in ONE new bird object and add it to array
    addBird(newBird) {
      console.log("addBird");
      
      //next causes eternal loop
      //this.birdArray.push(newBird);
      
      this.updateFile();
    }
}
const birddata = new BirdData();
export default birddata;

