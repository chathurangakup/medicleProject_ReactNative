import React from 'react';
import {View, Text} from 'react-native';
import {AppBar} from '../../../components/AppBar';
import IconAccount from 'react-native-vector-icons/MaterialCommunityIcons';
import IconNotif from 'react-native-vector-icons/Ionicons';
import IconPrivacy from 'react-native-vector-icons/MaterialIcons';
import IconAbout from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../config/styles';

const Setting = props => {
  return (
    <View>
      <AppBar
        title={'Setting'}
        navigation={props.navigation}
        isShowSearch={false}
      />

      <View style={{marginTop: 150, marginLeft: 20, marginRight: 20}}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{paddingLeft: 20}}>
            <IconAccount name="account" size={30} color={colors.blackColor} />
          </View>
          <Text
            style={{color: colors.blackColor, paddingLeft: 40, paddingTop: 2, fontSize: 18}}>
            Account
          </Text>
        </View>

        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{paddingLeft: 20}}>
          <IconNotif name="notifications" size={30} color={colors.blackColor} />
          </View>
          <Text
            style={{color: colors.blackColor, paddingLeft: 40, paddingTop: 2, fontSize: 18}}>
            Notification
          </Text>
        </View>

        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{paddingLeft: 20}}>
            <IconPrivacy name="privacy-tip" size={30} color={colors.blackColor} />
          </View>
          <Text
            style={{color: colors.blackColor, paddingLeft: 40, paddingTop: 2, fontSize: 18}}>
            Privacy and security
          </Text>
        </View>

        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{paddingLeft: 20}}>
          <IconPrivacy name="support-agent" size={30} color={colors.blackColor} />
          </View>
          <Text
            style={{color: colors.blackColor, paddingLeft: 40, paddingTop: 2, fontSize: 18}}>
            Help and support
          </Text>
        </View>

        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{paddingLeft: 20}}>
            <IconAbout name="exclamationcircle" size={30} color={colors.blackColor} />
          </View>
          <Text
            style={{color: colors.blackColor, paddingLeft: 40, paddingTop: 2, fontSize: 18}}>
            About
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Setting;
