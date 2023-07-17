import React from 'react';
import { View, Button } from 'react-native';
import Sound from 'react-native-sound';

const PlayerScreen = () => {
  const playAudio = () => {
    const sound = new Sound('path_to_audio_file', '', (error) => {
      if (error) {
        console.log('Error loading audio:', error);
        return;
      }
      sound.play(() => {
        sound.release();
      });
    });
  };

  return (
    <View>
      <Button title="Play Audio" onPress={playAudio} />
    </View>
  );
};

export default PlayerScreen;

