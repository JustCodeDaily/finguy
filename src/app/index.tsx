import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Day 2: Flexbox Layout</Text>
      
      {/* 
        This is our flex container. 
        Try changing flexDirection to 'column' and see what happens!
        Try changing justifyContent to 'center', 'flex-start', or 'flex-end'.
      */}
      <View style={styles.rowContainer}>
        
        {/* Box 1 */}
        <View style={[styles.box, { backgroundColor: '#FF6B6B' }]}>
          <Text style={styles.boxText}>1</Text>
        </View>
        
        {/* Box 2 */}
        <View style={[styles.box, { backgroundColor: '#4ECDC4' }]}>
          <Text style={styles.boxText}>2</Text>
        </View>
        
        {/* Box 3 */}
        <View style={[styles.box, { backgroundColor: '#45B7D1' }]}>
          <Text style={styles.boxText}>3</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',       // Arranges children in a row
    justifyContent: 'space-between', // Spacing along the primary axis (row)
    alignItems: 'center',       // Alignment along the cross axis (vertical)
    width: '90%',               // Take up 90% of screen width
    height: 150,                // Fixed height for the container
    backgroundColor: '#1e1e1e', // Slightly lighter dark background
    borderRadius: 12,
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',   // Centers text vertically inside the box
    alignItems: 'center',       // Centers text horizontally inside the box
    borderRadius: 8,
  },
  boxText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
