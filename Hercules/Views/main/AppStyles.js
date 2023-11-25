import { StyleSheet } from 'react-native';

// Define your styles here
const AppStyles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'purple',
    // Add other styling properties for the tab bar here
  },
  tabBarOptions: {
    activeTintColor: 'gray',
    inactiveTintColor: 'black',
    // You can spread the tabBarStyle inside the object below if needed
  },
  stackScreenOptions: {
    headerShown: false,
    // Add other styling properties for the stack navigator here
  },
});

// Export the styles as named exports
export { AppStyles as default };
