import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import searchMeal from './API';

const BreakfastScreen = ({ navigation }) => {
  const [mealName, setMealName] = useState('');
  const [savedMeals, setSavedMeals] = useState([]);
  const [showDeleteOption, setShowDeleteOption] = useState(-1); // State to control visibility of delete option

  const handleAddMeal = async () => {
    if (!mealName.trim()) {
      alert('Please enter a meal name.');
      return;
    }

    try {
      const fetchedMealData = await searchMeal(mealName);
      const topMeals = fetchedMealData.hints.slice(0, 5);

      navigation.navigate('IngredientsScreen', {
        mealData: { ...fetchedMealData, hints: topMeals },
        onMealSave: (savedMeal) => {
          setSavedMeals([...savedMeals, savedMeal]);
        },
      });
    } catch (error) {
      alert('Failed to fetch meal data.');
      console.error('Error fetching meal info:', error);
    }
  };

  const handleDeleteMeal = (indexToDelete) => {
    const updatedMeals = savedMeals.filter((_, index) => index !== indexToDelete);
    setSavedMeals(updatedMeals);
    setShowDeleteOption(-1); // Reset the delete option visibility
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={mealName}
        onChangeText={setMealName}
        placeholder="Enter meal name"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddMeal} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Meal</Text>
      </TouchableOpacity>
      <ScrollView>
        {savedMeals.map((meal, index) => (
          <View key={index} style={styles.savedMealItem}>
            <Text style={styles.mealItemText}>{meal.label}</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering other touch events
                setShowDeleteOption(index === showDeleteOption ? -1 : index);
              }}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
            {showDeleteOption === index && (
              <TouchableOpacity onPress={() => handleDeleteMeal(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <Button title="Back" onPress={() => navigation.goBack()} color="#D4AF37" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E0',
  },
  input: {
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
    width: '80%',
  },
  addButton: {
    backgroundColor: '#D4AF37',
    padding: 20,
    margin: 20,
    width: '80%',
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  savedMealItem: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealItemText: {
    color: 'black',
  },
  settingsButton: {
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  settingsText: {
    fontSize: 24,
    color: '#D4AF37', // Change as needed
  },
  actionButton: {
    backgroundColor: '#D4AF37', // Change as needed
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  // Add any additional styles you need here
});

export default BreakfastScreen;
