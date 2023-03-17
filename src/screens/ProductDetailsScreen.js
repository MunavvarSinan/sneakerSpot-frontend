import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { Icon } from '../components/Icon';
import { productsSlice } from '../store/ProductsSlice';
import React from 'react';
import { useGetProductQuery } from '../store/apiSlice';

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  console.log('id', id);

  // const product = useSelector((state) => state.products.selectedProduct);
  const [desc, setDesc] = React.useState();
  const [readMore, setReadMore] = React.useState(false);
  const [addToCartLoading, setAddToCartLoading] = React.useState(false);
  const { width } = useWindowDimensions();
  const wishlistedProducts = useSelector(
    (state) => state.products.wishListedProducts,
  );
  const dispatch = useDispatch();
  const addToCart = () => {
    setAddToCartLoading(true);
    dispatch(cartSlice.actions.addCartItem(product));
    setTimeout(() => {
      setAddToCartLoading(false);
    }, 1000);
  };
  const { data, isLoading, error } = useGetProductQuery(id);
  if (isLoading) {
    return (
      <ActivityIndicator
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          flex: 1,
        }}
        size='large'
        color='black'
      />
    );
  }
  if (error) {
    return <Text>Something went wrong</Text>;
  }
  const product = data.product;
console.log(readMore);
console.log(desc)
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{product.name}</Text>
            <Icon
              icon={
                wishlistedProducts
                  .map((item) => item.wishlistItem.id)
                  .includes(product.id)
                  ? 'WishlistFilled'
                  : 'Wishlist'
              }
              onPress={() => {
                dispatch(
                  productsSlice.actions.setWishListedProducts(product.id),
                );
              }}
            />
          </View>
          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.description}>
            {desc !== undefined ? desc : product.description.slice(0, 100)}{' '}
            {!readMore && '....'}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
            onPress={() => {
              if (!readMore) {
                setDesc(product.description);
                setReadMore(true);
              } else {
                setDesc(product.description.slice(0, 100));
                setReadMore(false);
              }
            }}>
            {readMore ? ' Show Less' : ' Read More'}
          </Text>

          {/* we have a problem here that our description is goes out of the screen and there is no way to see the text so we need to encapsulate it in the Scroll view container to view it */}
        </View>
        <Pressable onPress={addToCart} style={styles.button}>
          <Text style={styles.buttonText}>
            {addToCartLoading ? (
              <ActivityIndicator size={22} color='white' />
            ) : (
              'Add to cart'
            )}
          </Text>
        </Pressable>
      </ScrollView>
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
    position: 'relative',
    bottom: 10,
    // flex: 1,
    width: '90%',
    backgroundColor: 'black',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
