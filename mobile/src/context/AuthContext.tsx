import React, { createContext, useEffect, useState } from 'react';

import * as AuthSession from 'expo-auth-session';
import {
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE,
} from '../configs';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USER } from '../configs/storage';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);
    if (storage) {
      const user: User = JSON.parse(storage);
      api.defaults.headers.authorization = `Bearer ${user.token}`;
      setUser(user);
    }
  }
  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  async function signIn() {
    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

    try {
      setLoading(true);

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;
        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData: User = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
        setUser(userData);
      }
    } catch {
      throw new Error('não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signOut, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
