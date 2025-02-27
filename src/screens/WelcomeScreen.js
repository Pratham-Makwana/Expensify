import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../config/firebase';

// Somewhere in your code
GoogleSignin.configure({
  webClientId:
    '914544315700-ng3tqntf1li8o39lapvj777o3gsb2k8u.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
});

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const signIn = async () => {
    try {
      console.log('==> called SignIn');

      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log('==> userInfo', idToken);

      const googleCredentials = GoogleAuthProvider.credential(idToken);
      console.log('==> googleCredentials', googleCredentials);

      await signInWithCredential(auth, googleCredentials);
    } catch (error) {
      console.log('==> error', error.message);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex  h-full justify-around">
        <View className="flex-row justify-center mt-10">
          <Image
            className="h-96 w-96"
            source={require('../assets/images/welcome.gif')}
          />
        </View>
        {/* Buttons */}
        <View className="mx-3 mb-20">
          <Text
            className={`${colors.heading} text-center font-bold text-4xl mb-10`}>
            Expensify
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="p-3 shadow rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="p-3 shadow rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signIn()}
            className="p-3 shadow rounded-full bg-white">
            <View className="flex-row justify-center items-center gap-x-3">
              <Image
                source={require('../assets/images/googleIcon.png')}
                className="h-8 w-8"
              />
              <Text className="text-center text-gray-600 text-lg font-bold">
                Sign In With Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
