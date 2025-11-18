// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getAuthData, signOut } from '../services/authService'; // Importa tus funciones

// Crea el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Contiene { id, name, email }
    const [isLoading, setIsLoading] = useState(true); // Para la pantalla de carga inicial
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Cargar el estado inicial (Token & User Data)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const authData = await getAuthData();
                if (authData) {
                    // Si encontramos datos de autenticación, establecemos el usuario
                    setUser(authData.user); 
                }
            } catch (e) {
                console.error("Error al cargar datos de autenticación:", e);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Función para loguear (se llama desde LoginScreen)
    const login = (userData) => {
        // userData debe ser el objeto { id, name, email } que devuelve el backend
        console.log('🔐 Usuario login0 ' );
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Función para desloguear (se llama desde ProfileScreen, por ejemplo)
    const logout = async () => {
        await signOut(); // Limpia SecureStore
        setUser(null); // Limpia el estado
    };

    // Si está cargando, mostramos una pantalla de splash/carga
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
                <ActivityIndicator size="large" color="#d4af37" />
            </View>
        );
    }

    const authContextValue = {
        user,
        login,
        logout,
        isAuthenticated, // Booleano: ¿Está logueado?
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};