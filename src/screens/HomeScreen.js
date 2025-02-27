import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';
import Snackbar from 'react-native-snackbar';

const items = [
  {
    id: 1,
    place: 'Surat',
    country: 'India',
  },
  {
    id: 2,
    place: 'Ahemedabad',
    country: 'India',
  },
  {
    id: 3,
    place: 'Valsad',
    country: 'India',
  },
  {
    id: 4,
    place: 'Jambu',
    country: 'India',
  },
  {
    id: 5,
    place: 'Himachal',
    country: 'India',
  },
  {
    id: 6,
    place: 'Vadodra',
    country: 'India',
  },
];
export default function HomeScreen() {
  const [trips, setTrips] = useState([]);
  const [randomImg, setRandomImg] = useState(null);
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    try {
      const q = query(tripRef, where('userId', '==', user.uid));

      const querySnapShot = await getDocs(q);
      // console.log('==> querySnapShot', querySnapShot);
      let data = [];
      querySnapShot.forEach(doc => {
        // console.log('==> Doc', doc.data(), doc.id);
        data.push({...doc.data(), id: doc.id});
      });
      setTrips(data);
      // console.log("==> data", data);
    } catch (e) {
      Snackbar.show({
        text: e.message,
        backgroundColor: 'red',
      });
    }
  };

  useEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 border border-gray-400 bg-white rounded-full">
          <Text className={`${colors.heading} font-bold text-1xl`}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require('../assets/images/banner.png')}
          className="h-60 w-60"
        />
      </View>
      <View className="px-4 gap-y-3 ">
        <View className="flex-row justify-between items-center mb-3">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            className="p-2 px-3 border border-gray-200 bg-white rounded-full"
            onPress={() => navigation.navigate('AddTrips')}>
            <Text className={`${colors.heading} font-bold text-1xl`}>
              Add Trips
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 430}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            keyExtractor={item => item.id}
            data={trips}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-3 "
            renderItem={({item}) => (
              <TouchableOpacity
                className="bg-white p-4 rounded-2xl mb-3 shadow-sm"
                onPress={() => navigation.navigate('TripExpenes', {...item})}>
                <View>
                  <Image source={randomImage()} className="w-40 h-40 mb-2" />
                  <Text className={`${colors.heading} font-bold`}>
                    {item.place}
                  </Text>
                  <Text className={`${colors.heading} text-sm`}>
                    {item.country}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
