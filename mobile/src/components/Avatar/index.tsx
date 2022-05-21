import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, View } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = {
  urlImage: string;
};

export function Avatar({ urlImage }: Props) {
  const { secondary50: darkcolor, secondary70: lightcolor } = theme.colors;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[darkcolor, lightcolor]}>
        <Image source={{ uri: urlImage }} style={styles.avatar} />
      </LinearGradient>
    </View>
  );
}
