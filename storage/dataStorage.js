import { AsyncStorage } from 'react-native';

const STORAGE_KEY = "BIRD_DATA";

export default {
  birds: [],
  onBirdsUpdated: null,

  loadBirds: async () => {
    const birds = await AsyncStorage.getItem(STORAGE_KEY);
    this.birds = birds;
    this.notifyChange();
  },

  saveBirds: async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.birds));
  },

  addBird: bird => {
    this.birds.push(bird);
    this.saveBirds();
    this.notifyChange();
  },

  notifyChange() {
    this.onBirdsUpdated && this.onBirdsUpdated(this.birds);
  }
};