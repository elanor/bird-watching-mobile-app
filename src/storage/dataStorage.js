import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'SETTINGS';

export const saveSettings = (settings) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}