import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login, signUp } from '../firebaseFunctions';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to the main screen after successful login
      navigation.navigate('Main');
    } catch (error) {
      // Handle login error here
      console.log('Login Error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      // Replace 'username' with the desired value for the username field
      await signUp(email, password, 'username');
      // Navigate to the main screen after successful signup
      navigation.navigate('Main');
    } catch (error) {
      // Handle signup error here
      console.log('Signup Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Hercules</Text>
      <Text style={styles.text}>Become The Better Version Of You</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.passwordRequirementText}>
        Password must be at least 8 characters, have at least one special character, one number, and one upper and lower case character
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  passwordRequirementText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
