import React, { useState } from 'react';
import { SafeAreaView, Text, Image } from 'react-native';

import wateringImg from '../../assets/watering.png';
import { Button } from '../../components/Button';
import { styles } from './styles';

export function Welcome() {    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas de{'\n'}
                forma fácil
            </Text>
         
            <Image style={styles.image} source={wateringImg} />
            
            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button title=">" />
        </SafeAreaView>
    )
}