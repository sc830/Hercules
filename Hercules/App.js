import React from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

const App = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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