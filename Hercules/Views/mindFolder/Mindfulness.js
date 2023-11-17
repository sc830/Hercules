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

  const handleAddTrackerButtonPress = () => {
    handleAddCustomTracker();
  };

  const onCustomTrackerSubmit = () => {
    submitCustomTracker();
    // Make sure the graphs are updated here if necessary.
    // You might need to set some state that triggers the graphs to re-render.
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
        submitCustomTracker={onCustomTrackerSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF7E0',
  },
  graphContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  graphLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    elevation: 2,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
});

export default Mindfulness;
