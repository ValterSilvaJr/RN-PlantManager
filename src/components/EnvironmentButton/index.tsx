import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles';

interface IEnvironmentButtonProps extends RectButtonProps {
  title: string;
  isActive?: boolean;
}

export function EnvironmentButton({ title, isActive = false, ...rest}: IEnvironmentButtonProps){
  return(
    <RectButton
      style={[
        styles.container,
        isActive && styles.containerActive
      ]}
      { ...rest }
    >
      <Text 
        style={[
          styles.text,
          isActive && styles.textActive
        ]} 
        children={title} 
      />
    </RectButton>
  )
}