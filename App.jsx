import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeScreen from './src/screen/LikeScreen';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
          initialRouteName="Like_Screen"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Like_Screen" component={LikeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
