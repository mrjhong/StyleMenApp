import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, ActivityIndicator, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithGoogle, configureGoogleSignIn } from '../services/authService';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Configurar Google Sign-In al cargar la pantalla
    const initGoogleSignIn = async () => {
      try {
        await configureGoogleSignIn();
      } catch (error) {
        console.error('Error inicializando Google Sign-In:', error);
        Alert.alert('Error', 'No se pudo inicializar Google Sign-In');
      } finally {
        setIsInitializing(false);
      }
    };

    initGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        Alert.alert('¡Bienvenido!', `Hola ${result.user.name}`);
        // Navegar a la pantalla principal
        navigation.replace('MainApp');
      } else {
        Alert.alert('Error', result.error || 'No se pudo iniciar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#d4af37" />
        <Text style={styles.loadingText}>Preparando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} scrollEnabled={false}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative Top Element */}
        <View style={styles.decorativeTop}>
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </View>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="hanger"
              size={60}
              color="#d4af37"
            />
          </View>
          <Text style={styles.appName}>Nivora Men</Text>
          <Text style={styles.tagline}>Tu Asistente de Estilo Personal</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon="tshirt-crew"
            title="Outfits Personalizados"
            description="Combinaciones perfectas con IA"
          />
          <FeatureItem
            icon="spray-bottle"
            title="Fragancias Ideales"
            description="Encuentra tu esencia perfecta"
          />
          <FeatureItem
            icon="dumbbell"
            title="Fitness & Rutinas"
            description="Entrena como un pro"
          />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <Card style={styles.benefitCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="brain"
                  size={32}
                  color="#d4af37"
                />
              </View>
              <Text style={styles.cardTitle}>IA Avanzada</Text>
              <Text style={styles.cardDescription}>
                Análisis inteligente para tu estilo
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.benefitCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="lock"
                  size={32}
                  color="#d4af37"
                />
              </View>
              <Text style={styles.cardTitle}>100% Seguro</Text>
              <Text style={styles.cardDescription}>
                Tus datos protegidos siempre
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Comienza ahora</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={loading}
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

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Al continuar, aceptas nuestros{' '}
            <Text style={styles.termsLink}>Términos de Servicio</Text> y{' '}
            <Text style={styles.termsLink}>Política de Privacidad</Text>
          </Text>
        </View>

        {/* Decorative Bottom Element */}
        <View style={styles.decorativeBottom}>
          <View style={styles.decorativeCircle3} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

// Componente para mostrar características
const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <MaterialCommunityIcons name={icon} size={24} color="#d4af37" />
    </View>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    minHeight: height,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  loadingText: {
    marginTop: 12,
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
  },

  // Decorative elements
  decorativeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
  decorativeCircle1: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    position: 'absolute',
    top: -100,
    right: -50,
  },
  decorativeCircle2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    position: 'absolute',
    top: 50,
    left: -75,
  },
  decorativeCircle3: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    position: 'absolute',
    bottom: -125,
    right: -100,
  },
  decorativeBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },

  // Logo Section
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    zIndex: 10,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#d4af37',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#b0b0b0',
    fontWeight: '500',
  },

  // Features
  featuresContainer: {
    marginVertical: 32,
    zIndex: 10,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#9ea2ac',
  },

  // Benefit Cards
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    zIndex: 10,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#9ea2ac',
    textAlign: 'center',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    zIndex: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#9ea2ac',
    fontSize: 12,
    fontWeight: '600',
  },

  // Google Button
  googleButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 10,
  },
  googleGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Terms
  termsContainer: {
    marginBottom: 16,
    zIndex: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#9ea2ac',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#d4af37',
    fontWeight: '600',
  },
});