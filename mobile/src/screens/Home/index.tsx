import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Load } from '../../components/Load';
import { Profile } from '../../components/Profile';
import { COLLECTION_APPOINTMENT } from '../../configs/storage';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }
  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(
        storage.filter(appointment => appointment.category === category),
      );
    } else {
      setAppointments(storage);
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category]),
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        onChangeCategory={handleCategorySelect}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title={'Partidas agendadas'}
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            data={appointments}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Appointment
                onPress={() => handleAppointmentDetails(item)}
                data={item}
              />
            )}
            style={styles.matches}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
