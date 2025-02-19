import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Themes/fondos";

const Ciudades = ({navigation}) => {
  const ciudades = [
    {
      nombre: "LOLOLOLOLOLO",
      clima: "Templado con lluvias en verano",
      temperatura: "22°C",
      poblacion: "9.2 millones",
    },
    {
      nombre: "Me comi una salchipapa",
      clima: "Templado húmedo con inviernos frescos",
      temperatura: "18°C",
      poblacion: "3.1 millones",
    },
    {
      nombre:"AMO A LA KAZ",
      clima: "Mediterráneo continental",
      temperatura: "25°C",
      poblacion: "3.3 millones",
    },
    {
      nombre: "TAMBIEN A UNA MORRA DE ACA QUE SE LLAMA ABIGAIL",
      clima: "Templado de montaña",
      temperatura: "14°C",
      poblacion: "7.9 millones",
    },
    {
      nombre: "LA NETA COMO 10 VECES MAS JAJA",
      clima: "Mediterráneo con estaciones marcadas",
      temperatura: "20°C",
      poblacion: "6.7 millones",
    },
    {
      nombre: "PERO YA TIENE NOVIO :(",
      clima: "Desértico subtropical",
      temperatura: "19°C",
      poblacion: "9.7 millones",
    },
  ];

  return (
    <>
    
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#FFFFFF",
          marginBottom: 15,
        }}
      >
        Clima en Ciudades
      </Text>

      <ScrollView
        style={styles.detailsScroll}
        contentContainerStyle={styles.detailsContainer}
      >
        {ciudades.map((ciudad, index) => (
          <View key={index} style={styles.detailBox}>
            <Text style={styles.detailLabel}>{ciudad.nombre}</Text>
            <Text style={styles.detailValue}>🌡 {ciudad.temperatura}</Text>
            <Text style={styles.detailValue}>🌤 {ciudad.clima}</Text>
            <Text style={styles.detailValue}>
              👥 Población: {ciudad.poblacion}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {navigation.goBack()}}
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
export default Ciudades
