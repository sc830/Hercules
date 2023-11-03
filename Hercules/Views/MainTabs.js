import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components here
import Workout from './workout';
import workoutList from './workoutList';
import addRepsWeights from './addRepsWeights';
import Munchies from './Munchies';
import BreakfastScreen from './BreakfastScreen';
import LunchScreen from './LunchScreen';
import DinnerScreen from './DinnerScreen';

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

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Muscles"
      tabBarOptions={{
        activeTintColor: 'gray',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: 'purple',
        },
      }}
    >
      <Tab.Screen name="Muscles" component={WorkoutStackNavigator} />
      <Tab.Screen name="Munchies" component={MunchiesScreen} />
      <Tab.Screen name="Mind" component={MindScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
