import React from 'react';
import { Dimensions, Image } from 'react-native';
import pattern from '../../../assets/Logo-pattern.png';

const { height, width } = Dimensions.get('window');

const Background = () => (
  <Image
    source={pattern}
    resizeMode="repeat"
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.3,
      zIndex: 0,
      minWidth: width,
      minHeight: height
    }}
  />
);

export default Background;
