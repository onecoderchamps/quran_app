import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Import the JSON data for Surah 1 (Al-Fatihah)
import surahData from '../surah/1.json';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const surah = surahData['1'];

  const arabicText = surah.text;
  const translations = surah.translations.id.text;
  const tafsir = surah.tafsir.id.kemenag.text;

  const ayahNumbers = Object.keys(arabicText);

  // State untuk melacak status buka/tutup setiap tafsir
  const [tafsirStates, setTafsirStates] = useState({});

  const toggleTafsir = (ayahNumber) => {
    // Tambahkan animasi saat status berubah
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    setTafsirStates(prevStates => ({
      ...prevStates,
      [ayahNumber]: !prevStates[ayahNumber],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.surahNameArabic}>{surah.name}</Text>
          <Text style={styles.surahNameLatin}>{surah.name_latin}</Text>
          <Text style={styles.surahInfo}>{`${surah.number_of_ayah} Ayat`}</Text>
        </View>

        <ScrollView style={styles.contentContainer}>
          {ayahNumbers.map(ayahNumber => (
            <View key={ayahNumber} style={styles.ayahContainer}>
              {/* Arabic Ayah */}
              <View style={styles.ayahWrapper}>
                <Text style={styles.ayahNumber}>{`${ayahNumber}.`}</Text>
                <Text style={styles.ayahText}>{arabicText[ayahNumber]}</Text>
              </View>

              {/* Indonesian Translation */}
              <Text style={styles.translationText}>{translations[ayahNumber]}</Text>

              {/* Indonesian Tafsir (Commentary) */}
              <View style={styles.tafsirContainer}>
                <TouchableOpacity onPress={() => toggleTafsir(ayahNumber)}>
                  <Text style={styles.tafsirHeader}>
                    Tafsir (Tap untuk {tafsirStates[ayahNumber] ? 'menutup' : 'membuka'})
                  </Text>
                </TouchableOpacity>
                {tafsirStates[ayahNumber] && (
                  <Text style={styles.tafsirText}>{tafsir[ayahNumber]}</Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#214937',
    alignItems: 'center',
  },
  surahNameArabic: {
    fontSize: 32,
    fontFamily: 'Scheherazade',
    color: '#fff',
  },
  surahNameLatin: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  surahInfo: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  contentContainer: {
    padding: 15,
  },
  ayahContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  ayahWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ayahNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 10,
    marginTop: 5,
  },
  ayahText: {
    flex: 1,
    fontSize: 24,
    textAlign: 'right',
    lineHeight: 40,
    fontFamily: 'Scheherazade',
    color: '#214937',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'left',
    marginBottom: 15,
  },
  tafsirContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
  },
  tafsirHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#214937',
    marginBottom: 5,
    paddingBottom: 5,
  },
  tafsirText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    paddingTop: 5,
  },
});

export default HomeScreen;