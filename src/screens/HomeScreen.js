import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
// Importa Text, View, etc. con su versión de NativeWind si quieres usar 'className' en ellas
import { Text as NativeText } from 'react-native'; 
import { Card, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';

// 💡 Aplicamos NativeWind a los componentes base
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(NativeText);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledCard = styled(Card);

export default function HomeScreen({ navigation }) {
  // Configura el tema de Paper a oscuro si no lo has hecho globalmente
  const theme = useTheme(); 

  // Datos de las funcionalidades
  const features = [
    // Usamos colores predefinidos de Tailwind, o puedes usar los custom 'accent-gold', etc.
    [cite_start],{ title: 'Genera tu Outfit', description: 'Combinaciones perfectas con IA [cite: 8]', icon: 'tshirt-crew', color: 'bg-blue-500', screen: 'Outfit' },
    [cite_start],{ title: 'Analiza tu Look', description: 'Foto + IA = Feedback instantáneo [cite: 24]', icon: 'camera', color: 'bg-orange-500', screen: 'Outfit' },
    [cite_start],{ title: 'Tu Fragancia Ideal', description: 'Encuentra tu esencia perfecta [cite: 37]', icon: 'spray', color: 'bg-purple-500', screen: 'Fragrance' },
    [cite_start],{ title: 'Rutina Fitness', description: 'Entrena como un pro [cite: 58]', icon: 'dumbbell', color: 'bg-green-500', screen: 'Fitness' },
  ];

  return (
    // 1. Fondo Oscuro Principal
    <StyledScrollView className="flex-1 bg-dark-bg">
      {/* Header Hero */}
      <StyledView 
        // El color 'accent-gold' viene de la configuración de tailwind.config.js
        className="p-8 items-center bg-card-dark rounded-b-3xl shadow-xl shadow-gray-900" 
      >
        <StyledText className="text-3xl font-extrabold text-text-light mb-2">
          Bienvenido a StyleMen
        </StyledText>
        <StyledText className="text-lg text-accent-gold font-semibold">
          Tu asistente personal de estilo
        </StyledText>
      </StyledView>

      {/* Quick Actions */}
      <StyledView className="p-4 mt-4">
        <StyledText className="text-xl font-bold text-text-light mb-4">
          ¿Qué quieres hacer hoy?
        </StyledText>
        
        {/* Features Grid */}
        <StyledView className="flex-row flex-wrap justify-between mb-6">
          {features.map((feature, index) => (
            <StyledTouchableOpacity
              key={index}
              className="w-[48%] mb-4"
              onPress={() => navigation.navigate(feature.screen)}
            >
              {/* 2. Tarjetas Oscuras Elevadas */}
              <StyledCard 
                className="p-4 items-center rounded-xl bg-card-dark border border-gray-700 h-44" 
                elevation={4} // Mantener la sombra de Paper
              >
                {/* 3. Contenedor de Ícono con Color de Acento */}
                <StyledView 
                  className={`w-16 h-16 rounded-full justify-center items-center mb-3 ${feature.color}`}
                >
                  <MaterialCommunityIcons name={feature.icon} size={32} color="#fff" />
                </StyledView>
                
                <StyledText className="text-sm font-bold text-text-light text-center mb-1">
                  {feature.title}
                </StyledText>
                <StyledText className="text-xs text-text-muted text-center">
                  {feature.description}
                </StyledText>
              </StyledCard>
            </StyledTouchableOpacity>
          ))}
        </StyledView>

        {/* Tips Section */}
        <StyledView className="mt-4">
          <StyledText className="text-xl font-bold text-text-light mb-4">
            <NativeText className="text-accent-gold">💡</NativeText> Tip del día
          </StyledText>
          
          {/* 4. Tarjeta de Tip con Borde Dorado sutil */}
          <StyledCard 
            className="rounded-xl bg-card-dark border border-accent-gold/50"
            elevation={3}
          >
            <Card.Content>
              <StyledText className="text-base text-text-light leading-snug">
                Los colores neutros (negro, blanco, gris, azul marino) son la base de cualquier 
                guardarropa masculino. Combínalos con un color de acento para destacar.
              </StyledText>
            </Card.Content>
          </StyledCard>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}