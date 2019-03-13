import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NewTripScreen from '../screens/NewTripScreen';
import TripSelectScreen from '../screens/TripSelectScreen';
import PreviousTripScreen from '../screens/PreviousTripScreen';

const NewTripStack = createStackNavigator({
  TripSelect: TripSelectScreen,
  NewTrip: NewTripScreen,
  Map: MapScreen
}, {
    headerMode: 'none'
  });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  TripSelect: TripSelectScreen,
  NewTrip: NewTripScreen,
  PreviousTrip: PreviousTripScreen
}, {
  headerMode: 'float'
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

// const MapStack = createStackNavigator({
//   Map: MapScreen
// });

// MapStack.navigationOptions = {
//   tabBarLabel: 'Map',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS == 'ios' ? 'ios-map' : 'md-map'}
//     />
//   ),
// };


// const TripSelectStack = createStackNavigator({
//   TripSelect: TripSelectScreen,
//   Map: MapScreen
// });



// TripSelectStack.navigationOptions = {
//   tabBarLabel: 'TripSelect',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS == 'ios' ? 'ios-map' : 'md-map'}
//     />
//   ),
// };


const TabNavigator = createBottomTabNavigator({
  HomeStack,
  // MapStack,
  // TripSelectStack

}, {
  headerMode: 'none'
});

export default createAppContainer(HomeStack);
