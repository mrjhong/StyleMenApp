// services/authService.js

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google'; // Solo para tipado

// Configurar la URL de tu API Express
// NOTA: Usa tu IP local para desarrollo, pero para producción debe ser una URL pública (HTTPS).
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://localhost:8000/api';

/**
 * Guarda el token JWT y la información básica del usuario.
 * @param {string} token - El token JWT devuelto por tu servidor Express.
 * @param {object} userData - Datos del usuario (id, name, email).
 */
const saveAuthData = async (token, userData) => {
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
};

/**
 * Lee el token JWT y los datos del usuario.
 */
export const getAuthData = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    const userDataJson = await SecureStore.getItemAsync('userData');
    
    if (token && userDataJson) {
        return { 
            token, 
            user: JSON.parse(userDataJson) 
        };
    }
    return null;
};


/**
 * Procesa la respuesta de Google y llama al backend para el login/registro.
 * * @param {Google.AuthSessionResult} googleResponse - Respuesta del flujo de autenticación de Google.
 * @returns {object} { success: boolean, user?: object, error?: string }
 */
export const processGoogleSignIn = async (googleResponse) => {
    
    if (googleResponse.type !== 'success' || !googleResponse.params.id_token) {
        // Falló la autenticación en Google o fue cancelada
        return { success: false, error: 'Autenticación cancelada o fallida por Google.' };
    }

    const idToken = googleResponse.params.id_token;
    
    try {
        // Llama a tu endpoint de Express.
        const response = await axios.post(`${API_BASE_URL}/auth/google`, {
            idToken: idToken,
        });

        // Respuesta del backend (asume que devuelve { token, user: { id, name, email }})
        const { token, user } = response.data; 

        if (token && user) {
            // Guardar el token y datos del usuario en SecureStore
            await saveAuthData(token, user);
            
            return { 
                success: true, 
                user: user,
            };
        }

        return { success: false, error: 'Respuesta inválida del servidor.' };

    } catch (error) {
        console.error('❌ Error al enviar token al backend:', error.response ? error.response.data : error.message);
        
        const errorMessage = error.response?.data?.error || 'Error de conexión con el servidor.';
        return { success: false, error: errorMessage };
    }
};

/**
 * Cierra la sesión (simplemente borra los datos de SecureStore).
 */
export const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
};