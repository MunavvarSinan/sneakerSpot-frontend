import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Flatlist } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaProvider>
        <Provider store={store}>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style='auto' />
          </View>
        </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
