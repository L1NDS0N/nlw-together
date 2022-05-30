import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthRoutes } from './auth.routes';
import { SignInRoute } from './signInRoute';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <SignInRoute />}
    </NavigationContainer>
  );
}
