import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SholatScreen from '../home/SholatScreen';
import HomeScreen from '../home/HomeScreen';
import AkunScreen from '../home/AkunScreen';
import TafsirModeScreen from '../home/TafsirModeScreen';
import MushafModeScreen from '../home/MushafModeScreen';
import QuranAudioPlayer from '../home/MurotalModeScreen';

// Import satu set aset gambar untuk ikon tab
const HomeIcon = require('../assets/quran.png');
const ListIcon = require('../assets/mosque.png');
const PersonIcon = require('../assets/setting.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={MainNavigator} />
    <Stack.Screen name="TafsirMode" component={TafsirModeScreen} />
    <Stack.Screen name="MushafMode" component={MushafModeScreen} />
    <Stack.Screen name="MurotalMode" component={QuranAudioPlayer} />


  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: styles.tabBarStyle,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#214937',
      tabBarInactiveTintColor: '#777',
      tabBarIcon: ({ color, size }) => { // Menerima prop 'color' dari navigator
        let icon;
        if (route.name === 'MyQuran') {
          icon = HomeIcon;
        } else if (route.name === 'Sholat') {
          icon = ListIcon;
        } else if (route.name === 'Lainnya') {
          icon = PersonIcon;
        }
        
        // Menggunakan tintColor untuk mewarnai ikon
        return <Image source={icon} style={{ width: size, height: size, tintColor: color }} />;
      },
    })}
  >
    <Tab.Screen name="MyQuran" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Sholat" component={SholatScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Lainnya" component={AkunScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    paddingBottom: 5,
  },
});

export default MainStack;