// This is the screen that comes up after clicking the graphs
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import BackButton from '../../components/backButton';
import { styles } from './CommonStyles';
import { adddatatomind } from '../../firebase/firebaseFunctions';


/**
 * TrackIntakeScreen.js: Screen for entering and editing health tracker data.
 * This component is used to track the intake of various items (e.g., Creatine, Sleep, Water).
 * It allows users to add, edit, and delete entries for a specific tracker.
 * It uses a modal for input to add or edit the intake data.
 */

const TrackIntakeScreen = ({ navigation, route }) => {
  const { itemType, currentDate } = route.params; // This retrieves the updated tracker title
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  // Handles the logic to open the modal for adding a new item
  const handleAddItem = () => {
    setModalVisible(true);
    setSelectedItem(null);
  };

  // Saves the new or edited item to the list
  const handleSave = async () => {
    try {
      let updatedList = itemList;
      if (selectedItem !== null) {
        updatedList = itemList.map((item) => (item === selectedItem ? inputValue : item));
      } else {
        updatedList = [...itemList, inputValue];
      }

      // Update Firebase using adddatatomind function
      const formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const reformattedDate = formattedDate.replace(/\//g, '.');
      const number = itemList.length.toString();
      const data = updatedList[number]; // Set the data you want to save
      const result = await adddatatomind(reformattedDate, itemType, data,number);

      if (result.success) {
        // Update local state or perform any necessary actions upon successful save
        setItemList(updatedList);
        setInputValue('');
        setModalVisible(false);
        setSelectedItem(null);
      } else {
        // Handle error if needed
        console.error('Error saving item:', result.error);
      }
    } catch (error) {
      console.error('Error handling save:', error);
    }
  };

  // Deletes the selected item from the list
  const handleDelete = () => {
    const updatedList = itemList.filter((item) => item !== selectedItem);
    setItemList(updatedList);
    setModalVisible(false);
    setSelectedItem(null);
    // Update the backend or state management system with the item removed
  };

  // Handles editing an existing item
  const handleEdit = (item) => {
    setModalVisible(true);
    setSelectedItem(item);
    setInputValue(item);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleAddItem} style={styles.button}>
            <Text style={styles.buttonText}>Add {itemType} Intake</Text>
          </TouchableOpacity>
          {itemList.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.listItemButton}>
                <Text>⚙️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalTextInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={`Enter ${itemType} intake`}
              autoFocus={true}
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