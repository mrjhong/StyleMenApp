import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import styleFitness from '../styles/styleFintnes';

// ==========================================
// src/screens/ProfileScreen.js
// ==========================================
export function ProfileScreen() {
  const theme = useTheme();
    const styles = styleFitness;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Avatar placeholder */}
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@example.com</Text>
        </View>
        
        {/* Opciones de perfil */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Configuración</Text>
            
            <View style={styles.menuItem}>
              <Text>Editar perfil</Text>
            </View>
            
            <View style={styles.menuItem}>
              <Text>Preferencias de estilo</Text>
            </View>
            
            <View style={styles.menuItem}>
              <Text>Notificaciones</Text>
            </View>
            
            <View style={styles.menuItem}>
              <Text>Historial de outfits</Text>
            </View>
          </Card.Content>
        </Card>
        
        <Button 
          mode="contained" 
          style={[styles.button, { backgroundColor: theme.colors.accent }]}
        >
          ⭐ Actualizar a Premium
        </Button>
        
        <Button 
          mode="outlined" 
          style={styles.button}
          textColor={theme.colors.error}
        >
          Cerrar sesión
        </Button>
        
        <Text style={styles.comingSoon}>
          🚧 Funcionalidad completa en desarrollo
        </Text>
      </View>
    </ScrollView>
  );
}
