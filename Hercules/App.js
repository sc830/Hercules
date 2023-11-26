import React from 'react';
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from "firebase/app";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Views/main/Login';
import MainTabs from './Views//main/MainTabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
