import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { getProfileImageUrl } from '../../api';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';

function requiredPropsCheck(props, _, componentName) {
  if (!props.text && !props.imageUrl) {
    return new Error(
      `One of 'text' or 'imageUrl' is required by '${componentName}' component.`
    );
  }
}

class Item extends React.Component {
  static propTypes = {
    text: requiredPropsCheck,
    imageUrl: requiredPropsCheck,
    time: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    onComment: PropTypes.func
  };

  _renderImage = () => {
    const { imageUrl } = this.props;

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    );
  };

  _renderIcons = () => (
    <View style={styles.icons}>
      <TouchableOpacity style={styles.iconPress} onPress={() => {}}>
        <Image source={icons.like} style={styles.icon} />
        <Text style={styles.iconText}>0</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconPress} onPress={this.props.onComment}>
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
            source={{ uri: getProfileImageUrl() }}
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
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: -6
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
    marginRight: 10,
    fontFamily: fonts.monospace,
    fontWeight: '500',
    color: colors.author
  },
  dot: {
    marginRight: 10
  },
  time: {
    fontFamily: fonts.monospace,
    color: colors.feedItemSecondaryText
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
    fontFamily: fonts.monospace,
    color: colors.text
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
    tintColor: colors.feedItemSecondaryText,
    height: 15,
    resizeMode: 'contain'
  },
  iconText: {
    fontFamily: fonts.monospace,
    color: colors.feedItemSecondaryText
  }
});

export default Item;
