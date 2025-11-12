import * as SecureStore from 'expo-secure-store';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

// Configurar la URL de tu API Express
const API_BASE_URL = 'http://192.168.1.100:5000'; // Cambia por tu IP/URL

/**
 * Configura Google Sign-In
 */
export const configureGoogleSignIn = async () => {
  try {
    // Tu Web Client ID de Google Cloud Console
    const WEB_CLIENT_ID = 'TU_WEB_CLIENT_ID.apps.googleusercontent.com';
    
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
    
    console.log('✅ Google Sign-In configurado correctamente');
  } catch (error) {
    console.error('❌ Error configurando Google Sign-In:', error);
  }
};

/**
 * Verifica si el usuario ya está autenticado
 */
export const isUserSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  } catch (error) {
    console.error('Error verificando sesión:', error);
    return false;
  }
};

/**
 * Realiza el login con Google y autentica con el backend
 */
export const signInWithGoogle = async () => {
  try {
    // Verificar si Google Play Services está disponible
    await GoogleSignin.hasPlayServices();
    
    // Iniciar sesión con Google
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo) {
      const { idToken, user } = userInfo;
      
      console.log('✅ Usuario autenticado con Google:', user.email);
      
      // Enviar token al backend Express
      const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
        idToken,
        email: user.email,
        name: user.name,
        photoUrl: user.photo,
      });

      // Guardar tokens de sesión de forma segura
      if (response.data.token) {
        await SecureStore.setItemAsync('auth_token', response.data.token);
        await SecureStore.setItemAsync('refresh_token', response.data.refreshToken || '');
        await SecureStore.setItemAsync('user_data', JSON.stringify(response.data.user));
        
        console.log('✅ Tokens guardados correctamente');
      }

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Usuario canceló el inicio de sesión');
      return {
        success: false,
        error: 'Inicio de sesión cancelado',
      };
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Inicio de sesión en progreso');
      return {
        success: false,
        error: 'Inicio de sesión en progreso',
      };
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services no disponibles');
      return {
        success: false,
        error: 'Google Play Services no disponibles',
      };
    } else {
      console.error('Error en Google Sign-In:', error);
      return {
        success: false,
        error: error.message || 'Error al iniciar sesión',
      };
    }
  }
};

/**
 * Obtiene el token de autenticación almacenado
 */
export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    return token;
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Obtiene los datos del usuario almacenados
 */
export const getUserData = async () => {
  try {
    const userData = await SecureStore.getItemAsync('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    return null;
  }
};

/**
 * Cierra la sesión
 */
export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('user_data');
    console.log('✅ Sesión cerrada');
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene el usuario actualmente autenticado
 */
export const getCurrentUser = async () => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();
    return userInfo;
  } catch (error) {
    console.error('Error obteniendo usuario actual:', error);
    return null;
  }
};

/**
 * Crea un axios instance con autenticación
 */
export const createAuthenticatedClient = async () => {
  const token = await getAuthToken();
  
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para refrescar token si expira
  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await SecureStore.getItemAsync('refresh_token');
          
          if (refreshToken) {
            const response = await axios.post(
              `${API_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            await SecureStore.setItemAsync('auth_token', response.data.token);
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

            return client(originalRequest);
          }
        } catch (refreshError) {
          console.error('Error refrescando token:', refreshError);
          // Redirigir a login
          await signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};