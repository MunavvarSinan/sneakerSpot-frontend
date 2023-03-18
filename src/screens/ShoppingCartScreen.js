import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../store/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryPrice, selectSubTotal, selectTotal } from '../store';
import CartListItem from '../components/CartListItem';
import { useNavigation } from '@react-navigation/native';
import { cartSlice } from '../store/cartSlice';
import TrackingOrderScreen from '../components/TrackingOrder';
import { useStripe } from '@stripe/stripe-react-native';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>${subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>${delivery}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>${total}</Text>
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
  const [loading, setLoading] = useState(false);

  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    setLoading(true);
    // 1. Create a payment intent

    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
      // because stripe expects amount in cents
    });
    console.log(response);
    if (response.error) {
      console.log(response.error);
      Alert.alert('Something went wrong');
      setLoading(false);
      return;
    }

    //2. Initialize the payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Munavvar',
      paymentIntentClientSecret: response.data.paymentIntent,
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      setLoading(false);
      return;
    }

    // 3. Give the paymeny sheet
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      console.log(paymentResponse.error);
      Alert.alert(
        'Order has been cancelled',
        'Error code: ' +
          paymentResponse.error.code +
          '. \nError message: ' +
          paymentResponse.error.message,
      );
      setLoading(false);
      return;
    }

    setLoading(false);
    handleCheckout();
  };

  const handleCheckout = async () => {
    setLoading(true);
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
    if (result.data?.success === true) {
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
    setLoading(false);
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
          <Pressable style={styles.button} onPress={onCheckout}>
            <Text style={styles.buttonText}>
              {isLoading || loading ? (
                <ActivityIndicator ActivityIndicator size={22} color='white' />
              ) : (
                'Checkout'
              )}
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <TrackingOrderScreen />
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
});

export default ShoppingCartScreen;
