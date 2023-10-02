import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import Workout from './Views/workout';  // Renamed to Workout
import workoutList from './Views/workoutList';  // Changed to workoutList

const Tab = createBottomTabNavigator();
const WorkoutStack = createStackNavigator();  // This is for navigating between Workout and its details

const WorkoutStackNavigator = () => {
  return (
    <WorkoutStack.Navigator initialRouteName="Workout" screenOptions={{ headerShown: false }}>
      <WorkoutStack.Screen name="Workout" component={Workout} />
      <WorkoutStack.Screen name="workoutList" component={workoutList} />
    </WorkoutStack.Navigator>
  );
};

const NutritionScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Nutrition Screen</Text>
  </View>
);

const WellnessScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Wellness Screen</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Fitness"
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
        <Tab.Screen name="Mind" component={NutritionScreen} />
        <Tab.Screen name="Munchies" component={WellnessScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;