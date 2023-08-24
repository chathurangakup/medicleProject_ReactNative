import React from 'react';
import {Text, View, Image, StyleSheet,TouchableOpacity} from 'react-native';
import {AppBar} from '../../../components/AppBar';
import {colors} from '../../../config/styles';
import Images from '../../../config/Images';

import { useSelector, useDispatch } from 'react-redux';




const GoalProcessComponet =(text,colorNum)=>{
  return(
    <View style={{flexDirection: 'row'}}>
    <View style={{marginRight: 20, marginTop: 20}}>
      <Text style={{color: colors.blackColor}}>{text}</Text>
    </View>
    <View style={{flexDirection: 'row',marginRight: 20, marginTop: 15}}>
    <View
      style={{
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 40,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colorNum==1 ?   colors.bgColor: colors.white
      }}></View>
    <View
      style={{
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 40,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colorNum==2 ?   colors.bgColor: colors.white
      }}></View>
    <View
      style={{
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 40,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colorNum==3 ?   colors.bgColor: colors.white
      }}></View>
    <View
      style={{
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 40,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colorNum==4 ?   colors.bgColor: colors.white
      }}></View>
    </View>
  
  </View>
  )
}

const Profile = props => {

  const {userInfo} = useSelector((state) => (state.login))
  return (
    <View>
      <AppBar
        title={'Profile'}
        navigation={props.navigation}
        isShowSearch={false}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.btnBGcolor,
            marginTop: 100,
            marginLeft: 40,
            marginRight: 40,
            padding: 40,
          }}>
          <View style={{flex: 1}}>
            <Image style={styles.imageprofole} source={Images.CHATBOT_USER} />
          </View>
          <View style={{flex: 2}}>
            <Text>{userInfo?.fullName}</Text>
            <Text>Patient helth details</Text>
          </View>
        </View>

        <View style={{margin: 40}}>
          <Text
            style={{
              color: colors.blackColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Workout Feedback
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Parameters
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Limb pain
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Statching Range
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Statching Brushing
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Levels
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Modarate
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 15}}>
                Slight
              </Text>
              <Text style={{color: colors.blackColor, paddingTop: 15}}>
                Slight
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: colors.blackColor, paddingTop: 10}}>
                Last 7 Days
              </Text>
              <Image
                source={Images.CHART}
                style={{width: 40, height: 40, alignSelf: 'center'}}></Image>
              <Image
                source={Images.CHART}
                style={{width: 40, height: 40, alignSelf: 'center'}}></Image>
              <Image
                source={Images.CHART}
                style={{width: 40, height: 40, alignSelf: 'center'}}></Image>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 40}}>
          <Text
            style={{
              color: colors.blackColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Goal Process
          </Text>
         {GoalProcessComponet('Strenth',1)}
         {GoalProcessComponet('Balence',3)}
         {GoalProcessComponet('Flexible',2)}

         <View style={{alignContent:'center',alignItems:'center', paddingTop: 20}}>
         <TouchableOpacity style={{backgroundColor:colors.bgColor, padding: 10}}>
           <Text style={{color: colors.white}}>DOWNLOAD</Text>
         </TouchableOpacity>
         
         </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageprofole: {
    width: 50,
    height: 50,
  },
});

export default Profile;
