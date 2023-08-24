import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {AppBar} from '../../../components/AppBar';
import Images from '../../../config/Images';
import {colors} from '../../../config/styles';

const {width, height} = Dimensions.get('screen');

const textBtnComponent = text => {
  return (
    <View
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <Text style={{ color: colors.white,padding:6}}>{text}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.ansBtnColor, alignItems:'center', margin:3}}>
          <Text >None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.btnBGcolor, alignItems:'center', margin:3}}>
          <Text>Sight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:colors.fontColor, alignItems:'center', margin:3}}>
          <Text>Modarate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, borderRadius: 20, backgroundColor:'purple', alignItems:'center', margin:3}}>
          <Text>Serve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExerciseFeedback = ({route, navigation}) => {
  return (
    <View>
      <AppBar
        title={'Exercise Feedback'}
        navigation={navigation}
        isShowBurger={false}
        isShowProfile={true}
        isShowBack={true}
      />
      <View
        style={{
          marginTop: 100,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: colors.bgColor,
          alignItems:'center',
          height: height- 300
        }}>
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 50,
            color: colors.white,
            paddingLeft: 20,
            alignContent: 'center',
            fontSize:25
          }}>
          {' '}
          Exercise Feedback
        </Text>

        {textBtnComponent('Did you feel pain in your natural hand?')}
        {textBtnComponent('Was it difficult to stretch your stump?')}
        {textBtnComponent('Did you feel brusies/burns on your stump skin?')}

      </View>
    </View>
  );
};

export default ExerciseFeedback;
