import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { goAuth, goHome } from '../../navigation';

export default class Initial extends React.Component {
  async componentDidMount() {
    const isLoggedIn = true;

    if (!isLoggedIn) {
      goAuth();

      return;
    }

    goHome();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
