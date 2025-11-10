import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Tema personalizado con colores masculinos
const theme = {
  colors: {
    primary: '#1a1a1a',      // Negro principal
    accent: '#d4af37',       // Dorado/oro para acentos
    background: '#ffffff',   // Fondo blanco
    surface: '#f5f5f5',      // Gris claro para cards
    text: '#1a1a1a',         // Texto negro
    disabled: '#9e9e9e',     // Gris deshabilitado
    placeholder: '#757575',  // Placeholder gris
    backdrop: 'rgba(0,0,0,0.5)',
    error: '#d32f2f',
    success: '#388e3c',
  },
  roundness: 12, // Bordes redondeados
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}