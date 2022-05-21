import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: Props) {
  const {
    secondary40: darkerColor,
    secondary50: darkcolor,
    secondary70: lightcolor,
    secondary85: lighterColor,
  } = theme.colors;

  return (
    <RectButton {...rest}>
      <LinearGradient style={styles.container} colors={[darkcolor, lightcolor]}>
        
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.6 }]}
          colors={[checked ? lighterColor : darkcolor, darkerColor]}
        >
          {hasCheckBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}

          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}
