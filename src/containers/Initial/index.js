import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isLoggedIn } from '../../services/auth';
import { goAuth, goHome } from '../../navigation';
import sizes from '../../theme/sizes';

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
    fontSize: sizes.TEXT_HUGE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Initial;
