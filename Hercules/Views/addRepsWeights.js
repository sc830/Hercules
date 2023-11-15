import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackButton from '../components/BackButton'; // Make sure this import path is correct

const AddRepsWeights = ({ route, navigation }) => {
  const { workoutName } = route.params;
  const [sets, setSets] = useState([]);
  const [currentReps, setCurrentReps] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [recommendedIncrease, setRecommendedIncrease] = useState([]);

  const addSet = () => {
    if (currentReps && currentWeight) {
      const newSet = {
        reps: currentReps,
        weight: currentWeight,
      };
      setSets([...sets, newSet]);
      setCurrentReps('');
      setCurrentWeight('');
    }
  };

  const deleteSet = (index) => {
    const updatedSets = [...sets];
    updatedSets.splice(index, 1);
    setSets(updatedSets);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>{workoutName}</Text>
      <TextInput
        style={styles.input}
        value={currentReps}
        onChangeText={setCurrentReps}
        placeholder="Reps"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={currentWeight}
        onChangeText={setCurrentWeight}
        placeholder="Weight (lbs)"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addSet}>
        <Text style={styles.buttonText}>Add Set</Text>
      </TouchableOpacity>
      {sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
          <Text style={styles.setText}>
            Set {index + 1}: {set.reps} reps at {set.weight} lbs
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteSet(index)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text> {/* Trash can emoji */}
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={calculateRecommendedIncrease}>
        <Text style={styles.buttonText}>Calculate Increase</Text>
      </TouchableOpacity>
      {recommendedIncrease.map((increase, index) => (
        <Text key={index} style={styles.recommendedText}>
          {increase}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  setContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setText: {
    color: 'white',
    fontSize: 18,
  },
  recommendedText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent', // Make the button transparent
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default AddRepsWeights;
