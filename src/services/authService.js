// services/authService.js

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://localhost:8000/api';

/**
 * Guarda el token JWT y la información básica del usuario
 */
const saveAuthData = async (token, userData) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    console.log('✅ Datos de autenticación guardados');
  } catch (error) {
    console.error('❌ Error al guardar datos de autenticación:', error);
    throw error;
  }
};

/**
 * Lee el token JWT y los datos del usuario
 */
export const getAuthData = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const userDataJson = await SecureStore.getItemAsync('userData');
    
    if (token && userDataJson) {
      return { 
        token, 
        user: JSON.parse(userDataJson) 
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error al leer datos de autenticación:', error);
    return null;
  }
};

/**
 * Obtener token válido (refrescar si es necesario)
 */
export const getValidToken = async () => {
  const authData = await getAuthData();
  return authData?.token || null;
};

/**
 * Crear cliente axios con interceptor para token
 */
const createAuthenticatedClient = async () => {
  const token = await getValidToken();
  
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 10000,
  });
};

/**
 * Procesa la respuesta de Google y llama al backend
 * IMPORTANTE: Este método ahora recibe los datos del usuario, no solo el idToken
 */
export const processGoogleSignIn = async (userData) => {
  const { idToken, email, name, picture } = userData;

  if (!idToken || !email) {
    return { 
      success: false, 
      error: 'Datos incompletos de Google' 
    };
  }

  try {
    console.log('📤 Enviando datos a backend:', { email, name });

    // Enviar al backend
    const response = await axios.post(`${API_BASE_URL}/auth/google`, {
      idToken: idToken,
      email: email,
      name: name,
      picture: picture,
    });

    console.log('✅ Respuesta del backend:', response.status);

    // Extraer datos de respuesta
    const { token, user } = response.data;

    if (token && user) {
      // Guardar en SecureStore
      await saveAuthData(token, user);
      
      return { 
        success: true, 
        user: user,
        token: token,
      };
    }

    return { 
      success: false, 
      error: 'Respuesta inválida del servidor' 
    };

  } catch (error) {
    console.error('❌ Error al procesar Google SignIn:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    const errorMessage = 
      error.response?.data?.error || 
      error.response?.statusText ||
      error.message || 
      'Error desconocido';

    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

/**
 * Cierra la sesión
 */
export const signOut = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    console.log('✅ Sesión cerrada');
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error);
  }
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = async () => {
  const authData = await getAuthData();
  return !!authData?.token;
};