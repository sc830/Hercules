// BackButton.js
// To call the back button, complete the following steps:

// 1. import it: import BackButton from '../components/backButton';
// 2. Call the default: <BackButton />
// 3. Call and pass a title to replace the default: <BackButton title="Cancel" />


import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other suite of icons

// Modify the component to accept a title prop
const BackButton = ({ title }) => {
  const navigation = useNavigation();

  const content = title ? (
    <Text style={styles.text}>{title}</Text> // Display text if title prop is provided
  ) : (
    <Icon name="arrow-back" size={25} color="#fff" /> // Otherwise, display the default back arrow icon
  );

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "purple", // Use any color that fits your app theme
    alignItems: 'center', // Center icon/text horizontally
    justifyContent: 'center', // Center icon/text vertically
  },
  text: {
    color: '#fff', // Use a color that contrasts with the button background
    fontSize: 16, // Set a font size that fits your design
    // Add other styling as needed
  },
});

export default BackButton;
