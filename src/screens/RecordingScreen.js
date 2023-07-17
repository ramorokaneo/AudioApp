import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { getRecordings, deleteRecording } from '../helpers/recordingStorage';

const RecordingsScreen = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const retrievedRecordings = await getRecordings();
      setRecordings(retrievedRecordings);
    } catch (error) {
      console.log('Error fetching recordings:', error);
    }
  };

  const handleDeleteRecording = async (recording) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to delete ${recording.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRecording(recording.path);
              fetchRecordings();
              console.log('Recording deleted:', recording.path);
            } catch (error) {
              console.log('Error deleting recording:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteRecording(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={recordings}
        renderItem={renderItem}
        keyExtractor={(item) => item.path}
      />
    </View>
  );
};

export default RecordingsScreen;
