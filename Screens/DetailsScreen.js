import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import corregido
import { styles } from '../Themes/fondos';

export default function DetailsScreen({ navigation }) {
  const [details, setDetails] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerDetallesClima = async () => {
    setCargando(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permiso de ubicación denegado');
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.reason || 'Error al obtener el clima');
      
      const detalles = [
        { label: 'Humedad', value: `${data.hourly.relativehumidity_2m[0]}%`, icon: 'water-percent' },
        { label: 'Viento', value: `${data.hourly.windspeed_10m[0]} km/h`, icon: 'weather-windy' },
        { label: 'Visibilidad', value: '10 km', icon: 'eye-outline' },
        { label: 'Índice UV', value: 'Moderado', icon: 'weather-sunny-alert' },
        { label: 'Sensación Real', value: `${data.hourly.temperature_2m[0]}°C`, icon: 'thermometer' },
      ];

      setDetails(detalles);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDetallesClima();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {cargando ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView style={styles.detailsScroll} contentContainerStyle={styles.detailsContainer}>
          {details.map((item, index) => (
            <View key={index} style={styles.detailBox}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#FFFFFF" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Ciudades')} style={styles.detailsButton}>
        <MaterialCommunityIcons name="city" size={20} color="#FFFFFF" style={{ marginRight: 5 }} />
        <Text style={styles.detailsButtonText}>Más Ciudades</Text>
      </TouchableOpacity>
    </View>
  );
}
