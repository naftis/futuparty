import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';
import FastImage from 'react-native-fast-image';

import defaultProfileImage from '../../../assets/default-avatar1.jpg';

class CommentTopBar extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string
    }).isRequired
  };

  render() {
    const { name, picture } = this.props.item;

    const image = picture ? { uri: picture } : defaultProfileImage;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <FastImage style={styles.profileImage} source={image} />
        )}

        <Text style={styles.name}>{name}</Text>
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
    overflow: 'hidden',
    borderRadius: 6
  },
  name: {
    fontFamily: fonts.monospace,
    fontWeight: 'bold'
  }
});

export default CommentTopBar;
