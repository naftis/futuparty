import React from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import luuppi from '../../../assets/luuppi.png';

class CommentTopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={luuppi} />
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
  image: {
    width: 120,
    height: 40,
    marginRight: 10,
    marginLeft: Platform.OS === 'ios' ? 10 : 0,
    overflow: 'hidden'
  }
});

export default CommentTopBar;
