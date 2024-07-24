import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/Auth/Login';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthProvider } from './src/contexts/AuthProvider';
import AppNavigator from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  // auth()
console.log("FIREBASE_API_KEY",'FIREBASE_API_KEY')

  return (
    <NavigationContainer>
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
