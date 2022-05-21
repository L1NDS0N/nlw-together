import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {
  return (
    <View style={styles.container}>
      <Avatar urlImage='https://github.com/l1nds0n.png'/>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá</Text>
          <Text style={styles.username}>Lindnelson</Text>
        </View>
        <Text style={styles.message}>hoje é dia de vitória</Text>
      </View>
    </View>
  );
}
