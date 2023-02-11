import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailsScreen from './screens/ProductDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import { Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const itemsCount = useSelector((state) => state.cart.items.length);
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
                <FontAwesome5 name='shopping-bag' size={18} color='gray' />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {itemsCount}
                </Text>
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
