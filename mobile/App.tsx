import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rajdhani_500Medium,
    Inter_500Medium,
    Rajdhani_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Background>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
