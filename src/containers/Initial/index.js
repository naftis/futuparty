import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { goAuth, goHome } from '../../navigation';
import { isLoggedIn } from '../../auth';

export default class Initial extends React.Component {
  async componentDidMount() {
    const isAuthed = await isLoggedIn();

    if (isAuthed) {
      goHome();
    } else {
      goAuth();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Ladataan...</Text>
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
