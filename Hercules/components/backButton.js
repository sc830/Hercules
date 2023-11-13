// BackButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other suite of icons
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={25} color="#fff" /> {/* Customize color and size as needed */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "purple", // Use any color that fits your app theme
  },
  text: {
    color: '#333', // Use any color that fits your app theme
    textAlign: "white",
    // Add other styling as needed
  },
});

export default BackButton;
