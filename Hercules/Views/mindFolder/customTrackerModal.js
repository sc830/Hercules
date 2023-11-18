// this page handles when a user adds a custom tracker
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';

const CustomTrackerModal = ({
  modalVisible,
  setModalVisible,
  customTrackerName,
  setCustomTrackerName,
  submitCustomTracker
}) => {
  // Handler to close the modal without navigating back
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal} // This should only close the modal
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalText}
            onChangeText={setCustomTrackerName}
            value={customTrackerName}
            placeholder="Enter custom tracker name"
            autoFocus={true}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitCustomTracker}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton} // Changed to use a separate style for the cancel button
            onPress={closeModal} // Close modal when "Cancel" is pressed
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
        backgroundColor: 'purple', // This is your default button color
        padding: 20,
        margin: 10,
        borderRadius: 15,
        width: '90%'
      },
      submitButton: {
        backgroundColor: 'grey', // Set the background color for the submit button
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
    },
    modalView: {
      margin: 20,
      backgroundColor: "purple",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modalText: {
      height: 40, // Set a fixed height for the text input
      marginTop: 20, // Add some space at the top if needed
      marginBottom: 15, // Keep your bottom margin to space things out
      paddingHorizontal: 10, // Add some horizontal padding
      paddingVertical: 5, // Add some vertical padding if needed
      borderColor: 'black', // A border color to make the text input stand out
      borderWidth: 1, // Width of the border to make it visible
      borderRadius: 5, // Round the corners of the text input
      color: 'white', // Color of the input text
      fontSize: 16, // Increase font size if needed
      width: '100%', // Set width to occupy 80% of the modal view width or adjust as needed
      textAlign: "center", // Center the placeholder and input text
    }
  });

export default CustomTrackerModal;
