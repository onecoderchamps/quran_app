import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const NextIcon = require('../assets/next.png');
const PrevIcon = require('../assets/prev.png');
const PouseIcon = require('../assets/pouse.png');
const PlayIcon = require('../assets/play.png');


// Contoh data JSON untuk Surah Al-Fatihah.
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

const verses = Object.keys(surahData['1'].text).map(ayahNumber => ({
    ayahNumber,
    text: surahData['1'].text[ayahNumber],
    audioFile: surahData['1'].audio[ayahNumber],
}));

const QuranAudioPlayer = ({ route, navigation }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [playbackProgress, setPlaybackProgress] = useState(0);

    const audioDuration = 2000; // Simulasi durasi audio 2 detik per ayat
    const totalAyahCount = verses.length;

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const playNext = () => {
        if (currentAyahIndex < totalAyahCount - 1) {
            const nextIndex = currentAyahIndex + 1;
            setCurrentAyahIndex(nextIndex);
            setPlaybackProgress(0);
        } else {
            setCurrentAyahIndex(0);
            setIsPlaying(false);
            setPlaybackProgress(0);
        }
    };

    const playPrevious = () => {
        if (currentAyahIndex > 0) {
            const prevIndex = currentAyahIndex - 1;
            setCurrentAyahIndex(prevIndex);
            setPlaybackProgress(0);
        }
    };

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setPlaybackProgress(prevProgress => {
                    // Simulasi progress bar
                    if (prevProgress < 100) {
                        return prevProgress + (100 / (audioDuration / 100)); // Update every 100ms
                    } else {
                        // Jika sudah selesai, pindah ke ayat berikutnya
                        playNext();
                        return 0;
                    }
                });
            }, 100);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPlaying, currentAyahIndex]);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[
                styles.verseContainer,
                currentAyahIndex === index && styles.highlightedVerse
            ]}
            onPress={() => {
                setCurrentAyahIndex(index);
                setIsPlaying(true);
                setPlaybackProgress(0);
            }}
        >
            <Text style={styles.ayahText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>«</Text>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Al-Fatihah</Text>
                    <Text style={styles.subtitle}>
                        Surah {surahData['1'].name_latin}
                    </Text>
                </View>
                <View style={{ width: 30 }} />
            </View>

            <FlatList
                data={verses}
                renderItem={renderItem}
                keyExtractor={item => item.ayahNumber}
                style={styles.verseList}
            />

            <View style={styles.playerControls}>
                <Text style={styles.currentAyahText}>
                    Ayat: {verses[currentAyahIndex]?.ayahNumber} of {totalAyahCount}
                </Text>

                <Slider
                    style={styles.progressBar}
                    minimumValue={0}
                    maximumValue={100}
                    value={playbackProgress}
                    onSlidingComplete={value => {
                        // Di aplikasi sungguhan, ini akan digunakan untuk seek audio
                    }}
                    minimumTrackTintColor="#1db954"
                    maximumTrackTintColor="#535353"
                    thumbTintColor="#FFFFFF"
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={playPrevious} style={styles.controlButton}>
                        <Image source={PrevIcon} style={{ width: 24, height: 24 }} />;
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
                        {!isPlaying &&
                            <Image source={PlayIcon} style={{ width: 24, height: 24 }} />
                        }
                        {isPlaying &&
                            <Image source={PouseIcon} style={{ width: 24, height: 24 }} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={playNext} style={styles.controlButton}>
                        <Image source={NextIcon} style={{ width: 24, height: 24 }} />;
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#b3b3b3',
        marginTop: 4,
    },
    verseList: {
        flex: 1,
    },
    verseContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    highlightedVerse: {
        backgroundColor: '#282828',
    },
    ayahText: {
        fontSize: 22,
        textAlign: 'right',
        lineHeight: 40,
        fontFamily: 'sans-serif',
        color: '#fff',
    },
    playerControls: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#282828',
        borderRadius: 12,
        alignItems: 'center',
    },
    currentAyahText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 10,
    },
    progressBar: {
        width: '100%',
        height: 40,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
    controlButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseButton: {
        backgroundColor: '#1db954',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default QuranAudioPlayer;