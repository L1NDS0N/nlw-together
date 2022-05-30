import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchGuilds();
  },[])

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          contentContainerStyle={{ paddingBottom: 69, paddingTop: 69 }}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={styles.guilds}
          data={guilds}
        />
      )}
    </View>
  );
}
