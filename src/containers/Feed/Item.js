import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { addLike, removeLike } from '../../services/api';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import sizes from '../../theme/sizes';
import Picture from './Picture';
import defaultProfileImage from '../../../assets/default-avatar1.jpg';

function requiredPropsCheck(props, _, componentName) {
  if (!props.text && !props.image) {
    return new Error(
      `One of 'text' or 'image' is required by '${componentName}' component.`
    );
  }
}

class Item extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: requiredPropsCheck,
    image: requiredPropsCheck,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    onComment: PropTypes.func
  };

  state = {
    likes: this.props.likes,
    liked: this.props.liked
  };

  _onLikePress = async () => {
    const { id } = this.props;
    const { likes, liked } = this.state;

    if (!liked) {
      this.setState({ likes: likes + 1, liked: true });
      await addLike(id);
    } else {
      this.setState({ likes: likes - 1, liked: false });
      await removeLike(id);
    }
  };

  _renderIcons = () => {
    const { comments } = this.props;
    const { likes, liked } = this.state;
    const commentsCount = comments.length;

    return (
      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconPress} onPress={this._onLikePress}>
          <Image
            source={liked ? icons.likeSelected : icons.like}
            style={styles.icon}
          />
          <Text style={styles.iconText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconPress}
          onPress={this.props.onComment}
        >
          <Image
            source={icons.chat}
            style={[styles.icon, { marginRight: -4 }]}
          />
          <Text style={styles.iconText}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderText(text) {
    if (!text) {
      return null;
    }

    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }

  render() {
    const { text, image, time, name, onComment, picture } = this.props;

    const userPic = picture ? { uri: picture } : defaultProfileImage;

    const content = image ? (
      <View>
        <TouchableOpacity onPress={onComment}>
          <Picture uri={image} />
        </TouchableOpacity>
        {this._renderText(text)}
      </View>
    ) : (
      this._renderText(text)
    );

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <FastImage
            style={styles.profilePicture}
            source={userPic}
            resizeMode="cover"
          />

          <View>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        {content}

        {this._renderIcons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginTop: 5,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  profilePicture: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 6
  },
  username: {
    marginBottom: 3,
    fontFamily: fonts.monospace,
    fontWeight: 'bold',
    fontSize: sizes.TEXT_TINY,
    color: colors.author
  },
  time: {
    fontFamily: fonts.monospace,
    color: colors.feedItemSecondaryText,
    fontSize: sizes.TEXT_TINY
  },
  textContainer: {
    borderLeftColor: '#bbb',
    borderLeftWidth: 1,
    marginBottom: 10
  },
  text: {
    fontSize: sizes.TEXT_MEDIUM,
    fontFamily: fonts.monospace,
    color: colors.text,
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4
  },
  icons: {
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
    color: colors.feedItemSecondaryText,
    fontSize: sizes.TEXT_TINY
  }
});

export default Item;
