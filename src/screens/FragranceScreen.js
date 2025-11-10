// ==========================================
// src/screens/FragranceScreen.js
// ==========================================
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Chip, useTheme } from 'react-native-paper';
import styleFitness from '../styles/styleFintnes';

export default function FragranceScreen() {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const styles = styleFitness;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Encuentra tu Fragancia Ideal</Text>
        <Text style={styles.subtitle}>
          Responde algunas preguntas y te recomendaremos las mejores opciones
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.question}>
              {step === 1 ? '¿Qué aromas prefieres?' : 'Próximamente más preguntas...'}
            </Text>
            
            {step === 1 && (
              <View style={styles.options}>
                <Chip style={styles.chip}>Cítricos</Chip>
                <Chip style={styles.chip}>Amaderados</Chip>
                <Chip style={styles.chip}>Frescos</Chip>
                <Chip style={styles.chip}>Especiados</Chip>
              </View>
            )}
            
            <Button 
              mode="contained" 
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Continuar
            </Button>
          </Card.Content>
        </Card>
        
        <Text style={styles.comingSoon}>
          🚧 Funcionalidad completa en desarrollo
        </Text>
      </View>
    </ScrollView>
  );
}


