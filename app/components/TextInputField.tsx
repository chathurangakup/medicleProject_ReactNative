import React, { FC } from 'react';
import {View, TextInput,StyleSheet} from 'react-native';
import Images from '../config/Images';
import {colors} from '../config/styles';


interface TextInputCustomProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry: boolean
}

const TextInputCustom: FC<TextInputCustomProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry=false
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#777"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
        color: colors.blackColor,
        paddingHorizontal: 20,
        width: '70%',
        backgroundColor: 'rgb(220,220,220)',
        marginVertical: 10,
        height: 40
  },
});

export default TextInputCustom;
