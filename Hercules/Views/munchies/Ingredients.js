import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';

const IngredientsScreen = ({ route, navigation }) => {
  const { mealData, onMealSave } = route.params;
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleSaveMeal = () => {
    if (selectedMeal) {
      onMealSave(selectedMeal);
      Alert.alert('Success', 'Meal saved successfully!');
      navigation.goBack();
    }
  };
  const renderIngredients = (meal) => {
    if (!meal.foodContentsLabel) {
      return <Text style={styles.ingredientText}>No ingredients available.</Text>;
    }
    return meal.foodContentsLabel.split(';').map((ingredient, idx) => (
      <Text key={idx} style={styles.ingredientText}>{ingredient.trim()}</Text>
    ));
  };

  if (!mealData || !mealData.hints) {
    return <Text>No meal data available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {selectedMeal ? (
        <View style={styles.mealContainer}>
          <Text style={styles.mealText}>{selectedMeal.label}</Text>
          {/* Display macros here */}
          <View style={styles.ingredientsDropdown}>
            {renderIngredients(selectedMeal)}
            <Button 
              title="Save" 
              onPress={handleSaveMeal}
              color="#D4AF37"
            />
          </View>
        </View>
      ) : (
        mealData.hints.slice(0, 3).map((hint, index) => (
          hint.food ? (
            <TouchableOpacity
              key={index}
              style={styles.mealButton}
              onPress={() => handleSelectMeal(hint.food)}
            >
             <View>
              <Text style={styles.mealText}>{hint.food.label}</Text>
              <Text style={styles.macrosText}>Calories: {hint.food.nutrients.ENERC_KCAL.toFixed(2)}</Text>
              <Text style={styles.macrosText}>Protein: {hint.food.nutrients.PROCNT.toFixed(2)} g</Text>
              <Text style={styles.macrosText}>Fat: {hint.food.nutrients.FAT.toFixed(2)} g</Text>
              <Text style={styles.macrosText}>Carbs: {hint.food.nutrients.CHOCDF.toFixed(2)} g</Text>
            </View>
            </TouchableOpacity>
          ) : null
        ))
      )}
      <Button title="Back" onPress={() => navigation.goBack()}color="#D4AF37" />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E0',
  },
  scrollView: {
    flex: 1, // Allows the ScrollView to expand
  },
  mealContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  mealButton: {
    backgroundColor: '#D4AF37',
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealText: {
    fontSize: 18,
    color: '#303030',
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
  backButton: {
    position: 'absolute',
    bottom: 10, 
    left: 10,
  },
});

export default IngredientsScreen;