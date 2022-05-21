import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  action?: ViewProps['children'];
};

export function Header({ title, action }: Props) {
  const navigation = useNavigation();
  const {
    secondary100: lightColor,
    secondary40: darkColor,
    heading: iconColor,
  } = theme.colors;

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <LinearGradient style={styles.container} colors={[lightColor, darkColor]}>
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={iconColor} />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {action && <View>{action}</View>}
    </LinearGradient>
  );
}
