import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import {
  State,
  Directions,
  FlingGestureHandler,
} from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from './Icon';
import { productsSlice } from '../store/ProductsSlice';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// https://www.creative-flyers.com/templates/hip-hop-flyer-psd/

const OVERFLOW_HEIGHT = 70;
const SPACING = 12.5; // change spacing to adjust card location on screen
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

// const OverflowItems = ({ scrollX, data }) => {
//   const translateY = scrollX.interpolate({
//     inputRange: [-1, 0, 1],
//     outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
//   });
//   return (
//     <View style={{ height: OVERFLOW_HEIGHT, overflow: 'hidden' }}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         {data.map((item, index) => {
//           return (
//             <Animated.View key={index} style={styles.itemContainer}>
//               <Text style={[styles.title]} numberOfLines={1}>
//                 {item.name}
//               </Text>
//               {/* <View style={styles.itemContainerRow}>
//                 <Text style={[styles.location]}>
//                   <EvilIcons
//                     name='location'
//                     size={16}
//                     color='black'
//                     style={{ marginRight: 5 }}
//                   />
//                   {item.location}
//                 </Text>
//                 <Text style={[styles.date]}>{item.date}</Text>
//               </View> */}
//             </Animated.View>
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

const CardCarousel = ({ products, randArray, itId }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [scrollIndex, setScrollIndex] = React.useState(0);
  const [id, setId] = React.useState('');
  // const [rand, setRand] = React.useState([]);
  const [itemId, setItemId] = React.useState(itId);
  // const [rand, setRand] = React.useState([]);
  const featuredProducts = [];

  const setAnimatedIndex = React.useCallback((i) => {
    setScrollIndex(i);
    scrollX.setValue(i);
  }, []);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(productsSlice.actions.setWishListedProducts(id));
    }
  }, [id]);

  // interconnected animations aka reactive animations :D
  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });
  // const products = useSelector((state) => state.products.products);

  // const selectRandomProduct = React.useCallback(() => {
  //   const randArray = [];
  //   while (randArray.length < 10) {
  //     const r = Math.floor(Math.random() * products.length);
  //     if (randArray.indexOf(r) === -1) {
  //       randArray.push(r);
  //     }
  //   }
  //   setRand(randArray);
  //   setItemId(randArray[0]);
  // }, [products]);

  // React.useEffect(() => {
  //   selectRandomProduct();
  // }, []);

  randArray.map((item) => {
    const prod = products.find((p) => p.id === item.toString());
    if (prod) {
      featuredProducts.push(prod);
    }
  });

  const wishlistedProducts = useSelector(
    (state) => state.products.wishListedProducts,
  );
  const navigation = useNavigation();
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (scrollIndex === featuredProducts.length - 1) {
            // setAnimatedIndex(0)

            return;
          }

          setAnimatedIndex(scrollIndex + 1);
          setItemId(randArray[scrollIndex + 1]);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (scrollIndex === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(scrollIndex - 1);
            setItemId(randArray[scrollIndex - 1]);
          }
        }}>
        <SafeAreaView style={styles.container}>
          {/* <StatusBar hidden /> */}
          {/* <OverflowItems scrollX={scrollXAnimated} data={products} /> */}
          {/* {children} */}
          <FlatList
            data={featuredProducts}
            keyExtractor={(item, index) => item.id || scrollIndex}
            //   keyExtractor={(_, index) => {
            //     String(index);
            //   }}

            scrollEnabled={true}
            inverted
            //   horizontal
            initialNumToRender={featuredProducts.length}
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',

              // marginTop: 110,
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,

                // I want each item to have a higher zIndex than the previous one,
                // in reversed order due to the FlatList being inverted
                {
                  zIndex: featuredProducts.length - index,
                  backgroundColor: 'blue',
                },
              ];

              // OverflowableView for Android...
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              // const [id, setId] = React.useState(null);
              // console.log(index);

              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    width: ITEM_WIDTH,
                    top: -ITEM_HEIGHT / 2 + 95,
                    borderRadius: 10,
                    overflow: 'hidden',
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}>
                  {/* <Image
                  source={{ uri: item.poster }}
                  style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                /> */}
                  <View style={styles.card}>
                    <Pressable
                      onPress={() => {
                        {
                          // console.log(scrollIndex);
                          //update selected products in the store
                          // dispatch(
                          //   productsSlice.actions.setSelectedProducts(
                          //     itemId.toString(),
                          //   ),
                          // );
                          navigation.navigate('ProductDetails', {
                            id: itemId.toString(),
                          });
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
                            // dispatch(
                            //   productsSlice.actions.setSelectedProducts(
                            //     itemId.toString(),
                            //   ),
                            // );
                            navigation.navigate('ProductDetails', {
                              id: itemId.toString(),
                            });
                          }
                        }}>
                        <Text style={styles.title}>{item.name}</Text>
                      </Pressable>

                      <Icon
                        icon={
                          wishlistedProducts
                            .map((prod) => prod.wishlistItem.id)
                            .includes(item.id)
                            ? 'WishlistFilled'
                            : 'Wishlist'
                        }
                        onPress={() => {
                          setId(item.id);
                        }}
                      />
                    </View>
                  </View>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: '100%',
    height: 450,
    // marginTop: 100,
  },
  //   location: {
  //     fontSize: 16,
  //   },
  //   date: {
  //     fontSize: 12,
  //   },
  //   itemContainer: {
  //     height: OVERFLOW_HEIGHT,
  //     padding: SPACING,
  //   },
  //   itemContainerRow: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },

  image: {
    width: '100%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 18,
    marginTop: 13,
    // borderWidth:1,
    aspectRatio: 1, // to render it as a square so height will be calculated based on the aspect ration
  },

  card: {
    borderRadius: 25,
    // backgroundColor: 'red',
    paddin: 10,
    // marginVertical: 25,
    backgroundColor: '#fff',
    borderWidth: 0.9,
    // borderColor: '#e0e0e0',
    borderColor: 'gray',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: -1,
    // padding: 10,
    color: '#383838',
    // marginTop: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    marginTop: -10,
  },
});

export default React.memo(CardCarousel);
