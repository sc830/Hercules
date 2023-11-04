import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// GOAL: add water, sleep, and creatine intake trackers

const Mindfulness = ({ navigation }) => {
  const handleWater = () => {
    navigation.navigate('waterScreen');
  };

  const handleLunch = () => {
    navigation.navigate('LunchScreen');
  };

  const handleDinner = () => {
    navigation.navigate('DinnerScreen');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TouchableOpacity onPress={handleWater} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Water</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLunch} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDinner} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Dinner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Mindfulness;
