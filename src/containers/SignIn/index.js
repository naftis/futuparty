import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Animated
} from 'react-native';
import PropTypes from 'prop-types';

import luuppi from '../../../assets/luuppi.png';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import icons from '../../theme/icons';
import { login, isLoggedIn } from '../../auth';
import { goHome } from '../../navigation';

export default class SignIn extends React.Component {
  state = {
    text: '',
    errorAnim: new Animated.Value(0)
  };

  static propTypes = {
    componentId: PropTypes.string
  };

  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      }
    };
  }

  _shakeContainer = () => {
    const { errorAnim } = this.state;

    Animated.sequence([
      Animated.timing(errorAnim, {
        toValue: 30,
        duration: 80
      }),
      Animated.timing(errorAnim, {
        toValue: -30,
        duration: 80
      }),
      Animated.timing(errorAnim, {
        toValue: 0,
        duration: 80
      })
    ]).start();
  };

  _onPress = async () => {
    const { text } = this.state;

    if (text.length < 4) {
      this._shakeContainer();
      return;
    }

    await login('', text);

    if (isLoggedIn()) {
      goHome();
    } else {
      this._shakeContainer();
    }
  };

  render() {
    const { errorAnim } = this.state;

    return (
      <View style={styles.container}>
        <Image source={luuppi} style={styles.image} />
        <Animated.View
          style={[
            styles.inputContainer,
            { transform: [{ translateX: errorAnim }] }
          ]}
        >
          <TextInput
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Kutsukoodisi"
            placeholderTextColor="rgba(0,0,0,0.5)"
            style={styles.input}
            autoCapitalize="characters"
          />

          <TouchableHighlight
            underlayColor={colors.signInButtonSelected}
            onPress={this._onPress}
            style={styles.button}
            accessibilityLabel="Kirjaudu kutsukoodilla"
          >
            <Image source={icons.leftArrow} style={styles.arrowButton} />
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.default,
    fontSize: 16
  },
  image: {
    height: 100,
    width: 300,
    resizeMode: 'contain'
  },
  input: {
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontFamily: fonts.monospace,
    fontSize: 20
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    margin: 5,
    borderRadius: 5,
    width: 300,
    flexDirection: 'row',
    padding: 10
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: colors.signInButton,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowButton: {
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }]
  }
});
