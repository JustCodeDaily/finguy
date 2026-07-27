import { View, Text, StyleSheet, FlatList } from 'react-native';

// Mock data for our expenses
const EXPENSES = [
  { id: '1', title: 'Groceries', amount: '₹500', category: 'Food', color: '#FF6B6B' },
  { id: '2', title: 'Uber to office', amount: '₹250', category: 'Transport', color: '#45B7D1' },
  { id: '3', title: 'Netflix', amount: '₹649', category: 'Subscriptions', color: '#FFA07A' },
  { id: '4', title: 'Morning Coffee', amount: '₹150', category: 'Coffee', color: '#D4A574' },
  { id: '5', title: 'Gym Membership', amount: '₹1500', category: 'Gym', color: '#95E1D3' },
];

export default function HomeScreen() {
  // This function renders a single row in the list
  const renderExpenseItem = ({ item }: { item: typeof EXPENSES[0] }) => (
    <View style={styles.row}>
      <View style={[styles.categoryIndicator, { backgroundColor: item.color }]} />
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <Text style={styles.amountText}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Day 3: FlatList</Text>
      
      {/* 
        FlatList is optimized for long lists. 
        It only renders items that are currently visible on the screen.
      */}
      <FlatList
        data={EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1, // Takes up remaining space between indicator and amount
  },
  titleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryText: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  amountText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
