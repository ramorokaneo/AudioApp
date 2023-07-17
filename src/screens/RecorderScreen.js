import React, { useState } from 'react';
import { View, Button } from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';

const RecorderScreen = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const path = await SoundRecorder.start(path);
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
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  return (
    <View>
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
    </View>
  );
};

export default RecorderScreen;
