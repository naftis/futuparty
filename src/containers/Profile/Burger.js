import React from 'react';
import { View, StyleSheet } from 'react-native';

const Burger = () => (
  <View>
    <View style={styles.line} />
    <View style={styles.line} />
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  line: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#000',
    marginTop: 2,
    marginBottom: 2
  }
});

export default Burger;
