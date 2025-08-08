import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Switch, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Data statis untuk menu "Lainnya"
const menuItems = [
  { id: '3', title: 'Kebijakan Privasi', icon: 'shield-outline' },
  { id: '4', title: 'Syarat dan Ketentuan', icon: 'document-text-outline' },
  { id: '5', title: 'Ingin Pahala Jariyah?', subtitle: 'Bagikan MyQuran', icon: 'heart-outline' },
  { id: '6', title: 'Beri Nilai', icon: 'star-outline' },
  { id: '8', title: 'Kritik & Saran', icon: 'chatbox-outline' },
  { id: '9', title: 'Versi', value: '0.0.5', icon: 'information-circle-outline' },
];

const MoreScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fungsi untuk render setiap item menu
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
        </View>
      </View>
      {item.type === 'switch' ? (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={setIsDarkMode}
          value={isDarkMode}
        />
      ) : item.value ? (
        <Text style={styles.menuValue}>{item.value}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F1EC" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lainnya</Text>
      </View>

      {/* Daftar Menu */}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.menuList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EC',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A4A4A',
  },
  menuList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
  },
  menuTitle: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  menuValue: {
    fontSize: 16,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default MoreScreen;