import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import icons from '../../theme/icons';

const requiredPropsCheck = (props, _, componentName) => {
  if (!props.text && !props.imageUrl) {
    return new Error(
      `One of 'text' or 'imageUrl' is required by '${componentName}' component.`
    );
  }
};

export default class Post extends React.Component {
  static propTypes = {
    text: requiredPropsCheck,
    imageUrl: requiredPropsCheck,
    time: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  };

  _renderImage = () => {
    const { imageUrl } = this.props;

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    );
  };

  /*
   * Renders like & comment buttons
   */
  _renderIcons = () => (
    <View style={styles.icons}>
      <TouchableOpacity style={styles.iconPress} onPress={() => {}}>
        <Image source={icons.like} style={styles.icon} />
        <Text style={styles.iconText}>0</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconPress} onPress={() => {}}>
        <Image source={icons.chat} style={[styles.icon, { marginRight: -4 }]} />
        <Text style={styles.iconText}>0</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { text, imageUrl, time, author } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            style={styles.profilePicture}
            source={{ uri: 'https://placeimg.com/640/480/nature' }}
          />

          <Text style={styles.username}>{author}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        {imageUrl ? (
          this._renderImage()
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}

        {this._renderIcons()}
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.postBorderBottom
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePicture: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
    resizeMode: 'cover'
  },
  username: {
    fontFamily: fonts.monospace,
    fontWeight: '500',
    marginRight: 10
  },
  dot: {
    marginRight: 10
  },
  time: {
    fontFamily: fonts.monospace,
    color: colors.postSecondaryText
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10
  },
  image: {
    width: width - 44,
    height: width - 44,
    resizeMode: 'cover'
  },
  text: {
    paddingLeft: 50,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: fonts.monospace
  },
  icons: {
    paddingLeft: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconPress: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 5,
    tintColor: colors.postSecondaryText,
    height: 15,
    resizeMode: 'contain'
  },
  iconText: {
    fontFamily: fonts.monospace,
    color: colors.postSecondaryText
  }
});
