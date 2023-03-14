import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CartListItem from '../components/CartListItem';
import { useSelector } from 'react-redux';
import WishlistItem from '../components/wishlistItem';

const WishlistScreen = () => {
  const wishlistItems = useSelector(
    (state) => state.products.wishListedProducts,
  );
  return (
    <>
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => <WishlistItem cartItem={item} />}
      />
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

export default WishlistScreen;
