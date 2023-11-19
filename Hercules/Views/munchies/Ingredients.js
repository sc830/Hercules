import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';

const IngredientsScreen = ({ route, navigation }) => {
  const { mealData } = route.params;
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleSaveMeal = () => {
    if (selectedMeal) {
      // Assume mealData is an object with a 'hints' array
      const updatedMealData = {
        ...mealData,
        hints: [selectedMeal],
      };
      setSelectedMeal(updatedMealData.hints[0]);
    }
  };

  const renderIngredients = (meal) => {
    // Error handling for undefined or null foodContentsLabel
    if (!meal.foodContentsLabel) {
      Alert.alert('Error', 'No ingredients available.');
      return null;
    }

    return meal.foodContentsLabel.split(';').map((ingredient, idx) => (
      <Text key={idx} style={styles.ingredientText}>{ingredient.trim()}</Text>
    ));
  };

  // Error handling for undefined or null mealData
  if (!mealData || !mealData.hints) {
    Alert.alert('Error', 'No meal data available.');
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      {mealData.hints.slice(0, 3).map((hint, index) => (
        // Error handling for undefined or null hint.food
        hint.food ? (
          <View key={index} style={styles.mealContainer}>
            <TouchableOpacity
              style={styles.mealButton}
              onPress={() => handleSelectMeal(hint.food)}
              activeOpacity={0.8}
            >
              <Text style={styles.mealText}>{hint.food.label}</Text>
              <Text style={styles.macrosText}>Calories: {hint.food.nutrients.ENERC_KCAL.toFixed(2)}</Text>
              <Text style={styles.macrosText}>Protein: {hint.food.nutrients.PROCNT.toFixed(2)} g</Text>
              <Text style={styles.macrosText}>Fat: {hint.food.nutrients.FAT.toFixed(2)} g</Text>
              <Text style={styles.macrosText}>Carbs: {hint.food.nutrients.CHOCDF.toFixed(2)} g</Text>
            </TouchableOpacity>
            {selectedMeal === hint.food && (
              <View style={styles.ingredientsDropdown}>
                {renderIngredients(hint.food)}
                <Button 
                  title="Save" 
                  onPress={handleSaveMeal}
                  color="purple"
                />
              </View>
            )}
          </View>
        ) : null
      ))}
      <Button 
        title="Back" 
        onPress={() => navigation.goBack()}
        color="purple"
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mealContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  mealButton: {
    backgroundColor: 'lightgrey',
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealText: {
    fontSize: 18,
    color: 'black',
  },
  macrosText: {
    fontSize: 14,
    color: 'black',
  },
  ingredientsDropdown: {
    marginTop: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
});

export default IngredientsScreen;
