import PropTypes from 'prop-types';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { getProfileImageUrl } from '../../api';
import fonts from '../../theme/fonts';

class CommentTopBar extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      author: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { author } = this.props.item;

    return (
      <View style={styles.container}>
        <Image
          style={styles.profileImage}
          source={{ uri: getProfileImageUrl() }}
        />

        <Text style={styles.author}>{author}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: Platform.OS === 'ios' ? 10 : 0,
    overflow: 'hidden'
  },
  author: {
    fontFamily: fonts.monospace,
    fontWeight: 'bold'
  }
});

export default CommentTopBar;
