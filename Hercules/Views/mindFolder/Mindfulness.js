import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton'; // this adds the ability to navigate to previous pages
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
  const dummyData = {
    'Creatine': [5, 6, 7, 8, 9, 10],
    'Sleep hours': [7, 8, 6, 7, 9, 8],
    'Water Ounces': [20, 25, 30, 35, 40, 45]
  };
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Render the tracker graphs dynamically
  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <GraphWithButton
        key={index}
        data={dummyData[tracker]}
        labels={labels}
        buttonText={`Navigate to ${tracker}`}
        onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })}
      />
    ));
  };

  // Render the tracker buttons dynamically
  // const renderTrackers = () => {
  //   return trackers.map((tracker, index) => (
  //     <TouchableOpacity key={index} onPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })} style={styles.button}>
  //       <Text style={styles.buttonText}>{tracker}</Text>
  //     </TouchableOpacity>
  //   ));
  // };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    flexGrow: 1,
    backgroundColor: '#FFF7E0'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
});

export default Mindfulness;
