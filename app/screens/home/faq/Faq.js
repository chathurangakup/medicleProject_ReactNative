import React from 'react';
import {View, Text} from 'react-native';
import {AppBar} from '../../../components/AppBar';

const Faq = (props) => {
  return (
    <View>
      <AppBar
        title={'FAQ'}
        navigation={props.navigation}
        isShowSearch={false}
      />
    </View>
  )
}

export default Faq
