import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

// Import data juz yang sudah dibuat
import juzList from '../surah/listJuz.json';

const JuzListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.juzItem}
      onPress={() => console.log(`Navigasi ke Juz ${item.number}`)}
    >
      {/* Kolom Kiri: Angka Juz dengan Desain Segi Delapan */}
      <View style={styles.juzNumberEightagonContainer}>
        <View style={styles.juzNumberEightagonDiagonal1} />
        <View style={styles.juzNumberEightagonDiagonal2} />
        <View style={styles.juzNumberTextWrapper}>
          <Text style={styles.juzNumber}>{item.number}</Text>
        </View>
      </View>

      {/* Kolom Tengah: Info Surah Awal dan Akhir */}
      <View style={styles.juzInfoContainer}>
        <Text style={styles.juzTitle}>{`Juz ${item.number}`}</Text>
        <Text style={styles.juzRange}>Mulai Surah {`${item.start_surah.name_latin} : ${item.start_surah.ayah}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <FlatList
          data={juzList}
          renderItem={renderItem}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.listContent}
        />
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
    backgroundColor: '#F5F5DC',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  juzItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // === Styling untuk Segi Delapan (disesuaikan untuk Juz) ===
  juzNumberEightagonContainer: {
    width: 50,
    height: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  juzNumberEightagonDiagonal1: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    transform: [{ rotate: '45deg' }],
    borderRadius: 8,
  },
  juzNumberEightagonDiagonal2: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 8,
  },
  juzNumberTextWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  juzNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // === Akhir Styling Segi Delapan ===
  juzInfoContainer: {
    flex: 1,
  },
  juzTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  juzRange: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default JuzListScreen;