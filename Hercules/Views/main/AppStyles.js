// AppStyles.js
import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  // Styles for the bottom tab navigation
  tabBarStyle: {
    backgroundColor: 'white', // Background color of the tab bar
  },
  tabBarOptions: {
    activeTintColor: 'grey', // Text color of the selected tab
    inactiveTintColor: 'black', // Text color of the unselected tabs
  },
  tabBarLabelStyle: {
    fontSize: 15, // Font size of the tab labels
    //backgroundColor: 'red', // Background color of the tab bar (box around the words)
    //fontWeight: 'bold', // Font weight for the tab labels
  },
  
  // Styles for each stack navigator within the tabs
  stackScreenOptions: {
    backgroundColor: 'white', // Background color of the tab bar
    headerShown: false, // Hides the header for all stack screens
    headerStyle: {
      backgroundColor: 'black', // Background color of the header (not shown in this case)
    },
    headerTintColor: 'white', // Color of the back button and title in the header
    headerTitleStyle: {
      fontWeight: 'bold', // Font weight for the header title
    },
  },
});

export default AppStyles;
