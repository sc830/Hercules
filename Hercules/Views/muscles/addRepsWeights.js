import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackButton from '../../components/backButton'; // Make sure this import path is correct
import { addSetToWorkout } from '../../firebase/firebaseFunctions'; // Update this import path
import { getUserID, pullDocData, pullDocNames } from '../../firebase/firebaseFunctions';



const AddRepsWeights = ({ route, navigation }) => {
  const { workoutName, currentDate } = route.params;
  const [sets, setSets] = useState([]);
  const [currentReps, setCurrentReps] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [recommendedIncrease, setRecommendedIncrease] = useState([]);
  let { setsDocs, results } = { setsDocs: [], results: {} };    // results is object containing set data, where index 0 = Set 1, index 1 = Set 2, etc.

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        let reformattedDate = formattedDate.replace(/\//g, '.');

        const userPath = `userData/${getUserID()}`;
        const setsPath = `${userPath}/logs/${reformattedDate}/muscles/${workoutName}/sets`;

        setsDocs = await pullDocNames(setsPath);      // this holds names of all previously logged workouts
  
        let weightResult = 0;
        let repsResult = 0;
        let setString = "";

        for (let i = 0; i < setsDocs.length; i++) { // setsDocs.length = number of sets logged for this workout
          setString = `Set: ${i+1}`;    // 
            try {
              weightResult = pullDocData(setsDocs+setString, "weight");
              repsResult = pullDocData(setsDocs+setString, "reps");
              console.log(`workoutName: ${workoutName}   weightResult: ${weightResult}   repsResult: ${repsResult}`);
              if (result != null) {
                results[setsDocs[i]] = results[setsDocs[i]] || []; // check if object key exists
                results[setsDocs[i]].push(weightResult, repsResult);
              }
            } catch (error) {
              console.error('Error fetching mind data from Firestore:', error);
            }
            console.log("Data for", setsDocs[i], results[setsDocs[i]]);   // outputs info inside results[] for each workout
          }
      } catch (error) {
        console.error('Error in fetchData (sets):', error);
      }
    };
  
    fetchData();
  }, [currentDate]);

  

  const addSet = async () => {
    if (currentReps && currentWeight) {
      const newSet = {
        reps: currentReps,
        weight: currentWeight,
      };
      setSets([...sets, newSet]);
      setCurrentReps('');
      setCurrentWeight('');

      // Add the set to the workout in Firebase

      const formattedDate = currentDate.toLocaleDateString('en-US', { // if using test data on 11.17.2023, replace currentDate with testDate
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const reformattedDate = formattedDate.replace(/\//g, '.');
      const date = currentDate; // Update this with the relevant date
      const setId = "Set " + (sets.length.toString())+1; // Generate a unique set ID (you might want a better way to do this)
      
      const addSetResult = await addSetToWorkout(reformattedDate, workoutName, setId, newSet);
      if (addSetResult.success) {
        console.log('Set added to workout successfully');
      } else {
        console.error('Failed to add set to workout:', addSetResult.error);
      }
    }
  };

  const deleteSet = (index) => {
    const updatedSets = [...sets];
    updatedSets.splice(index, 1);
    setSets(updatedSets);
  };

  const calculateRecommendedIncrease = () => {
    if (sets.length > 0) {
      const totalReps = sets.reduce((acc, set) => acc + parseFloat(set.reps), 0);
      const totalWeights = sets.reduce((acc, set) => acc + parseFloat(set.weight), 0);

      const averageReps = totalReps / sets.length;
      const averageWeights = totalWeights / sets.length;

      // Calculate the percentage increases
      const percentages = [3, 5, 7, 10];
      const recommendations = percentages.map((percentage) => {
        const increaseInPounds = (averageWeights * percentage) / 100;
        return `${percentage}% (${increaseInPounds.toFixed(2)} pounds)`;
      });

      setRecommendedIncrease(recommendations);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>{workoutName}</Text>
      <TextInput
        style={styles.input}
        value={currentReps}
        onChangeText={setCurrentReps}
        placeholder="Reps"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={currentWeight}
        onChangeText={setCurrentWeight}
        placeholder="Weight (lbs)"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addSet}>
        <Text style={styles.buttonText}>Add Set</Text>
      </TouchableOpacity>
      {sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
          <Text style={styles.setText}>
            Set {index + 1}: {set.reps} reps at {set.weight} lbs
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteSet(index)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text> {/* Trash can emoji */}
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={calculateRecommendedIncrease}>
        <Text style={styles.buttonText}>Calculate Increase</Text>
      </TouchableOpacity>
      {recommendedIncrease.map((increase, index) => (
        <Text key={index} style={styles.recommendedText}>
          {increase}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF7E0', // Light gold background
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#303030', // Dark text for readability
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#D4AF37', // Gold background color
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 10, // Rounded corners
    flexDirection: 'row', // Layout for icon and text
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    alignSelf: 'flex-start', // Align to the left
    marginLeft: 10, // Margin from the left
  },
  backButtonText: {
    color: '#fff', // White color for the text
    fontSize: 18, // Font size for the text
    marginLeft: 8, // Space between icon and text if both are present
  },
  input: {
    backgroundColor: 'white',
    color: '#303030', // Dark text for readability
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 18,
    marginVertical: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#D4AF37', // Gold color border
  },
  button: {
    backgroundColor: '#D4AF37', // Gold color
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    elevation: 3, // Adds a drop shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600', // Semi-bold
  },
  setContainer: {
    backgroundColor: '#FFFFFF', // White background for sets
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37', // Gold color border
  },
  setText: {
    color: '#303030', // Dark text for readability
    fontSize: 18,
  },
  recommendedText: {
    color: '#303030', // Dark text for readability
    fontSize: 16,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#D4AF37', // Gold color
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default AddRepsWeights;
