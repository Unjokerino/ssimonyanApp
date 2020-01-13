import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import MediaScreen from '../screens/MediaScreen'
import AboutUsScreen from '../screens/AboutUsScreen'

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Settings: SettingsScreen,
      Media:MediaScreen,
      AboutUs:AboutUsScreen,

    },
    {
      initialRouteName: 'Home',
    }
  );

const AppContainer = createAppContainer(RootStack);



export default AppContainer;