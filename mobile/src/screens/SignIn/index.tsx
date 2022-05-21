import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import illustrationsImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';

export function SignIn() {
  const navigation = useNavigation();
  function handleSignIn() {
    navigation.navigate('Home');
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={illustrationsImg}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`} e organize suas {`\n`} jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}favoritos com seus amigos
          </Text>

          <ButtonIcon onPress={handleSignIn} title="Entrar com o Discord" />
        </View>
      </View>
    </Background>
  );
}