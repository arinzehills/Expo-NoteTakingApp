import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGet } from '../../customhooks/useGet';
import Loader from '../../components/Loader/Loader';
import NoItemComponent from '../../components/NoItems/NoItems';
import { Note } from '../Notes/NoteItem';
import UserItem, { User } from './UserItem';
import { horizontalScale } from '../../utils/Scaling';
import usePost from '../../customhooks/usePost';
import { useRoute } from '@react-navigation/native';
import { showTransactionResult } from '../../components/ShowToastMessage/ShowToastMessage';
import Toast from 'react-native-toast-message';


const ShareToUsers = ({navigation}:any) => {
  const route = useRoute<any>();
  const { result, error, loading, } = useGet({path:'/users',start:true}); 
  const {data, postData, error:err, loading:ldn } = usePost('/note/share-note'); 
  const { note } = route.params;
    
const handleShare  = async(item:any) => {
    Alert.alert('Share Note', `Are you sure you want to share this note to ${item.email}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text:ldn?"Sharing..." :'Share',
         onPress: async () => {
            try {
                await postData({email:item.email,noteId:note.id})
                if (err) {
                    Alert.alert('Error', error.message || 'Failed to add note');
                  } else {
                    Alert.alert('Success', `Note shared to ${item.email} successfully`, [
                      { text: 'OK', onPress: () => navigation.goBack() }
                    ]);
                  }
            } catch (error) {
                Alert.alert('Error', err.message || 'Failed to share note');
            }
       
    }
     },
    ]);
  };
  const renderItem = ({ item }: { item: User }) => (
    <UserItem
      title={item.displayName!}
      content={item.email}
      onPress={()=> handleShare(item)}
    />
  );
  return (
    <View style={styles.container}>
     {loading?<Loader />: error?<Text>Error happened</Text>:
     result?.data?.length < 1 ? <NoItemComponent /> :
        <FlatList
            data={result?.data}
            renderItem={renderItem}
            keyExtractor={item => item.uid}
          />}

    </View>
  )
}

export default ShareToUsers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        margin:horizontalScale(15)
      },
})