import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import searchMeal from './API'; // Make sure this import path is correct

const LunchScreen = ({ navigation }) => {
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
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TextInput
        value={mealName}
        onChangeText={setMealName}
        placeholder="Enter meal name"
        placeholderTextColor="gray"
        style={{ color: 'white', borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, margin: 20, width: '80%' }}
      />
      <TouchableOpacity onPress={handleAddMeal} style={{ backgroundColor: 'purple', padding: 20, margin: 20, width: '80%' }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Meal</Text>
      </TouchableOpacity>
      <ScrollView>
        {mealList.map((mealItem, index) => (
          <TouchableOpacity key={index} style={{ backgroundColor: 'lightgrey', padding: 10, margin: 5, borderRadius: 5 }} onPress={() => handleMealPress(mealItem, index)}>
            <Text style={{ color: 'black' }}>{mealItem.name}</Text>
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

export default LunchScreen;
