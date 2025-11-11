// ==========================================
// src/screens/FragranceScreen.js
// ==========================================
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Chip, useTheme } from 'react-native-paper';
import { stylesOutfitScreen as styles } from '../styles/styleFintnes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CardImage } from '../components/CardImage';

export default function FragranceScreen() {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedFragance, setSelectedFragance] = useState(null);
  const occasions = [
    { label: 'Trabajo', value: 'trabajo' },
    { label: 'Cita', value: 'cita' },
    { label: 'Evento', value: 'evento' },
    { label: 'Día Casual', value: 'casual' },
    { label: 'Gym', value: 'gym' },
  ];
  const fraganceClass = [
    { label: 'Cítricos', value: 'citricos', icon: 'fruit-citrus' },
    { label: 'Amaderados', value: 'amaderados', icon: 'pine-tree' },
    { label: 'Frescos', value: 'frescos', icon: 'water' },
    { label: 'Especiados', value: 'especiados', icon: 'food-variant' }
  ];

  const montlyFragances = [
    {
      label: 'Energía Cítrica',
      description: 'Una fragancia vibrante con notas de limón, naranja y bergamota para un impulso refrescante.',
      image: 'https://i.pinimg.com/736x/73/89/3a/73893a0f060b99c544f7243f21271c99.jpg',
    },
    {
      label: 'Bosque Profundo',
      description: 'Aromas terrosos y amaderados que evocan la tranquilidad de un paseo por el bosque.',
      image: 'https://i.pinimg.com/1200x/50/b0/9f/50b09f1d714728c372a433b68f306cd5.jpg',
    }
  ];
  return (
    <ScrollView style={localStyles.container}>
      <View style={localStyles.content}>
          
        {/* card estilos diarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fragancias Populares</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {montlyFragances.map((fragance, index) => (
              <View key={index} style={styles.outfitCard}>

                <CardImage props={{ data: fragance, index: index }} />

              </View>
            ))}
          </ScrollView>
        </View>


        {/* Selección de fragancia */}
        <View style={localStyles.section}>
          <Text style={styles.sectionTitle}>1. Selecciona tu estilo</Text>
          <View style={styles.chipContainer}>
            {fraganceClass.map((style) => (
              <Card
                key={style.value}
                style={[
                  localStyles.styleCard,
                  selectedFragance === style.value && {
                    backgroundColor: theme.colors.accent,
                    elevation: 3
                  }
                ]}
                onPress={() => setSelectedFragance(style.value)}
              >
                <Card.Content style={localStyles.styleCardContent}>
                  <MaterialCommunityIcons
                    name={style.icon}
                    size={32}
                    color={selectedFragance === style.value ? '#fff' : theme.colors.primary}
                  />
                  <Text style={[
                    localStyles.styleLabel,
                    selectedFragance === style.value && { color: '#fff', fontWeight: 'bold' }
                  ]}>
                    {style.label}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>


        {/* Selección de Ocasión */}
        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>2. ¿Para qué ocasión?</Text>
          <View style={styles.chipContainer}>
            {occasions.map((occasion) => {
              const isSelected = selectedOccasion === occasion.value;

              return (
                <Chip
                  key={occasion.value}
                  selected={isSelected}
                  onPress={() => setSelectedOccasion(occasion.value)}
                  style={[
                    localStyles.chip,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.accent
                        : '#362a45'
                    }
                  ]}
                  textStyle={[
                    styles.chipText,
                    isSelected && styles.selectedChipText
                  ]}
                >
                  {occasion.label}
                </Chip>
              );
            })}
          </View>
        </View>

        <Text style={styles.comingSoon}>
          🚧 Funcionalidad completa en desarrollo
        </Text>

      </View>
    </ScrollView>
  );
}


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  styleCard: {
    width: '40%',

    marginBottom: 12,
    marginRight: '3%',
    borderRadius: 50,
    borderBlockColor: '#d6a70cff',
    borderWidth: 2,
    borderColor: '#d6a70cff',
    backgroundColor: '#ffefc4ff',
  },
  styleCardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  styleLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  generateButton: {
    marginVertical: 16,
    borderRadius: 12,

  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#757575',
  },
  resultsSection: {
    marginTop: 16,
  },
  outfitCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  outfitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  outfitDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
    lineHeight: 20,
  },
  itemsList: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1a1a1a',
  },
  shopButton: {
    marginTop: 8,
  },
});