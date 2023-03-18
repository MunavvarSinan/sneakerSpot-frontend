import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGerOrderQuery } from '../store/apiSlice';
import { FlatList } from 'react-native-gesture-handler';
import TrackOrderListItem from './TrackOrderList';

const TrackingOrderScreen = () => {
  const [ref, setRef] = useState('');
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setRef(searchText);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);
  const { data, isLoading, error } = useGerOrderQuery(ref);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }


  const handleSubmit = () => {
    setRef(searchText);
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder='Enter your order Reference Number or Tracking ID'
        onSubmitEditing={handleSubmit}
      />

      {ref && !data?.success && (
        <Text style={{ alignSelf: 'center', marginTop: 10 }}>
          No order found
        </Text>
      )}
      {data?.success && (
        <View>
          <Text style={{ alignSelf: 'center', marginTop: 10 }}>
            Order found
          </Text>
          <FlatList
            data={data?.order.map((item) => item.productId)}
            renderItem={({ item }) => <TrackOrderListItem orders={item} />}
            ListFooterComponent={({ item }) => (
              <View style={styles.totalContainer}>
                <View style={styles.row}>
                  <Text style={styles.textBold}>Price</Text>
                  <Text style={styles.textBold}>${data?.order[0].total}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Address</Text>
                  <Text style={styles.text}>{data?.order[0].address}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
      {ref === '' && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>
            Your cart is empty!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // marginTop: 15
    width: ' 100%',
    alignSelf: 'center',
  },
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
});

export default TrackingOrderScreen;
