import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from SignIn screen.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
