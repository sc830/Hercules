import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';

const TrackIntakeScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [trackedItem, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Extract itemType from route parameters
  const { itemType } = route.params;

  const handleAddItem = () => {
    setModalVisible(true);
    setSelectedItem(null);
  };

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

  const handleDelete = () => {
    const updatedList = itemList.filter((m) => m !== selectedItem);
    setItemList(updatedList);
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleEdit = (m) => {
    setModalVisible(true);
    setSelectedItem(m);
    setItem(m);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
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

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5 }}
              value={trackedItem}
              onChangeText={(text) => setItem(text)}
              placeholder={`Enter ${itemType} intake`}
            />
            <TouchableOpacity onPress={handleSave} style={{ backgroundColor: 'purple', padding: 10, marginTop: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>
            {selectedItem && (
              <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: 'red', padding: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TrackIntakeScreen;
