import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';
import { storeRecording } from '../helpers/recordingStorage';

const RecorderScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const path = await SoundRecorder.start();
      setIsRecording(true);
      console.log('Recording started at:', path);
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const path = await SoundRecorder.stop();
      setIsRecording(false);
      console.log('Recording stopped. File saved at:', path);
      storeRecording(path); // Save recording to storage
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  const navigateToRecordings = () => {
    navigation.navigate('Recordings');
  };

  return (
    <View>
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <Button title="View Recordings" onPress={navigateToRecordings} />
    </View>
  );
};

export default RecorderScreen;
