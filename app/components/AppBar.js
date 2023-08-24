import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconArrow from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';

import {colors} from '../config/styles';
import Images from '../config/Images';
import {TextInput} from 'react-native-gesture-handler';
import {isChatbotComplete} from '../screens/home/chatBot/ChatBotSlice'

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('screen')

export const AppBar = props => {
  const _backHandler = () => {
    props.navigation.goBack();
  };

  const dispatch = useDispatch()

  const onPressProfile = () => {
    dispatch(isChatbotComplete(false))
   // props.navigation.openDrawer();
    // props.navigation.navigate('profileMain');
  };

  const onPressBurgurMenu =()=>{
     props.navigation.openDrawer();
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.bckBtnStyles,
          props.isShowBurger
            ? {backgroundColor: colors.white}
            : {backgroundColor: 'transparent'},
        ]}>
        {props.isShowBurger == false ? (
          props.isShowBack == false ? (
            <Image style={styles.image} source={Images.PR} />
          ) : (
            <TouchableOpacity onPress={() => _backHandler()}>
              <IconArrow name="arrowleft" size={30} color={colors.white} />
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity onPress={() => onPressBurgurMenu()}>
            <Icon name="menu" size={30} color={colors.blackColor} />
          </TouchableOpacity>
        )}
      </View>
      {props.isShowSearch ? (
        <View
          style={{
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <TextInput style={styles.input} value={''} keyboardType="text" />
          </View>
          <View>
            <Image style={styles.imageserch} source={Images.SEARCH} />
          </View>
        </View>
      ) : (
        <View style={{flex: 5, alignItems: 'center'}}>
          <Text style={styles.titleStyles}>{props.title}</Text>
        </View>
      )}

      <View style={[styles.profileStyle]}>
        {props.isShowProfile ? (
          <TouchableOpacity onPress={() => onPressProfile()}>
            <Image style={styles.imageprofole} source={Images.CHATBOT_USER} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

AppBar.defaultProps = {
  profilePicImage: null,
  isShowBack: false,
  isShowProfile: true,
  isShowBurger: true,
};

const styles = StyleSheet.create({
  profileStyle: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleStyles: {
    color: colors.white,
    fontSize: 23,
    padding: 20,
  },
  bckBtnStyles: {
    borderRadius: 50,
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  root: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
  height: height/12,
  width: width,
    backgroundColor: colors.bgColor,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 9999,
  },
  image: {
    color: 'black',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  imageprofole: {
    width: 50,
    height: 50,
  },
  imageserch: {
    width: 30,
    height: 30,
  },
  input: {
    alignContent: 'center',
    backgroundColor: colors.white,
    width: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
