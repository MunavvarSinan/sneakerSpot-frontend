import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import icons from '../constants/icons';

export const Icon = ({
  onPress,
  icon,
  containerStyle,
  viewStyle,
  style,
  size = 32,
}) => {
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
