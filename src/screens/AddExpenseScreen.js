import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';

import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/screenWrapper';
import {categories} from '../constants';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();
  const handleAddExpenses = () => {
    if (title && amount && category) {
      // good to go
      navigation.goBack()
    } else {
      // throw some error
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
              Add Expenses
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/expenseBanner.png')}
            />
          </View>
          <View className="gap-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              For What?
            </Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              How Much
            </Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="bg-white p-4 rounded-full mb-3"
            />
          </View>
          <View className="mx-2 gap-x-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Category
            </Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map(cat => {
                let bgColor = 'bg-white';
                if (cat.value == category) bgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleAddExpenses}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 mx-2 shadow-sm">
            <Text className="text-center text-lg font-bold text-white">
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
