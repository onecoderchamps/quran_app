import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, useColorScheme } from 'react-native';

const BookmarkScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>Halaman Bookmark</Text>
        <Text style={styles.info}>
          Di sini Anda dapat melihat surah atau ayat yang telah Anda simpan.
        </Text>
        {/* Tambahkan logika dan komponen untuk menampilkan daftar bookmark di sini */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#214937',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default BookmarkScreen;