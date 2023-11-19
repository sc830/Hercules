import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Munchies = ({ navigation }) => {
  const handleBreakfast = () => {
    navigation.navigate('BreakfastScreen');
  };

  const handleLunch = () => {
    navigation.navigate('LunchScreen');
  };

  const handleDinner = () => {
    navigation.navigate('DinnerScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>

        <TouchableOpacity onPress={handleBreakfast} style={styles.button}>
          <Text style={styles.buttonText}>Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLunch} style={styles.button}>
          <Text style={styles.buttonText}>Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDinner} style={styles.button}>
          <Text style={styles.buttonText}>Dinner</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF7E0', // A light gold background for the overall app
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D4AF37', // Gold color
    padding: 20,
    margin: 10,
    borderRadius: 15,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Munchies;