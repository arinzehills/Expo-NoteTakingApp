import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {colors} from '../../utils/colors';


type Name = string;
type Errors = {[key in Name]: string};

export interface Props {
  icon?: ReactNode;
  inputStyle?: React.CSSProperties;
  // touched?: Touched;
  name: string;
  value?: string;
  formatValue?: (value: string) => string;
  errors?: Errors;
  placeholder: string;
  options?: any;
  multiline?: boolean | false;
  compulsoryInput?: boolean | true;
  editable?: boolean;
  onChange?: (name: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: string;
  handleIconClick?: () => void;
}

const MyTextInput: React.FC<Props> = props => {
  // const [inputValue, setInputValue] = useState<string>('');

  // const handleInputChange = (text: string) => {
  //   setInputValue(text);
  // };
  const handleIconClick = () => {
    // Handle the click event for the icon
    //console.log('Icon clicked');
  };

  return (
    <View>
      <TextInput
        style={{
          height: props.multiline ? 100 : Dimensions.get('window').width * 0.13,
          // width: 300,
          borderColor: colors.danger,
          position: 'relative',
          zIndex: -1,
          borderWidth: 1,
          borderRadius: props.multiline ? 10 : 25,
          marginVertical: 5,
          paddingLeft: 10,
          color: colors.danger,
        }}
        multiline={props.multiline}
        placeholder={props.placeholder ?? 'Type something...'}
        placeholderTextColor="gray"
        onChangeText={props.onChange}
        value={props.value}
        editable={props.editable}
        keyboardType={props.keyboardType ?? 'default'}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={props.handleIconClick}
        style={styles.iconContainer}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
