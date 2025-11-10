import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import OutfitGeneratorScreen from './OutfitGeneratorScreen';
import OutfitAnalyzerScreen from './OutfitAnalyzerScreen';

export default function OutfitScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' o 'analyzer'

  return (
    <View style={styles.container}>
      {/* Tabs personalizados */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'generator' && { 
              backgroundColor: theme.colors.accent,
              borderBottomWidth: 3,
              borderBottomColor: theme.colors.accent 
            }
          ]}
          onPress={() => setActiveTab('generator')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'generator' && styles.tabTextActive
          ]}>
            Generar Outfit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'analyzer' && { 
              backgroundColor: theme.colors.accent,
              borderBottomWidth: 3,
              borderBottomColor: theme.colors.accent 
            }
          ]}
          onPress={() => setActiveTab('analyzer')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'analyzer' && styles.tabTextActive
          ]}>
            Analizar Foto
          </Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});