import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { RouteProp, useRoute, NavigationProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import usePost from '../../customhooks/usePost';
import CustomBottomModal from '../../components/CustomBottomModal/CustomBottomModal';
import MyButton from '../../components/MyButton/MyButton';
import { verticalScale } from '../../utils/Scaling';
import UsersList from '../../components/Users/UsersList';
import NotesVersions from './NoteVersion';

interface Note {
  id: string;
  title: string;
  content: string;
}

type DetailScreenRouteProp = RouteProp<{ Detail: { note: Note,isPublic?:boolean } }, 'Detail'>;

const NoteDetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { note,isPublic } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showNoteVersions, setShowNoteVersions] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const { postData:postToP, error:perror, loading:ploading } = usePost(`/note/make-public/${note.id}`); 
  const { postData, error, loading } = usePost(`/note/delete/${note.id}`); 
  const { postData:editNote, error:eError, loading:eLdn } = usePost(`/note/${note.id}`, { method: 'PUT' }); 


  const handleDelete = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      { text:loading?"Deleting..." :'Delete', onPress: async () => {
      await postData({});
        navigation.goBack()} },
    ]);
  };

  const handleShare = () => {
    setBottomSheetVisible(!bottomSheetVisible)
  };
  const shareToPublic = async () => {
    try {
      await postToP({});
      Alert.alert('Success', 'Note made public successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error sharing to public:', error);
    }
  };

  const handleTitleChange = (newTitle:string) => {
    setTitle(newTitle);
    setEditable(newTitle !== note.title || content !== note.content);
  };

  const handleContentChange = (newContent:string) => {
    setContent(newContent);
    setEditable(title !== note.title || newContent !== note.content);
  };
  const handleSave = async () => {
    try {
      await editNote({title,content});
      Alert.alert('Success', 'Note edited successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      setEditable(false);
    } catch (error) {
      console.error('Error sharing to public:', error);
      Alert.alert('Error', 'Error saving note', [
        { text: 'OK', }
      ]);
    }
  };
  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons.Button name="delete" backgroundColor="#fff" color={colors.danger} onPress={handleDelete}>
          Delete
        </MaterialIcons.Button>
        <View style={{flexDirection:'row'}}>

        <MaterialIcons.Button name="share" backgroundColor="gray" color="white" onPress={()=>{setShowNoteVersions(true)}}>
          Versions
        </MaterialIcons.Button>
        {!isPublic&&<MaterialIcons.Button name="share" backgroundColor="#fff" color="#000" onPress={handleShare}>
          Share
        </MaterialIcons.Button>}
        </View>
      </View>
      <TextInput style={styles.title}  onChangeText={handleTitleChange}>{note.title}</TextInput>
      <TextInput style={styles.description}  onChangeText={handleContentChange}>{note.content}</TextInput>
    </View>
    {showNoteVersions&&<CustomBottomModal
         isOpen={showNoteVersions}
         title='Versions'
         viewHeight={400}
         setIsOpen={setShowNoteVersions}
         children={ <NotesVersions noteId={note.id}/>}/>}
    {editable && (
        <MyButton children="Save" isLoading={eLdn} onPress={handleSave} isRedBtn={true} />
      )}
    {bottomSheetVisible&&<CustomBottomModal
         isOpen={bottomSheetVisible}
         title='Share'
         viewHeight={400}
         setIsOpen={setBottomSheetVisible}
         children={<>
         <MyButton  isLoading={ploading} children="Share to Public" onPress={shareToPublic} btnStyles={{borderColor:colors.myRed,borderWidth:0.5}} textStyles={{color:colors.myRed}}/>
         <MyButton   children="Share to a User" onPress={()=>{
          handleShare(),
          navigation.navigate('ShareToUsers',{ note })
          }} isRedBtn={true} textStyles={{color:colors.white}}/>
         </>}/>}
       
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default NoteDetailScreen;
