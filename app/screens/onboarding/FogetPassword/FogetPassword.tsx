import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';

import Images from '../../../config/Images';
import { colors } from '../../../config/styles';
import TextInputCustom from '../../../components/TextInputField';
import CustomButton from '../../../components/CustomButton';
import BottomSignLinkText from '../../../components/BottomSignLinkText'



const window = Dimensions.get('window')

interface FogetPasswordProps {
  // onLogin: (username: string, password: string) => void;

}

const FogetPassword: React.FC<FogetPasswordProps> = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clickLogin = () => {
    auth()
      .createUserWithEmailAndPassword('jane1.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };


  const __doSingIn = async (email: any, password: any) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      console.log(response)
      if (response && response.user) {
        alert("Success ✅", "Authenticated successfully")
      }
    } catch (e) {
      console.log('okikokokok', e.message);


    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '100%', }}>
        <View style={{ marginTop: window.height / 10, alignItems: 'center' }}>
          <Image source={Images.PR} style={{ borderRadius: 15, width: window.width / 2}}></Image>
          <Image source={Images.LOCK} style={{ width: 60, height: 60,marginTop: 20 }}></Image>
        </View>
        <View style={{paddingLeft: 60, paddingTop: 40, paddingRight: 40}}>
          <Text style={{color: colors.white}}>Enter your email, username , we'll send you a link to change a new password</Text>
        </View>
        <View style={styles.textInputStyles}>
          <TextInputCustom
            value={'UserName'}
            onChangeText={(value) => setUsername(value)}
            placeholder="Enter your name"
          />
          <View style={{padding:10}}></View>
         
          <View style={{ width: window.width / 1.5, paddingTop: window.height / 15 }}>
            <CustomButton title="Forgot Password" onPress={() => clickLogin()} btnStyle={{ borderRadius: 40, height: window.height / 18 }} textStyle={{ fontSize: 18 }} />
          </View>
          <BottomSignLinkText
            text={'Dont have an account ? '}
            clickText={'Sign Up'}
            onPress={()=>props.navigation.navigate('signup')}
          />
        </View>
      </View>
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

export default FogetPassword;
