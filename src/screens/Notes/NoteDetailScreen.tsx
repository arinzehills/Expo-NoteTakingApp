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

interface Note {
  id: string;
  title: string;
  content: string;
}

type DetailScreenRouteProp = RouteProp<{ Detail: { note: Note } }, 'Detail'>;

const NoteDetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { note } = route.params;
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { postData:postToP, error:perror, loading:ploading } = usePost(`/note/make-public/${note.id}`); // Replace with your API endpoint
 
  const { postData, error, loading } = usePost(`/note/delete/${note.id}`); // Replace with your API endpoint

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
  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons.Button name="delete" backgroundColor="#fff" color={colors.danger} onPress={handleDelete}>
          Delete
        </MaterialIcons.Button>
        <View style={{flexDirection:'row'}}>

        <MaterialIcons.Button name="share" backgroundColor="gray" color="white" onPress={handleShare}>
          Versions
        </MaterialIcons.Button>
        <MaterialIcons.Button name="share" backgroundColor="#fff" color="#000" onPress={handleShare}>
          Share
        </MaterialIcons.Button>
        </View>
      </View>
      <TextInput style={styles.title}>{note.title}</TextInput>
      <TextInput style={styles.description}>{note.content}</TextInput>
    </View>
    {bottomSheetVisible&&<CustomBottomModal
         isOpen={bottomSheetVisible}
         viewHeight={400}
         setIsOpen={setBottomSheetVisible}
         children={<>
         <MyButton  isLoading={ploading} children="Share to Public" onPress={shareToPublic} btnStyles={{borderColor:colors.myRed,borderWidth:0.5}} textStyles={{color:colors.myRed}}/>
         <MyButton   children="Share to a User" onPress={()=>{
          handleShare(),
          navigation.navigate('ShareToUsers',{ note })
          }} btnStyles={{backgroundColor:colors.myRed}} textStyles={{color:colors.white}}/>
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
