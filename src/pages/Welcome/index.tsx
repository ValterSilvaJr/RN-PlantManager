import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';

import wateringImg from '../../assets/watering.png';
import { Feather as Icon} from '@expo/vector-icons'
import { styles } from './styles';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {   
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    } 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>

                <Image 
                    style={styles.image} 
                    source={wateringImg}
                    resizeMode="contain"
                />
                
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={styles.button}
                    onPress={handleStart}
                >
                    <Icon 
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}