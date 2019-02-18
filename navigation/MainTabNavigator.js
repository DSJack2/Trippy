import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import NewTripScreen from '../screens/NewTripScreen';
import TripSelectScreen from '../screens/TripSelectScreen'


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  NewTrip: NewTripScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS == 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};


const TripSelectStack = createStackNavigator({
  TripSelect: TripSelectScreen
});



TripSelectStack.navigationOptions = {
  tabBarLabel: 'TripSelect',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={Platform.OS == 'ios' ? 'ios-map' : 'md-map'}
      />
  ),
};


const TabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  MapStack,
  TripSelectStack

});

export default createAppContainer(TabNavigator);
