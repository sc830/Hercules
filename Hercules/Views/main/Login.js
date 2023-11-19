import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { login, signUp } from '../../firebase/firebaseFunctions';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState(
    'Password must contain:' +
    ' \n - At least 8 characters'+
    ' \n- At least one lowercase letter'+
    ' \n- At least one uppercase letter'+
    ' \n- At least one number'+
    ' \n- At least one special character'  );

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to the main screen after successful login
      navigation.navigate('Main');
    } catch (error) {
      // Handle login error here
      setError(error.message || 'Login failed');
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
      setError(error.message || 'Signup failed');
    }
  };

  useEffect(() => {
    if (error) {
      // If there's an error, update the password requirements text
      setPasswordRequirements(error);
    } else {
      // If no error, display the default password requirements text
      setPasswordRequirements(
        'Password must contain:' +
        ' \n - At least 8 characters'+
        ' \n- At least one lowercase letter'+
        ' \n- At least one uppercase letter'+
        ' \n- At least one number'+
        ' \n- At least one special character'
      );
    }
  }, [error]);

  return (
    <ImageBackground
      source={require('../backgrounds/buff.png')} // Set the path to your background image
      style={styles.background} // Apply styles for the background
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Hercules</Text>
        <Text style={styles.text}>Become The Better Version Of You</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(0, 0, 0, 0.7)" // Placeholder text color
          value={email}
          onChangeText={setEmail}
          color="black" // Text color inside the TextInput
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(0, 0, 0, 0.7)" // Placeholder text color
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          color="black" // Text color inside the TextInput
        />
        <Text id="passerror" style={styles.passwordRequirementText}>
          {passwordRequirements}
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Background color for input fields
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: 'black',
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
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // Adding shadow behind the text
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Login;
