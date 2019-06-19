import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddRouteNavigator from '../screens/add-route/AddRouteNavigator';

const HomeStack = createStackNavigator({
  Dashboard: DashboardScreen
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='home'
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='magnify'
    />
  ),
};

// const AddRouteStack = createStackNavigator({
//   AddRouteStack: AddRouteNavigator,
// });

AddRouteNavigator.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='map-marker-plus'
    />
  ),
}
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='account'
    />
  ),
}

export default createAppContainer(createBottomTabNavigator({
  HomeStack,
  AddRouteNavigator,
  LinksStack,
  SettingsStack
}, {
  tabBarOptions: {
    showLabel: false,
    inactiveBackgroundColor: 'rgba(0,48,73,0.9)',
    activeBackgroundColor: '#ff4d00'
  }
}))