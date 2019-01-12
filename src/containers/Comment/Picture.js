import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import colors from '../../theme/colors';

const Image = createImageProgress(FastImage);

class Picture extends React.Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    onPress: PropTypes.func
  };

  render() {
    const { uri } = this.props;

    const spinner = (
      <ActivityIndicator
        size="small"
        color={colors.refreshButtonTextSelected}
      />
    );

    return (
      <Image
        renderIndicator={() => spinner}
        source={{ uri }}
        style={styles.image}
      />
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width,
    height: width,
    resizeMode: 'cover'
  }
});

export default Picture;
