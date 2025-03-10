import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import Ciudades from './Screens/Ciudades';
import Clima from './Screens/clima'; 
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// Colores personalizados para cada pestaña activa
const activeColors = {
  Home: '#FF5733', // Naranja
  Ciudades: '#33A2FF', // Azul
  Clima: '#33FF99', // Verde
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Estilo de la barra superior transparente
const screenOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerTintColor: '#fff', // Color del icono de retroceso
};

// Stack Navigator para la pantalla Home
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Inicio' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTitle: 'Detalles' }} />
    </Stack.Navigator>
  );
}

// Stack Navigator para la pantalla Ciudades
function CiudadesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Ciudades" component={Ciudades} options={{ headerTitle: 'Ciudades' }} />
    </Stack.Navigator>
  );
}

// Stack Navigator para la pantalla Clima
function ClimaStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Clima" component={Clima} options={{ headerTitle: 'Clima' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Ciudades') iconName = focused ? 'location' : 'location-outline';
            else if (route.name === 'Clima') iconName = focused ? 'cloud' : 'cloud-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: activeColors[route.name], // Cambia el color dinámicamente
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#222', // Barra inferior con fondo oscuro
            borderTopWidth: 0, // Elimina la línea superior
            height: 60, // Aumenta el tamaño de la barra
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Ciudades" component={CiudadesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Clima" component={ClimaStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
