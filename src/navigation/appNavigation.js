import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {useDispatch, useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';
import {setUser} from '../redux/slices/user';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [currentUser, setCurrentUser] = useState();
  const {user} = useSelector(state => state.user);
  console.log('==> user', user);
  console.log('==> currentUser', currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        };
        dispatch(setUser(serializedUser));
        setCurrentUser(serializedUser);
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (currentUser) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="AddTrips"
            component={AddTripScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TripExpenes"
            component={TripExpensesScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false, presentation: 'modal'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false, presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
