import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFishListings = async () => {
  try {
    const data = await AsyncStorage.getItem('fishListings');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading fish listings:', error);
    return [];
  }
};

export const saveFishListings = async (listings) => {
  try {
    await AsyncStorage.setItem('fishListings', JSON.stringify(listings));
  } catch (error) {
    console.error('Error saving fish listings:', error);
  }
};

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};