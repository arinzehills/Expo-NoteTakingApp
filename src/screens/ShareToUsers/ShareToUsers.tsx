import { FlatList, StyleSheet, Text, View } from 'react-native'
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


const ShareToUsers = () => {
  const route = useRoute<any>();
  const { result, error, loading, } = useGet({path:'/users',start:true}); 
  const {data, postData, error:err, loading:ldn } = usePost('/note'); 
  const { note } = route.params;
    
console.log("DID U SEE",note)

  const renderItem = ({ item }: { item: User }) => (
    <UserItem
      title={item.displayName!}
      content={item.email}
      onPress={async () => {
        await postData({email:item.email,noteId:note.id})
        if(!error){
            console.log("data",data)
            // Toast.show({
            //     type: 'success',
            //     text1: 'Hello',
            //     text2: 'This is a success message!'
            //   });
        }
      }}
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