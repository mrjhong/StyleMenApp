import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import  { aspect } from '../styles/styleFintnes';
const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const theme = useTheme();



  const features = [
    {
      title: 'Genera tu Outfit',
      description: 'Combinaciones perfectas con IA',
      icon: 'tshirt-crew',
      gradient: ['#667eea', '#764ba2'],
      screen: 'Outfit',
    },
    {
      title: 'Analiza tu Look',
      description: 'Foto + IA = Feedback instantáneo',
      icon: 'camera',
      gradient: ['#f093fb', '#f5576c'],
      screen: 'Outfit',
    },
    {
      title: 'Tu Fragancia Ideal',
      description: 'Encuentra tu esencia perfecta',
      icon: 'spray',
      gradient: ['#4facfe', '#00f2fe'],
      screen: 'Fragrance',
    },
    {
      title: 'Rutina Fitness',
      description: 'Entrena como un pro y logra tus metas',
      icon: 'dumbbell',
      gradient: ['#43e97b', '#38f9d7'],
      screen: 'Fitness',
    },
  ];

  const stats = [
    { label: 'Outfits', value: '24', icon: 'hanger' },
    { label: 'Análisis', value: '12', icon: 'chart-line' },
    { label: 'Días', value: '30', icon: 'calendar' },
  ];

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section con Gradiente */}
      <View className="relative">
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-12 pb-8 rounded-b-[32px]"
          style={{
            shadowColor: '#d4af37',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 12,
          }}
        >
          {/* Badge Premium */}
          <View className="self-start bg-amber-500/20 px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            <Text className="text-amber-400 text-xs font-bold tracking-wider">
              ✨ PREMIUM
            </Text>
          </View>

          {/* Título Principal */}
          <View className="mb-2">
            <Text className="text-4xl mb-2 " style={{ color: '#fbbf24', fontWeight: '900' }}>
              Nivora Men
            </Text>
            <Text className="text-lg text-amber-400  tracking-wide" style={{ color: '#ffffffff' , fontWeight: '700'}}>
              Tu asistente de estilo personal
            </Text>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-around mt-6 bg-white/5 rounded-2xl py-4 backdrop-blur-xl border border-white/10">
            {stats.map((stat, idx) => (
              <View key={idx} className="items-center">
                <View className="bg-amber-500/20 w-10 h-10 rounded-full items-center justify-center mb-2">
                  <MaterialCommunityIcons 
                    name={stat.icon} 
                    size={20} 
                    color="#fbbf24" 
                  />
                </View>
                <Text className="text-xl " style={{color: '#ffffffff' , fontWeight: '900' }}>{stat.value}</Text>
                <Text className="text-gray-400 text-xs" style={aspect.gray500} >{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Decorative Glow */}
        <View 
          className="absolute -top-20 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"
          style={{ opacity: 0.3 }}
        />
      </View>

      {/* Main Content */}
      <View className="px-6 pt-8">
        {/* Section Title */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-white mb-1">
            ¿Qué haremos hoy?
          </Text>
          <View className="w-20 h-1 bg-amber-500 rounded-full" />
        </View>

        {/* Features Grid Premium */}
        <View className="flex-row flex-wrap justify-between mb-8">
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] mb-4"
              onPress={() => navigation.navigate(feature.screen)}
              activeOpacity={0.8}
            >
              <View className="bg-yellow-700/50 rounded-3xl p-5 border border-yellow-700/50 backdrop-blur-xl">
                {/* Icon with Gradient Background */}
                <View className="mb-4">
                  <LinearGradient
                    colors={feature.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-14 h-14 rounded-2xl items-center justify-center"
                    style={{
                      shadowColor: feature.gradient[0],
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.5,
                      shadowRadius: 8,
                      elevation: 8,
                      borderRadius: 16
                    }}
                  >
                    <MaterialCommunityIcons 
                      name={feature.icon} 
                      size={28} 
                      color="#fff" 
                    />
                  </LinearGradient>
                </View>

                {/* Text Content */}
                <Text className="text-white text-base font-bold mb-1.5 leading-tight" style={{fontWeight: '700'}}>
                  {feature.title}
                </Text>
                <Text className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: '500'}}>
                  {feature.description}
                </Text>

                {/* Arrow Indicator */}
                <View className="absolute bottom-4 right-4 mt-2">
                  <View className="bg-white/10 w-7 h-7 rounded-full items-center justify-center">
                    <MaterialCommunityIcons 
                      name="arrow-right" 
                      size={16} 
                      color="#9ca3af" 
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Premium Tip Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <View className="bg-amber-500/20 w-8 h-8 rounded-full items-center justify-center mr-3">
              <Text className="text-lg">💡</Text>
            </View>
            <Text className="text-xl font-bold text-white">
              Consejo del día
            </Text>
          </View>

          <View className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-5 border border-amber-500/20">
            <Text className="text-gray-300 text-sm leading-relaxed">
              Los colores neutros (negro, blanco, gris, azul marino) son la base de cualquier 
              guardarropa masculino. <Text className="text-amber-400 font-semibold">
              Combínalos con un color de acento</Text> para destacar y añadir personalidad a tu look.
            </Text>
            
            {/* Accent Line */}
            <View className="mt-4 flex-row items-center">
              <View className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
              <Text className="text-amber-500 text-xs font-semibold mx-3">PREMIUM TIP</Text>
              <View className="flex-1 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <TouchableOpacity
          className="mb-8"
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#d4af37', '#f4d03f', '#d4af37']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-6 flex-row items-center justify-between"
            style={{
              shadowColor: '#d4af37',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
            }}
          >
            <View className="flex-1">
              <Text className="text-black text-lg font-black mb-1">
                Desbloquea todo
              </Text>
              <Text className="text-black/70 text-sm font-medium">
                Acceso ilimitado a todas las funciones
              </Text>
            </View>
            <View className="bg-black/20 w-12 h-12 rounded-full items-center justify-center">
              <MaterialCommunityIcons name="crown" size={24} color="#000" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
}