import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const navigateToApp = () => {
    navigation.navigate('Main'); // Change 'Main' to the desired initial screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Your App!</Text>
      <Button title="Get Started" onPress={navigateToApp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login;
