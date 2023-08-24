import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Splash from '../screens/onboarding/Splash';
import Login from '../screens/onboarding/Login/Login';
import SignUp from '../screens/onboarding/SignUp/SignUp';
import FogetPassword from '../screens/onboarding/FogetPassword/FogetPassword';

import Welcome from '../screens/home/Welcome';
import Chatbot from '../screens/home/chatBot/Chatbot';

import Home from '../screens/home/Home';

import {DrawerNavigation} from './BottomTabNavigation'
import ExercisePlan from '../screens/home/exercisePlan/ExercisePlan.js';
import VideoRecord from '../screens/home/videoRecord/VideoRecord';
import ExerciseFeedback from '../screens/home/exerciseFeedback/ExerciseFeedback';



const onboardingScreens: any = {
    splash: { screen: Splash },
    login: { screen: Login },
    signup: { screen: SignUp },
    forgrtPassword: {screen: FogetPassword}
};

const signInScreens: any = {
  welcome: {screen: Welcome},
  chatbot: {screen: Chatbot},
}

const tabScreens: any = {
  bottomTabs: {screen: DrawerNavigation},
  exercisePlan: {screen: ExercisePlan},
  videoRecord: {screen: VideoRecord},
  exerciseFeedback: {screen: ExerciseFeedback},
}


const Stack = createNativeStackNavigator();


export const MainStack2 = () => {
  let screens = [];
  for (let key in tabScreens) {
    if (tabScreens.hasOwnProperty(key)) {
      screens.push(
        <Stack.Screen
          key={key}
          name={key}
          component={tabScreens[key].screen}
        />,
      );
    }
  }
  return (
    <Stack.Navigator
      initialRouteName="bottomTabs"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {screens}
    </Stack.Navigator>
  );
};


export const MainStack = () => {
    let screens = [];
    for (let key in signInScreens) {
      if (signInScreens.hasOwnProperty(key)) {
        screens.push(
          <Stack.Screen
            key={key}
            name={key}
            component={signInScreens[key].screen}
          />,
        );
      }
    }
    return (
      <Stack.Navigator
        initialRouteName="bottomTabs"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        {screens}
      </Stack.Navigator>
    );
  };


export const Onboarding = () => {
    let screens = [];
    for (let key in onboardingScreens) {
        if (onboardingScreens.hasOwnProperty(key)) {
            screens.push(
                <Stack.Screen
                    key={key}
                    name={key}
                    component={onboardingScreens[key].screen}/>,
            );
        }
    }
    return (
        <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
            }
            }>
            {screens}
        </Stack.Navigator>
    );
};