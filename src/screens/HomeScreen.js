import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/ProductsSlice';
import { Icon } from '../components/Icon';
import CardCarousel from '../components/CardCarousel';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const [category, setCategory] = React.useState('Adidas');
  console.log(category);
  const dispatch = useDispatch();
  // we are getting data from the store which is products and we are getting the products from the store which is defined in the initial state in the productsSlice.js
  const products = useSelector((state) => state.products.products);
  const wishlistedProducts = useSelector(
    (state) => state.products.wishListedProducts,
  );

  {
    /** we can use navigation as props as along as we are navigating or the nvigation is a stack navigation */
  }
  const _colors = {
    active: `#FEEC66`,
    inactive: `#FCD25900`,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={products}
          ListHeaderComponent={() => (
            <>
              <ImageBackground
                source={require('../assets/icons/highlighter.png')}
                imageStyle={{
                  width: '43%',
                  height: 15,
                  marginTop: 40,
                  marginLeft: 14,
                  opacity: 0.6,
                }}
                style={styles.highlighter}>
                <Text style={styles.header}>Featured Products</Text>
              </ImageBackground>
              <View>
                <View style={{ marginLeft: 30 }}>
                  <CardCarousel />
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: 10,
                    }}>
                    <TouchableOpacity onPress={() => setCategory('Adidas')}>
                      <View
                        style={{
                          marginRight: 10,
                          padding: 15,
                          width: 180,
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderColor: 'gray',
                          borderRadius: 12,
                          // backgroundColor:
                          //   category === 'Adidas'
                          //     ? _colors.active
                          //     : _colors.inactive,
                        }}>
                        <ImageBackground
                          source={require('../assets/icons/highlighter.png')}
                          imageStyle={{
                            width: '40%',
                            height: 13,
                            marginTop: 8,
                            marginLeft: -4,
                            opacity: category === 'Adidas' ? 0.6 : 0,
                            // alignSelf:'center'
                          }}
                          style={styles.highlighter}>
                          <Text style={{ color: '#36303F', fontWeight: '700' }}>
                            Adidas
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory('Nike')}>
                      <View
                        style={{
                          marginRight: 10,
                          padding: 15,
                          width: 180,
                          alignItems: 'center',
                          borderWidth: 1.5,
                          borderColor: 'gray',
                          borderRadius: 12,
                          // backgroundColor:
                          //   category === 'Nike'
                          //     ? _colors.active
                          //     : _colors.inactive,
                        }}>
                        <ImageBackground
                          source={require('../assets/icons/highlighter.png')}
                          imageStyle={{
                            width: '32%',
                            height: 12,
                            marginTop: 8,
                            marginLeft: -4,
                            opacity: category === 'Nike' ? 0.6 : 0,
                            // alignSelf:'center'
                          }}
                          style={styles.highlighter}>
                          <Text style={{ color: '#36303F', fontWeight: '700' }}>
                            Nike
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          renderItem={({ item }) => (
            <>
              {category === item.brand ? (
                <View style={styles.itemContainer}>
                  <View style={styles.card}>
                    <Pressable
                      onPress={() => {
                        {
                          console.log(item.id);
                          //update selected products in the store
                          dispatch(
                            productsSlice.actions.setSelectedProducts(item.id),
                          );
                          navigation.navigate('ProductDetails');
                        }
                      }}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </Pressable>
                    <View style={styles.bottomContainer}>
                      <Pressable
                        onPress={() => {
                          {
                            //update selected products in the store
                            dispatch(
                              productsSlice.actions.setSelectedProducts(
                                item.id,
                              ),
                            );
                            navigation.navigate('Wishlist');
                          }
                        }}>
                        <Text style={styles.title}>{item.name}</Text>
                      </Pressable>

                      <Icon
                        icon={
                          wishlistedProducts
                            .map((item) => item.wishlistItem.id)
                            .includes(item.id)
                            ? 'WishlistFilled'
                            : 'Wishlist'
                        }
                        onPress={() => {
                          dispatch(
                            productsSlice.actions.setWishListedProducts(
                              item.id,
                            ),
                          );
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    // borderWidth:1,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 3,
    aspectRatio: 1, // to render it as a square so height will be calculated based on the aspect ration
  },
  itemContainer: {
    width: '50%',
    padding: 5,

    // marginBottom: 20,
  },
  container: {
    padding: 15,
  },
  card: {
    borderRadius: 18,
    padding: 7,
    marginVertical: 25,
    backgroundColor: '#fff',
    borderWidth: 0.45,
    // borderColor: '#e0e0e0',

    // elevation: 1,
    // shadowColor: '#000',
    // shadowRadius: 1,
    // shadowOffset: { height: 6, width: 6 },
    // shadowOpacity: 0.1,
  },
  title: {
    marginTop: 7,
    fontSize: 15,
    fontWeight: '600',
    // padding: 10,
    color: '#383838',
    // marginTop: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 20,
    padding: 5,
  },
});

export default HomeScreen;
