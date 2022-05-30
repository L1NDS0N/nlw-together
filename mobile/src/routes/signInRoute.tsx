import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { theme } from '../global/styles/theme';
import { SignIn } from '../screens/SignIn';

export function SignInRoute() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
