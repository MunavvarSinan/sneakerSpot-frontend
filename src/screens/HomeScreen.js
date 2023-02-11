import { View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import products from '../data/products';

const HomeScreen = ({ navigation }) => {
  {
    /** we can use navigation as props as along as we are navigating or the nvigation is a stack navigation */
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('ProductDetails');
            }}
            style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
        )}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1, // to render it as a square so height will be calculated based on the aspect ration
  },
  itemContainer: {
    width: '50%',
    padding: 1,
  },
});

export default HomeScreen;
