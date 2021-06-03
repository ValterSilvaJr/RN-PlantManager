import React from 'react';
import { Text, Image, View } from 'react-native';
import { styles } from './styles';

export function Header(){
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting} children="Olá," />
        <Text style={styles.userName} children="Valter" />
      </View>
      <Image style={styles.image} source={require('../../assets/valter.jpg')} />
    </View>
  );
};