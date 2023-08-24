/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';


import {colors} from '../config/styles';

// static defaultProps = {
//   appStatusBarConfig: {
//     statusBarBgColor: colors.lightBlue,
//     barStyle: 'light-content',
//   },
// };

interface PageProps {
  foo?: string;
  bar: number;
}


export const AppStatusBar: React.FC<PageProps> = (props) =>{


  return (
   
    <StatusBar
    backgroundColor={appStatusBarConfig.lightBlue}
    barStyle={appStatusBarConfig.barStyle}
  />

  )
}



export default AppStatusBar;
