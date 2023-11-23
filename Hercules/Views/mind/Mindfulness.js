import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BackButton from '../../components/backButton';
import useCustomTracker from './useCustomTracker';
import CustomTrackerModal from './customTrackerModal';
import GraphWithButton from '../../components/graph';
import { styles } from './CommonStyles';

const Mindfulness = ({ navigation }) => {
  const {
    trackers,
    trackerData,
    trackerTitles, // Ensure this state is returned by useCustomTracker
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
    updateTrackerTitle, // Ensure this function is provided by useCustomTracker
  } = useCustomTracker(['Creatine', 'Sleep', 'Water']);

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // In Mindfulness component, where you render the GraphWithButton

  const renderTrackers = () => {
    return trackers.map((tracker, index) => (
      <GraphWithButton
        key={index}
        initialData={trackerData[tracker] || []}
        labels={labels}
        onButtonPress={() => navigation.navigate('TrackIntakeScreen', { itemType: trackerTitles[tracker] })}
        trackerTitle={trackerTitles[tracker]}
        onTitleChange={(newTitle) => updateTrackerTitle(tracker, newTitle)}
      />
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

export default Mindfulness;
