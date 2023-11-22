// This is the screen that comes up after clicking the graphs
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';

/**
 * TrackIntakeScreen.js
 * 
 * This component is used to track the intake of various items (e.g., Creatine, Sleep, Water).
 * It allows users to add, edit, and delete entries for a specific tracker.
 * It uses a modal for input to add or edit the intake data.
 */

const TrackIntakeScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [trackedItem, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract itemType from route parameters
  const { itemType } = route.params;

  // Handles the logic to open the modal for adding a new item
  const handleAddItem = () => {
    setModalVisible(true);
    setSelectedItem(null);
  };

  // Saves the new or edited item to the list
  const handleSave = () => {
    if (selectedItem !== null) {
      const updatedList = itemList.map((m) => (m === selectedItem ? trackedItem : m));
      setItemList(updatedList);
    } else {
      setItemList([...itemList, trackedItem]);
    }
    setItem('');
    setModalVisible(false);
    setSelectedItem(null);
  };

  // Deletes the selected item from the list
  const handleDelete = () => {
    const updatedList = itemList.filter((m) => m !== selectedItem);
    setItemList(updatedList);
    setModalVisible(false);
    setSelectedItem(null);
  };

  // Handles editing an existing item
  const handleEdit = (m) => {
    setModalVisible(true);
    setSelectedItem(m);
    setItem(m);
  };

  // Main component render
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <BackButton />
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleAddItem} style={{ backgroundColor: 'purple', padding: 20, margin: 20, width: '80%' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Add {itemType} Intake</Text>
          </TouchableOpacity>
        </View>
        {itemList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ backgroundColor: 'lightgrey', padding: 10, margin: 5, width: '80%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => handleEdit(item)}
          >
            <Text style={{ color: 'black' }}>{item}</Text>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for adding or editing an item */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5 }}
              value={trackedItem}
              onChangeText={(text) => setItem(text)}
              placeholder={`Enter ${itemType} intake`}
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {selectedItem && (
              <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: 'red' }]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '60%', // Adjust the width as needed
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  button: {
    backgroundColor: 'purple', // Use the same color for both buttons
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'stretch', // This will make the button stretch to the width of the modal
    justifyContent: 'center' // This ensures the text is centered within the button
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TrackIntakeScreen;
