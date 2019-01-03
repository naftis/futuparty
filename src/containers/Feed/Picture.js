import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
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
      <View style={styles.imageContainer}>
        <Image
          renderIndicator={() => spinner}
          source={{ uri }}
          style={styles.image}
        />
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 44 + 10,
    height: width - 44 + 20
  },
  image: {
    width: width - 44,
    height: width - 44,
    resizeMode: 'cover'
  }
});

export default Picture;
