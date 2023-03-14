import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import icons from '../constants/icons';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

export const Icon = ({
  onPress,
  icon,
  containerStyle,
  viewStyle,
  style,
  size = 32,
}) => {
  const itemsCount = useSelector((state) => state.cart.items.length);
  const image = (
    <View style={viewStyle}>
      <Image
        source={icons[icon]}
        style={[
          { width: size, height: size, resizeMode: 'cover' },
          style,
          !icon ? { width: 45, height: 30 } : { width: size },
        ]}
      />
      
      {icon === 'Cart' && <Text style={styles.itemQuantity}>{itemsCount}</Text>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        {image}
      </TouchableOpacity>
    );
  }
  return <View style={containerStyle}>{image}</View>;
};

const styles = StyleSheet.create({
  itemQuantity: {
    marginLeft: 5,
    fontWeight: '500',
    marginTop: 5,
    width: 15,
    height: 20,
  },
});
