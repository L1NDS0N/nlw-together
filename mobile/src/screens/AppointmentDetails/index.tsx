import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  Share,
  Text,
  View,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import bannerImg from '../../assets/banner.png';
import { AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Load } from '../../components/Load';
import { Member, MemberProps } from '../../components/Member';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as Params;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`,
      );

      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        'Erro ao carregar dados do servidor, verifique a configuração de widget do canal do discord' +
          error,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite || `Junte-se a ${guildSelected.guild.name}`;

    await Share.share({
      message: message,
      url: widget.instant_invite || '',
    });
  }

  function handleOpenGuild() {
    widget.instant_invite
      ? Linking.openURL(widget.instant_invite || '')
      : Alert.alert('O link da sala não foi cadastrado');
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
          {guildSelected.guild.owner && (
            <View style={styles.footer}>
              <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida" />
            </View>
          )}
        </>
      )}
    </Background>
  );
}
