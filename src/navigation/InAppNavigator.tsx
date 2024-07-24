import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import React, {FunctionComponent} from 'react';
import {colors} from '../utils/colors';
import {View} from 'react-native';
import NoteDetailScreen from '../screens/Notes/NoteDetailScreen';
import MyNotesListScreen from '../screens/Notes/MyNotesListScreen';
import AddNoteScreen from '../screens/Notes/AddNotesScreen';
import ShareToUsers from '../screens/ShareToUsers/ShareToUsers';

export type StackParamList = {
  NoteDetailScreen: undefined;
  MyNotesListScreen: undefined;
  AddNoteScreen:undefined;
  ShareToUsers:undefined
};
const Stack = createStackNavigator<StackParamList>();

function InAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyNotesListScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.gray,
          elevation: 0,
          height: 110,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="MyNotesListScreen"
        component={MyNotesListScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="NoteDetailScreen"
        component={NoteDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNoteScreen"
        component={AddNoteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShareToUsers"
        component={ShareToUsers}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default InAppNavigator;
