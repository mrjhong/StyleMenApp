import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import OutfitGeneratorScreen from './OutfitGeneratorScreen';
import OutfitAnalyzerScreen from './OutfitAnalyzerScreen';
import { Button } from 'react-native-paper';
import { aspect, stylesOutfitScreen as styles } from '../styles/styleFintnes';

export default function OutfitScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' o 'analyzer'

  return (
    <View style={styles.container}>
      {/* Tabs personalizados */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.surface }]}>
        <Button
          style={[
            styles.tabButton,
            activeTab === 'generator'
              ? styles.activeButton
              : styles.inactiveButton,
            {
              backgroundColor: activeTab === 'generator'
                ? aspect.black.color
                : aspect.amber400.color,
         
            }
          ]}
          onPress={() => setActiveTab('generator')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'generator'
              ? styles.activeTabText
              : styles.inactiveTabText,
            {
              color: activeTab === 'generator'
                ? '#fff'
                : '#000',
            }
          ]}>
            Generar Outfit
          </Text>
        </Button>

        <Button
          style={[
            styles.tabButton,
            activeTab === 'analyzer'
              ? styles.activeButton
              : styles.inactiveButton,
            {
              backgroundColor: activeTab === 'analyzer'
                ? aspect.black.color
                : aspect.amber400.color,
          
            }
          ]}
          onPress={() => setActiveTab('analyzer')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'analyzer'
              ? styles.activeTabText
              : styles.inactiveTabText,
            {
              color: activeTab === 'analyzer'
                ? '#fff'
                : '#000',
            }
          ]}>
            Analizar Foto
          </Text>
        </Button>
      </View>

 
      {/* Contenido según tab activo */}
      {activeTab === 'generator' ? (
        <OutfitGeneratorScreen />
      ) : (
        <OutfitAnalyzerScreen />
      )}
    </View>
  );
}
