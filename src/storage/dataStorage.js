import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'SETTINGS';


export const addBird = (settings) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  console.log(addBird);
}