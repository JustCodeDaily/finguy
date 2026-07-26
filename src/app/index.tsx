import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <>
       <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingTop: 60,
    alignItems: 'center',
    color: '#ffffff', // White text color
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
