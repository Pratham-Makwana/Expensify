import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';

import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import ExpenseCard from '../components/expenseCard';
import BackButton from '../components/backButton';
import {getDocs, query, where} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import Snackbar from 'react-native-snackbar';
import Loading from '../components/loading';
const items = [
  {
    id: 1,
    title: 'title 1',
    amount: 50,
    category: 'food',
  },
  {
    id: 2,
    title: 'title 2',
    amount: 300,
    category: 'shopping',
  },
  {
    id: 3,
    title: 'title 3',
    amount: 200,
    category: 'food',
  },
  {
    id: 4,
    title: 'title 4',
    amount: 500,
    category: 'shopping',
  },
];
export default function TripExpensesScreen(props) {
  const {id, place, country} = props.route.params;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    try {
      const q = query(expensesRef, where('tripId', '==', id));
      const querySnapShot = await getDocs(q);
      let data = [];
      querySnapShot.forEach(doc => {
        // console.log('==>', doc.data(), doc.id);
        data.push({...doc.data(), id: doc.id});
      });

      // console.log("==> expenses", data);

      setExpenses(data);
    } catch (e) {
      Snackbar.show({
        text: e.message,
        backgroundColor: 'red',
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchExpenses();
      setLoading(false);
    }
  }, [isFocused]);

  // console.log('==> Props', props.route.params);

  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="px-4">
        <View className="relative mt-8">
          <View className="absolute top-0 left-0 z-10">
            <BackButton />
          </View>

          <View>
            <Text className={`${colors.heading} font-bold text-center text-xl`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-center text-sm`}>
              {country}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center rounded-xl  mb-4">
          <Image
            source={require('../assets/images/7.png')}
            className="h-80 w-80"
          />
        </View>

        <View className="gap-y-3 ">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              className="p-2 px-3 border border-gray-200 bg-white rounded-full"
              onPress={() =>
                navigation.navigate('AddExpense', {id, place, country})
              }>
              <Text className={`${colors.heading} font-bold text-1xl`}>
                Add Expenses
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 430}}>
            {loading ? (
              <Loading />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <EmptyList message={"You haven't recorded any expense yet"} />
                }
                keyExtractor={item => item.id}
                data={expenses}
                className="mx-3 "
                renderItem={({item}) => <ExpenseCard item={item} />}
              />
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
