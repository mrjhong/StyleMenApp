import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button, Card, useTheme, shadow } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { analyzeOutfitPhoto } from '../services/geminiService';
import LottieView from 'lottie-react-native';

export default function OutfitAnalyzerScreen() {
  const theme = useTheme();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const pickImage = async (useCamera = false) => {
    // Solicitar permisos
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tu cámara');
        return;
      }
    }

    // Abrir cámara o galería
    const result = useCamera 
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.8,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.8,
        });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAnalysis(null); // Limpiar análisis anterior
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('No hay imagen', 'Por favor selecciona o toma una foto primero');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeOutfitPhoto(selectedImage);
      setAnalysis(result);
    } catch (error) {
      Alert.alert('Error', 'No se pudo analizar la imagen. Intenta de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const NoImageSelectedView = () => (
    <Card style={[styles.animationCard, { backgroundColor: 'rgba(255, 255, 255, 1)'
    }]}>
      <Card.Content style={styles.animationContent}>
        <View style={styles.lottieContainer}>
          {/* Sustituye 'RUTA_A_TU_ARCHIVO_LOTTIE.json' con la ruta real */}
          <LottieView
            source={require('../assets/Camera.json')} 
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
        <Text variant="titleMedium" style={styles.animationText}>
          ¡Anímate a analizar tu outfit!
        </Text>
        <Text variant="bodyMedium" style={styles.animationSubText}>
          Usa los botones de abajo para empezar.
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Instrucciones */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoTitle}>📸 Cómo funciona</Text>
            <Text style={styles.infoText}>
              1. Toma una foto de cuerpo completo con buena iluminación{'\n'}
              2. Asegúrate que se vea claramente tu outfit{'\n'}
              3. La IA analizará colores, fit y estilo{'\n'}
              4. Recibirás feedback y sugerencias
            </Text>
          </Card.Content>
        </Card>

        {/* Botones de captura */}
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={() => pickImage(true)}
            style={[styles.pickButton, { flex: 1, marginRight: 8 }]}
            buttonColor={theme.colors.primary}
            textColor='#fff'
            icon="camera"
          >
            Tomar Foto
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => pickImage(false)}
            style={[styles.pickButton, { flex: 1 }]}
            textColor={theme.colors.primary}
            icon="image"
          >
            Desde Galería
          </Button>
        </View>
        {!selectedImage && <NoImageSelectedView />}
        {/* Preview de imagen */}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Button
              mode="contained"
              onPress={handleAnalyze}
              loading={loading}
              disabled={loading}
              style={styles.analyzeButton}
              buttonColor={theme.colors.accent}
              contentStyle={{ paddingVertical: 8 }}
            >
              {loading ? 'Analizando...' : 'Analizar Outfit ✨'}
            </Button>
          </View>
        )}

        {/* Resultados del análisis */}
        {analysis && !loading && (
          <View style={styles.resultsSection}>
            <Card style={styles.resultCard}>
              <Card.Content>
                {/* Calificación */}
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Calificación General</Text>
                  <Text style={styles.ratingValue}>{analysis.rating}/10</Text>
                </View>

                {/* Análisis de colores */}
                <View style={styles.analysisSection}>
                  <View style={styles.analysisTitleRow}>
                    <MaterialCommunityIcons name="palette" size={24} color={theme.colors.accent} />
                    <Text style={styles.analysisTitle}>Combinación de Colores</Text>
                  </View>
                  <Text style={styles.analysisText}>{analysis.colorAnalysis}</Text>
                </View>

                {/* Fit de prendas */}
                <View style={styles.analysisSection}>
                  <View style={styles.analysisTitleRow}>
                    <MaterialCommunityIcons name="tape-measure" size={24} color={theme.colors.accent} />
                    <Text style={styles.analysisTitle}>Ajuste de Prendas</Text>
                  </View>
                  <Text style={styles.analysisText}>{analysis.fitAnalysis}</Text>
                </View>

                {/* Sugerencias */}
                <View style={styles.analysisSection}>
                  <View style={styles.analysisTitleRow}>
                    <MaterialCommunityIcons name="lightbulb" size={24} color={theme.colors.accent} />
                    <Text style={styles.analysisTitle}>Sugerencias de Mejora</Text>
                  </View>
                  {analysis.suggestions.map((suggestion, index) => (
                    <View key={index} style={styles.suggestionRow}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>

                {/* Botón para guardar */}
                <Button 
                  mode="outlined" 
                  style={styles.saveButton}
                  onPress={() => Alert.alert('Guardado', 'Análisis guardado en tu historial')}
                >
                  Guardar en Historial
                </Button>
              </Card.Content>
            </Card>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#424242',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pickButton: {
    borderRadius: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  analyzeButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 12,
  },
  resultsSection: {
    marginTop: 16,
  },
  resultCard: {
    borderRadius: 12,
    elevation: 2,
  },
  ratingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  analysisSection: {
    marginBottom: 20,
  },
  analysisTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#1a1a1a',
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
    marginLeft: 32,
  },
  suggestionRow: {
    flexDirection: 'row',
    marginLeft: 32,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
    color: '#424242',
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
  },
  saveButton: {
    marginTop: 16,
  },

  animationCard: {
    
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 0, // No necesita mucha sombra
  },
  animationContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
  },
  lottieContainer: {
    width: 150, 
    height: 150, 
    marginBottom: 8,
    // Centrar el Lottie
    alignItems: 'center', 
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  animationText: {
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  animationSubText: {
    color: '#757575',
    textAlign: 'center',
  }
});
