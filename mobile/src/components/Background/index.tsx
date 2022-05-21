import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function Background({ children }: ViewProps) {
  const { secondary80, secondary100 } = theme.colors;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={[secondary80, secondary100]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
