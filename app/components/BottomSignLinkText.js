import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { colors } from '../config/styles';

const BottomSignLinkText = ({text,clickText, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Text style={{fontSize: 16, color: colors.white}}>
       {text}{' '}
      </Text>
      <TouchableOpacity
        onPress={onPress}
       >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.white,
          }}>
          {clickText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSignLinkText;
