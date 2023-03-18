import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './src/navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <StripeProvider publishableKey='pk_test_51JnPlnSATCnCZmB4edIeNyQldzuzsLU6B1AnUCPPvDTdLQYyCp6gdhWeKVf39nNBqgGY1XQ8VgxEEOWQHuDe0TUF00rm83t5s7'>
            <Navigation />
          </StripeProvider>
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
