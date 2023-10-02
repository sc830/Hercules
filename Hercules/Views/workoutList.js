import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutList = ({ route }) => {
  const { splitName } = route.params; // Receive the passed parameter

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workouts for {splitName}</Text>
      {/* Render your workouts related to the split here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default WorkoutList;