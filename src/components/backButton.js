import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../theme';

export default function BackButton() {
 

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
       
        if (navigation.canGoBack()) {
          console.log('==> going back');
          navigation.goBack();
        } else {
          console.log('==> no screen to go back to');
        }
      }}
      className="bg-white rounded-full h-8 w-8 items-center justify-center">
      <ChevronLeftIcon size={'30'} color={colors.button} />
    </TouchableOpacity>
  );
}
