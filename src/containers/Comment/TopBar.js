import PropTypes from 'prop-types';
import React from 'react';
import { getProfileImageUrl } from '../../services/api';
import { Platform, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';
import FastImage from 'react-native-fast-image';

class CommentTopBar extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { name } = this.props.item;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <FastImage
            style={styles.profileImage}
            source={{ uri: getProfileImageUrl() }}
          />
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
