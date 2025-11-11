import { Image, ScrollView, View } from 'react-native';
import {styleFitness as styles} from '../styles/styleFintnes';
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper';
import fitnessImage from '../assets/fitness.png';
// ==========================================
// src/screens/FitnessScreen.js
// ==========================================
export default function FitnessScreen() {

  const theme = useTheme();
  
  return (
    <ScrollView style={styles.container}>
      <View className="relative" style={
        {
          width: '100%',
          height: 200,
          marginBottom: 16,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          overflow: 'hidden',
        }
      }>
        
        <Image source={fitnessImage} 
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          filter : 'brightness(0.5)',
        }} />

        <Text style={
          { 
            position: 'absolute',
            bottom: 16,
            left: 16,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
          }
        }>Fitness & Rutinas</Text>

        <Text style={
          { 
            position: 'absolute',
            bottom: 45,
            left: 16,
            fontSize: 16,
            color: '#fbbf24',
            fontWeight: 'bold',
          }
        }>Tu camino hacia una vida más saludable</Text>
        

      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Tu Rutina de Fitness</Text>
        <Text style={styles.subtitle}>
          Entrena de manera inteligente y alcanza tus metas
        </Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.question}>Cuéntanos sobre ti</Text>
            
            <Text style={styles.label}>Edad</Text>
            <Text style={styles.placeholder}>25 años</Text>
            
            <Text style={styles.label}>Peso actual</Text>
            <Text style={styles.placeholder}>75 kg</Text>
            
            <Text style={styles.label}>Altura</Text>
            <Text style={styles.placeholder}>175 cm</Text>
            
            <Text style={styles.label}>Objetivo</Text>
            <View style={styles.options}>
              <Chip style={styles.chip}>Ganar músculo</Chip>
              <Chip style={styles.chip}>Perder grasa</Chip>
              <Chip style={styles.chip}>Definir</Chip>
            </View>
            
            <Button 
              mode="contained" 
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Generar Rutina
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
