import { AsyncStorage } from 'react-native';

// Key for storing recordings in AsyncStorage
const RECORDINGS_STORAGE_KEY = '@recordings';

// Function to save a new recording to AsyncStorage
export const storeRecording = async (path) => {
  try {
    const recordings = await getRecordings();
    const newRecording = { name: `Recording ${recordings.length + 1}`, path };
    const updatedRecordings = [...recordings, newRecording];
    await AsyncStorage.setItem(RECORDINGS_STORAGE_KEY, JSON.stringify(updatedRecordings));
  } catch (error) {
    console.log('Error storing recording:', error);
  }
};

// Function to fetch all recordings from AsyncStorage
export const getRecordings = async () => {
  try {
    const recordings = await AsyncStorage.getItem(RECORDINGS_STORAGE_KEY);
    if (recordings !== null) {
      return JSON.parse(recordings);
    } else {
      return [];
    }
  } catch (error) {
    console.log('Error getting recordings:', error);
    return [];
  }
};

// Function to delete a recording from AsyncStorage
export const deleteRecording = async (path) => {
  try {
    const recordings = await getRecordings();
    const updatedRecordings = recordings.filter((recording) => recording.path !== path);
    await AsyncStorage.setItem(RECORDINGS_STORAGE_KEY, JSON.stringify(updatedRecordings));
  } catch (error) {
    console.log('Error deleting recording:', error);
  }
};
