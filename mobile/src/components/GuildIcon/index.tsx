import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://github.com/l1nds0n.png';
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
