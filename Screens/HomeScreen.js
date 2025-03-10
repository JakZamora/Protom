import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Themes/fondos';

export default function HomeScreen({ navigation }) {
  const [isTemperatureVisible, setIsTemperatureVisible] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerClimaActual = async () => {
    setCargando(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permiso de ubicación denegado');
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.reason || 'Error al obtener el clima');
      setWeatherData(data.current_weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClimaActual();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Botón de actualización */}
      <TouchableOpacity onPress={obtenerClimaActual} style={styles.refreshButton}>
        <Icon name="refresh" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Contenedor de temperatura */}
      {isTemperatureVisible && (
        <View style={styles.temperatureContainer}>
          {cargando ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : weatherData ? (
            <>
              <Icon name="weather-sunny" size={50} color="#FFD700" />
              <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
              <Text style={styles.description}>Tiempo actual</Text>
            </>
          ) : (
            <Text style={styles.errorText}>No se pudieron cargar los datos</Text>
          )}
        </View>
      )}

      {/* Botón para mostrar u ocultar temperatura */}
      <TouchableOpacity onPress={() => setIsTemperatureVisible(!isTemperatureVisible)} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isTemperatureVisible ? 'Ocultar Temperatura' : 'Mostrar Temperatura'}
        </Text>
      </TouchableOpacity>

      {/* Botón para ir a detalles */}
      <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.detailsButton}>
        <Icon name="information-outline" size={20} color="#FFFFFF" style={{ marginRight: 5 }} />
        <Text style={styles.detailsButtonText}>Ver Más Detalles</Text>
      </TouchableOpacity>
    </View>
  );
}
