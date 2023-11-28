import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker';
import CustomTrackerModal from './customTrackerModal';
import GraphWithButton from '../../components/graph';
import { getUserID, pullDocData, pullDocNames } from '../../firebase/firebaseFunctions';
import { styles } from './CommonStyles';


/*********************************************************************************************** //
 * OVERVIEW OF ALL MINDFULNESS RELATED FILES
 * CommonStyles.js: Holds reusable styling for different parts of the app to look consistent.
 * customTrackerModal.js: Popup for adding new custom health trackers.
 * Mindfulness.js: Displays health tracking graphs and options.
 * TrackIntakeScreen.js: Screen for entering and editing health tracker data.
 * useCustomTracker.js: Hook that handles the logic for creating and managing trackers.

**************************************************************************************************/

const Mindfulness = ({ navigation }) => {
  const {
    trackers,   // array of strings representing tracker names, [sleep, creatine, protein, carbs]
    trackerData,    // 
    trackerTitles,   // [sleep, creatine, protein, carbs]
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
    updateTrackerTitle, // ensure this is defined in useCustomTracker
    deleteTracker, // ensure this is defined in useCustomTracker
  } = useCustomTracker(['Creatine', 'Sleep', 'Water', 'Steroids']);

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [editingTracker, setEditingTracker] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mindDocs, setMindDocs] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const userPath = `userData/${getUserID()}`;
        const mindPath = `${userPath}/mind`;
  
        let newMindDocs = await pullDocNames(mindPath);
        setMindDocs(newMindDocs);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
  
    fetchData();
  }, [currentDate]);
  
  useEffect(() => {
    const userPath = `userData/${getUserID()}`;

    let result = 0;
    let dateTraverse = new Date();    // starts at current date
    let formattedDate = "";
    let reformattedDate = "";
    let thisPath = "";
    let datePath = ``;
    console.log("Length: " + mindDocs.length);
    const fetchMindData = async () => {
      try {
        for (let i = 0; i < mindDocs.length; i++) {
          trackerData[mindDocs[i]] = [];
          for (let j = 0; j < 7; j++) {
            try {
              result = 0;
              dateTraverse = new Date(currentDate);
              dateTraverse.setDate(currentDate.getDate() - (7 - j));
              formattedDate = dateTraverse.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });
              reformattedDate = formattedDate.replace(/\//g, '.');
              datePath = `${userPath}/logs/${reformattedDate}/mind`;
              thisPath = `${datePath}/${mindDocs[i]}`;
              console.log(thisPath);
              result = await pullDocData(thisPath, "value");
              if (result != null) {
                console.log("Pulled from" + reformattedDate + ": " + result + "  for " + mindDocs[i]);   // console logs the data point pulled from date/tracker
                trackerData[mindDocs[i]].push(result);
              }
            } catch (error) {
              console.error('Error fetching mind data from Firestore:', error);
            }
          }
          console.log("Data for", mindDocs[i], trackerData[mindDocs[i]]);
        }
      } catch (error) {
        console.error('Error in fetchMindData:', error);
      }
    };
  
    fetchMindData();
  }, [mindDocs]);
  

  const startEditingTracker = (tracker) => {
    setEditingTracker(tracker);
  };

  const handleDeleteTracker = (tracker) => {
    if (deleteConfirmation === trackerTitles[tracker]) {
      deleteTracker(tracker); // ensure deleteTracker is passed from useCustomTracker
      setDeleteConfirmation('');
      setEditingTracker(null);
    }
  };

  const finishEditingTracker = (tracker, newTitle) => {
    if (newTitle !== trackerTitles[tracker]) {
      updateTrackerTitle(tracker, newTitle);
    }
    setEditingTracker(null);
  };
   // Add a cancel function to reset the delete confirmation and editing state
   const cancelEditDelete = () => {
    setDeleteConfirmation('');
    setEditingTracker(null);
  };

  // ... existing startEditingTracker, handleDeleteTracker, and finishEditingTracker functions

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {trackers.map(tracker => (
          <View key={tracker}>
            {editingTracker === tracker ? (
              <View>
                <TextInput
                  value={trackerTitles[tracker]}
                  onChangeText={(newTitle) => updateTrackerTitle(tracker, newTitle)}
                  style={styles.trackerEdit}
                  autoFocus={true}
                />
                <TouchableOpacity
                  onPress={() => finishEditingTracker(tracker, trackerTitles[tracker])}
                  style={styles.confirmEditButton}
                >
                  <Text style={styles.buttonText}>Confirm Rename</Text>
                </TouchableOpacity>
                <TextInput
                  value={deleteConfirmation}
                  onChangeText={setDeleteConfirmation}
                  placeholder="Enter name to confirm deletion"
                  style={styles.trackerEdit}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteTracker(tracker)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete Tracker</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelEditDelete}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <GraphWithButton
                initialData={trackerData[tracker] || []}
                labels={labels}
                onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: trackerTitles[tracker] })}
                trackerTitle={trackerTitles[tracker]}
                onTitleChange={() => startEditingTracker(tracker)}
              />
            )}
          </View>
        ))}
        <TouchableOpacity onPress={handleAddCustomTracker} style={styles.button}>
          <Text style={styles.buttonText}>Add a Custom Tracker</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomTrackerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        customTrackerName={customTrackerName}
        setCustomTrackerName={setCustomTrackerName}
        submitCustomTracker={submitCustomTracker}
      />
    </View>
  );
};

export default Mindfulness;