import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

const AddRepsWeights = ({ route }) => {
  const { workoutName } = route.params;
  const [reps, setReps] = useState([]);
  const [weights, setWeights] = useState([]);
  const [currentReps, setCurrentReps] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');

  const updateData = () => {
    if (currentReps) {
      setReps([...reps, currentReps]);
      setCurrentReps(''); // Reset the input field
    }
    if (currentWeight) {
      setWeights([...weights, currentWeight]);
      setCurrentWeight(''); // Reset the input field
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{workoutName}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentReps}
          onChangeText={setCurrentReps}
          placeholder="Enter Reps"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={currentWeight}
          onChangeText={setCurrentWeight}
          placeholder="Enter Weight"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => updateData()}>
        <Text style={styles.buttonText}>Update</Text>
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    width: '40%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddRepsWeights;
