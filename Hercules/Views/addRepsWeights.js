import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';

const AddRepsWeights = ({ route }) => {
  const { workoutName } = route.params;
  const [sets, setSets] = useState([]);
  const [currentReps, setCurrentReps] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [recommendedIncrease, setRecommendedIncrease] = useState([]);

  const addSet = () => {
    const newSet = {
      reps: currentReps,
      weight: currentWeight,
    };
    setSets([...sets, newSet]);
    setCurrentReps('');
    setCurrentWeight('');
  };

  const calculateRecommendedIncrease = () => {
    if (sets.length > 0) {
      const totalReps = sets.reduce((acc, set) => acc + parseFloat(set.reps), 0);
      const totalWeights = sets.reduce((acc, set) => acc + parseFloat(set.weight), 0);

      const averageReps = totalReps / sets.length;
      const averageWeights = totalWeights / sets.length;

      // Calculate the percentage increases
      const percentages = [3, 5, 7, 10];
      const recommendations = percentages.map((percentage) => {
        const increaseInPounds = (averageWeights * percentage) / 100;
        return `${percentage}% (${increaseInPounds.toFixed(2)} pounds)`;
      });

      setRecommendedIncrease(recommendations);
    }
  };

  const updateData = () => {
    // Your logic to update data
    calculateRecommendedIncrease();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{workoutName}</Text>

      {sets.map((set, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.setInputText}>Set {index + 1}</Text>
          <TextInput
            style={styles.input}
            value={set.reps}
            onChangeText={(text) => {
              const updatedSets = [...sets];
              updatedSets[index].reps = text;
              setSets(updatedSets);
            }}
            placeholder="Reps"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={set.weight}
            onChangeText={(text) => {
              const updatedSets = [...sets];
              updatedSets[index].weight = text;
              setSets(updatedSets);
            }}
            placeholder="Weight"
            keyboardType="numeric"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addSet}>
        <Text style={styles.buttonText}>Add Set</Text>
      </TouchableOpacity>

      {recommendedIncrease && recommendedIncrease.length > 0 && (
        <View style={styles.recommendedContainer}>
          <Text style={styles.recommendedLabel}>Recommended Increases:</Text>
          {recommendedIncrease.map((recommendation, index) => (
            <Text key={index} style={styles.recommendedText}>
              {recommendation}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={updateData}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  setInputText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
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
  recommendedContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  recommendedLabel: {
    color: 'white',
    fontSize: 18,
  },
  recommendedText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'purple',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    width: 200,
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
