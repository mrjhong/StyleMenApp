// screens/LoginScreen.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google'; // Importante: Aquí se usa el hook
import { processGoogleSignIn, getAuthData } from '../services/authService';
import { useAuth } from '../context/AuthContext'; // 👈 Importar

const { width, height } = Dimensions.get('window');

// *** CONFIGURACIÓN DEL CLIENTE (Mejor dejarla en el .env) ***
const clientAndroidId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID; 
//const clientWebId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID; 

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    // 1. Configuración de Google Sign-In usando el hook (debe estar en el componente)
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: clientAndroidId,
        //webClientId: clientWebId, // Siempre se recomienda incluir el webClientId
    },
    {
        native: 'StyleMenApp://', // Asegúrate de que coincida con el scheme en app.json
    }
  
  );
    const { login } = useAuth();
    // 2. useEffect para manejar la inicialización y auto-login
    useEffect(() => {
        // Función para verificar si hay una sesión activa y navegar
        const checkAuthStatus = async () => {
            try {
                const authData = await getAuthData();
                if (authData) {
                    console.log('Usuario autenticado encontrado. Redirigiendo.');
                    navigation.replace('MainApp');
                }
            } catch (error) {
                console.error('Error al verificar el estado de la autenticación:', error);
            } finally {
                setIsInitializing(false);
            }
        };

        // Verifica que el request esté listo antes de terminar la inicialización
        if (request) {
            checkAuthStatus();
        }
    }, [request]);


    // 3. useEffect para manejar la respuesta del flujo de Google
    useEffect(() => {
        if (response?.type) {
            // Se ejecuta cuando el usuario termina el flujo en la ventana de Google
            handleGoogleResponse(response);
        }
    }, [response]); 

    
    const handleGoogleResponse = async (googleResponse) => {
        setLoading(true);
        try {
            const result = await processGoogleSignIn(googleResponse);

            if (result.success) {
                // LLAMADA CLAVE: Actualizar el estado global de la aplicación
                login(result.user); // Esto setea user en AuthContext y redirige automáticamente
                
                Alert.alert('¡Bienvenido!', `Hola ${result.user.name}`);
                // Ya no necesitas navigation.replace('MainApp') aquí, 
                // ya que el cambio de estado en el contexto lo manejará el RootNavigator.
            } else {
                // ... (Manejo de errores)
            }
        } catch (error) {
            // ... (Manejo de errores)
        } finally {
            setLoading(false);
        }
    };

    // 4. Función que inicia el flujo al presionar el botón
    const handleGoogleSignIn = async () => {
        if (!request) {
            Alert.alert("Error", "La autenticación de Google no está lista.");
            return;
        }
        
        setLoading(true);
        // promptAsync abre la ventana del navegador para iniciar sesión con Google
        // El resultado se manejará en el useEffect de `response`
        await promptAsync(); 
        // Nota: El 'finally' y el 'setLoading(false)' se manejan en handleGoogleResponse
        // después de que el flujo de Google termina.
    };

    // ... (El resto del código del componente LoginScreen es el mismo)
    
    if (isInitializing) {
        // ... (Tu UI de inicialización)
    }

    return (
        <ScrollView style={styles.container} scrollEnabled={false}>
             {/* ... (Todo tu código de UI) ... */}

             {/* Google Sign In Button */}
             <TouchableOpacity
                style={styles.googleButton}
                // Llama a la función que inicia el flujo de Google
                onPress={handleGoogleSignIn} 
                disabled={loading || !request} // Deshabilita si está cargando o no se inicializó Google
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

             {/* ... (El resto del código de UI) ... */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    googleButton: {
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center',
        width: width * 0.8,
        height: 50,
    },
    googleGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    googleIcon: {
        marginRight: 10,
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // ... (El resto de tus estilos)
});