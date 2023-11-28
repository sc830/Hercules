import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { collection, doc, addDoc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { getUserID, pullDocData, pullDocNames } from '../../firebase/firebaseFunctions';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [splits, setSplits] = useState([]); // Start with a default split for demonstration
  const [splitName, setSplitName] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control visibility of the 'add split' modal
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [newSplitName, setNewSplitName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  let { musclesDocs, munchiesDocs} = { musclesDocs: [], munchiesDocs: []};

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
        const datePath = `${userPath}/logs/${reformattedDate}`;
        const musclesPath = `${datePath}/muscles`;
        const munchiesPath = `${datePath}/munchies`;
        const mindPath = `${userPath}/mind`;

        musclesDocs = await pullDocNames(musclesPath);
        munchiesDocs = await pullDocNames(munchiesPath);
        
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
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

      {splits.map((split, index) => (
        <View key={index} style={styles.splitContainer}>
          {/* Main button for navigation */}
          <TouchableOpacity
            style={styles.splitButton}
            onPress={() => navigation.navigate('workoutList', { splitName: split })}
            activeOpacity={0.7}
          >
            <Text style={styles.splitText}>{split}</Text>
          </TouchableOpacity>

          {/* Absolutely positioned settings button within the split container */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={(e) => {
              // Prevent this button's press from triggering the main button's onPress
              e.stopPropagation();
              setShowDeleteOption(index === showDeleteOption ? -1 : index);
              setRenameIndex(index === renameIndex ? -1 : index);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touchable area for easier interaction
          >
            <Text style={styles.settingsText}>⚙️</Text>
          </TouchableOpacity>

          {/* Show delete and rename options */}
          {showDeleteOption === index && (
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => deleteSplit(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRenameOpen(index, split)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Rename</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>+ Add Workout Day</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={splitName}
            onChangeText={setSplitName}
            placeholder="Enter Workout Day Name"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSplit}>
            <Text style={styles.buttonText}>Add Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" color="#D4AF37" onPress={() => setShowModal(false)} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showRenameModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={splitName}
            onChangeText={setSplitName}
            placeholder="Rename Workout Day"
          />
          <TouchableOpacity style={styles.addButton} onPress={renameSplit}>
            <Text style={styles.buttonText}>Rename Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" color="#D4AF37" onPress={() => {
            setShowRenameModal(false);
            setSplitName('');
          }} />
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
});

export default WorkoutView;
