import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions,Platform,PermissionsAndroid,ScrollView} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

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
        borderRadius: 10
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

  const {userInfo} = useSelector((state) => (state.login))
  const [userIllness, setIllness] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [correct_squats, setCorrectSquats] = useState(0)
  const [exercise_name, setExerciseName] = useState('')
  const [incorrect_squats, setIncorrectSquats] = useState(0)
  const [num_total_squats, setNumTotalSquats] = useState(0)
  const [time_stamp, setTimeStamp] = useState('')

  // const [exercise_name, setExerciseName] = useState('')

  // var dataArray = str.split(" ");

  const {userShouldDoExercises,userChat} = useSelector((state) => state.chatbot)
   var userShouldDoExercisesArray = userShouldDoExercises.split(/ (?=\d)/);

  const exercises = [
    "1.Multiplane shoulder  exercise -rhythmic stablizing ",
    "2.Isometrics  shoulder abduction",
    "3.Isometrics  shoulder external rotation",
    "4.chair squats",
    "5.fasia_strech"
  ]



  const uploadVideo = async () => {
    setLoaderShow(true)
    let firebasePath = 'video';
    const randomNumber = Math.floor(
      Math.random() * (1000000 - 1000 + 1) + 1000,
    );
    try {
      const imageRef = storage().ref(`${firebasePath}/${randomNumber}.mp4`);
      console.log('Video upload started', imageRef);
      const task = await imageRef.putFile(videoUrl);
      console.log('task', task);

      const url = await imageRef.getDownloadURL().catch(error => {
        throw error;
      });
      console.log('url', url);
      setVideoUploadUrl(url);
      //setLoaderShow(false)
      setFirestoreData(url)
      return url;
    } catch (e) {
      throw e;
    }
  };
  


  const getData=async()=>{
    // alert(exercise_name)
    const usersCollection =await firestore().collection('Users').doc('test1').collection('exercises').doc(exercise_name).get();
    console.log("usersCollection",usersCollection._data);
    setLoaderShow(true)
   
    if(usersCollection._data==undefined){
      setLoaderShow(false)
    }

    if(usersCollection._data.status==false){
      setLoaderShow(false)
    }else{
      setLoaderShow(false)
      setCorrectSquats(usersCollection._data.correct_squats)
      setExerciseName(usersCollection._data.exercise_name)
      setIncorrectSquats(usersCollection._data.incorrect_squats)
      setNumTotalSquats(usersCollection._data.num_total_squats)
      setTimeStamp(usersCollection._data.time_stamp)

      firestore().collection('Users').doc('test1').collection('exercises').doc(exercise_name)
      .update({
        status: false,
      })
      .then(() => {
        console.log('User updated!');
      });
    }


  
    // firestore()
    // .collection('Users')
    // .get()
    // .then(querySnapshot => {
    //   console.log('Total users: ', querySnapshot);
  
    //   querySnapshot.forEach(documentSnapshot => {
    //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //   });
    // });
  
  
  }

  const setFirestoreData=(url)=>{
    // firestore()
    // .collection('Users')
    // .doc('test1').collection('exercises').doc('fasia_strech"')
    // .set( { 
    //   'correct_squats': 8.33,
    //   'exercise_name':"fasia_strech",
    //   'incorrect_squats': 1.67,
    //   'num_total_squats':  10,
    //   'time_stamp':  "2023:10:13:20:58:51"
    // },)
    // .then(() => {
    //   console.log('User added!');
    // });
    var timestamp= moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a');
    firestore()
    .collection('Data_test')
    .doc('test1').collection('exercise').doc(exercise_name)
    .set( { 
    timestamp: timestamp,
     video_url: url
    },)
    .then(() => {
      console.log('User added!');
    });
  }


  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);
        setVideoUrl(response?.assets[0]?.uri)
        console.log('Response = ', response?.assets[0]?.uri);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };


  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      setVideoUrl(response?.assets[0]?.uri)
      console.log('Response = ', response?.assets[0]?.uri);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      console.log(response);
    });
  };


  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };


  useEffect(()=>{
  //   console.log("userShouldDoExercises",userShouldDoExercises)
  //   console.log('userChat',userChat)
  //   let lastElementChatUser = userChat[userChat.length-1];
  //   console.log('lastElementChatUser',lastElementChatUser)
  //  setIllness(lastElementChatUser.quection)
  captureImage()
  requestExternalWritePermission()

  const interval = setInterval(() => {
    getData()
  }, 60000);

  return () => clearInterval(interval);
//  ImagePicker.showImagePicker(options, response => {
//     console.log('Response = ', response);
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log(
//         'User tapped custom button: ',
//         response.customButton
//       );
//       alert(response.customButton);
//     } else {
//       setFilePath(response);
//     }
//  });

// // You can also use as a promise without 'callback':


  },[])


const clickExercise=(items)=>{
  const stringWithUnderscores = items.replace(/ /g, "_");
  const parts = stringWithUnderscores.split('.');
  const textAfterDot = parts.length > 1 ? parts[1] : '';
  console.log("textAfterDot",textAfterDot)
  var lastUnderscoreIndex = textAfterDot.lastIndexOf("_");

if (lastUnderscoreIndex !== -1 && lastUnderscoreIndex === textAfterDot.length - 1) {
  var updatedStr = textAfterDot.slice(0, -1); // Remove the last character (the underscore)
} else {
  var updatedStr = textAfterDot; // No trailing underscore found, keep the original string
}

console.log(updatedStr);
 // const stringWithoutTrailingUnderscore = textAfterDot.replace(/_+$/, '');
  // var updatedStr = stringWithoutTrailingUnderscore.replace(/_$/, ' ');
  setExerciseName(updatedStr.toLowerCase())
  //alert();  
}

  

  return (
    <View>
      <AppBar
        title={'Exercise Plan'}
        navigation={navigation}
        isShowBurger={false}
        isShowProfile={true}
        isShowBack={true}
      />
      <ScrollView style={{height:'100%'}} contentContainerStyle={{ flexGrow: 1 }}>
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
            {/* <Text style={{color: 'black'}}>{userShouldDoExercisesArray}</Text> */}

           {userShouldDoExercisesArray.map((items) =>
              <TouchableOpacity onPress={()=>clickExercise(items)}>
                  <Text style={{color:'black', padding:10}}>{items}</Text>
              </TouchableOpacity>
            )}
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
        <Text style={{color: 'black', padding:10}}>{exercise_name}</Text>
        <View style={{alignSelf: 'flex-end', marginRight: 50, marginTop: 20}}>
          {btnCommon(() => navigation.navigate('videoRecord'), 'Start')}

         
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flex:1, margin:10}}>
             {btnCommon(() => chooseFile('video'), 'Choose Video')}
             {/* {btnCommon(() => navigation.navigate('exerciseFeedback',
                {
                  correct_squats: 2, //correct_squats,
                  exercise_name:'exercise_name',
                  incorrect_squats:1,
                  num_total_squats:3,
                  time_stamp:'time_stamp'
                }), 'Begin')} */}

            </View>
            <View style={{flex:1,margin:10}}>
             {/* {btnCommon(() => uploadVideo('video'), 'Upload Video')} */}
            </View>
           
        </View>
       
      </View>
      {videoUrl !=='' ?
      (<View
            style={{
              borderRadius: 1,
              borderColor: colors.blackColor,
              paddingTop: 40,
              height: height / 2,
              borderWidth: 1,
              margin: 2,
            }}>
            <View>
              <VideoPlayer
                video={{uri: videoUrl}}
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
        ) : null}

      {videoUploadUrl  == '' ? (
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
            <Text>  correct_squats: {correct_squats}</Text>
            <Text>  exercise_name: {exercise_name}</Text>
            <Text>  incorrect_squats: {incorrect_squats}</Text>
            <Text>  num_total_squats: {num_total_squats}</Text>
            <View style={{marginTop: 50, marginLeft: 110, marginRight: 110, marginBottom: 10}}>
    

                {btnCommon(() => navigation.navigate('exerciseFeedback',
                {
                  correct_squats: correct_squats,
                  exercise_name:exercise_name,
                  incorrect_squats:incorrect_squats,
                  num_total_squats:num_total_squats,
                  time_stamp:time_stamp
                }), 'Begin')}
              </View>
            </View>
          
          </View>}
          <Spinner visible={loaderShow} />
         
          </ScrollView>
         
    </View>
  );
};

export default ExercisePlan;
