import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import icons from '../theme/icons';

class ModalBackButton extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  _onPress = () => Navigation.dismissAllModals();

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer} onPress={this._onPress}>
          <Image style={styles.icon} source={icons.leftArrow} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 12,
    marginTop: 10
  },
  iconContainer: {
    position: 'absolute',
    paddingTop: Platform.OS === 'android' ? 2 : undefined // Minor styling effect
  },
  icon: {
    tintColor: colors.text,
    marginLeft: 12
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: fonts.monospace,
    fontWeight: 'bold'
  }
});

export default ModalBackButton;
