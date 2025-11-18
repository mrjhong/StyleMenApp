import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

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
      {/* 1. Proveemos el estado de autenticación a toda la aplicación */}
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          {/* 2. El RootNavigator decide qué mostrar */}
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}