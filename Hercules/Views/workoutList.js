import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Button } from 'react-native';

const WorkoutList = ({ route }) => {
  const { splitName } = route.params;
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');

  const addWorkout = () => {
    if (workoutName) {
      setWorkouts(prevWorkouts => [workoutName, ...prevWorkouts]);
      setWorkoutName('');
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workouts for {splitName}</Text>
      {workouts.map((workout, index) => (
        <TouchableOpacity key={index} style={styles.workoutButton}>
          <Text style={styles.buttonText}>{workout}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>+ Add Workout</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter Workout Name"
          />
          <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
            <Text style={styles.buttonText}>Add Workout</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
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
  workoutButton: {
    backgroundColor: 'gray',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'purple',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default WorkoutList;
