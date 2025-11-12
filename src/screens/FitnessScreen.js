import React, { useState } from 'react';
import { Image, ScrollView, View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importa una imagen de fitness/gym aquí (ajusta la ruta según tu proyecto)
import fitnessImage from '../assets/fitness.png';

// ==========================================
// src/screens/FitnessScreen.js - MEJORADO
// ==========================================
export default function FitnessScreen() {
  const theme = useTheme();

  // --- Estados para la funcionalidad
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [objective, setObjective] = useState('Ganar músculo');
  const [loading, setLoading] = useState(false);

  const objectives = ['Ganar músculo', 'Perder grasa', 'Definir', 'Mantenimiento'];

  // --- Manejador de generación
  const handleGenerateRoutine = () => {
    if (!age || !weight || !height || !objective) {
      Alert.alert('Faltan datos', 'Por favor, completa todos los campos para generar tu rutina.');
      return;
    }

    setLoading(true);
    // Simular llamada a API
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Rutina Generada ✨',
        `¡Tu rutina para ${objective} ha sido creada! \nEdad: ${age}, Peso: ${weight}kg, Altura: ${height}cm`
      );
    }, 1500);
  };

  // --- Componente para las Chips de Objetivo
  const ObjectiveChip = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={[
        modernStyles.chip,
        selected ? {
          backgroundColor: theme.colors.accent,
          borderColor: theme.colors.accent
        } : {
          backgroundColor: '#362a45',
          borderColor: theme.colors.onBackground,
        }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          modernStyles.chipText,
          selected ? { color: theme.colors.onPrimary } : { color: 'white' }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[modernStyles.container, { backgroundColor: theme.colors.background }]}>

      {/* Banner Moderno */}
      <View style={[modernStyles.header, { backgroundColor: theme.colors.primaryContainer }]}>
        {/* Si tienes una imagen de fondo, úsala aquí. Usaré un degradado y un ícono si no está disponible */}
        <Image source={fitnessImage} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.8 }} resizeMode="cover" />
        {/* 2. Overlay que oscurece y tiñe */}
  <View style={[
    modernStyles.overlay, 
    { backgroundColor: 'rgba(26, 10, 132, 0.12)' } // Color Verde Oscuro con 50% de Opacidad
  ]} />
        <View style={modernStyles.headerTextContainer}>
          <Text style={[modernStyles.headerTitle]}>
            Fitness & Rutinas
          </Text>
          <Text style={[modernStyles.headerSubtitle]}>
            Tu camino hacia una vida más saludable
          </Text>
        </View>
      </View>

      <View style={modernStyles.content}>
        <Text style={[modernStyles.sectionTitle, { color: theme.colors.onBackground }]}>
          Personaliza tu Plan
        </Text>

        <Card style={[modernStyles.infoCard]}>
          <Card.Content>

            {/* 1. Edad */}
            <Text style={[modernStyles.label, { color: theme.colors.onSurface }]}>
              Edad
            </Text>
            <TextInput
              style={[modernStyles.input]}
              placeholder="Ej: 25"
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />

            {/* 2. Peso y Altura en la misma fila */}
            <View style={modernStyles.inlineRow}>
              <View style={modernStyles.inlineItem}>
                <Text style={[modernStyles.label, { color: theme.colors.onSurface }]}>
                  Peso (kg)
                </Text>
                <TextInput
                  style={[modernStyles.input]}
                  placeholder="Ej: 75"
                  placeholderTextColor={theme.colors.onSurfaceDisabled}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
              <View style={modernStyles.inlineItem}>
                <Text style={[modernStyles.label, { color: theme.colors.onSurface }]}>
                  Altura (cm)
                </Text>
                <TextInput
                  style={[modernStyles.input]}
                  placeholder="Ej: 175"
                  placeholderTextColor={theme.colors.onSurfaceDisabled}
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
            </View>

            {/* 3. Objetivo */}
            <Text style={[modernStyles.label, { color: theme.colors.onSurface }]}>
              Objetivo principal
            </Text>
            <View style={modernStyles.chipRow}>
              {objectives.map((obj) => (
                <ObjectiveChip
                  key={obj}
                  label={obj}
                  selected={objective === obj}
                  onPress={() => setObjective(obj)}
                />
              ))}
            </View>

            {/* Botón de Acción */}
            <Button
              mode="contained"
              style={modernStyles.generateButton}
              buttonColor={theme.colors.primary}
              onPress={handleGenerateRoutine}
              loading={loading}
              disabled={loading}
              contentStyle={{ paddingVertical: 8 }}
            >
              <Text
                style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                {loading ? 'Generando...' : 'Generar Rutina Personalizada'}
              </Text>
            </Button>
          </Card.Content>
        </Card>


      </View>
    </ScrollView>
  );
}

// ==========================================
// 2. Estilos (modernStyles)
// ==========================================

const modernStyles = StyleSheet.create({
  container: {
    flex: 1,
    // El fondo blanco viene de theme.colors.background
  },
  overlay: {
        ...StyleSheet.absoluteFillObject, // Cubre toda la View contenedora
        // El color y la opacidad hacen el efecto.
    },
  header: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    //padding: 20,
    marginBottom: 16,
    // Los bordes redondeados le dan un toque moderno
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerTextContainer: {
    padding: 20,
  },
  headerIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    opacity: 0.2, // Icono semi-transparente de fondo
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fbbf24',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: '#fbbf24',
    borderWidth: 2,
    elevation: 4, // Sombra sutil
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 4,
    backgroundColor: '#fff', // Asegura fondo blanco para el input
    borderColor: '#ccc',
  },
  // Fila para Peso y Altura
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  inlineItem: {
    width: '48%', // Distribuye el espacio de manera uniforme
  },
  // Chips de Objetivo
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // Espacio entre chips
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center'
  },
  chip: {

    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    // Estilos de color definidos en el componente con el tema
  },
  chipText: {

    fontSize: 14,
    fontWeight: 'bold',
  },
  generateButton: {
    marginTop: 20,
    borderRadius: 12,
    elevation: 2,
    fontWeight: 'bold',
  },
  comingSoon: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
  }
});