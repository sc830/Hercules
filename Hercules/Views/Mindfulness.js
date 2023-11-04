import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Mindfulness = ({ navigation }) => {
    const handleTrackIntake = (itemType) => {
        navigation.navigate('TrackIntakeScreen', { itemType });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => handleTrackIntake('Creatine')} style={styles.button}>
                    <Text style={styles.buttonText}>Creatine</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTrackIntake('Sleep hours')} style={styles.button}>
                    <Text style={styles.buttonText}>Sleep</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTrackIntake('Water Ounces')} style={styles.button}>
                    <Text style={styles.buttonText}>Water</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'purple',
        padding: 20,
        margin: 10,
        borderRadius: 15,
        width: '90%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});

export default Mindfulness;
