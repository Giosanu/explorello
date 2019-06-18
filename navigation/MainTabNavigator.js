import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddRouteScreen from '../screens/add-route/AddRouteScreen';

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

const AddRouteStack = createStackNavigator({
  AddRouteStack: AddRouteScreen,
});

AddRouteStack.navigationOptions = {
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
  LinksStack,
  AddRouteStack,
  SettingsStack
}, {
  tabBarOptions: {
    showLabel: false
  }
}))