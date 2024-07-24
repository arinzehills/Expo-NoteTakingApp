import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import MyText from '../../components/MyText/MyText';
import { colors } from '../../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthProvider';



const ProfileScreen = ({ navigation }:any) => {
  const user = getAuth().currentUser;
  const { dispatch: authDispatch, state } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      authDispatch({ type: 'LOGOUT',  });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const profileItem=()=>{
    <View>
          <MaterialIcons name="account-circle" size={80} color="#555" style={styles.icon} />

    </View>
  }
  return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
          <MaterialIcons name="account-circle" size={80} color="#555" style={styles.icon} />
          <Text style={styles.profileText}>Full Name: {user?.fullName || 'N/A'}</Text>
          <Text style={styles.profileText}>Email: {user?.email}</Text>
        </View>
    {/* 
     */}
     <TouchableOpacity style={styles.button} onPress={handleLogout}>
       <MaterialIcons name="logout" size={24} color="#fff" style={styles.buttonIcon} />
       <Text style={styles.buttonText}>Logout</Text>
     </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  icon: {
    marginBottom: 20,
  },
  profileContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#00000044',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  }, buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
