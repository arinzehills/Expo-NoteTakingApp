import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoteItem, { Note } from './NoteItem'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { horizontalScale } from '../../utils/Scaling';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import NoItemComponent from '../../components/NoItems/NoItems';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import usePost from '../../customhooks/usePost';
import { useGet } from '../../customhooks/useGet';
import { ActivityIndicator } from 'react-native-paper';
import MyText from '../../components/MyText/MyText';




const NotesVersions = ({ noteId }: any) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [notes, setNotes] = useState<any>([]);
    const { result, error, loading } = useGet({ path: `/get-note-versions/${noteId}`, start: true });
    const { postData:switchVersion, error:sError, loading:sLdn } = usePost(`/switch-note-version`); 

    console.log("RESUTL", result)
    const renderItem = ({ item }: { item: Note }) => (
        <NoteItem
            title={item.title}
            content={item.content}
            onPress={() => handleVersionSwitch(item.id)}
        />
    );
    const handleVersionSwitch = (versionId:string) => {
        Alert.alert('Switch Version', 'Are you sure you want to switch to this version?', [
            { text: 'Cancel', style: 'cancel' },
            { text:loading?"Switching..." :'Switch', onPress: async () => {
            await switchVersion({noteId:noteId, versionId:versionId});
              navigation.goBack()} },
          ]);
    };
    return (
        <SafeAreaView style={styles.container}>

            {
                loading ? <ActivityIndicator /> : error ? <MyText textStyle={{ textAlign: 'center' }} children='Error when fetching' /> :
                    result?.data?.length < 1 ? <NoItemComponent /> :
                        <FlatList
                            data={result?.data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />}

        </SafeAreaView>
    )
}

export default NotesVersions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        margin: horizontalScale(4)
    },
})