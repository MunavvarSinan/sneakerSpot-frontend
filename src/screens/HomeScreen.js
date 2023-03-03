import { View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/ProductsSlice';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // we are getting data from the store which is products and we are getting the products from the store which is defined in the initial state in the productsSlice.js
  const products = useSelector((state) => state.products.products);
  {
    /** we can use navigation as props as along as we are navigating or the nvigation is a stack navigation */
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              {
                //update selected products in the store
                dispatch(productsSlice.actions.setSelectedProducts(item.id));
                navigation.navigate('ProductDetails');
              }
            }}
            style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 30,
    aspectRatio: 1, // to render it as a square so height will be calculated based on the aspect ration
  },
  itemContainer: {
    width: '100%',
    padding: 1,
    marginBottom: 20,
  },
  container: {
    padding: 20,
  },
});

export default HomeScreen;
