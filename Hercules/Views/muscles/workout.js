import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { collection, doc, addDoc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { getUserID, pullDocData, pullDocNames } from '../../firebase/firebaseFunctions';
import GraphWithButton from '../../components/graph';

const WorkoutView = () => {
  const navigation = useNavigation(); /* allows us to navigate to the workout.js file and from there the addRepsWeights.js file */
  const [showModal, setShowModal] = useState(false);
  const [splitName, setSplitName] = useState('');
  const [splits, setSplits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [newSplitName, setNewSplitName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  let { musclesDocs, munchiesDocs, mindDocs } = { musclesDocs: [], munchiesDocs: [], mindDocs: [] };


useEffect(() => {
  // useEffect runs upon load and when currentDate changes.
  const fetchData = async () => {
    /*let testDate = new Date();
    testDate.setDate(17);   // use this when testing with Shelby's account data
    */

    const formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const reformattedDate = formattedDate.replace(/\//g, '.');

    const datePath = `userData/${getUserID()}/logs/${reformattedDate}`;
    const musclesPath = `${datePath}/muscles`;


    musclesDocs = await pullDocNames(musclesPath);  // musclesDocs now contains the names of all workouts logged on this day.
    }

  fetchData();

}, [currentDate]);  // date dependency - runs again when date is updated
// see Shelby's drafted displays in earlier commits to this branch

const addSplit = () => {
  if (newSplitName.trim()) {
    setSplits([...splits, newSplitName]);
    setNewSplitName('');
  }
  setShowModal(false);
};

const handleRenameOpen = (index) => {
  setRenameIndex(index);
  setNewSplitName(splits[index]);
  setShowRenameModal(true);
};

const renameSplit = () => {
  let updatedSplits = [...splits];
  updatedSplits[renameIndex] = newSplitName;
  setSplits(updatedSplits);
  setShowRenameModal(false);
  setRenameIndex(-1);
  setNewSplitName('');
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


return (
  <ScrollView contentContainerStyle={styles.container}>
    {splits.map((split, index) => (
      <View key={index} style={styles.splitContainer}>
        <GraphWithButton
          trackerTitle={split}
          initialData={[0, 0, 0]} // Replace with actual data
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // Replace with actual labels
          onButtonPress={() => navigation.navigate('workoutList', { splitName: split })}
          onTitleChange={() => handleRenameOpen(index)}
        />
      </View>
    ))}

    <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
      <Text style={styles.buttonText}>+ Add Workout Day</Text>
    </TouchableOpacity>

    {/* Add Workout Day Modal */}
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

    {/* Rename/Delete Modal */}
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
  </ScrollView>
);
};


const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 20,
  backgroundColor: '#FFF7E0',
},
dateContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 20,
},
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
addButton: {
  backgroundColor: '#D4AF37',
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
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
input: {
  width: '80%',
  height: 50,
  borderColor: 'gray',
  borderWidth: 1,
  marginTop: 15,
  padding: 10,
  borderRadius: 10,
},
renameInput: {
  width: '80%',
  height: 50,
  backgroundColor: 'white',
  marginBottom: 10,
  paddingHorizontal: 10,
  fontSize: 20,
  borderRadius: 15,
  color: '#303030',
},
splitContainer: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '90%',
  marginVertical: 10,
},
splitButton: {
  flexDirection: 'row',
  alignItems: 'center',
},
settingsButton: {
  backgroundColor: '#D4AF37',
  padding: 10,
  borderRadius: 5,
  position: 'absolute',
  top: 0,
  right: 0,
},
settingsText: {
  color: 'white',
  fontSize: 18,
},
splitText: {
  fontSize: 20,
},
splitHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
},
buttonRow: {
  flexDirection: 'row',
},
actionButton: {
  backgroundColor: '#D4AF37',
  padding: 5,
  borderRadius: 5,
  marginRight: 5,
},
actionButtonText: {
  color: 'white',
  fontSize: 16,
},
cancelButton: {
  backgroundColor: '#FF4500', // A red color for delete actions
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
  width: '100%',
  color: 'white',
  justifyContent: 'flex-start',
  alignItems: 'center',
},
editPanel: {
  backgroundColor: '#FFF7E0',
  padding: 10,
  borderRadius: 5,
  width: '40%', // Adjust the width as per your design
  alignSelf: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
},

});

export default WorkoutView;