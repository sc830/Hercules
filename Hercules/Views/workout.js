import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist';

/**********************************************************************************************
 * This file contains all of the programming for the initial page which contains
 * the +Add Workout Day button. Go to workout.js and addRepsWeights.js for the later screens

**********************************************************************************************/

const WorkoutView = () => {
  const navigation = useNavigation(); /* allows us to navigate to the workout.js file and from there the addRepsWeights.js file */
  const [showModal, setShowModal] = useState(false);
  const [splitName, setSplitName] = useState('');
  const [splits, setSplits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [showDeleteOption, setShowDeleteOption] = useState(-1); 

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : 'grey',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLongPress={drag}
      >
        <Text style={{ fontWeight: 'bold', color: 'white' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const drag = () => {
    // Define drag functionality or leave it to the DraggableFlatList to handle.
  };

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

  const renameSplit = () => {
    let updatedSplits = [...splits];
    updatedSplits[renameIndex] = splitName;
    setSplits(updatedSplits);
    setShowRenameModal(false);
    setSplitName('');
  };
  const handleRenameOpen = (index, split) => {
    setRenameIndex(index);
    setSplitName(split);
    setShowRenameModal(true);
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

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      <View style={styles.dateContainer}>
        <Button title="<" onPress={handleBack} />
        <Button title={currentDate.toDateString()} />
        <Button title=">" onPress={handleForward} />
      </View>

      <DraggableFlatList
        data={splits}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({ data }) => setSplits(data)}
      />

      {/* {splits.map((split, index) => (
        <View key={index} style={styles.splitContainer}>
          <DraggableFlatList
            data={splits}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={({ data }) => setSplits(data)}
          />
          <TouchableOpacity
            style={styles.splitButton}
            onPress={() => navigation.navigate('workoutList', { splitName: split })}
            onLongPress={drag}
          >
            <Text style={styles.splitText}>{split}</Text>
            <TouchableOpacity 
              style={styles.settingsButton} 
              onPress={() => {
                setShowDeleteOption(index === showDeleteOption ? -1 : index);
                setRenameIndex(index === renameIndex ? -1 : index);
              }}
            >
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
          </TouchableOpacity>

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
        </View>
      ))} */}

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

      <Modal animationType="slide" transparent={true} visible={showRenameModal}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={splitName}
            onChangeText={setSplitName}
            placeholder="Rename Workout Day"
          />
          <TouchableOpacity style={styles.addButton} onPress={renameSplit}>
            <Text style={styles.buttonText}>Rename Workout Day</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => {
              setShowRenameModal(false);
              setSplitName('');
            }}
          />
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
},

actionButton: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
},

actionButtonText: {
    color: 'black',
    fontSize: 16,
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
  renameButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  renameButtonText: {
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

