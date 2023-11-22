import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7E0',
    flex: 1
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  graphContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '60%', // Adjust the width as needed
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});


