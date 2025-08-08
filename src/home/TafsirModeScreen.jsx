import React, { useState, useEffect } from 'react';
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

// Import semua file JSON surah satu per satu
import surah1 from '../surah/1.json';
import surah2 from '../surah/2.json';
import surah3 from '../surah/3.json';
import surah4 from '../surah/4.json';
import surah5 from '../surah/5.json';
import surah6 from '../surah/6.json';
import surah7 from '../surah/7.json';
import surah8 from '../surah/8.json';
import surah9 from '../surah/9.json';
import surah10 from '../surah/10.json';
import surah11 from '../surah/11.json';
import surah12 from '../surah/12.json';
import surah13 from '../surah/13.json';
import surah14 from '../surah/14.json';
import surah15 from '../surah/15.json';
import surah16 from '../surah/16.json';
import surah17 from '../surah/17.json';
import surah18 from '../surah/18.json';
import surah19 from '../surah/19.json';
import surah20 from '../surah/20.json';
import surah21 from '../surah/21.json';
import surah22 from '../surah/22.json';
import surah23 from '../surah/23.json';
import surah24 from '../surah/24.json';
import surah25 from '../surah/25.json';
import surah26 from '../surah/26.json';
import surah27 from '../surah/27.json';
import surah28 from '../surah/28.json';
import surah29 from '../surah/29.json';
import surah30 from '../surah/30.json';
import surah31 from '../surah/31.json';
import surah32 from '../surah/32.json';
import surah33 from '../surah/33.json';
import surah34 from '../surah/34.json';
import surah35 from '../surah/35.json';
import surah36 from '../surah/36.json';
import surah37 from '../surah/37.json';
import surah38 from '../surah/38.json';
import surah39 from '../surah/39.json';
import surah40 from '../surah/40.json';
import surah41 from '../surah/41.json';
import surah42 from '../surah/42.json';
import surah43 from '../surah/43.json';
import surah44 from '../surah/44.json';
import surah45 from '../surah/45.json';
import surah46 from '../surah/46.json';
import surah47 from '../surah/47.json';
import surah48 from '../surah/48.json';
import surah49 from '../surah/49.json';
import surah50 from '../surah/50.json';
import surah51 from '../surah/51.json';
import surah52 from '../surah/52.json';
import surah53 from '../surah/53.json';
import surah54 from '../surah/54.json';
import surah55 from '../surah/55.json';
import surah56 from '../surah/56.json';
import surah57 from '../surah/57.json';
import surah58 from '../surah/58.json';
import surah59 from '../surah/59.json';
import surah60 from '../surah/60.json';
import surah61 from '../surah/61.json';
import surah62 from '../surah/62.json';
import surah63 from '../surah/63.json';
import surah64 from '../surah/64.json';
import surah65 from '../surah/65.json';
import surah66 from '../surah/66.json';
import surah67 from '../surah/67.json';
import surah68 from '../surah/68.json';
import surah69 from '../surah/69.json';
import surah70 from '../surah/70.json';
import surah71 from '../surah/71.json';
import surah72 from '../surah/72.json';
import surah73 from '../surah/73.json';
import surah74 from '../surah/74.json';
import surah75 from '../surah/75.json';
import surah76 from '../surah/76.json';
import surah77 from '../surah/77.json';
import surah78 from '../surah/78.json';
import surah79 from '../surah/79.json';
import surah80 from '../surah/80.json';
import surah81 from '../surah/81.json';
import surah82 from '../surah/82.json';
import surah83 from '../surah/83.json';
import surah84 from '../surah/84.json';
import surah85 from '../surah/85.json';
import surah86 from '../surah/86.json';
import surah87 from '../surah/87.json';
import surah88 from '../surah/88.json';
import surah89 from '../surah/89.json';
import surah90 from '../surah/90.json';
import surah91 from '../surah/91.json';
import surah92 from '../surah/92.json';
import surah93 from '../surah/93.json';
import surah94 from '../surah/94.json';
import surah95 from '../surah/95.json';
import surah96 from '../surah/96.json';
import surah97 from '../surah/97.json';
import surah98 from '../surah/98.json';
import surah99 from '../surah/99.json';
import surah100 from '../surah/100.json';
import surah101 from '../surah/101.json';
import surah102 from '../surah/102.json';
import surah103 from '../surah/103.json';
import surah104 from '../surah/104.json';
import surah105 from '../surah/105.json';
import surah106 from '../surah/106.json';
import surah107 from '../surah/107.json';
import surah108 from '../surah/108.json';
import surah109 from '../surah/109.json';
import surah110 from '../surah/110.json';
import surah111 from '../surah/111.json';
import surah112 from '../surah/112.json';
import surah113 from '../surah/113.json';
import surah114 from '../surah/114.json';

// Objek pemetaan untuk memuat data surah dari variabel yang diimpor
const surahData = {
  1: surah1,
  2: surah2,
  3: surah3,
  4: surah4,
  5: surah5,
  6: surah6,
  7: surah7,
  8: surah8,
  9: surah9,
  10: surah10,
  11: surah11,
  12: surah12,
  13: surah13,
  14: surah14,
  15: surah15,
  16: surah16,
  17: surah17,
  18: surah18,
  19: surah19,
  20: surah20,
  21: surah21,
  22: surah22,
  23: surah23,
  24: surah24,
  25: surah25,
  26: surah26,
  27: surah27,
  28: surah28,
  29: surah29,
  30: surah30,
  31: surah31,
  32: surah32,
  33: surah33,
  34: surah34,
  35: surah35,
  36: surah36,
  37: surah37,
  38: surah38,
  39: surah39,
  40: surah40,
  41: surah41,
  42: surah42,
  43: surah43,
  44: surah44,
  45: surah45,
  46: surah46,
  47: surah47,
  48: surah48,
  49: surah49,
  50: surah50,
  51: surah51,
  52: surah52,
  53: surah53,
  54: surah54,
  55: surah55,
  56: surah56,
  57: surah57,
  58: surah58,
  59: surah59,
  60: surah60,
  61: surah61,
  62: surah62,
  63: surah63,
  64: surah64,
  65: surah65,
  66: surah66,
  67: surah67,
  68: surah68,
  69: surah69,
  70: surah70,
  71: surah71,
  72: surah72,
  73: surah73,
  74: surah74,
  75: surah75,
  76: surah76,
  77: surah77,
  78: surah78,
  79: surah79,
  80: surah80,
  81: surah81,
  82: surah82,
  83: surah83,
  84: surah84,
  85: surah85,
  86: surah86,
  87: surah87,
  88: surah88,
  89: surah89,
  90: surah90,
  91: surah91,
  92: surah92,
  93: surah93,
  94: surah94,
  95: surah95,
  96: surah96,
  97: surah97,
  98: surah98,
  99: surah99,
  100: surah100,
  101: surah101,
  102: surah102,
  103: surah103,
  104: surah104,
  105: surah105,
  106: surah106,
  107: surah107,
  108: surah108,
  109: surah109,
  110: surah110,
  111: surah111,
  112: surah112,
  113: surah113,
  114: surah114,
};

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TafsirModeScreen = ({ route, navigation }) => {
  const { surahNumber } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  
  // Perbaikan di sini: Menggunakan optional chaining untuk pengambilan data yang lebih aman
  const surah = surahData[Number(surahNumber)]?.[surahNumber];

  if (!surah) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Data surah {surahNumber} tidak ditemukan.</Text>
      </View>
    );
  }

  const arabicText = surah.text || {};
  const translations = surah.translations?.id?.text || {};
  const ayahNumbers = Object.keys(arabicText);

  const [selectedTafsir, setSelectedTafsir] = useState('kemenag');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tafsirStates, setTafsirStates] = useState({});

  // Perbaikan di sini: Menggunakan useEffect untuk mereset state tafsirStates
  // setiap kali surahNumber berubah.
  useEffect(() => {
    const initialTafsirStates = {};
    ayahNumbers.forEach(ayah => {
      initialTafsirStates[ayah] = false;
    });
    setTafsirStates(initialTafsirStates);
  }, [surahNumber]);

  const toggleTafsir = (ayahNumber) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    setTafsirStates(prevStates => ({
      ...prevStates,
      [ayahNumber]: !prevStates[ayahNumber],
    }));
  };

  const getTafsirText = (ayahNumber) => {
    const tafsirSources = {
      kemenag: surah.tafsir?.id?.kemenag?.text,
      ibnukatsir: surah.tafsir?.id?.ibnukatsir?.text,
      almuyssar: surah.tafsir?.id?.almuyssar?.text,
    };
    return tafsirSources[selectedTafsir]?.[ayahNumber];
  };

  const tafsirOptions = [
    { key: 'kemenag', label: 'Kemenag' },
    { key: 'ibnukatsir', label: 'Ibnu Katsir' },
    { key: 'almuyssar', label: 'Al-Muyassar' },
  ];

  const handleTafsirSelection = (key) => {
    setSelectedTafsir(key);
    setIsDropdownOpen(false);
  };

  const currentTafsirLabel = tafsirOptions.find(opt => opt.key === selectedTafsir).label;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>«</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleWrapper}>
            <Text style={styles.surahNameLatin}>{surah.name_latin}</Text>
            <Text style={styles.surahInfo}>{`${surah.number_of_ayah} Ayat`}</Text>
          </View>
          
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              onPress={() => setIsDropdownOpen(!isDropdownOpen)} 
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>{currentTafsirLabel}</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {tafsirOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.dropdownItem}
                    onPress={() => handleTafsirSelection(option.key)}
                  >
                    <Text style={styles.dropdownItemText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
              {translations[ayahNumber] && (
                <Text style={styles.translationText}>{translations[ayahNumber]}</Text>
              )}

              {/* Indonesian Tafsir (Commentary) */}
              {getTafsirText(ayahNumber) && (
                <View style={styles.tafsirContainer}>
                  <TouchableOpacity onPress={() => toggleTafsir(ayahNumber)}>
                    <Text style={styles.tafsirHeader}>
                      Tafsir {currentTafsirLabel} (Tap untuk {tafsirStates[ayahNumber] ? 'menutup' : 'membuka'})
                    </Text>
                  </TouchableOpacity>
                  {tafsirStates[ayahNumber] && (
                    <Text style={styles.tafsirText}>{getTafsirText(ayahNumber)}</Text>
                  )}
                </View>
              )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#214937',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitleWrapper: {
    alignItems: 'left',
    flex: 1,
    marginHorizontal: 10,
  },
  surahNameArabic: {
    fontSize: 32,
    fontFamily: 'Scheherazade',
    color: '#fff',
    textAlign: 'center',
  },
  surahNameLatin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'left',
  },
  surahInfo: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
    textAlign: 'left',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    backgroundColor: '#4E7E63',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5, // untuk bayangan di Android
    shadowColor: '#000', // untuk bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    color: '#333',
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

export default TafsirModeScreen;
