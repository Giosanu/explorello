import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/login/LoginScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import AddRouteScreen from '../screens/add-route/AddRouteScreen'
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Dashboard: {screen: DashboardScreen},
  Main: {screen: MainTabNavigator},
  Login: {screen: LoginScreen},
  AddRoute: {screen: AddRouteScreen},
  Register: {screen: RegisterScreen},
}));