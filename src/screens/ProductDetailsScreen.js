import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const { width } = useWindowDimensions();

  const addToCart = () => {
    console.warn('Added to cart');
  };
  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image style={[styles.image, { width }]} source={{ uri: item }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled // it will snap to the next image instead of scrolling smoothly
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {/* we have a problem here that our description is goes out of the screen and there is no way to see the text so we need to encapsulate it in the Scroll view container to view it */}
        </View>
      </ScrollView>
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  image: {
    aspectRatio: 1,
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

export default ProductDetailsScreen;
