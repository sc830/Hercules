// Mindfulness.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker';
import CustomTrackerModal from './customTrackerModal';
import GraphWithButton from '../../components/graph';
import {
  getUserID,
  pullDocData,
  pullDocNames,
} from '../../firebase/firebaseFunctions';
import { styles } from './CommonStyles';

const Mindfulness = ({ navigation }) => {
  const userID = getUserID();
  const mindPath = `userData/${userID}/mind`;

  const {
    trackers,
    trackerData,
    trackerTitles,
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
    updateTrackerTitle,
    deleteTracker,
    setTrackers
  } = useCustomTracker([]);

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [editingTracker, setEditingTracker] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mindDocs, setMindDocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newMindDocs = await pullDocNames(mindPath);
        setMindDocs(newMindDocs);
        const initialTrackers = newMindDocs.map(tracker => ({
          title: tracker,
          data: [],
        }));

        // Set the initial state of useCustomTracker with the tracker objects
        setTrackers(initialTrackers);
        setTrackerTitles(mindDocs);

      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, [currentDate, mindPath, setTrackers]);

  useEffect(() => {
    const userPath = `userData/${getUserID()}`;

    let result = 0;
    let dateTraverse = new Date();    // starts at current date
    let formattedDate = "";
    let reformattedDate = "";
    let thisPath = "";
    let datePath = ``;
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
              result = await pullDocData(thisPath, "value");
              if (result != null) {
                //console.log("Pulled from " + reformattedDate + ": " + result + "  for " + mindDocs[i]);   // console logs the data point pulled from date/tracker
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
    console.log('Trackers:', trackers);
    console.log('Final Tracker Data:', trackerData);
  }, [mindDocs, currentDate, trackerData]);

  const startEditingTracker = (tracker) => {
    setEditingTracker(tracker);
  };

  const handleDeleteTracker = (tracker) => {
    if (deleteConfirmation === trackerTitles[tracker]) {
      deleteTracker(tracker);
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

  const cancelEditDelete = () => {
    setDeleteConfirmation('');
    setEditingTracker(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity
          onPress={handleAddCustomTracker}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add a Custom Tracker</Text>
        </TouchableOpacity>
        {trackers.map((tracker, index) => (
          <View key={tracker}>
            {editingTracker === index ? (
              <View>
                <TextInput
                  value={trackerTitles[tracker]}
                  onChangeText={(newTitle) =>
                    updateTrackerTitle(tracker, newTitle)
                  }
                  style={styles.trackerEdit}
                  autoFocus={true}
                />
                <TouchableOpacity
                  onPress={() =>
                    finishEditingTracker(index, trackerTitles[tracker])
                  }
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
                  onPress={() => handleDeleteTracker(index)}
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
                onButtonPress={() =>
                  navigation.navigate('TrackIntakeScreen', {
                    itemType: trackerTitles[tracker],
                  })
                }
                trackerTitle={tracker.title.charAt(0).toUpperCase() + tracker.title.slice(1)}
                onTitleChange={() => startEditingTracker(index)}
              />
            )}
          </View>
        ))}
        
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
