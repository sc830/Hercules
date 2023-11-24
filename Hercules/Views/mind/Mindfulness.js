import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker';
import CustomTrackerModal from './CustomTrackerModal'; 
import GraphWithButton from '../../components/graph';
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
  } = useCustomTracker(['Creatine', 'Sleep', 'Water']);

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [editingTracker, setEditingTracker] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Function to handle starting the editing process for a tracker title
  const startEditingTracker = (tracker) => {
    setEditingTracker(tracker);
  };

  // Function to handle the deletion process for a tracker
  const handleDeleteTracker = (trackerName) => {
    if (deleteConfirmation === trackerName) {
      deleteTracker(trackerName); // Use the destructured deleteTracker function here
      setDeleteConfirmation('');
      setEditingTracker(null);
    }
  };

  // Function to handle finishing the editing process for a tracker title
  const finishEditingTracker = (tracker, newTitle) => {
    updateTrackerTitle(tracker, newTitle);
    setEditingTracker(null);
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {trackers.map((tracker, index) => (
          <View key={tracker}>
            {editingTracker === tracker ? (
              <View>
                <TextInput
                  value={trackerTitles[tracker]}
                  onChangeText={(newTitle) => updateTrackerTitle(tracker, newTitle)}
                  onEndEditing={() => finishEditingTracker(tracker, trackerTitles[tracker])}
                  style={styles.textInput} // Define this style in your CommonStyles
                  autoFocus={true}
                />
                <TextInput
                  value={deleteConfirmation}
                  onChangeText={setDeleteConfirmation}
                  placeholder="Type here to confirm deletion"
                  style={styles.textInput} // Define this style in your CommonStyles
                />
                <TouchableOpacity
                  onPress={() => handleDeleteTracker(tracker)}
                  style={styles.deleteButton} // Define this style in your CommonStyles
                >
                  <Text style={styles.buttonText}>Delete Tracker</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <GraphWithButton
                initialData={trackerData[tracker] || []}
                labels={labels}
                onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: trackerTitles[tracker] })}
                trackerTitle={trackerTitles[tracker]}
                onTitleChange={() => startEditingTracker(tracker)}
                editing={editingTracker === tracker}
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
