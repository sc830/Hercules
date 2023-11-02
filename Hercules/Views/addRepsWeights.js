import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

  const AddRepsWeights = ({ route }) => {
    const { workoutName } = route.params;
    const [reps, setReps] = useState([]);
    const [weights, setWeights] = useState([]);
    const [showAddRepsModal, setShowAddRepsModal] = useState(false);
    const [showAddWeightsModal, setShowAddWeightsModal] = useState(false);
    const [currentReps, setCurrentReps] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
  
    const addReps = () => {
      if (currentReps) {
        setReps([...reps, currentReps]);
        setCurrentReps(''); // Reset the input field
        setShowAddRepsModal(false); // Close the modal
      }
    };
  
    const addWeights = () => {
      if (currentWeight) {
        setWeights([...weights, currentWeight]);
        setCurrentWeight(''); // Reset the input field
        setShowAddWeightsModal(false); // Close the modal
      }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.text}>{workoutName}</Text>
          
          <TouchableOpacity style={styles.button} onPress={() => setShowAddRepsModal(true)}>
            <Text style={styles.buttonText}>+ Add Reps</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.button} onPress={() => setShowAddWeightsModal(true)}>
            <Text style={styles.buttonText}>+ Add Weights</Text>
          </TouchableOpacity>
    
          <Modal animationType="slide" transparent={true} visible={showAddRepsModal}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                value={currentReps}
                onChangeText={setCurrentReps}
                placeholder="Enter Reps"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.button} onPress={addReps}>
                <Text style={styles.buttonText}>Add Reps</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={() => setShowAddRepsModal(false)} />
            </View>
          </Modal>
    
          <Modal animationType="slide" transparent={true} visible={showAddWeightsModal}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                value={currentWeight}
                onChangeText={setCurrentWeight}
                placeholder="Enter Weight"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.button} onPress={addWeights}>
                <Text style={styles.buttonText}>Add Weight</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={() => setShowAddWeightsModal(false)} />
            </View>
          </Modal>
          
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  // You can define additional styles for modals and input fields
});

export default AddRepsWeights;