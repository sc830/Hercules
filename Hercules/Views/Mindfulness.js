import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// GOAL: add water, sleep, and creatine intake trackers




const Mindfulness = ({ navigation }) => {
    const handleTrackIntake = (itemType) => {
    navigation.navigate('TrackIntakeScreen', { itemType });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      {/* the three below texts add various trackers using TrackIntakeScreen.js*/}
        <TouchableOpacity onPress={() => handleTrackIntake('Creatine')} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%'  }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Creatine</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTrackIntake('Sleep hours')} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%'  }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Sleep</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTrackIntake('Water Ounces')} style={{ backgroundColor: 'purple', padding: 20, margin: 10, borderRadius: 15, width: '90%'  }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Water</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Mindfulness;
