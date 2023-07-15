import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Ionicons';
import { check, PERMISSIONS, request } from 'react-native-permissions';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecorderApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  useEffect(() => {
    check(PERMISSIONS.ANDROID.RECORD_AUDIO)
      .then((result) => {
        if (result !== 'granted') {
          request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const startRecording = async () => {
    const path = 'your-audio-path.mp3';
    const result = await audioRecorderPlayer.startRecorder(path);

    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording Progress', e.current_position);
    });

    setIsRecording(true);
    setAudioPath(result);
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setIsRecording(false);
    setAudioPath(result);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Icon
          name={isRecording ? 'stop-circle' : 'mic-circle-outline'}
          size={72}
          color={isRecording ? 'red' : 'green'}
        />
      </TouchableOpacity>
      {audioPath ? (
        <Text style={styles.audioPathText}>Audio Path: {audioPath}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 32,
  },
  audioPathText: {
    marginTop: 16,
  },
});

export default AudioRecorderApp;
