import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

import Splash from './screens/Splash';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const loginOrProfile = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const navTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'AddPhoto') {
            iconName = 'camera';
          } else {
            iconName = 'user';
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
      })}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="AddPhoto" component={AddPhoto} />
      <Tab.Screen name="Profile" component={loginOrProfile} />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="TabNavigation" component={navTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
