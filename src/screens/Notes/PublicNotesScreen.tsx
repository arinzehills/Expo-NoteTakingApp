import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { horizontalScale } from '../../utils/Scaling';
import NoteItem, { Note } from './NoteItem';
import NoItemComponent from '../../components/NoItems/NoItems';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import usePost from '../../customhooks/usePost';


const notes: Note[] = [
  // { id: '1', title: 'Note 1', description: 'This is the description for note 1.' },
  // { id: '2', title: 'Note 2', description: 'This is the description for note 2.' },
  // { id: '3', title: 'Note 3', description: 'This is the description for note 3.' },
];
const PublicNotesScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [notes, setNotes] = useState<any>([]);

  useEffect(() => {
    const notesCollection = collection(db, 'notes');
    const q = query(notesCollection, where('isPublic', '==', true), ); // Order by timestamp descending

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

  const renderItem = ({ item }: { item: Note }) => (
    <NoteItem
      title={item.title}
      content={item.content}
      onPress={() => navigation.navigate('NoteDetailScreen', { note: item })}
    />
  );
  return (
    <SafeAreaView style={styles.container}>{notes?.length < 1 ? <NoItemComponent /> :
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}
    </SafeAreaView>
  )
}

export default PublicNotesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    margin: horizontalScale(15)
  },
})