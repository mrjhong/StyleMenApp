import { StyleSheet } from 'react-native';

// ==========================================
// Estilos compartidos
// ==========================================
export const styleFitness = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  placeholder: {
    fontSize: 14,
    color: '#757575',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
  },
  comingSoon: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#757575',
  },
  // Profile specific
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});


export const stylesOutfitScreen = StyleSheet.create({
  tabButton: {
    width: '47%',
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderBottomWidth: 3,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inactiveButton: {
    borderBottomWidth: 0,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  inactiveTabText: {
    fontWeight: 'bold',
    opacity: 0.8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a !important',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 16,
    
  },
  styleCard: {
    width: '27%',
    marginBottom: 12,
    marginRight: '3%',
    borderRadius: 50,
    borderBlockColor: '#d6a70cff',
    borderWidth: 2,
    borderColor: '#d6a70cff',
    backgroundColor: '#ffefc4ff',
  },
  chipText: {
    color: '#ffffffff',
    fontWeight: 'bold',
  },
  selectedChipText: {
    color: '#000000ff',
    fontWeight: 'bold',
  },
  horizontalScroll: {
    marginHorizontal: -16,
    paddingVertical :3,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
 
  outfitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    fontFamily: 'System',
  },
  outfitDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
    fontFamily: 'System',
  },


});

export const aspect = StyleSheet.create({
  white: {
    color: 'white',
  },
  gray500: {
    color: '#9ea2acff',
  },
  amber400: {
    color: '#fbbf24',
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
});