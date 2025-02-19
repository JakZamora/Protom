import React from 'react';
import { View, Text, ScrollView, Touchable} from 'react-native';
import { styles } from '../Themes/fondos';

const ciudades = [
  {
    nombre: 'Ciudad de México',
    clima: 'Templado con lluvias en verano',
    temperatura: '22°C',
    poblacion: '9.2 millones',
  },
  {
    nombre: 'Buenos Aires',
    clima: 'Templado húmedo con inviernos frescos',
    temperatura: '18°C',
    poblacion: '3.1 millones',
  },
  {
    nombre: 'Madrid',
    clima: 'Mediterráneo continental',
    temperatura: '25°C',
    poblacion: '3.3 millones',
  },
  {
    nombre: 'Bogotá',
    clima: 'Templado de montaña',
    temperatura: '14°C',
    poblacion: '7.9 millones',
  },
  {
    nombre: 'Santiago de Chile',
    clima: 'Mediterráneo con estaciones marcadas',
    temperatura: '20°C',
    poblacion: '6.7 millones',
  },
  {
    nombre: 'Lima',
    clima: 'Desértico subtropical',
    temperatura: '19°C',
    poblacion: '9.7 millones',
  },
];

export default function Ciudades({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15 }}>
        Clima en Ciudades
      </Text>

      <ScrollView style={styles.detailsScroll} contentContainerStyle={styles.detailsContainer}>
        {ciudades.map((ciudad, index) => (
          <View key={index} style={styles.detailBox}>
            <Text style={styles.detailLabel}>{ciudad.nombre}</Text>
            <Text style={styles.detailValue}>🌡 {ciudad.temperatura}</Text>
            <Text style={styles.detailValue}>🌤 {ciudad.clima}</Text>
            <Text style={styles.detailValue}>👥 Población: {ciudad.poblacion}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botón para volver atrás */}
      <Touchable onPress={() => navigation.goBack()} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Volver</Text>
      </Touchable>
    </View>
  );
}
