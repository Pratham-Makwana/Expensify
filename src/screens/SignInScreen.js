import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';

import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/screenWrapper';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import {setUserLoading} from '../redux/slices/user';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password is Required',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative ">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text className={`${colors.heading} font-bold text-center text-xl`}>
              Sign In
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-80 w-80"
              source={require('../assets/images/login.png')}
            />
          </View>
          <View className="gap-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={value => setEmail(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={value => setPassword(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
            <TouchableOpacity className="flex-row justify-end">
              <Text>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSignIn}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 mx-2 shadow-sm">
              <Text className="text-center text-lg font-bold text-white">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
