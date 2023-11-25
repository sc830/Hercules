import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components here
import Workout from '../muscles/workout';
import workoutList from '../muscles/workoutList';
import addRepsWeights from '../muscles/addRepsWeights';
import Munchies from '../munchies/Munchies';
import BreakfastScreen from '../munchies/BreakfastScreen';
import LunchScreen from '../munchies/LunchScreen';
import DinnerScreen from '../munchies/DinnerScreen';
import Mindfulness from '../mind/Mindfulness';
import TrackIntakeScreen from '../mind/TrackIntakeScreen'; // used in Mindfulness
import IngredientsScreen from '../munchies/Ingredients';

// Import styles
import AppStyles from './AppStyles'; // Ensure this path is correct

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStackNavigator = () => (
  <Stack.Navigator screenOptions={AppStyles.stackScreenOptions}>
    <Stack.Screen name="Workout" component={Workout} />
    <Stack.Screen name="workoutList" component={workoutList} />
    <Stack.Screen name="addRepsWeights" component={addRepsWeights} />
  </Stack.Navigator>
);

const MindScreen = () => (
  <Stack.Navigator screenOptions={AppStyles.stackScreenOptions}>
    <Stack.Screen name="Mindfulness" component={Mindfulness} />
    <Stack.Screen name="TrackIntakeScreen" component={TrackIntakeScreen} />
  </Stack.Navigator>
);

const MunchiesScreen = () => (
  <Stack.Navigator screenOptions={AppStyles.stackScreenOptions}>
    <Stack.Screen name="Munchies" component={Munchies} />
    <Stack.Screen name="BreakfastScreen" component={BreakfastScreen} />
    <Stack.Screen name="LunchScreen" component={LunchScreen} />
    <Stack.Screen name="DinnerScreen" component={DinnerScreen} />
    <Stack.Screen name="IngredientsScreen" component={IngredientsScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Muscles"
      screenOptions={{
        tabBarActiveTintColor: AppStyles.tabBarOptions.activeTintColor,
        tabBarInactiveTintColor: AppStyles.tabBarOptions.inactiveTintColor,
        tabBarStyle: AppStyles.tabBarStyle,
      }}
    >
      <Tab.Screen name="Muscles" component={WorkoutStackNavigator} />
      <Tab.Screen name="Mind" component={MindScreen} />
      <Tab.Screen name="Munchies" component={MunchiesScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
