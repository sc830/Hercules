import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const WorkoutList = ({ route }) => {
  const { splitName } = route.params;

  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [showDeleteOption, setShowDeleteOption] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);

  const addWorkout = () => {
    if (workoutName) {
      setWorkouts(prevWorkouts => [...prevWorkouts, workoutName]);
      setWorkoutName('');
      setShowAddModal(false);
    }
  };

  const deleteWorkout = (indexToDelete) => {
    setWorkouts(workouts.filter((_, index) => index !== indexToDelete));
  };

  const handleRenameOpen = (index, workout) => {
    setRenameIndex(index);
    setWorkoutName(workout);
    setShowRenameModal(true);
  };

  const renameWorkout = () => {
    let updatedWorkouts = [...workouts];
    updatedWorkouts[renameIndex] = workoutName;
    setWorkouts(updatedWorkouts);
    setShowRenameModal(false);
    setWorkoutName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Workouts for {splitName}</Text>

      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.workoutText}>{workout}</Text>
            <TouchableOpacity 
              style={styles.settingsButton} 
              onPress={() => {
                setShowDeleteOption(index === showDeleteOption ? -1 : index);
                setRenameIndex(index === renameIndex ? -1 : index);
              }}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {showDeleteOption === index && (
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => deleteWorkout(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRenameOpen(index, workout)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Rename</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
        <Text style={styles.buttonText}>+ Add Workout</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showRenameModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Rename Workout"
          />
          <TouchableOpacity style={styles.addButton} onPress={renameWorkout}>
            <Text style={styles.buttonText}>Rename Workout</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => {
              setShowRenameModal(false);
              setWorkoutName('');
            }}
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showAddModal}>
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
          <Button title="Close" onPress={() => {
            setShowAddModal(false);
            setWorkoutName('');
          }} />
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
    width: '100%', // ensures the button takes up the full width of its parent
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
  workoutContainer: {
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
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
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsText: {
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'black',
    fontSize: 16,
  },
  workoutContainer: {
    width: '90%',
    marginBottom: 20,
  },
});

export default WorkoutList;
