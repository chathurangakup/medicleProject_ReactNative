import React from 'react';
import {View, Text,ImageBackground, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginComplete} from '../screens/onboarding/Login/LoginSlice'
import {isChatbotComplete} from '../screens/home/chatBot/ChatBotSlice'

import Images from '../config/Images';
import Iconsicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../config/styles';




const CustomDrawer = props => {
  const dispatch = useDispatch()
  const signOutUser = async () => {
    dispatch(isLoginComplete(false));
    dispatch(isChatbotComplete(false))
    props.navigation.navigate('login')
    // try {
     
    //     await auth().signOut();
       
    //     props.navigation.navigate('login')
    // } catch (e) {
    //     console.log(e);
    // }
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <View  style={{padding:30,backgroundColor: '#8200d6'}}>
            <Image source={Images.CHATBOT_USER} style={{height:80,width:80,borderRadius:40, marginBottom:10}}></Image>
            <Text style={{color:'#fff',fontSize: 18}}>Jhone Doe</Text>
        </View>
        <View style={{flex:1,backgroundColor:'#fff',paddingTop: 10}}>
           <DrawerItemList {...props} />
        </View>
      
      </DrawerContentScrollView>
      <View style={{padding:20,borderTopColor:"#ccc"}}>
      {/* <TouchableOpacity onPress={()=>{props.changeLoginStatus(false)}} style={{paddingVertical:15}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Iconsicons size={22} name="exit-outline" style={{color:colors.blackColor}}/>
          <Text style={{color:colors.blackColor, fontSize:15, marginLeft:5}}>Setting</Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={()=>   signOutUser()}>
        <Text style={{color:colors.blackColor, fontSize:15, marginLeft:5, marginBottom: 30}}>Logout</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  );
};



export default (CustomDrawer);
