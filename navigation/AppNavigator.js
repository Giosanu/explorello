import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/login/LoginScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import MainTabNavigator from './MainTabNavigator';
import AddRouteNavigator from '../screens/add-route/AddRouteNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Dashboard: {screen: DashboardScreen},
  Login: {screen: LoginScreen},
  Main: {screen: MainTabNavigator},
  AddRoute: {screen: AddRouteNavigator},
  Register: {screen: RegisterScreen},
}));