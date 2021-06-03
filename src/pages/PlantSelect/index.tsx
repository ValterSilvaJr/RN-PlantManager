import React, { useEffect, useState } from 'react';
import { SafeAreaView,Text, View, FlatList } from 'react-native';
import { EnvironmentButton } from '../../components/EnvironmentButton';
import { Header } from '../../components/Header';
import api from '../../services/api';
import { styles } from './styles';

interface IEnvironmentProps {
  key: string;
  title: string;
}

// ! PAREI NA AULA 3 - 56m 38s - Criação dos Cards

export function PlantSelect(){
  const [environments, setEnvironments] = useState<IEnvironmentProps[]>();

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get<IEnvironmentProps[]>('plants_environments');
      setEnvironments([
        {
        key: 'all',
        title: 'Todos',
        },
        ...data,
    ]);
    }
    fetchEnvironment();
  },[]);

  return(
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Header />
          <Text style={styles.title} children="Em qual ambiente" />
          <Text style={styles.subtitle} children="você quer colocar sua planta?" />
        </View>
        <View>
          <FlatList 
            data={environments}
            renderItem={({ item }) => (
              <EnvironmentButton 
                title={item.title}
              />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.environmentList}
          />
        </View>
      </SafeAreaView>
  )
}