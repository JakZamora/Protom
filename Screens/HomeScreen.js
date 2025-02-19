import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../Themes/fondos'; // Asegúrate de que este archivo existe

export default function HomeScreen({ navigation }) {
  const [isTemperatureVisible, setIsTemperatureVisible] = useState(true);

  const weatherData = {
    temperature: '25°C',
    description: 'Soleado',
  };

  const toggleTemperature = () => {
    setIsTemperatureVisible(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Botón para mostrar u ocultar la temperatura */}
      <TouchableOpacity onPress={toggleTemperature} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isTemperatureVisible ? 'Ocultar Temperatura' : 'Mostrar Temperatura'}
        </Text>
      </TouchableOpacity>

      {/* Contenedor de temperatura */}
      {isTemperatureVisible && (
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{weatherData.temperature}</Text>
          <Text style={styles.description}>{weatherData.description}</Text>
        </View>
      )}

      {/* Botón para ir a detalles */}
      <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver Más Detalles</Text>
      </TouchableOpacity>
    </View>
  );
}
