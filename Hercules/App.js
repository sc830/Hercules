import React from 'react';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from "firebase/app";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import Workout from './Views/workout'; // Renamed to Workout
import workoutList from './Views/workoutList'; // Changed to workoutList
import addRepsWeights from './Views/addRepsWeights';

import Munchies from './Views/Munchies'; // Renamed to Workout
import BreakfastScreen from './Views/BreakfastScreen';
import LunchScreen from './Views/LunchScreen';
import DinnerScreen from './Views/DinnerScreen';

const firebaseConfig = {
  apiKey: "AIzaSyCoxkZvQiNLd-wZrqSJB8dKE2EyHJ11O8U",
  authDomain: "hercules-fc42e.firebaseapp.com",
  projectId: "hercules-fc42e",
  storageBucket: "hercules-fc42e.appspot.com",
  messagingSenderId: "501456721475",
  appId: "1:501456721475:web:7cc30d4a6c8f34320826f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Workout" component={Workout} />
    <Stack.Screen name="workoutList" component={workoutList} />
    <Stack.Screen name="addRepsWeights" component={addRepsWeights} />
  </Stack.Navigator>
);

const MindScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
    <Text style={{ color: 'white' }}>Mind Screen</Text>
  </View>
);


const MunchiesScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Munchies" component={Munchies} />
    <Stack.Screen name="BreakfastScreen" component={BreakfastScreen} />
    <Stack.Screen name="LunchScreen" component={LunchScreen} />
    <Stack.Screen name="DinnerScreen" component={DinnerScreen} />
  </Stack.Navigator>
);

const App = () => {
  /* try {
    const docRef = await addDoc(collection(db, "users"), {   // adds docs to collection userData
      first: "Ada",                                             // if it doesn't exist, creates collection userData
      last: "Lovelace",                                         // creates new collection with three documents:
      born: 1815                                                // first, last, and born
    });                                                         // docRef is auto-generated 
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  } */
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Muscles"
        screenOptions={{
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: 'purple',
          },
        }}
      >
        <Tab.Screen name="Muscles" component={WorkoutStackNavigator} />
        <Tab.Screen name="Mind" component={MindScreen} />
        <Tab.Screen name="Munchies" component={MunchiesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};






export default App;