/**
 * customTrackerModal.js: Popup for adding new custom health trackers.
 *
 * Props:
 *   modalVisible: Boolean to control the visibility of the modal.
 *   setModalVisible: Function to update the visibility state of the modal.
 *   customTrackerName: String to hold the input value for the tracker name.
 *   setCustomTrackerName: Function to update the tracker name state.
 *   submitCustomTracker: Function to handle the submission of the new tracker.
 */
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { styles } from './CommonStyles';
import { savemind } from '../../firebase/firebaseFunctions'; // Update the path based on the actual location of firebasefunctions.js







const CustomTrackerModal = ({
  modalVisible,
  setModalVisible,
  customTrackerName,
  setCustomTrackerName,
  submitCustomTracker
}) => {
  const closeModal = () => {
    setModalVisible(false);
  };
  const [currentDate, setCurrentDate] = useState(new Date());


    
  const functionCombined = () => {
    submitCustomTracker(customTrackerName); // Execute the submitCustomTracker function
    handleTrackerSubmission(); // Execute the handleTrackerSubmission function
  };


  const handleTrackerSubmission = async () => {
    try {
      const formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const reformattedDate = formattedDate.replace(/\//g, '.');
      // Call savemind function here with the necessary parameters
      const saveResult = await savemind(customTrackerName, reformattedDate);
      // Handle saveResult as needed (success or error)
      console.log(saveResult);
    } catch (error) {
      console.error('Error saving mind data:', error);
    }
    closeModal(); // Close modal after submission (you may adjust this behavior)
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalTextInput}
            onChangeText={setCustomTrackerName}
            value={customTrackerName}
            placeholder="Enter custom tracker name"
            autoFocus={true}
          />
          <TouchableOpacity
      style={[styles.button, styles.fullWidthButton]}
      onPress={functionCombined} // Call the function to save data
    >
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.fullWidthButton]}
            onPress={closeModal}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomTrackerModal;
