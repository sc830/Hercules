import { StyleSheet } from 'react-native';
// CommonStyles.js: Holds reusable styling for different parts of the app to look consistent.
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
    textAlign: 'center',
    fontSize: 16
  },
  fullWidthButton: {
    backgroundColor: '#D4AF37', // Use a color that matches your app's theme
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    width: '100%', // Set to 100% of the modalView width
  },
  modalContainer: {
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
  // for TrackIntakeScreen
  listItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '90%', // Assuming you want the item to take up 90% of the screen width
  },
  listItemText: {
    fontSize: 18,
    color: '#333', // A dark color for the text
  },
  listItemButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // You can adjust the width as needed
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
  modalTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    width: '100%', // Set to 100% of the modalView width
    fontSize: 16,
  },
  // graph styles
  textInput: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  editableTitle: {
    marginTop: 8,
    fontSize: 16,
  },
  graphTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    // Add any other styling you want for the non-editable title here
  },
  deleteButton: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#D4AF37'
  },
  confirmEditButton: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#D4AF37'
  }
  
});


