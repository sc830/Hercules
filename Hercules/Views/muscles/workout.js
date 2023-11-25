import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GraphWithButton from '../../components/graph';

const WorkoutView = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [splitName, setSplitName] = useState('');
  const [splits, setSplits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [renameIndex, setRenameIndex] = useState(-1);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newSplitName, setNewSplitName] = useState('');
  const [showDeleteOption, setShowDeleteOption] = useState(-1);

  const addSplit = () => {
    if (splitName.trim()) {
      setSplits(prevSplits => [...prevSplits, splitName]);
      setSplitName('');
      setShowModal(false);
    }
  };

  const handleSplitNameChange = (text) => {
    setSplitName(text);
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

  const handleRenameOpen = (index, split) => {
    setRenameIndex(index);
    setNewSplitName(split);
    setShowRenameModal(true);
  };

  const renameSplit = () => {
    let updatedSplits = [...splits];
    updatedSplits[renameIndex] = newSplitName;
    setSplits(updatedSplits);
    setShowRenameModal(false);
    setRenameIndex(-1);
    setNewSplitName('');
  };

  const deleteSplit = (indexToDelete) => {
    setSplits(splits.filter((_, index) => index !== indexToDelete));
    setShowDeleteOption(-1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={handleForward} style={styles.navButton}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {splits.map((split, index) => (
        <View key={index} style={styles.splitContainer}>
          <View style={styles.splitHeader}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setShowDeleteOption(index === showDeleteOption ? -1 : index)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
            <View style={styles.splitInfo}>
              <TouchableOpacity
                style={styles.splitButton}
                onPress={() => navigation.navigate('workoutList', { splitName: split })}
                activeOpacity={0.7}
              >
                <Text style={styles.splitText}>{split}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showDeleteOption === index && (
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => deleteSplit(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRenameOpen(index, split)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Rename</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add the GraphWithButton for each split */}
          <GraphWithButton
  key={index}
  trackerTitle={split}
  initialData={[0, 0, 0]} // Replace with actual data
  labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // Replace with actual labels
  onButtonPress={() => {
    // Log to see if this function is called
    console.log(`Navigating to workoutList with split: ${split}`);
    navigation.navigate('workoutList', { splitName: split });
  }}
/>

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
            onChangeText={handleSplitNameChange}
            placeholder="Enter Workout Day Name"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSplit}>
            <Text style={styles.buttonText}>Add Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>

      {/* Rename Modal */}
      <Modal animationType="slide" transparent={true} visible={showRenameModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.renameInput}
            value={newSplitName}
            onChangeText={setNewSplitName}
            placeholder="Rename Workout Day"
          />
          <TouchableOpacity style={styles.addButton} onPress={renameSplit}>
            <Text style={styles.buttonText}>Rename Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => setShowRenameModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FFF7E0',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#D4AF37',
    width: '90%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  renameInput: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 15,
    color: '#303030',
  },
  splitContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginVertical: 10,
  },
  splitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  settingsText: {
    color: 'white',
    fontSize: 18,
  },
  splitText: {
    fontSize: 20,
  },
  splitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#D4AF37',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WorkoutView;
