import styleFitness from '../styles/styleFintnes';


// ==========================================
// src/screens/FitnessScreen.js
// ==========================================
export function FitnessScreen() {

  const styles = styleFitness;  
  const theme = useTheme();
  
  return (
    <ScrollView style={styles.container}>
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
