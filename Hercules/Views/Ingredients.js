import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const IngredientsScreen = ({ route }) => {
  const { mealData } = route.params;

  // Assuming mealData contains a property 'text' for the meal name and an array of 'hints' for ingredients.
  // You will need to adjust this based on the actual structure of your mealData.
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 22, margin: 10 }}>Meal: {mealData.text}</Text>
      {mealData.hints?.map((hint, index) => (
        <View key={index} style={{ marginVertical: 5, marginLeft: 10 }}>
          <Text style={{ fontSize: 18 }}>{hint.food.label}</Text>
          <Text>Calories: {hint.food.nutrients.ENERC_KCAL.toFixed(2)}</Text>
          <Text>Protein: {hint.food.nutrients.PROCNT.toFixed(2)} g</Text>
          <Text>Fats: {hint.food.nutrients.FAT.toFixed(2)} g</Text>
          <Text>Carbs: {hint.food.nutrients.CHOCDF.toFixed(2)} g</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default IngredientsScreen;
