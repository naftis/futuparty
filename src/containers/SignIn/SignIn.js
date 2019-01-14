import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { getCode } from '../../services/auth';

import luuppi from '../../../assets/luuppi.png';
import { goHome } from '../../navigation';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import sizes from '../../theme/sizes';

class SignIn extends React.Component {
  state = {
    text: '',
    errorAnim: new Animated.Value(0)
  };

  static propTypes = {
    componentId: PropTypes.string,
    onLogin: PropTypes.func,
    error: PropTypes.any,
    user: PropTypes.any,
    code: PropTypes.string
  };

  async componentDidUpdate(prevProps) {
    const { error, user } = this.props;
    const prevError = prevProps.error;
    const code = await getCode();

    if (!prevError && error) {
      this._shakeContainer();
    }

    if (user && code) {
      goHome();
    }
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
    const { onLogin } = this.props;

    if (text.length < 4) {
      this._shakeContainer();
      return;
    }

    await onLogin(text);
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
            style={styles.input}
            autoCapitalize="characters"
          />

          <TouchableHighlight
            underlayColor={colors.buttonSelected}
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
    fontSize: sizes.TEXT_MEDIUM
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
    fontSize: sizes.TEXT_LARGE
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
    backgroundColor: colors.button,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowButton: {
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }]
  }
});

export default SignIn;
