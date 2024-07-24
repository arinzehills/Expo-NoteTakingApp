import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import LoginScreen from '../screens/Auth/Login';
import { colors } from '../utils/colors';
import RegisterScreen from '../screens/Auth/Register';


export type StackParamList = {
  AnimatedSplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  ForgotLogin: undefined;
  OTPVerification: undefined;
  CreateNewPassword: undefined;
  Dashboard: undefined;
  Home: undefined;
  ComplaintTracking: undefined;
  Notifications: undefined;
  Profile: undefined;
  Header: undefined;
};
const Stack = createStackNavigator<StackParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.gray,
          elevation: 0,
          height: 110,
          shadowOpacity: 0,
        },
      }}>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
        

    </Stack.Navigator>
  );
}

export default AuthNavigation;
