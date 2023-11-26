import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { collection, doc, addDoc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { getUserID, pullDocData, pullDocNames } from '../../firebase/firebaseFunctions';
import GraphWithButton from '../../components/graph';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [splits, setSplits] = useState([]); // Start with a default split for demonstration
  const [showModal, setShowModal] = useState(false); // State to control visibility of the 'add split' modal
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [newSplitName, setNewSplitName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  let { musclesDocs, munchiesDocs, mindDocs } = { musclesDocs: [], munchiesDocs: [], mindDocs: [] };
  let mindValues = Array(7).fill(0);


useEffect(() => {
  const fetchData = async () => {
    try {
      let formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      let reformattedDate = formattedDate.replace(/\//g, '.');

      const userPath = `userData/${getUserID()}`;
      const datePath = `${userPath}/logs/${formattedDate}`;
      const musclesPath = `${datePath}/muscles`;
      const munchiesPath = `${datePath}/munchies`;
      const mindPath = `${userPath}/mind`;

      musclesDocs = await pullDocNames(musclesPath);
      munchiesDocs = await pullDocNames(munchiesPath);
      mindDocs = await pullDocNames(mindPath);

      let result = 0;
      let mindDate = new Date();
      let formattedMindDate = "";
      let reformattedMindDate = "";
      let mindDatePath = ``;
      for (let i = 0; i < mindDocs.length; i++) {
        for (let j = 0; j < 7; j++) {
          try {
            result = 0;
            mindDate = currentDate - (7 - j);
            formattedMindDate = mindDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            reformattedMindDate = formattedDate.replace(/\//g, '.');
            mindDatePath = `${userPath}/logs/${mindDate}/`;
            result = await pullDocData(mindDatePath + mindDocs[i], "value");
            if (result != null) {
              console.log(result + "  ");
            }
          } catch (error) {
            console.error('Error fetching mind data from Firestore:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  };

  fetchData();
}, [currentDate]);

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