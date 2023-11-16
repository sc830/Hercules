import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker'; // Adjust the path as necessary
import CustomTrackerModal from './customTrackerModal';

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


  // Render the tracker buttons dynamically
  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <TouchableOpacity key={index} onPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })} style={styles.button}>
        <Text style={styles.buttonText}>{tracker}</Text>
      </TouchableOpacity>
    ));
  };

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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'purple',
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
