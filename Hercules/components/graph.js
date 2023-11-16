// Create a graph that functions as a button to the add reps/sets page
// October 1st through November 16th
// Kacy Metcalf


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphWithButton = ({ data }) => {
    const handleButtonClick = () => {
      // Handle the button click event here
      // this needs to be opening the exercise page to add reps/sets but for now
      // I will be using an alert as a placement holder while sorting the other
      // functionality
      alert('Button clicked!');
    };
  
    return (
      <TouchableOpacity onPress={handleButtonClick}>
        <View>
          <LineChart
            data={{
              labels: ['Arms', 'Legs', 'Chest', 'Shoulds', 'Core'], // these are the labels on the x axis
              datasets: [
                {
                  data: data, // Enter graph data here at later stage
                },
              ],
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
          <Text style={{ textAlign: 'center' }}>Click me</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default GraphWithButton;