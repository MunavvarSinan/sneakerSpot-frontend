import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { cartSlice } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const CartListItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const itemPrice = cartItem.product.price * cartItem.quantity;
  const increaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product.id,
        amount: 1,
      }),
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product.id,
        amount: -1,
      }),
    );
  };

  return (
    <View style={styles.container}>
      {/* we have managed to display the image and the text side by side by creating two view which one for image and rest for the right side part and adding flexdirection: 'row' so it will align the items in row */}
      <Image source={{ uri: cartItem.product.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{cartItem.product.name}</Text>
        <Text style={styles.size}>Size {cartItem.size}</Text>

        <View style={styles.footer}>
          <Feather
            onPress={decreaseQuantity}
            name='minus-circle'
            size={24}
            color='gray'
          />
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name='plus-circle'
            size={24}
            color='gray'
          />
          <Text style={styles.itemTotal}>${itemPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: '40%',
    aspectRatio: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: 'gray',
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: '500',
  },
});

export default CartListItem;
