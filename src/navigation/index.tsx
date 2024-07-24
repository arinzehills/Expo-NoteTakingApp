import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useAuth } from '../contexts/AuthProvider';
import AuthNavigation from './AuthNavigator';
import TabNavigation from './TabNavigator';


const AppNavigator = () => {
  const {state} = useAuth();
  //console.log(state.isAuthenticated);
  return (
<>
      {!state.isAuthenticated ? <AuthNavigation /> : <TabNavigation />}
</>

  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
