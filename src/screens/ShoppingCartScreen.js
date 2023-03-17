import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import { useCreateOrderMutation } from '../store/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryPrice, selectSubTotal, selectTotal } from '../store';
import CartListItem from '../components/CartListItem';
import { useNavigation } from '@react-navigation/native';
import { cartSlice } from '../store/cartSlice';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>₹{subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>₹{delivery}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>₹{total}</Text>
      </View>
    </View>
  );
};

const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const prodId = useSelector((state) =>
    state.cart.items.map((item) => item.product),
  );

  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  const handleCheckout = async () => {
    const result = await createOrder({
      productId: prodId.map((item) => item.id),
      quantity: cartItems.quantity,
      subTotal: subtotal,
      deliveryFee: delivery,
      total: total,
      name: 'munavvar',
      email: 'munavvar@gmail.com',
      address: ' kannur',
    });
    console.log(result.data);
    // const result = { success: true };
    if (result.data?.success === true) {
      // Alert.alert(
      //   'Order Placed',
      //   `Your order has been placed successfully \n Order id: ${result.data.order.ref}`,
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         navigation.navigate('Home');
      //       },
      //     },
      //   ],
      // );
      Alert.alert(
        'Order Placed',
        `Your order has been placed successfully Order id: ${result.data.order.ref}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home'),
                dispatch(cartSlice.actions.clearCart());
            },
          },
        ],
      );
    }
  };

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <>
      {cartItems.length !== 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            ListFooterComponent={ShoppingCartTotals}
          />
          <Pressable style={styles.button} onPress={handleCheckout}>
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator ActivityIndicator size={22} color='white' />
              ) : (
                'Checkout'
              )}
            </Text>
          </Pressable>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>
            Your cart is empty
          </Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  totalContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: 'black',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCartScreen;
