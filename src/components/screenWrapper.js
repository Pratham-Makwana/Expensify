import {Platform, StatusBar, Text, View} from 'react-native';
import React from 'react';

export default function ScreenWrapper({children}) {
  let statusBarHeight = StatusBar.currentHeight
    ? Platform.OS == 'ios'
      ? StatusBar.currentHeight
      : 0
    : Platform.OS == 'ios'
    ? 30
    : 0;
  //     console.log(statusBarHeight);

  return <View style={{paddingTop: statusBarHeight,}}>{children}</View>;
}
