import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); // Obtiene la altura de la pantalla

export const colors = {
    primary: '#1E90FF', // Azul fuerte
    text: '#FFFFFF', // Blanco
    backgroundGradient: ['#0D1B2A', '#1B263B', '#415A77'], // Tonos nocturnos
    boxBackground: '#FFFFFF', // Blanco para las cajas
    boxText: '#000000', // Texto negro dentro de las cajas
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGradient[1], // Color de noche
        padding: 20,
        alignItems: 'center',
    },
    temperatureContainer: {
        height: height * 0.4, // Cambié el 60% al 40% para dejar más espacio para los detalles
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 120, // Súper grande
        fontWeight: 'bold',
        color: colors.text,
    },
    description: {
        fontSize: 28,
        color: colors.text,
        marginTop: 10,
    },
    detailsScroll: {
        height: height * 0.6, // Asegura que ocupe el 60% restante
        width: '100%',
    },
    detailsContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    detailBox: {
        width: '90%',
        backgroundColor: colors.boxBackground,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.boxText,
    },
    detailValue: {
        fontSize: 20,
        color: colors.boxText,
        marginTop: 5,
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGradient[1], // Color de noche
        padding: 20,
        alignItems: 'center',
    },
    temperatureContainer: {
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 120,
        fontWeight: 'bold',
        color: colors.text,
    },
    description: {
        fontSize: 28,
        color: colors.text,
        marginTop: 10,
    },
    detailsScroll: {
        height: height * 0.6,
        width: '100%',
    },
    detailsContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    detailBox: {
        width: '90%',
        backgroundColor: colors.boxBackground,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.boxText,
    },
    detailValue: {
        fontSize: 20,
        color: colors.boxText,
        marginTop: 5,
    },

    // 🔵 Botón de "Ocultar Temperatura"
    toggleButton: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 15,
    },
    toggleButtonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // 🟢 Botón de "Ver Más Detalles"
    detailsButton: {
        backgroundColor: '#28A745',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginTop: 10,
    },
    detailsButtonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
});
   