import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';
import products from '../data/products';
const HomeScreen = () => {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
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
    padding: 1
  }
});

export default HomeScreen;
