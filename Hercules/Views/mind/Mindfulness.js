import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker';
import CustomTrackerModal from './CustomTrackerModal';
import GraphWithButton from '../../components/graph';
import { styles } from './CommonStyles';

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
    // Removed finishEditingTracker from destructuring as it should be defined inside this component
  } = useCustomTracker(['Creatine', 'Sleep', 'Water']);

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [editingTracker, setEditingTracker] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Define finishEditingTracker here in the component
  const finishEditingTracker = (tracker, newTitle) => {
    updateTrackerTitle(tracker, newTitle);
    setEditingTracker(null); // Exit editing mode
  };

  const startEditingTracker = (tracker) => {
    setEditingTracker(tracker);
  };

  const handleDeleteTracker = (trackerName) => {
    if (deleteConfirmation === trackerName) {
      deleteTracker(trackerName);
      setDeleteConfirmation('');
      setEditingTracker(null);
    }
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
                  style={styles.textInput}
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
                  placeholder="Type here to confirm deletion"
                  style={styles.textInput}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteTracker(tracker)}
                  style={styles.deleteButton}
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
