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
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { styles } from './CommonStyles';

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
            onPress={submitCustomTracker}
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
