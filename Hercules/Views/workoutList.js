import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WorkoutList = ({ route }) => {
  const { splitName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workouts for {splitName}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'purple',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default WorkoutList;
