import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Modal,
  TextInput,
} from 'react-native';

import quranList from '../surah/listSurah.json';

const SurahListScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuranList, setFilteredQuranList] = useState(quranList);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    const formattedQuery = query.toLowerCase();
    if (formattedQuery === '') {
      setFilteredQuranList(quranList);
      return;
    }
    const filteredData = quranList.filter(item => {
      return (
        item.name_latin.toLowerCase().includes(formattedQuery) ||
        item.name.includes(formattedQuery) ||
        item.number.toString().includes(formattedQuery)
      );
    });
    setFilteredQuranList(filteredData);
  };
  
  // Fungsi untuk menghapus input pencarian
  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSurahPress = (surah) => {
    setSelectedSurah(surah);
    setIsModalVisible(true);
  };

  const handleModeSelect = (mode) => {
    setIsModalVisible(false);
    if (selectedSurah) {
      console.log(`Navigasi ke ${mode} untuk Surah ${selectedSurah.name_latin}`);
      // Tambahkan navigasi aktual di sini
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.surahItem}
      onPress={() => handleSurahPress(item)}
    >
      <View style={styles.surahNumberEightagonContainer}>
        <View style={styles.surahNumberEightagonDiagonal1} />
        <View style={styles.surahNumberEightagonDiagonal2} />
        <View style={styles.surahNumberTextWrapper}>
          <Text style={styles.surahNumber}>{item.number}</Text>
        </View>
      </View>
      <View style={styles.surahNameContainer}>
        <Text style={styles.surahNameLatin}>{item.name_latin}</Text>
        <Text style={styles.surahTranslation}>{item.translation}</Text>
      </View>
      <View style={styles.surahArabicContainer}>
        <Text style={styles.surahNameArabic}>{item.name}</Text>
        <Text style={styles.surahAyahCount}>{`${item.number_of_ayah} Ayat`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {/* Kolom Pencarian */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari surah..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* Ikon silang hanya muncul jika ada teks di kolom pencarian */}
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={filteredQuranList}
          renderItem={renderItem}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Komponen Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Mode Bacaan</Text>
            {selectedSurah && (
              <Text style={styles.surahTitleModal}>{`Surah ${selectedSurah.name_latin}`}</Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modeButton}
                onPress={() => handleModeSelect('Quran Mode')}
              >
                <Text style={styles.modeButtonText}>Mushaf Madinah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modeButton}
                onPress={() => handleModeSelect('Tafsir Mode')}
              >
                <Text style={styles.modeButtonText}>Tafsir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modeButton}
                onPress={() => handleModeSelect('Audio Mode')}
              >
                <Text style={styles.modeButtonText}>Murottal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={[styles.modeButtonText, styles.cancelButtonText]}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 15,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#F5F5DC',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingRight: 40, // Memberi ruang untuk tombol silang
  },
  clearButton: {
    position: 'absolute',
    right: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  clearButtonText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
  surahItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  // === Styling untuk Segi Delapan ===
  surahNumberEightagonContainer: {
    width: 50,
    height: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  surahNumberEightagonDiagonal1: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    transform: [{ rotate: '45deg' }],
    borderRadius: 8,
  },
  surahNumberEightagonDiagonal2: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 8,
  },
  surahNumberTextWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#214937',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  surahNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // === Akhir Styling Segi Delapan ===
  surahNameContainer: {
    flex: 1,
  },
  surahNameLatin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  surahTranslation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  surahArabicContainer: {
    alignItems: 'flex-end',
  },
  surahNameArabic: {
    fontSize: 24,
    fontFamily: 'Scheherazade',
    color: '#214937',
  },
  surahAyahCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  // === Styling Modal Pop-up ===
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  surahTitleModal: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  modeButton: {
    backgroundColor: '#214937',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  modeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#333',
  },
});

export default SurahListScreen;