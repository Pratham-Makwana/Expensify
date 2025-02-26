import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation()
  return (
    <ScreenWrapper>
      <View className='flex  h-full justify-around'>
        <View className='flex-row justify-center mt-10'>
            <Image className='h-96 w-96' source={require('../assets/images/welcome.gif')}/>
        </View>
        {/* Buttons */}
        <View className='mx-3 mb-20'>
            <Text className={`${colors.heading} text-center font-bold text-4xl mb-10`}>Expensify</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}  className='p-3 shadow rounded-full mb-5' style={{backgroundColor : colors.button}}>
                <Text className='text-center text-white text-lg font-bold'>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className='p-3 shadow rounded-full' style={{backgroundColor : colors.button}}>
                <Text className='text-center text-white text-lg font-bold'>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
