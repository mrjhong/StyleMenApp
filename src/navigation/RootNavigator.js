// src/navigation/RootNavigator.js (Nuevo Archivo)

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator'; // Tu navegador de Tabs
import { useAuth } from '../context/AuthContext'; // 👈 Usamos el hook de auth

const Stack = createStackNavigator();

export default function RootNavigator() {
    // Obtenemos el estado de autenticación global
    const { isAuthenticated } = useAuth(); 

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Si NO está autenticado, mostramos la pantalla de Login */}
            {!isAuthenticated ? (
                <Stack.Screen 
                    name="Auth" 
                    component={LoginScreen}
                />
            ) : (
                // Si SÍ está autenticado, mostramos la navegación principal (Tabs)
                <Stack.Screen 
                    name="MainApp" 
                    component={AppNavigator} // AppNavigator contiene tus Tabs
                />
            )}
        </Stack.Navigator>
    );
}