import { AsyncStorage } from '@react-native';

const STORAGE_KEY = 'BIRD_DATAS';

const parseBirdDatas = (birdDatas) =>
  JSON.parse(birdDatas).map((birdData) => {
    birdData.createdAt = new Date(birdData.createdAt)
    return birdData;
  });

export const fetchBirdDatas = async () => {
  try {
    let birdDatas = await AsyncStorage.getItem(STORAGE_KEY);

    if (birdDatas === null) { return []; }

    return parseBirdDatas(birdDatas);
  } catch (error) {
    console.log('Error fetching BIRD DATAS', error);
  }
}

export const saveBirdDatas = (birdDatas) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(birdDatas));
}

export const mergeBirdDatas = (birdDatas, birdArray) => {
  const score = {
    score: birdArray,
    createdAt: new Date()
  };

  return [...birdDatas, score];
}