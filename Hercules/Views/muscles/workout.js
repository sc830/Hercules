import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveWorkout } from '../../firebase/firebaseFunctions';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [splits, setSplits] = useState([]);
  const [splitName, setSplitName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [newSplitName, setNewSplitName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [showRenameModalWorkout, setShowRenameModalWorkout] = useState(false);
  const [renameIndexWorkout, setRenameIndexWorkout] = useState(-1);
  const [showDeleteOptionWorkout, setShowDeleteOptionWorkout] = useState(-1);
  const [showAddModalWorkout, setShowAddModalWorkout] = useState(false);

  useEffect(() => {
    // Existing fetchData logic...
  }, [currentDate]);

  const addSplit = () => {
    if (splitName) {
      setSplits(prevSplits => [splitName, ...prevSplits]);
      setSplitName('');
      setShowModal(false);
      setShowDeleteOption(-1);
    }
  };

  const deleteSplit = (indexToDelete) => {
    setSplits(splits.filter((_, index) => index !== indexToDelete));
  };

  const renameSplit = () => {
    let updatedSplits = [...splits];
    updatedSplits[renameIndex] = splitName;
    setSplits(updatedSplits);
    setShowRenameModal(false);
    setSplitName('');
  };

  const handleRenameOpen = (index, split) => {
    setRenameIndex(index);
    setSplitName(split);
    setShowRenameModal(true);
  };

  const handleForward = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const handleBack = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDate);
  };

  const handleDeleteSplit = () => {
    if (deleteConfirmation === splits[renameIndex]) {
      setSplits(splits.filter((_, index) => index !== renameIndex));
      setDeleteConfirmation('');
      setShowRenameModal(false);
    }
  };

  const cancelEditDelete = () => {
    setDeleteConfirmation('');
    setNewSplitName('');
    setShowRenameModal(false);
    setShowModal(false);
  };

  const addWorkout = async () => {
    if (workoutName) {
      const updatedWorkouts = [...workouts, workoutName];
      setWorkouts(updatedWorkouts);
      setWorkoutName('');
      setShowAddModalWorkout(false);

      const workoutData = { name: workoutName, exercises: [] };

      try {
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const reformattedDate = formattedDate.replace(/\//g, '.');
        const saveResult = await saveWorkout(workoutData, splitName, workoutName, reformattedDate);
        console.log(saveResult);
      } catch (error) {
        console.error('Error saving workout:', error.message);
      }
    }
  };

  const deleteWorkout = (indexToDelete) => {
    setWorkouts(workouts.filter((_, index) => index !== indexToDelete));
  };

  const renameWorkout = () => {
    let updatedWorkouts = [...workouts];
    updatedWorkouts[renameIndexWorkout] = workoutName;
    setWorkouts(updatedWorkouts);
    setShowRenameModalWorkout(false);
    setWorkoutName('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={handleForward} style={styles.navButton}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={newSplitName}
            onChangeText={setNewSplitName}
            placeholder="Enter the Name of Your Workout Day"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSplit}>
            <Text style={styles.buttonText}>Add Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={cancelEditDelete} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showRenameModal}>
        <View style={styles.editPanel}>
          <TextInput
            style={styles.renameInput}
            value={newSplitName}
            onChangeText={setNewSplitName}
            placeholder="Rename Workout Day"
          />
          <TouchableOpacity style={styles.actionButton} onPress={renameSplit}>
            <Text style={styles.actionButtonText}>Confirm Rename</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.renameInput}
            value={deleteConfirmation}
            onChangeText={setDeleteConfirmation}
            placeholder="Enter name to confirm deletion"
          />
          <TouchableOpacity style={styles.cancelButton} onPress={handleDeleteSplit}>
            <Text style={styles.cancelButton}>Delete Workout Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEditDelete}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <TouchableOpacity
            style={styles.workoutButton}
            onPress={() => navigation.navigate('addRepsWeights', { workoutName: workout, currentDate: currentDate })}
          >
            <Text style={styles.workoutText}>{workout}</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                setShowDeleteOptionWorkout(index === showDeleteOptionWorkout ? -1 : index);
                setRenameIndexWorkout(index === renameIndexWorkout ? -1 : index);
              }}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {showDeleteOptionWorkout === index && (
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

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModalWorkout(true)}>
        <Text style={styles.buttonText}>+ Add Workout</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showRenameModalWorkout}>
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
              setShowRenameModalWorkout(false);
              setWorkoutName('');
            }}
            color="#D4AF37"
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showAddModalWorkout}>
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
              setShowAddModalWorkout(false);
              setWorkoutName('');
            }}
            color="#D4AF37"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF7E0', // A light gold background for the overall app
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  workoutButton: {
    backgroundColor: '#D4AF37', // Gold color
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3, // Adds a drop shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  workoutContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#D4AF37', // Gold color
    width: '90%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  splitContainer: {
    width: '90%',
    height: 300,
    marginBottom: 10,
    backgroundColor: 'white', // Removing the gold border
    borderRadius: 15,
    elevation: 2, // Elevation is kept for shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#D4AF37', // Gold color
    width: '45%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  splitButton: {
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  splitText: {
    color: '#303030',
    fontSize: 20,
    fontWeight: '600',
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 247, 224, 0.95)', // Translucent light gold background
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 15,
    // Removing the gold border
    color: '#303030', // Dark text for readability
  },
  // Styles for the gold navigation buttons
  navButton: {
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  workoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600', // Semi-bold
  },
});

export default WorkoutView;
