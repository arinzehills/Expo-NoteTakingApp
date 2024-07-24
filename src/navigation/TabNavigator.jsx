import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // or any other icon library from @expo/vector-icons
import PublicNotesScreen from '../screens/Notes/PublicNotesScreen';
import MyNotesListScreen from '../screens/Notes/MyNotesListScreen';
import ProfileScreen from '../screens/Profile/Profile';
import InAppNavigator from './InAppNavigator';

const Tab = createBottomTabNavigator();

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case 'Public Notes':
      return focused ? 'public' : 'public-off';
    case 'My Notes':
      return focused ? 'book' : 'description';
    case 'Profile':
      return focused ? 'person' : 'person-outline';
    default:
      return 'help-outline'; // Default icon if no match is found
  }
};

const TabNavigation = () => (

    <Tab.Navigator
     
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = getIconName(route.name, focused);
        // Return the icon component
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'red', // Color for the selected tab
      tabBarInactiveTintColor: 'gray', // Color for the unselected tabs
    })}
    >
      <Tab.Screen name="Public Notes" component={PublicNotesScreen} />
      <Tab.Screen name="My Notes" component={InAppNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

);

export default TabNavigation;
