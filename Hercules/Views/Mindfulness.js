import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, TextInput  } from 'react-native';

const Mindfulness = ({ navigation }) => {

  const handleTrackIntake = (itemType) => {
      navigation.navigate('TrackIntakeScreen', { itemType });
  };

  const [modalVisible, setModalVisible] = React.useState(false);
    const [customTrackerName, setCustomTrackerName] = React.useState('');

    const handleAddCustomTracker = () => {
        setModalVisible(true);
    };

    const submitCustomTracker = () => {
        handleTrackIntake(customTrackerName);
        setModalVisible(false);
        setCustomTrackerName('');
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

                {/* Add custom tracker button */}
                <TouchableOpacity onPress={handleAddCustomTracker} style={styles.button}>
                    <Text style={styles.buttonText}>Add a Custom Tracker</Text>
                </TouchableOpacity>

                {/* User can add their own trackers */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.modalText}
                                onChangeText={setCustomTrackerName}
                                value={customTrackerName}
                                placeholder="Enter custom tracker name"
                            />
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: 'grey' }}
                                onPress={submitCustomTracker}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "purple",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        color: 'white',
        textAlign: "center"
      }

});

export default Mindfulness;
