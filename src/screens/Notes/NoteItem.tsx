import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';


interface NoteItemProps {
  title: string;
  content: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
export interface Note {
    id: string;
    title: string;
    content: string;
  }
  
const NoteItem: React.FC<NoteItemProps> = ({ title, content, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.noteItem, style]} onPress={onPress}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <MaterialIcons name="edit-note" size={24} color={colors.myRed} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: '#00000044',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default NoteItem;
