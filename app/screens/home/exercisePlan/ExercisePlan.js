import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';

import {AppBar} from '../../../components/AppBar';
import Images from '../../../config/Images';
import {colors} from '../../../config/styles';

const {width, height} = Dimensions.get('screen');

const btnCommon = (onPress, text) => {
  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: colors.white}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ExercisePlan = ({route, navigation}) => {
  const {videoPathKey} = route.params;
  const [videoUploadUrl, setVideoUploadUrl] = useState('');
  const [loaderShow, setLoaderShow] = useState(false);
  const {userShouldDoExercises,userChat} = useSelector((state) => state.chatbot)
  const [userIllness, setIllness] = useState('');

  const uploadVideo = async () => {
    setLoaderShow(true)
    let firebasePath = 'video';
    const randomNumber = Math.floor(
      Math.random() * (1000000 - 1000 + 1) + 1000,
    );
    try {
      const imageRef = storage().ref(`${firebasePath}/${randomNumber}.mp4`);
      console.log('Video upload started', imageRef);
      const task = await imageRef.putFile(videoPathKey);
      console.log('task', task);

      const url = await imageRef.getDownloadURL().catch(error => {
        throw error;
      });
      console.log('url', url);
      setVideoUploadUrl(url);
      setLoaderShow(false)
      return url;
    } catch (e) {
      throw e;
    }
  };

  useEffect(()=>{
    console.log("userShouldDoExercises",userShouldDoExercises)
    console.log('userChat',userChat)
    let lastElementChatUser = userChat[userChat.length-1];
    console.log('lastElementChatUser',lastElementChatUser)
   setIllness(lastElementChatUser.quection)

  },[])

  return (
    <View>
      <AppBar
        title={'Exercise Plan'}
        navigation={navigation}
        isShowBurger={false}
        isShowProfile={true}
        isShowBack={true}
      />
      <View style={{paddingTop: 100, paddingLeft: 20}}>
        <Text style={{color: 'black'}}>{userIllness}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 2,
              borderWidth: 1,
              borderColor: colors.blackColor,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
            }}>
            <Text style={{color: 'black'}}>{userShouldDoExercises}</Text>
          </View>
          <View
            style={{
              flex: 2,
              margin: 10,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.blackColor,
            }}>
            <Image
              source={Images.THREABAND}
              style={{width: 100, height: 100}}></Image>
          </View>
        </View>
        <View style={{alignSelf: 'flex-end', marginRight: 50, marginTop: 20}}>
          {btnCommon(() => navigation.navigate('videoRecord'), 'Start')}
        </View>
      </View>

      {videoUploadUrl == '' ? (
        videoPathKey !== '' ? (
          <View
            style={{
              borderRadius: 1,
              borderColor: colors.blackColor,
              paddingTop: 40,
              height: height / 3,
              borderWidth: 1,
              margin: 20,
            }}>
            <View>
              <VideoPlayer
                video={{uri: videoPathKey}}
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 60,
              }}>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => alert('upload'), 'Record')}
              </View>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => alert('upload'), 'Cancel')}
              </View>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => uploadVideo(), 'Upload')}
              </View>
            </View>
          </View>
        ) : null
      ) :   <View
            >
            <View style={{
              borderRadius: 1,
              borderColor: colors.blackColor,
              paddingTop: 40,
              backgroundColor:'#705376',
              borderWidth: 1,
              margin: 20,
            }}>
            <Text style={{color:colors.blackColor, alignItems:'center', margin: 20}}>Great going !!! lets us know how it was for you</Text>
            <View style={{marginTop: 50, marginLeft: 110, marginRight: 110, marginBottom: 10}}>
                {btnCommon(() => navigation.navigate('exerciseFeedback'), 'Begin')}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => alert('upload'), 'Record')}
              </View>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => setVideoUploadUrl(''), 'Cancel')}
              </View>
              <View style={{flex: 1, margin: 10}}>
                {btnCommon(() => uploadVideo(), 'Upload')}
              </View>
            </View>
          </View>}
          <Spinner visible={loaderShow} />
    </View>
  );
};

export default ExercisePlan;
