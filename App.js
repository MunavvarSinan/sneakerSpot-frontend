import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Flatlist } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      {/* <ProductDetailsScreen /> */}
      <ShoppingCartScreen />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
