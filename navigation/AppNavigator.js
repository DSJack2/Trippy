import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/UserAuth/LoginScreen';
import SignupScreen from '../screens/UserAuth/SignupScreen';
import ForgotPasswordScreen from '../screens/UserAuth/ForgotPasswordScreen';

const AppNav = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen,
  Main: MainTabNavigator
});

export default createAppContainer(AppNav);