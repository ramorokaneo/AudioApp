import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecorderScreen from './src/screens/RecorderScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import RecordingScreen from './src/screens/RecordingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recorder">
        <Stack.Screen name="Recorder" component={RecorderScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Recordings" component={RecordingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

