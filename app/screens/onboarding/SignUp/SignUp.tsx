import React, { useState } from 'react';
import { View, SafeAreaView, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { isLoginComplete } from '../Login/LoginSlice';
import { useSelector, useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';

import Images from '../../../config/Images';
import { colors } from '../../../config/styles';
import TextInputCustom from '../../../components/TextInputField';
import CustomButton from '../../../components/CustomButton';
import BottomSignLinkText from '../../../components/BottomSignLinkText'
import {updateUserInfo} from '../Login/LoginSlice'



const window = Dimensions.get('window')

interface SignUpScreenProps {
  onLogin: (username: string, password: string) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = (props: any) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorFullnane, setIsErrorFullName] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [loaderShow, setLoaderShow] = useState(false);

  const onClickSignUp = () => {
    if (email == '') {
      setIsErrorEmail(true)
    } else {
      setIsErrorEmail(false)
    }

    if (password == '') {
      setIsErrorPassword(true)
    } else {
      setIsErrorPassword(false)
    }

    if (username == '') {
      setIsErrorUsername(true)
    } else {
      setIsErrorUsername(false)
    }

    if (fullName == '') {
      setIsErrorFullName(true)
    } else {
      setIsErrorFullName(false)
    }


    if (email != '' && password != '' && username != '' && fullName != '') {
      setLoaderShow(true)
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          Alert.alert(
            "Success ✅", "Authenticated successfully"
          );
          const userId = userCredential?.user?.uid;
          console.log("user", userId)

          database()
          .ref('/users/'+userId)
          .set({
                username: username,
                fullName: fullName,
                email:email
          })
          .then(() => console.log('Data set.'));
          let user={
             "fullName": username,
             "username": fullName
          }
          dispatch(updateUserInfo(user));
          dispatch(isLoginComplete(true));
          setLoaderShow(false)
          props.navigation.navigate('welcome')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            setLoaderShow(false)
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setLoaderShow(false)
          }
          setLoaderShow(false)
          console.error(error);
        });
    }

  };

  const emailAdd = (value: any) => {
    setIsErrorEmail(false)
    setEmail(value)
  }

  const usernameAdd = (value: any) => {
    setIsErrorUsername(false)
    setUsername(value)
  }
  const fullNameAdd = (value: any) => {
    setIsErrorFullName(false)
    setFullName(value)
  }
  const passwordAdd = (value: any) => {
    setIsErrorPassword(false)
    setPassword(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '100%', }}>
        <View style={{ marginTop: window.height / 15, alignItems: 'center' }}>
          <Image source={Images.PR} style={{ borderRadius: 15, width: window.width / 2 }}></Image>
        </View>
        <View style={styles.textInputStyles}>
          <TextInputCustom
            value={email}
            onChangeText={(value) => emailAdd(value)}
            placeholder="Enter your Email"
            secureTextEntry={false}
          />
          {isErrorEmail ?
            <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
              <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Email</Text>
            </View>
            : null
          }

          <TextInputCustom
            value={fullName}
            onChangeText={(value) => fullNameAdd(value)}
            placeholder="Enter your FullName"
            secureTextEntry={false}
          />
          {isErrorFullnane ?
            <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
              <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Fullname</Text>
            </View>
            : null
          }
          <TextInputCustom
            value={username}
            onChangeText={(value) => usernameAdd(value)}
            placeholder="Enter your Username"
            secureTextEntry={false}
          />
          {isErrorUsername ?
            <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
              <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Username</Text>
            </View>
            : null
          }
        
          <TextInputCustom
            value={password}
            onChangeText={(value) => passwordAdd(value)}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
          {isErrorPassword ?
            <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
              <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Password</Text>
            </View>
            : null
          }
          <View style={{ width: window.width / 1.5, paddingTop: window.height / 15 }}>
            <CustomButton title="Sign Up" btnStyle={{ borderRadius: 40, height: window.height / 18 }} textStyle={{ fontSize: 18 }} disabled={false} onPress={() => onClickSignUp()} />
          </View>
          <BottomSignLinkText
            text={'Have you an account ? '}
            clickText={'Log In'}
            onPress={() => props.navigation.navigate('login')}
          />
        </View>
      </View>
      <Spinner visible={loaderShow} />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: window.width,
    overflow: 'hidden',
    height: window.width / 2,
    backgroundColor: colors.bgColor
  },
  textHeader: {
    fontSize: 40,
    color: colors.fontColor,

  },
  textOr: {
    fontSize: 20,
    color: colors.fontColor,

    paddingTop: 15
  },
  textInputStyles: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: window.height / 12
  }
});

export default SignUpScreen;
