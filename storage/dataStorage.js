import { AsyncStorage } from 'react-native';

const STORAGE_KEY = "BIRD_DATA";

export default {
  birds: [],
  onBirdsUpdated: null,

  notifyChange() {
    this.onBirdsUpdated && this.onBirdsUpdated(this.birds);
  },

  async loadBirds() {
    try {
      const birds = await AsyncStorage.getItem(STORAGE_KEY);
      if (!birds) return;
      console.log("raw", birds);
      this.birds = JSON.parse(birds);
      this.notifyChange();
    } catch (err) {
      console.error("Could not load birds from local storage", err);
    }    
  },

  async saveBirds() {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.birds));
  },

  addBird(bird) {
    this.birds.push(bird);
    this.saveBirds();
    this.notifyChange();
  }  
};