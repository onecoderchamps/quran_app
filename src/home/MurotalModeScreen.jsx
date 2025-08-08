import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Contoh data JSON untuk Surah Al-Fatihah.
// Di aplikasi sungguhan, data ini bisa diimpor dari file terpisah.
const surahData = {
    "1": {
        "number": "1",
        "name": "الفاتحة",
        "name_latin": "Al-Fatihah",
        "number_of_ayah": "7",
        "text": {
            "1": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
            "2": "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ",
            "3": "الرَّحْمٰنِ الرَّحِيْمِۙ",
            "4": "مٰلِكِ يَوْمِ الدِّيْنِۗ",
            "5": "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ",
            "6": "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ ۙ",
            "7": "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ࣖ"
        },
        "audio": {
            "1": "001001.mp3",
            "2": "001002.mp3",
            "3": "001003.mp3",
            "4": "001004.mp3",
            "5": "001005.mp3",
            "6": "001006.mp3",
            "7": "001007.mp3"
        },
    }
};

// Mengonversi data JSON ke format array untuk FlatList
const verses = Object.keys(surahData['1'].text).map(ayahNumber => ({
    ayahNumber,
    text: surahData['1'].text[ayahNumber],
    audioFile: surahData['1'].audio[ayahNumber],
}));

const QuranAudioPlayer = () => {
    // State untuk mengelola status pemutar audio
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

    // Fungsi untuk memutar audio
    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    // Efek untuk menyimulasikan pemutaran audio secara otomatis
    useEffect(() => {
        let interval;
        if (isPlaying) {
            // Simulasi pemutaran ayat berikutnya setiap 2 detik
            interval = setInterval(() => {
                setCurrentAyahIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex < verses.length) {
                        // Di aplikasi sungguhan, di sini Anda akan memuat dan memutar audio baru
                        console.log(`Memainkan audio untuk ayat ke-${verses[nextIndex].ayahNumber}`);
                        return nextIndex;
                    } else {
                        // Jika sudah selesai, kembali ke awal dan berhenti
                        setIsPlaying(false);
                        return 0;
                    }
                });
            }, 2000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPlaying, verses.length]);

    // Fungsi untuk melompat ke ayat berikutnya
    const playNext = () => {
        if (currentAyahIndex < verses.length - 1) {
            const nextIndex = currentAyahIndex + 1;
            setCurrentAyahIndex(nextIndex);
            // Di sini Anda akan memuat dan memutar audio untuk ayat berikutnya
            console.log(`Melompat ke audio untuk ayat ke-${verses[nextIndex].ayahNumber}`);
        } else {
            // Kembali ke awal jika sudah di akhir
            setCurrentAyahIndex(0);
            setIsPlaying(false);
        }
    };

    // Fungsi untuk melompat ke ayat sebelumnya
    const playPrevious = () => {
        if (currentAyahIndex > 0) {
            const prevIndex = currentAyahIndex - 1;
            setCurrentAyahIndex(prevIndex);
            // Di sini Anda akan memuat dan memutar audio untuk ayat sebelumnya
            console.log(`Melompat ke audio untuk ayat ke-${verses[prevIndex].ayahNumber}`);
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity 
            style={[
                styles.verseContainer,
                currentAyahIndex === index && styles.highlightedVerse
            ]}
            onPress={() => {
                setCurrentAyahIndex(index);
                setIsPlaying(true);
                // Di aplikasi sungguhan, di sini Anda akan memuat dan memutar audio yang dipilih
            }}
        >
            <Text style={styles.ayahText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Surah {surahData['1'].name_latin} - {surahData['1'].name}</Text>
            
            <FlatList
                data={verses}
                renderItem={renderItem}
                keyExtractor={item => item.ayahNumber}
                style={styles.verseList}
            />

            <View style={styles.playerControls}>
                <Text style={styles.currentAyahText}>
                    Ayat: {verses[currentAyahIndex]?.ayahNumber}
                </Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={playPrevious} style={styles.controlButton}>
                        <Text style={styles.controlText}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
                        <Text style={styles.controlText}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={playNext} style={styles.controlButton}>
                        <Text style={styles.controlText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    verseList: {
        flex: 1,
    },
    verseContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    highlightedVerse: {
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
    },
    ayahText: {
        fontSize: 22,
        textAlign: 'right',
        lineHeight: 40,
        fontFamily: 'sans-serif',
        color: '#444',
    },
    playerControls: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        alignItems: 'center',
    },
    currentAyahText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    controlButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 2,
    },
    controlText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QuranAudioPlayer;
