import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker'; 
import CustomTrackerModal from './customTrackerModal';
import GraphWithButton from '../../components/graph';

/**
 * Mindfulness.js
 * This file defines the Mindfulness component.
 * It utilizes the custom hook 'useCustomTracker' to manage trackers for different metrics like Creatine, Sleep, and Water.
 * It renders graphs for each tracker and provides functionality to add custom trackers.
 */

const Mindfulness = ({ navigation }) => {
  // Custom hook for managing trackers
  const {
    trackers,
    trackerData,
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
  } = useCustomTracker(['Creatine', 'Sleep', 'Water']);

  // Labels for the days of the week
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to render graphs for each tracker
  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <View key={index} style={styles.graphContainer}>
        <GraphWithButton
          initialData={trackerData[tracker] || []} // Use dynamic tracker data
          labels={labels}
          onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })}
          trackerTitle={tracker}
        />
      </View>
    ));
  };

  // Main component render
  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {renderTrackers()}
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

// Styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7E0',
    flex: 1
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  graphContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
});

export default Mindfulness;
