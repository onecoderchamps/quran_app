import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SurahListScreen from './SurahScreen';
import JuzListScreen from './JuzScreen';
import BookmarkScreen from './BookmarkScreen';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#214937',
            tabBarInactiveTintColor: '#888',
            tabBarIndicatorStyle: {
              backgroundColor: '#214937', // Garis bawah tab aktif
              height: 3,
            },
            tabBarStyle: {
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen name="Surah" component={SurahListScreen} />
          <Tab.Screen name="Juz" component={JuzListScreen} />
          <Tab.Screen name="Bookmark" component={BookmarkScreen} />
        </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
});

export default HomeScreen;