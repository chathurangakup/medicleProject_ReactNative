import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import type { RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { isLoginComplete } from './LoginSlice';
import Spinner from 'react-native-loading-spinner-overlay';

import Images from '../../../config/Images';
import { colors } from '../../../config/styles';
import TextInputCustom from '../../../components/TextInputField';
import CustomButton from '../../../components/CustomButton';
import BottomSignLinkText from '../../../components/BottomSignLinkText'



const window = Dimensions.get('window')

interface LoginScreenProps {
  // onLogin: (username: string, password: string) => void;

}

const LoginScreen: React.FC<LoginScreenProps> = (props: any) => {
  const isLogged = useSelector((state: RootState) => state.login.isLogged)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loaderShow, setLoaderShow] = useState(false);

  const clickLogin = async () => {
    if(email ==''){
      setIsErrorEmail(true)
    }else{
      setIsErrorEmail(false)
    }

    if(password ==''){
      setIsErrorPassword(true)
    }else{
      setIsErrorPassword(false)
    }
  
   
    if (email != '' && password != '') {
      setLoaderShow(true)
      auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
                 Alert.alert(
            "Success ✅", "Authenticated successfully"
          );
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

      
      // try {
      //   let response = await auth().signInWithEmailAndPassword(email, password)
      //   console.log(response)
      //   if (response && response.user) {
      //     setLoaderShow(false)
      //     Alert.alert(
      //       "Success ✅", "Authenticated successfully"
      //     ),
      //     dispatch(isLoginComplete(true));
      //     props.navigation.navigate('welcome')
      //   }
      // } catch (e) {
      //   Alert.alert(
      //     "Error ", "Authenticated failed"
      //   ),
      //   setLoaderShow(false)
      //   console.log('okikokokok', e.message);
      // }



      // auth()
      //     .signInWithEmailAndPassword(email, password)
      //     .then(() => {
      //       console.log('signed in!');

      //     })
      //     .catch(error => {
      //       if (error.code === 'auth/email-already-in-use') {
      //         console.log('That email address is already in use!');
      //       }

      //       if (error.code === 'auth/invalid-email') {
      //         console.log('That email address is invalid!');
      //       }

      //       console.error(error);
      //     });

    }

  
   // 
  };

  useEffect(() => {
    console.log("isLogged", isLogged)

  }, [isLogged, isErrorEmail, isErrorPassword])


  const __doSingIn = async (email: any, password: any) => {

  }

  const emailAdd =async(email: string)=>{
    setIsErrorEmail(false)

  
      setEmail(email)
  }

  const passwordAdd = (password: string) =>{
    setIsErrorPassword(false)
    setPassword(password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '100%', }}>
        <View style={{ marginTop: window.height / 10, alignItems: 'center' }}>
          <Image source={Images.PR} style={{ borderRadius: 15, width: window.width / 2 }}></Image>
        </View>
        <View style={styles.textInputStyles}>
          <TextInputCustom
            value={email}
            onChangeText={(value) => emailAdd(value)}
            placeholder="Enter your email"
            secureTextEntry={false}
          />
          {isErrorEmail?
             <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
             <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Email</Text>
           </View>
           : null
          }
         

          <View style={{ padding: 10 }}></View>
          <TextInputCustom
            value={password}
            onChangeText={(value) => passwordAdd(value)}
            placeholder="Enter your Password"
            secureTextEntry={true}

          />
           {isErrorPassword?
          <View style={{ alignSelf: 'flex-start', paddingLeft: 70 }}>
            <Text style={{ textAlign: 'left', color: 'red' }}>*Please enter Password</Text>
          </View>
          :null}
          <View style={{ width: window.width / 1.5, paddingTop: window.height / 15 }}>
            <CustomButton 
            title="Log In" 
            onPress={() => clickLogin()} 
            btnStyle={{ borderRadius: 40, height: window.height / 18 }} 
            textStyle={{ fontSize: 18 }}  
            disabled={(isErrorEmail==false && isErrorPassword==false )? false: true} 
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('forgrtPassword')}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.fogetpasswordTextColor,
                }}>
                Fogot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <BottomSignLinkText
            text={'Dont have an account ? '}
            clickText={'Sign Up'}
            onPress={() => props.navigation.navigate('signup')}
           
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
    paddingTop: window.height / 25
  },
  bgImgStyle: { width: '100%', resizeMode: 'cover', backgroundColor: colors.blackColor, justifyContent: 'center', }
});

export default LoginScreen;
