import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailsScreen from './screens/ProductDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import { Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('ShoppingCart')}
                style={{ flexDirection: 'row' }}>
                <FontAwesome5 name='shopping-cart' size={18} color='gray' />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>1</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name='ProductDetails'
          component={ProductDetailsScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen name='ShoppingCart' component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
