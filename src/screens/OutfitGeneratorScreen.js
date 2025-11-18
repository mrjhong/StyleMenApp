import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, Chip, ActivityIndicator, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { outfitservice } from '../services/outfitService';
import { stylesOutfitScreen as styles } from '../styles/styleFintnes';
import { CardImage } from '../components/CardImage';
export default function OutfitGeneratorScreen() {
  const theme = useTheme();

  // Estados
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);

  // Opciones
  const styles_options = [
    { label: 'Casual', icon: 'tshirt-crew', value: 'casual' },
    { label: 'Urbano', icon: 'city', value: 'urbano' },
    { label: 'Formal', icon: 'tie', value: 'formal' },
  ];

  const occasions = [
    { label: 'Trabajo', value: 'trabajo' },
    { label: 'Cita', value: 'cita' },
    { label: 'Evento', value: 'evento' },
    { label: 'Día Casual', value: 'casual' },
    { label: 'Gym', value: 'gym' },
  ];

  const dailyStyles = [
    {
      label: 'Casual',
      description: 'Ropa cómoda y relajada para el día a día.',
      image: 'https://i.pinimg.com/1200x/b2/07/ab/b207ab56faecd381bb89dcb328f53d0a.jpg',
    },
    {
      label: 'Urbano',
      description: 'Estilo moderno y a la moda para la vida en la ciudad.',
      image: 'https://i.pinimg.com/736x/41/d9/19/41d919f51cd81eba845c91fda0caf638.jpg',
    }
  ];

  const handleGenerate = async () => {
    if (!selectedStyle || !selectedOccasion) {
      Alert.alert('Faltan datos', 'Por favor selecciona un estilo y una ocasión');
      return;
    }

    setLoading(true);
    try {
      const result = await outfitservice.generateOutfit(selectedStyle, selectedOccasion);
      console.log('Outfits generados:', result);
      setGeneratedOutfits(result.data.outfits);
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el outfit. Intenta de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={localStyles.container}>
      <View style={localStyles.content}>

        {/* card estilos diarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estilos Diarios Populares</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {dailyStyles.map((style, index) => (
              <View key={index} style={styles.outfitCard}>

                <CardImage props={{data:style, index:index}}/>
            
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Selección de Estilo */}
        <View style={localStyles.section}>
          <Text style={styles.sectionTitle}>1. Selecciona tu estilo</Text>
          <View style={styles.chipContainer}>
            {styles_options.map((style) => (
              <Card
                key={style.value}
                style={[
                  styles.styleCard,
                  selectedStyle === style.value && {
                    backgroundColor: theme.colors.accent,
                    elevation: 3
                  }
                ]}
                onPress={() => setSelectedStyle(style.value)}
              >
                <Card.Content style={localStyles.styleCardContent}>
                  <MaterialCommunityIcons
                    name={style.icon}
                    size={32}
                    color={selectedStyle === style.value ? '#fff' : theme.colors.primary}
                  />
                  <Text style={[
                    localStyles.styleLabel,
                    selectedStyle === style.value && { color: '#fff', fontWeight: 'bold' }
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

        {/* Botón Generar */}
        <Button
          mode="contained"
          onPress={handleGenerate}
          loading={loading}
          disabled={loading}
          style={localStyles.generateButton}
          buttonColor={theme.colors.primary}
          textColor="#fff"
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
        >
          {loading ? 'Generando...' : 'Generar Outfits ✨'}
        </Button>

        {/* Resultados */}
        {loading && (
          <View style={localStyles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={localStyles.loadingText}>
              La IA está creando tus outfits perfectos...
            </Text>
          </View>
        )}

        {generatedOutfits.length > 0 && !loading && (
          <View style={localStyles.resultsSection}>
            <Text style={localStyles.sectionTitle}>Tus Outfits Recomendados</Text>
            {generatedOutfits.map((outfit, index) => (
              <Card key={index} style={localStyles.outfitCard}>
                <Card.Content>
                  <Text style={localStyles.outfitTitle}>Opción {index + 1}</Text>
                  
                  <Text style={localStyles.outfitTitle}>{outfit.name}</Text>
                  <Text style={localStyles.outfitDescription}>{outfit.description}</Text>

                  <View style={localStyles.itemsList}>
                    {outfit.items.map((item, idx) => (
                      <View key={idx} style={localStyles.itemRow}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.accent} />
                        <Text style={localStyles.itemText}>{item.type}</Text>
                        <Text style={localStyles.itemText}> - {item.name} ({item.color}, {item.material}, {item.fit})</Text>

                      </View>
                    ))}
                  </View>

                  <View>
                    <Text style={localStyles.outfitTitle}>Accesorios Sugeridos:</Text>
                    {outfit.accessories.map((accessory, idx) => (
                      <View key={idx} style={localStyles.itemRow}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.accent} />
                        <Text style={localStyles.itemText}>{accessory.type} - {accessory.name}</Text>
                      </View>
                    ))}
                  </View>

                  <View>
                    <Text style={localStyles.outfitTitle}>Consejos:</Text>
                    <Text style={localStyles.outfitDescription}>{outfit.tips}</Text>
                  </View>

                  {outfit.shopLinks && (
                    <Button
                      mode="outlined"
                      style={localStyles.shopButton}
                      onPress={() => Alert.alert('Próximamente', 'Links de compra en desarrollo')}
                    >
                      Ver prendas disponibles
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
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
    width: '30%',
    marginBottom: 12,
    marginRight: '3%',
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