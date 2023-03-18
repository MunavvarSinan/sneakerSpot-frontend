import { View, Text, FlatList } from 'react-native';
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
      {wishlistItems.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>
            Your wishlist is empty
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={({ item }) => <WishlistItem cartItem={item} />}
        />
      )}
    </>
  );
};

export default WishlistScreen;
