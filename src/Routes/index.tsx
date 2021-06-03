import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';
import { StatusBar } from 'react-native';
import colors from '../styles/colors';

const Routes = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor={colors.background} />
    <StackRoutes />
  </NavigationContainer>
);

export default Routes;