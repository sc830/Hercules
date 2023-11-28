import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from '../../components/backButton';
import { saveWorkout } from '../../firebase/firebaseFunctions';

const WorkoutList = ( { route } ) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [showDeleteOption, setShowDeleteOption] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (route.params && route.params.showAddModal) {
        // If showAddModal is set in route params, show the modal
        setShowAddModal(true);
      }
    }, [route.params]));
  

  const addWorkout = async () => {
    if (workoutName) {
      const updatedWorkouts = [...workouts, { name: workoutName, exercises: [] }];
      setWorkouts(updatedWorkouts);
      setWorkoutName('');
      setShowAddModal(false);

      try {
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const reformattedDate = formattedDate.replace(/\//g, '.');
        const saveResult = await saveWorkout({ name: workoutName, exercises: [] }, reformattedDate);
        console.log(saveResult);
      } catch (error) {
        console.error('Error saving workout:', error.message);
      }
    }
  };

  const deleteWorkout = (indexToDelete) => {
    setWorkouts(workouts.filter((_, index) => index !== indexToDelete));
  };

  const handleAddExercise = (index) => {
    const newExercise = {
      name: 'New Exercise',
      sets: [],
    };

    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].exercises.push(newExercise);
    setWorkouts(updatedWorkouts);

    navigation.navigate('addRepsWeights', { workoutName: workouts[index].name, currentDate: currentDate });
  };

  const handleRenameOpen = (index, workout) => {
    setRenameIndex(index);
    setWorkoutName(workout.name);
    setShowRenameModal(true);
  };

  const renameWorkout = () => {
    let updatedWorkouts = [...workouts];
    updatedWorkouts[renameIndex].name = workoutName;
    setWorkouts(updatedWorkouts);
    setShowRenameModal(false);
    setWorkoutName('');
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <TouchableOpacity
            style={styles.workoutButton}
            onPress={() => handleAddExercise(index)}
          >
            <Text style={styles.workoutText}>{workout.name}</Text>
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
          <Button
            title="Close"
            onPress={() => {
              setShowRenameModal(false);
              setWorkoutName('');
            }}
            color="#D4AF37"
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
          <Button
            title="Close"
            onPress={() => {
              setShowAddModal(false);
              setWorkoutName('');
            }}
            color="#D4AF37"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF7E0',
  },
  workoutButton: {
    backgroundColor: '#D4AF37',
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  workoutContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#D4AF37',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 247, 224, 0.95)',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsText: {
    fontSize: 24,
    color: '#D4AF37', // Gold color
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#D4AF37', // Gold color
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600', // Semi-bold
  },
  workoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600', // Semi-bold
  },
});

export default WorkoutList;
