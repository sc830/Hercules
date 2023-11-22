// This is the screen that comes up after clicking the graphs
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';
import { styles } from './CommonStyles'; 

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
    <View style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleAddItem} style={styles.button}>
            <Text style={styles.buttonText}>Add {itemType} Intake</Text>
          </TouchableOpacity>
          {itemList.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.listItemButton}>
                <Text>⚙️</Text> {/* Replace with an edit icon if you have one */}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
  

      {/* Modal for adding or editing an item */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput} // Define this style in CommonStyles if needed
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

export default TrackIntakeScreen;