import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isLoggedIn } from '../../auth';
import { goAuth, goHome } from '../../navigation';

class Initial extends React.Component {
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

export default Initial;
