import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker'; 
import CustomTrackerModal from './customTrackerModal';
import GraphWithButton from '../../components/graph';

const Mindfulness = ({ navigation }) => {
  const {
    trackers,
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
  } = useCustomTracker(['Creatine', 'Sleep hours', 'Water Ounces']);

  // Dummy data and labels for testing
  // Assuming 'currentData' and 'previousData' are two different sets of data for each tracker
  const dummyData = {
    currentData: {
      'Creatine': [5, 6, 7, 8, 9, 10],
      'Sleep hours': [7, 8, 6, 7, 9, 8],
      'Water Ounces': [20, 25, 30, 35, 40, 45]
    },
    previousData: {
      'Creatine': [4, 5, 6, 5, 6, 7], // Example previous week data
      'Sleep hours': [6, 7, 5, 6, 7, 8],
      'Water Ounces': [18, 22, 28, 32, 36, 40]
    }
  };
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Render the tracker graphs dynamically
  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <View key={index} style={styles.graphContainer}>
        <GraphWithButton
          currentData={dummyData.currentData[tracker]}
          previousData={dummyData.previousData[tracker]}
          labels={labels}
          buttonText={`${tracker}`}
          onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })}
        />
      </View>
    ));
  };

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

// Styles
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
