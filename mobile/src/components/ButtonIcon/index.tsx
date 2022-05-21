import React from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { styles } from './styles';

import discordImg from '../../assets/discord.png';

type Props = RectButtonProps & {
  title: string;
};

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon}></Image>
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
