import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Flatlist } from 'react-native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
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
