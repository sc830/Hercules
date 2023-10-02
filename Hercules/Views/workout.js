import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [splitName, setSplitName] = useState('');
  const [splits, setSplits] = useState([]);

  const addSplit = () => {
    if (splitName) {
      setSplits(prevSplits => [splitName, ...prevSplits]);
      setSplitName('');
      setShowModal(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      {splits.map((split, index) => (
        <TouchableOpacity
          key={index}
          style={styles.splitButton}
          onPress={() => navigation.navigate('workoutList', { splitName: split })}
        >
          <Text style={styles.splitText}>{split}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={splitName}
            onChangeText={setSplitName}
            placeholder="Enter Split Name"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSplit}>
            <Text style={styles.buttonText}>Add Split</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  addButton: {
    backgroundColor: 'purple',
    width: 100,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  splitButton: {
    backgroundColor: 'gray',
    width: 340,
    height: 300,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  splitText: {
    color: 'black',
    fontSize: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  addButton: {
    backgroundColor: 'purple',
    width: '80%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default WorkoutView;