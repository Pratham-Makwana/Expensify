import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';

import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/screenWrapper';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripRef} from '../config/firebase';
import {useSelector} from 'react-redux';

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState('');
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  const handleAddTrip = async () => {
    if (place && country) {
      // good to go
      // navigation.navigate('Home');
      try {
        setLoading(true);
        let doc = await addDoc(tripRef, {
          place,
          country,
          userId: user.uid,
        });
        setLoading(false);
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (e) {
        setLoading(false);
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Place and Country is required!',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-8">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text className={`${colors.heading} font-bold text-center text-xl`}>
              Add Trip
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/4.png')}
            />
          </View>
          <View className="gap-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Where in Earth ?
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Which Country
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={() => handleAddTrip()}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 mx-2 shadow-sm">
              <Text className="text-center text-lg font-bold text-white">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
