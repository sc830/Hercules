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

    const handleAddTrackerButtonPress = () => {
      handleAddCustomTracker();
    };

    const renderTrackers = () => {
      const trackerData = {
        'Water Ounces': [64, 72, 68, 80, 76],
        'Sleep hours': [7, 8, 6, 5, 9],
        'Creatine': [5, 5, 5, 5, 5]
      };
    
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    
      return trackers.map((tracker, index) => {
        if (tracker === 'Add a Custom Tracker') {
          return null;
        }
    
        const data = trackerData[tracker];
    
        return (
          <View key={index} style={styles.graphContainer}>
            <Text style={styles.graphLabel}>{tracker}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TrackIntakeScreen', { itemType: tracker })}>
              <GraphWithButton
                data={data}
                labels={labels}
                buttonText={tracker}
                onButtonPress={() => console.log('Navigate to the next page')}
              />
            </TouchableOpacity>
          </View>
        );
      });
    };

return (
  <View style={{flex: 1, backgroundColor: 'black'}}>
    <ScrollView style={styles.container}>
      {renderTrackers()}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTrackerButtonPress}>
        <Text style={styles.buttonText}>Add Custom Tracker</Text>
      </TouchableOpacity>
    </ScrollView>
    <CustomTrackerModal 
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      customTrackerName={customTrackerName}
      setCustomTrackerName={setCustomTrackerName}
      submitCustomTracker={() => {
        submitCustomTracker();
        // Optional: Add logic here to update graphs or data
      }}
    />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  graphContainer: {
    width: '90%',            // Adjust the width as needed
    alignItems: 'center',    // Center content of each graph container
    marginBottom: 20         // Add space between each graph
  },
  graphLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5 // Space above the graph
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
