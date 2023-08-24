import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../config/styles';

const {height} = Dimensions.get('window');

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  btnStyle: any;
  textStyle: any;
  disabled: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, btnStyle, textStyle,  disabled=false}) => (
  <TouchableOpacity style={[styles.button,btnStyle]} onPress={onPress} disabled={disabled}>
    <Text style={[styles.buttonText,textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.btnBGcolor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
  },
});

export default CustomButton;
