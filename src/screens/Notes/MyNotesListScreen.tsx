import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoteItem, { Note } from './NoteItem'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { horizontalScale } from '../../utils/Scaling';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import NoItemComponent from '../../components/NoItems/NoItems';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import usePost from '../../customhooks/usePost';



const notes: Note[] = [
  { id: '1', title: 'Note 1', content: 'This is the content for note 1.' },
  { id: '2', title: 'Note 2', content: 'This is the content for note 2.' },
  { id: '3', title: 'Note 3', content: 'This is the content for note 3.' },
];

const MyNotesListScreen = () => {
  const [notes, setNotes] = useState<any>([]);
  const { postData, error, loading } = usePost('/note'); 

  useEffect(() => {
    const notesCollection = collection(db, 'notes');
    const q = query(notesCollection, orderBy('createdAt', 'desc')); 

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesList);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  const navigation = useNavigation<NavigationProp<any>>();

  const renderItem = ({ item }: { item: Note }) => (
    <NoteItem
      title={item.title}
      content={item.content}
      onPress={() => navigation.navigate('NoteDetailScreen', { note: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>

      {notes?.length < 1 ? <NoItemComponent /> :
        <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />}
           <FloatingButton 
            onPress={() => {navigation.navigate('AddNoteScreen' )}}
            />
    </SafeAreaView>
  )
}

export default MyNotesListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    margin:horizontalScale(15)
  },
})