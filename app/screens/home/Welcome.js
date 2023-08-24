import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Images from '../../config/Images';
import {colors} from '../../config/styles';
import CustomButton from '../../components/CustomButton';

const window = Dimensions.get('window');

const Welcome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '100%'}}>
        <View style={{marginTop: window.height / 10, alignItems: 'center', marginBottom:window.height / 10 }}>
          <Image
            source={Images.PR}
            style={{borderRadius: 15, width: window.width / 2}}></Image>
        </View>
        <View style={styles.textInputStylesContainer}>
          <Text style={styles.textFirstStyle}>WELCOME TO PHYSIODVYSOR</Text>
          <Text style={styles.textSecondStyle}>
            HELLO NISAL,{'\n'}YOUR ACCOUNT HAS BEEN {'\n'} CREATED,{'\n'} LET'SGET YOU ONBOARDED!
          </Text>
        </View>

        <View
          style={{width: window.width / 1.5, paddingTop: window.height / 15,alignSelf:'center'}}>
          <CustomButton
            title="Begin"
            onPress={() => props.navigation.navigate('chatbot')}
            btnStyle={{borderRadius: 40, height: window.height / 18}}
            textStyle={{fontSize: 18}}
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
    backgroundColor: colors.bgColor,
  },
  textInputStylesContainer: {
    marginLeft: 60,
    marginRight: 60,
    alignItems:'center',
  },
  textFirstStyle: {
    alignItems:'center',
    paddingBottom: 30,
    textAlign:'center',
    color: colors.white,
  },
  textSecondStyle:{
    textAlign:'center',
    color: colors.white,
  }
});

export default Welcome;
