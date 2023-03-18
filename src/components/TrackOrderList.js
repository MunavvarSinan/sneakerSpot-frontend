import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { cartSlice } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { productsSlice } from '../store/ProductsSlice';
import { useNavigation } from '@react-navigation/native';

const TrackOrderListItem = ({ orders }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return orders.map((item) => (
    <Pressable
      style={styles.container}
      onPress={() => {
        {
          //update selected products in the store
          dispatch(productsSlice.actions.setSelectedProducts(item.id));
          navigation.navigate('ProductDetails', {
            id: item.id,
          });
        }
      }}>
      {/* we have managed to display the image and the text side by side by creating two view which one for image and rest for the right side part and adding flexdirection: 'row' so it will align the items in row */}
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.itemTotal}>${item.price}</Text>
        </View>
      </View>
    </Pressable>
  ));
  // orders.map((item) => (
  //   <View>
  //     <Text>{item.name}</Text>
  //     <Text>{item.price}</Text>

  //   </View>
  // ))
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

export default TrackOrderListItem;
