import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/login/LoginScreen'
import UsernameScreen from '../screens/login/UsernameScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import MainTabNavigator from './MainTabNavigator';
import AddRouteNavigator from '../screens/add-route/AddRouteNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Dashboard: {screen: DashboardScreen},
  Login: {screen: LoginScreen},
  Username: {screen: UsernameScreen},
  AddRoute: {screen: AddRouteNavigator},
  Main: {screen: MainTabNavigator},
  Register: {screen: RegisterScreen},
}));