import { Dimensions, StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils/colors'

const FloatingButton = ({onPress}:any) => {
  return (

     <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
<View style={{padding:5}}>
        <Ionicons name='add-circle-sharp' size={50}  color={colors.myRed}/>
</View>
     </TouchableOpacity>

  )
}

export default FloatingButton

const styles = StyleSheet.create({
   floatingButton:{
 position:'static',
 width:60,
 height:60,
 alignItems:'center',
 justifyContent:'center',
//  right:30,
 left:Dimensions.get('screen').width*0.7,
 zIndex:999,
 bottom:30
   }
})