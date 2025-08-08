import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, ActivityIndicator, Alert, PermissionsAndroid, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

const JadwalSholatScreen = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  // Fungsi untuk mendapatkan tanggal hari ini dalam format DD-MM-YYYY
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fungsi untuk meminta izin lokasi (khusus Android)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Izin Lokasi",
            message: "Aplikasi ini membutuhkan akses lokasi Anda untuk menampilkan jadwal sholat yang akurat.",
            buttonNeutral: "Tanya Nanti",
            buttonNegative: "Tolak",
            buttonPositive: "Izinkan"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // Untuk iOS, izin diminta di level aplikasi, bukan runtime.
  };

  useEffect(() => {
    const fetchPrayerTimes = async (latitude, longitude) => {
      setLoading(true);
      setError(null);
      const date = getFormattedDate();
      const method = 2; // Menggunakan metode ISNA
      const endpoint = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 'OK') {
          setPrayerData(data.data);
        } else {
          throw new Error(data.message || "Gagal memuat data dari API.");
        }
      } catch (e) {
        console.error("Error fetching prayer times:", e);
        setError("Gagal memuat jadwal sholat. Periksa koneksi internet Anda.");
      } finally {
        setLoading(false);
      }
    };

    const getLocationAndFetch = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        setError("Izin lokasi ditolak. Jadwal sholat tidak dapat dimuat.");
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchPrayerTimes(latitude, longitude);
        },
        (locError) => {
          console.error("Geolocation Error:", locError);
          setLoading(false);
          setError("Gagal mendapatkan lokasi Anda. Pastikan GPS aktif.");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getLocationAndFetch();
  }, []);

  const getSholatList = () => {
    if (!prayerData || !prayerData.timings) return [];
    const timings = prayerData.timings;
    return [
      { name: 'Imsak', time: timings.Imsak },
      { name: 'Subuh', time: timings.Fajr },
      { name: 'Syuruk', time: timings.Sunrise },
      { name: 'Zuhur', time: timings.Dhuhr },
      { name: 'Asar', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isa', time: timings.Isha },
      { name: 'Tengah Malam', time: timings.Midnight },
    ];
  };

  const getNextPrayer = () => {
    if (!prayerData || !prayerData.timings) return null;

    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const timings = prayerData.timings;

    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    for (const prayer of prayerOrder) {
      const prayerTime = new Date(`${today}T${timings[prayer]}:00`);
      if (prayerTime > now) {
        return { name: prayer, time: timings[prayer] };
      }
    }
    // Jika semua sholat sudah terlewat, tampilkan sholat Fajr hari berikutnya
    return { name: 'Fajr', time: timings.Fajr };
  };

  const nextPrayer = getNextPrayer();
  const sholatList = getSholatList();

  const renderSholatItem = ({ item }) => (
    <View style={styles.sholatItem}>
      <Text style={styles.sholatName}>{item.name}</Text>
      <Text style={styles.sholatTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#1a1a1a" />
      <View style={styles.mainHeader}>
        <Text style={styles.mainHeaderTitle}>Jadwal Sholat</Text>
      </View>

      <LinearGradient
        colors={['#1a1a1a', '#3a3a3a']}
        style={styles.prayerCard}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#1db954" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <View style={styles.prayerCardContent}>
              <Text style={styles.prayerTime}>{nextPrayer ? nextPrayer.time : '??:??'}</Text>
              <Text style={styles.nextPrayerName}>Sholat {nextPrayer ? nextPrayer.name : '...'}</Text>
              <Text style={styles.prayerDate}>
                {prayerData?.date?.readable}
              </Text>
              <Text style={styles.prayerLocation}>
                {prayerData?.meta?.timezone}
              </Text>
            </View>
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2017/04/24/13/21/mosque-2256799_1280.png' }}
              style={styles.mosqueImage}
            />
          </>
        )}
      </LinearGradient>

      {prayerData && (
        <FlatList
          data={sholatList}
          keyExtractor={(item) => item.name}
          renderItem={renderSholatItem}
          style={styles.sholatList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  mainHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
  },
  prayerCard: {
    borderRadius: 15,
    marginVertical: 5,
    paddingVertical: 5,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    margin: 20
  },
  prayerCardContent: {
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  mosqueImage: {
    position: 'absolute',
    bottom: -20,
    opacity: 0.3,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  prayerTime: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextPrayerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1db954',
    marginTop: 5,
  },
  prayerDate: {
    fontSize: 16,
    color: '#b3b3b3',
    marginTop: 5,
  },
  prayerLocation: {
    fontSize: 14,
    color: '#b3b3b3',
    marginTop: 2,
  },
  sholatList: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  sholatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  sholatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  sholatTime: {
    fontSize: 16,
    color: '#121212',
  },
  chatIcon: {
    padding: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1c1c1c',
    borderTopWidth: 1,
    borderTopColor: '#282828',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JadwalSholatScreen;