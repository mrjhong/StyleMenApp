import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  makeRedirectUri,
 
  exchangeCodeAsync,
} from "expo-auth-session";

import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import { useAuth } from '../context/AuthContext';
import { getAuthData } from '../services/authService';

const { width, height } = Dimensions.get('window');

// Configuración de Google OAuth
// const discovery = {
//   authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
//   tokenEndpoint: "https://oauth2.googleapis.com/token",
//   revocationEndpoint: "https://accounts.google.com/o/oauth2/revoke",
// };

// Usar diferentes Client IDs para iOS y Android
// const CLIENT_ID = Platform.OS === "ios"
//   ? process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID
//   : process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

const CLIENT_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;
const SCOPES = ["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];

// El redirect URI debe coincidir con lo configurado en Google Cloud Console
const REDIRECT_URI = makeRedirectUri({
  scheme: "stylemenapp", // Debe coincidir con el scheme en app.json
  path: "redirect",
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { login } = useAuth();

  // Hook de autenticación con Google
  const [request, response, promptAsync] = useAuthRequest(
    {
      androidClientId: CLIENT_ID,
      scopes: SCOPES,
    },
    // discovery
  );

  // Verificar si hay sesión activa al iniciar
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authData = await getAuthData();
        if (authData) {
          console.log('✅ Usuario autenticado encontrado. Redirigiendo.');
          login(authData.user);
        }
      } catch (error) {
        console.error('❌ Error al verificar autenticación:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    if (request) {
      checkAuthStatus();
    }
  }, [request, login]);

  // Manejar la respuesta de Google
  useEffect(() => {
    if (response?.type === 'success') {
      //handleGoogleResponse(response);
      alert('Funcionalidad temporalmente deshabilitada por cambios en Google OAuth');
    } else if (response?.type === 'error') {
      Alert.alert('❌ Error', 'Autenticación cancelada o fallida');
      setIsInitializing(false);
    }
  }, [response]);

  const handleGoogleResponse = async (googleResponse) => {
    setLoading(true);
    try {
      const { code } = googleResponse.params;

      if (!code) {
        throw new Error('No se recibió código de autorización');
      }

      console.log('📝 Código recibido:', code.substring(0, 20) + '...');

      // Intercambiar el código por un token
      const tokenResponse = await exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code: code,
          redirectUri: REDIRECT_URI,
        },
        //discovery
      );

      console.log('🔑 Token obtenido:', tokenResponse.accessToken?.substring(0, 20) + '...');

      // Obtener información del usuario
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
        }
      );

      const userInfo = await userInfoResponse.json();

      if (!userInfoResponse.ok) {
        throw new Error('Error al obtener información del usuario');
      }

      console.log('👤 Usuario:', userInfo.email);

      // Enviar la información al backend (AQUÍ ES DONDE OCURRÍA EL ERROR 400)
      const backendResponse = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: tokenResponse.id_token, // 👈 IMPORTANTE: Usar id_token, no accessToken
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          }),
        }
      );

      const backendData = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(backendData.error || 'Error en autenticación del servidor');
      }

      console.log('✅ Autenticación exitosa');

      // Guardar datos y actualizar contexto
      login(backendData.user);
      Alert.alert('¡Bienvenido!', `Hola ${backendData.user.name}`);

    } catch (error) {
      console.error('❌ Error:', error.message);
      Alert.alert('Error de autenticación', error.message || 'Intenta de nuevo');
      setIsInitializing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!request) {
      Alert.alert('Error', 'Autenticación de Google no está lista');
      return;
    }

    try {
      await promptAsync();
    } catch (error) {
      console.error('❌ Error al iniciar autenticación:', error);
      Alert.alert('Error', 'No se pudo iniciar la autenticación');
    }
  };

  // Pantalla de carga inicial
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d4af37" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} scrollEnabled={false}>
      <View style={styles.content}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>StyleMen</Text>
          <Text style={styles.heroSubtitle}>Tu asistente de estilo personal</Text>
        </LinearGradient>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>¿Por qué StyleMen? {CLIENT_ID}</Text>
          
          {[
            { icon: 'tshirt-crew', text: 'Genera outfits personalizados' },
            { icon: 'camera', text: 'Analiza tus fotos con IA' },
            { icon: 'spray', text: 'Encuentra tu fragancia ideal' },
            { icon: 'dumbbell', text: 'Rutinas fitness adaptadas' },
          ].map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <MaterialCommunityIcons name={feature.icon} size={24} color="#d4af37" />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={loading || !request}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#4285F4', '#3367D6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.googleGradient}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="google"
                  size={24}
                  color="#fff"
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continuar con Google
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Info Text */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Al iniciar sesión, aceptas nuestros términos y política de privacidad
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-around',
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    marginTop: 16,
    color: '#d4af37',
    fontSize: 14,
  },
  heroSection: {
    padding: 32,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#d4af37',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  googleButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    height: 56,
  },
  googleGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  infoText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});