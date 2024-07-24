import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, SafeAreaView } from 'react-native';
import usePost from '../../customhooks/usePost';
import { horizontalScale } from '../../utils/Scaling';
import MyButton from '../../components/MyButton/MyButton';
import { colors } from '../../utils/colors';
import { getAuth } from 'firebase/auth';

const AddNoteScreen: React.FC = ({ navigation }:any) => {
  const [title, setTitle] = useState('');
  const user = getAuth().currentUser;
  const [content, setContent] = useState('');
  const { postData, error, loading } = usePost('/note'); // Replace with your API endpoint

  const handleAddNote = async () => {
    if (!title || !content) {
      Alert.alert('Validation Error', 'Please fill out both fields');
      return;
    }

    try {
      await postData({ title, content,email:user?.email });
      if (error) {
        Alert.alert('Error', error.message || 'Failed to add note');
      } else {
        Alert.alert('Success', 'Note added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to add note');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <MyButton
          children={loading ? 'Adding...' : 'Add Note'}
          onPress={handleAddNote}
          btnStyles={{backgroundColor: colors.myRed, width: 300}}
          textStyles={{color: 'white'}}
          isDisable={loading}
        />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    alignItems:'center',
        margin:horizontalScale(15)
      },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default AddNoteScreen;
