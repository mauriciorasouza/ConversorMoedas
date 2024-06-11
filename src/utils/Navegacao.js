import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme, ThemeProvider } from '../assets/context/ContextoVisual';
import Conversao from '../screens/Conversao';
import Historico from '../screens/Historico';
import { Image, TouchableOpacity } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

import iconConversao from '../assets/iconConversao.png';
import iconHistorico from '../assets/iconHistorico.png';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Conversao') {
              iconName = iconConversao;
            } else if (route.name === 'Historico') {
              iconName = iconHistorico;
            }
            return <Image source={iconName} style={{ width: 24, height: 24, tintColor: color }} />;
          },
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "yellow" : "black"} />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen name="Conversao" component={Conversao} />
        <Tab.Screen name="Historico" component={Historico} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
);
