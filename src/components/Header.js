import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title = '', iconLeft, iconRight }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top + 3 }]}>
      <Icon
        icon='Wishlist'
        onPress={() => navigation.navigate('WishlistScreen')}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {title ? title : null}
      </Text>
      <Icon
        icon='Cart'
        onPress={() => navigation.navigate('ShoppingCart')}
        viewStyle={styles.direction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 24,
  },
  direction: {
    flexDirection: 'row',
  },
});
export default Header;
