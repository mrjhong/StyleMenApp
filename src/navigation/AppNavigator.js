import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Importar pantallas (las crearemos después)
import HomeScreen from '../screens/HomeScreen';
import OutfitScreen from '../screens/OutfitScreen';
import FragranceScreen from '../screens/FragranceScreen';
import FitnessScreen from '../screens/FitnessScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Outfit') {
            iconName = focused ? 'tshirt-crew' : 'tshirt-crew-outline';
          } else if (route.name === 'Fragrance') {
            iconName = focused ? 'spray' : 'spray-bottle';
          } else if (route.name === 'Fitness') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.disabled,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          elevation: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Outfit" 
        component={OutfitScreen}
        options={{ title: 'Vestuario' }}
      />
      <Tab.Screen 
        name="Fragrance" 
        component={FragranceScreen}
        options={{ title: 'Fragancias' }}
      />
       <Tab.Screen 
        name="Fitness" 
        component={FitnessScreen}
        options={{ title: 'Fitness' }}
      /> 
      {/* <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      /> */}
    </Tab.Navigator>
  );
}