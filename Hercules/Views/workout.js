import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [splitName, setSplitName] = useState('');
  const [splits, setSplits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(-1); // -1 means no split is showing delete option

  const addSplit = () => {
    if (splitName) {
      setSplits(prevSplits => [splitName, ...prevSplits]);
      setSplitName('');
      setShowModal(false);
      setShowDeleteOption(-1); 
    }
  };

  const deleteSplit = (indexToDelete) => {
    setSplits(splits.filter((_, index) => index !== indexToDelete));
  };

  const handleForward = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const handleBack = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDate);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      <View style={styles.dateContainer}>
        <Button title="<" onPress={handleBack} />
        <Button title={currentDate.toDateString()} onPress={() => setShowDatePicker(true)} />
        <Button title=">" onPress={handleForward} />
      </View>

      {splits.map((split, index) => (
        <View key={index} style={styles.splitContainer}>
          <TouchableOpacity
            style={styles.splitButton}
            onPress={() => navigation.navigate('workoutList', { splitName: split })}
          >
            <Text style={styles.splitText}>{split}</Text>
            <TouchableOpacity 
              style={styles.settingsButton} 
              onPress={() => setShowDeleteOption(index === showDeleteOption ? -1 : index)}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {showDeleteOption === index && (
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteSplit(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>+ Add Workout Day</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={splitName}
            onChangeText={setSplitName}
            placeholder="Enter Workout Day Name"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSplit}>
            <Text style={styles.buttonText}>Add Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => setShowModal(false)} />
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: 'purple',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  splitContainer: {
    width: '90%',
    marginBottom: 10,
  },
  splitButton: {
    backgroundColor: 'gray',
    height: 200,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  splitText: {
    color: 'black',
    fontSize: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsText: {
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: 'black',
    fontSize: 16,
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
});

export default WorkoutView;
