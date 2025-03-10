import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const App = () => {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Tu API Key de OpenCage
  const API_KEY_OPENCAGE = "e0ac19c65a6d417ba1cffd7ffa46329a";

  // Función para obtener coordenadas con OpenCage
  const obtenerCoordenadas = async (ciudad) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=${API_KEY_OPENCAGE}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
      } else {
        throw new Error("Ciudad no encontrada");
      }
    } catch (err) {
      throw new Error("Error al obtener coordenadas: " + err.message);
    }
  };

  // Función para obtener el clima con Open-Meteo
  const obtenerClima = async (lat, lng) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.reason || "Error al obtener el clima");
      }

      return data;
    } catch (err) {
      throw new Error("Error al obtener el clima: " + err.message);
    }
  };

  // Función principal para consultar el clima
  const consultarClima = async () => {
    if (!ciudad) {
      setError("Por favor, ingresa una ciudad.");
      return;
    }

    setCargando(true);
    setError(null);
    setClima(null);

    try {
      // Paso 1: Obtener coordenadas
      const coordenadas = await obtenerCoordenadas(ciudad);

      // Paso 2: Obtener el clima
      const datosClima = await obtenerClima(coordenadas.lat, coordenadas.lng);

      // Paso 3: Mostrar los datos
      setClima(datosClima);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <LinearGradient colors={["#6DD5FA", "#2980B9"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Consulta el Clima</Text>

        {/* Barra de búsqueda */}
        <TextInput
          style={styles.busqueda}
          placeholder="Ingresa una ciudad (ej. Guadalajara)"
          value={ciudad}
          onChangeText={setCiudad}
        />

        {/* Botón para consultar el clima */}
        <Button
          title="Consultar Clima"
          onPress={consultarClima}
          color="#FFA726"
        />

        {/* Mostrar mensajes de carga o error */}
        {cargando && <ActivityIndicator size="large" color="#FFFFFF" />}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Mostrar los datos del clima */}
        {clima && (
          <View style={styles.datosClima}>
            <View style={styles.caja}>
              <MaterialCommunityIcons
                name="thermometer"
                size={24}
                color="#FFA726"
              />
              <Text style={styles.textoCaja}>
                Temperatura: {clima.current_weather.temperature}°C
              </Text>
            </View>

            <View style={styles.caja}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={24}
                color="#4CAF50"
              />
              <Text style={styles.textoCaja}>
                Viento: {clima.current_weather.windspeed} km/h
              </Text>
            </View>

            <View style={styles.caja}>
              <MaterialCommunityIcons
                name="compass"
                size={24}
                color="#2196F3"
              />
              <Text style={styles.textoCaja}>
                Dirección del viento: {clima.current_weather.winddirection}°
              </Text>
            </View>

            {/* Gráfica de temperatura */}
            <Text style={styles.graficaTitulo}>
              Temperatura a lo largo del día
            </Text>
            <LineChart
              data={{
                labels: clima.hourly.time
                  .slice(0, 24)
                  .map((time, index) => (index % 3 === 0 ? new Date(time).getHours() + ":00" : "")), // Mostrar cada 3 horas
                datasets: [
                  {
                    data: clima.hourly.temperature_2m.slice(0, 24),
                  },
                ],
              }}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontSize: 10, // Tamaño de fuente más pequeño
                  rotation: -45, // Rotar las etiquetas 45 grados
                  dx: -10, // Ajustar posición horizontal
                  dy: 10, // Ajustar posición vertical
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#FFA726",
                },
              }}
              bezier
              style={styles.grafica}
            />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  busqueda: {
    width: "100%",
    height: 40,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  datosClima: {
    width: "100%",
    marginTop: 20,
  },
  caja: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoCaja: {
    marginLeft: 10,
    fontSize: 16,
  },
  graficaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#FFFFFF",
  },
  grafica: {
    borderRadius: 16,
    marginVertical: 10,
  },
  error: {
    color: "#FF5252",
    fontSize: 16,
    marginTop: 20,
  },
});

export default App;