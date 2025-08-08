import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import quranData from '../surah/mushafmode.json';
import { SafeAreaView } from 'react-native-safe-area-context';

// Fungsi untuk ubah semua ayat menjadi list linear
const flattenQuran = (data) => {
  let verses = [];
  data.forEach(surah => {
    const ayahEntries = Object.entries(surah.text);
    ayahEntries.forEach(([ayahNumber, ayahText], index) => {
      verses.push({
        surahNumber: surah.number,
        surahName: surah.name,
        surahLatin: surah.name_latin,
        ayahNumber: parseInt(ayahNumber),
        text: ayahText,
        isFirstInSurah: index === 0,
      });
    });
  });
  return verses;
};

// Fungsi pembagian halaman khusus (Al-Fatihah, Al-Baqarah 1-5)
const paginateVerses = (verses) => {
  const pages = [];
  let i = 0;

  while (i < verses.length) {
    const verse = verses[i];

    // Al-Fatihah (Surah 1): satu halaman penuh
    if (verse.surahNumber === "1") {
      const alFatihah = verses.filter(v => v.surahNumber === "1");
      pages.push(alFatihah);
      i += alFatihah.length;
      continue;
    }

    // Al-Baqarah ayat 1-5: satu halaman penuh
    if (
      verse.surahNumber === "2" &&
      verse.ayahNumber >= 1 &&
      verse.ayahNumber <= 5
    ) {
      const alBaqarahSpecial = verses.filter(
        (v) => v.surahNumber === "2" && v.ayahNumber >= 1 && v.ayahNumber <= 5
      );
      pages.push(alBaqarahSpecial);
      i += alBaqarahSpecial.length;
      continue;
    }

    // Normal: maksimal 15 ayat
    const nextChunk = verses.slice(i, i + 15);
    pages.push(nextChunk);
    i += 15;
  }

  return pages;
};

const QuranViewer = () => {
  const verses = flattenQuran(quranData);
  const paginated = paginateVerses(verses);

  const [page, setPage] = useState(0);
  const totalPages = paginated.length;
  const currentVerses = paginated[page];

  const showSurahHeader =
    currentVerses.length > 0 && currentVerses[0].isFirstInSurah;
  const surahLatin = currentVerses[0]?.surahLatin || '';
  const surahName = currentVerses[0]?.surahName || '';

  const joinedAyahs = currentVerses
    .map((v) => `${v.text} ﴿${v.ayahNumber}﴾`)
    .join(' ');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {showSurahHeader && (
          <Text style={styles.surahHeader}>
            {surahLatin} - {surahName}
          </Text>
        )}
        <Text style={styles.ayahText}>{joinedAyahs}</Text>
      </ScrollView>

      <View style={styles.pagination}>
        <Button
          title="Prev"
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        />
        <Text style={styles.pageText}>
          {page + 1} / {totalPages}
        </Text>
        <Button
          title="Next"
          onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  surahHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  ayahText: {
    fontSize: 17,
    textAlign: 'justify',
    writingDirection: 'rtl',
    fontFamily: 'sans-serif',
    lineHeight: 40,
    alignSelf: 'center',
    width: '105%',padding:15
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageText: {
    fontSize: 16,
  },
});

export default QuranViewer;
