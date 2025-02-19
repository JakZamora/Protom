import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Themes/fondos";

export default function DetailsScreen({ navigation }) {
  const details = [
    { label: "Humedad", value: "60%" },
    { label: "Viento", value: "15 km/h" },
    { label: "Visibilidad", value: "10 km" },
    { label: "Índice UV", value: "Moderado" },
    { label: "Sensación Real", value: "27°C" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>⬅ Volver</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.detailsScroll}
        contentContainerStyle={styles.detailsContainer}
      >
        {details.map((item, index) => (
          <View key={index} style={styles.detailBox}>
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Botón para ir a detalles */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Ciudades')}
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>Más Ciudades</Text>
      </TouchableOpacity>
    </View>
  );
}
