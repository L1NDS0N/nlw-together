import axios from 'axios';
import React, { useEffect } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();
  const [motivationalQuote, setMotivationalQuote] = React.useState('');
  useEffect(() => {
    axios
      .get('https://positive-vibes-api.herokuapp.com/quotes/random')
      .then(res => {
        setMotivationalQuote(res.data.data);
      });
  }, []);

  function handleSignOut() {
    Alert.alert('Logout', 'Tem certeza que deseja se deslogar?', [
      {
        text: 'Sim',
        onPress: () => signOut(),
      },
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => {},
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <ScrollView style={styles.messageBox} scrollEnabled>
          <Text style={styles.message}>{motivationalQuote}</Text>
        </ScrollView>
      </View>
    </View>
  );
}
