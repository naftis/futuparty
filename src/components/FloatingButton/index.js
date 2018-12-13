import React from 'react';
import {
  Animated,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../theme/colors';

class FloatingButton extends React.Component {
  static propTypes = {
    isScrollTop: PropTypes.bool,
    scrollTop: PropTypes.func,
    addPost: PropTypes.func
  };

  state = {
    lineAnim: new Animated.Value(0)
  };

  static getDerivedStateFromProps = props => {
    const { isScrollTop } = props;

    if (isScrollTop) {
      return {
        lineAnim: new Animated.Value(1)
      };
    } else {
      return {
        lineAnim: new Animated.Value(0)
      };
    }
  };

  _animateLines = () => {
    const { isScrollTop } = this.props;
    const { lineAnim } = this.state;

    Animated.timing(lineAnim, {
      toValue: isScrollTop ? 0 : 1,
      easing: Easing.ease,
      duration: 200
    }).start();
  };

  _onPress = () => {
    const { isScrollTop, scrollTop, addPost } = this.props;

    if (isScrollTop) {
      scrollTop();
    } else {
      addPost();
    }
  };

  render() {
    const { lineAnim } = this.state;

    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const lineWrapperAnimation = {
      transform: [
        {
          translateY: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -3]
          })
        }
      ]
    };

    const lineAnimation = {
      transform: [
        {
          rotate: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-45deg']
          })
        },
        {
          scaleX: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.66]
          })
        },
        {
          translateX: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -7]
          })
        }
      ]
    };

    const line2Animation = {
      transform: [
        {
          rotate: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '45deg']
          })
        },
        {
          scaleX: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.66]
          })
        },
        {
          translateX: lineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 7]
          })
        }
      ]
    };

    return (
      <View style={styles.shadow}>
        <View style={styles.wrapper}>
          <Touchable
            onPress={this._onPress}
            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.5)')}
            style={{
              flex: 1
            }}
          >
            <Animated.View style={[styles.lineWrapper, lineWrapperAnimation]}>
              <Animated.View style={[styles.line, lineAnimation]} />
              <Animated.View
                style={[styles.line, styles.line2, line2Animation]}
              />
            </Animated.View>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Button */
  wrapper: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.signInButton,
    width: 50,
    height: 50,

    elevation: 3
  },
  shadow: {
    position: 'absolute',
    bottom: 20,
    right: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.8
  },
  /* Animations */
  lineWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  line: {
    borderRadius: 2,
    width: 15,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    top: 24
  }
});

export default FloatingButton;
