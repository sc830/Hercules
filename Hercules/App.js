import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';

import Workout from './Views/workout';  // Renamed to Workout
import workoutList from './Views/workoutList';  // Changed to workoutList

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  // A new stack for Munchies tab screens

const WorkoutStackNavigator = () => (
  <Stack.Navigator initialRouteName="Workout" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Workout" component={Workout} />
    <Stack.Screen name="workoutList" component={workoutList} />
    <Stack.Screen name="AddBreakfast" component={AddBreakfastScreen} />
  </Stack.Navigator>
);

const WellnessScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity
      style={{ backgroundColor: 'purple', padding: 10, borderRadius: 5 }}
      onPress={() => navigation.navigate('AddBreakfast')}
    >
      <Text style={{ color: 'white' }}>Add Breakfast</Text>
    </TouchableOpacity>
  </View>
);


const AddBreakfastScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Add Breakfast Screen</Text>
    {/* Add the UI for adding breakfast details */}
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Muscles"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: 'purple',
            borderTopWidth: 2,
            borderTopColor: 'black',
          },
        }}
      >
        <Tab.Screen name="Muscles" component={WorkoutStackNavigator} />
        <Tab.Screen name="Mind" component={WellnessScreen} />
        <Tab.Screen name="Munchies" component={WellnessScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
