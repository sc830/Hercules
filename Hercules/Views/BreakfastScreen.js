import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import searchMeal from './API'; // Make sure this path is correct

const BreakfastScreen = ({ navigation }) => {
  const [mealName, setMealName] = useState('');
  const [mealList, setMealList] = useState([]);

  const handleAddMeal = async () => {
    if (!mealName.trim()) {
      alert('Please enter a meal name.');
      return;
    }
    setMealList([...mealList, { name: mealName, data: null }]);
    setMealName('');
  };

  const handleMealPress = async (mealItem, index) => {
    if (mealItem.data) {
      navigation.navigate('IngredientsScreen', { mealData: mealItem.data });
    } else {
      try {
        const fetchedMealData = await searchMeal(mealItem.name);
        // Assuming fetchedMealData.hints contains your meals
        // Modify this line to match the structure of your actual API response
        const topFiveMeals = fetchedMealData.hints.slice(0, 5);
        const newMealList = [...mealList];
        newMealList[index].data = { ...fetchedMealData, hints: topFiveMeals };
        setMealList(newMealList);
        navigation.navigate('IngredientsScreen', { mealData: newMealList[index].data });
      } catch (error) {
        alert('Failed to fetch meal data.');
        console.error('Error fetching meal info:', error);
      }
    }
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
        {mealList.map((mealItem, index) => (
          <TouchableOpacity key={index} onPress={() => handleMealPress(mealItem, index)} style={styles.mealItem}>
            <Text style={styles.mealItemText}>{mealItem.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button 
        title="Back" 
        onPress={() => navigation.goBack()} 
        color="purple" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  input: {
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
    width: '80%',
  },
  addButton: {
    backgroundColor: 'purple',
    padding: 20,
    margin: 20,
    width: '80%',
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  mealItem: {
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  mealItemText: {
    color: 'black',
  },
  // Add any additional styles you need here
});

export default BreakfastScreen;
