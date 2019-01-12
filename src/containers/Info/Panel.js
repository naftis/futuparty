import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

const Panel = ({ icon, name, onPress }) => (
  <View style={styles.opacityWrapper}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.item}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  </View>
);

Panel.propTypes = {
  icon: PropTypes.number,
  name: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  opacityWrapper: {
    borderRadius: 4,
    margin: 8,
    flex: 1,
    backgroundColor: '#000'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  icon: {
    marginBottom: 16,
    tintColor: '#000'
  },
  text: {
    fontSize: sizes.TEXT_LARGE,
    fontFamily: fonts.default
  }
});

export default Panel;
