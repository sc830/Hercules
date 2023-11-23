import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import BackButton from '../../components/backButton';
import { styles } from './CommonStyles'; // Make sure the path to CommonStyles is correct

const TrackIntakeScreen = ({ navigation, route }) => {
  const { itemType } = route.params; // This should be the updated tracker title
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
  const handleSave = () => {
    let updatedList = itemList;
    if (selectedItem !== null) {
      updatedList = itemList.map((item) => (item === selectedItem ? inputValue : item));
    } else {
      updatedList = [...itemList, inputValue];
    }
    setItemList(updatedList);
    setInputValue('');
    setModalVisible(false);
    setSelectedItem(null);
    // Here, you would also save the updated list to your backend or state management system
  };

  // Deletes the selected item from the list
  const handleDelete = () => {
    const updatedList = itemList.filter((item) => item !== selectedItem);
    setItemList(updatedList);
    setModalVisible(false);
    setSelectedItem(null);
    // Here, you would also update the backend or state management system with the item removed
  };

  // Handles editing an existing item
  const handleEdit = (item) => {
    setModalVisible(true);
    setSelectedItem(item);
    setInputValue(item);
  };

  // Main component render
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
                <Text>⚙️</Text> {/* Replace with an edit icon if you have one */}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for adding or editing an item */}
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
