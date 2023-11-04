import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';

const LunchScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [meal, setMeal] = useState('');
  const [mealList, setMealList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleAddMeal = () => {
    setModalVisible(true);
    setSelectedMeal(null);
  };

  const handleSaveMeal = () => {
    if (selectedMeal !== null) {
      const updatedList = mealList.map((m) => (m === selectedMeal ? meal : m));
      setMealList(updatedList);
      setModalVisible(false);
      setSelectedMeal(null);
    } else {
      setMealList([...mealList, meal]);
      setMeal('');
      setModalVisible(false);
    }
  };

  const handleDelete = () => {
    if (selectedMeal !== null) {
      const updatedList = mealList.filter((m) => m !== selectedMeal);
      setMealList(updatedList);
      setModalVisible(false);
      setSelectedMeal(null);
    }
  };

  const handleEdit = (m) => {
    setModalVisible(true);
    setSelectedMeal(m);
    setMeal(m);
  };

  const handleViewIngredients = () => {
    if (selectedMeal) {
      navigation.navigate('AddIngredientsScreen', { meal: selectedMeal });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleAddMeal} style={{ backgroundColor: 'purple', padding: 20, margin: 20, width: '80%' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Add Meal</Text>
          </TouchableOpacity>
        </View>
        {mealList.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={{ backgroundColor: 'lightgrey', padding: 10, margin: 5, width: '80%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => handleEdit(meal)}
          >
            <Text style={{ color: 'black' }}>{meal}</Text>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            {selectedMeal !== null && (
              <View>
                <TextInput
                  style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5 }}
                  value={meal}
                  onChangeText={(text) => setMeal(text)}
                />
                <TouchableOpacity onPress={handleSaveMeal} style={{ backgroundColor: 'purple', padding: 10, marginTop: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Save Meal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: 'red', padding: 10, marginTop: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedMeal === null && (
              <View>
                <Text>Enter your meal:</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5 }}
                  value={meal}
                  onChangeText={(text) => setMeal(text)}
                />
                <TouchableOpacity onPress={handleSaveMeal} style={{ backgroundColor: 'purple', padding: 10, marginTop: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Save Meal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LunchScreen;
