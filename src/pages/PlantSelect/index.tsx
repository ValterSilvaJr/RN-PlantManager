import React, { useEffect, useState } from 'react';
import { SafeAreaView,Text, View, FlatList, ActivityIndicator } from 'react-native';
import { EnvironmentButton } from '../../components/EnvironmentButton';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PlantCardPrimary } from '../../components/PlantCardPrimary';
import api from '../../services/api';
import colors from '../../styles/colors';
import { styles } from './styles';

interface IEnvironmentProps {
  key: string;
  title: string;
}

interface IPlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: Array<string>;
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect(){
  const [environments, setEnvironments] = useState<IEnvironmentProps[]>();
  const [plants, setPlants] = useState<IPlantProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment)
    
    if(environment === 'all'){
      return setFilteredPlants(plants);
    }
    
    const filtered = plants?.filter(plant => 
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered)
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get<IEnvironmentProps[]>(`plants_environments?_sort=title&_order=asc`);
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

  async function fetchPlants() {
    const { data } = await api
      .get<IPlantProps[]>(
        `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
      );
    
    if(!data)
      return setIsLoading(true)
    
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchPlants();
  },[])

  const handleFetchMore = (distance: number) => {
    if(distance < 1){
      return;
    }
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  if(isLoading)
    return <Load />

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
                isActive={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.environmentList}
          />
        </View>
        <View style={styles.plants}>
          <FlatList 
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary 
                data={item}
              />
              )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => 
              handleFetchMore(distanceFromEnd) 
            }
            ListFooterComponent={
              loadingMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
            }
          />
        </View>
      </SafeAreaView>
  )
}