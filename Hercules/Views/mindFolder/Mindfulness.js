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
  } = useCustomTracker(['Creatine', 'Sleep', 'Water']);

  const dummyData = {
    currentData: {
      'Creatine': [5, 6, 7, 8, 9, 10, 2],
      'Sleep': [7, 8, 6, 7, 9, 8, 9],
      'Water': [20, 25, 30, 35, 40, 45, 47]
    },
  }
  
  const getDataForWeek = (trackerName) => {
    // Return data for the tracker if it exists, otherwise return an array of zeroes
    return dummyData.currentData[trackerName] || new Array(labels.length).fill(0);
  };
  
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <View key={index} style={styles.graphContainer}>
        <GraphWithButton
          initialData={getDataForWeek(tracker)} // Pass the initial data here
          labels={labels}
          onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })}
          trackerTitle={tracker}
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
