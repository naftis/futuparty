import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  RefreshControl,
  StyleSheet
} from 'react-native';

import colors from '../../theme/colors';
import icons from '../../theme/icons';
import { getFeed } from '../../api';
import Post from '../../components/Post';
import FloatingButton from '../../components/FloatingButton';

export default class Feed extends React.Component {
  state = {
    refreshing: false,
    showScrollTopButton: false,
    items: []
  };

  flatListRef = React.createRef();

  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: false
      },
      bottomTab: {
        icon: icons.chats
      }
    };
  }

  async componentDidMount() {
    const items = await getFeed();

    this.setState({ items });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    await getFeed();

    this.setState({ refreshing: false });
  };

  _onScroll = event => {
    const SHOW_SCROLLTOP_LIMIT = 300;
    const scrollTop = event.nativeEvent.contentOffset.y;
    const showScrollTopButton = scrollTop > SHOW_SCROLLTOP_LIMIT;

    if (this.state.showScrollTopButton !== showScrollTopButton) {
      this.setState({ showScrollTopButton });
    }
  };

  _scrollTop = () => {
    this.flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  _addPost = () => {};

  _renderItem = ({ item }) => (
    <Post
      key={`${item.key}`}
      imageUrl={item.imageUrl}
      text={item.text}
      time={item.time}
      author={item.name}
    />
  );

  render() {
    const { items, showScrollTopButton, refreshing } = this.state;

    if (items.length === 0) {
      return (
        <SafeAreaView style={styles.noPosts}>
          <Text>Ei viestejä!</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={this.flatListRef}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
              progressBackgroundColor={colors.refreshButton}
              colors={[
                colors.refreshButtonText,
                colors.refreshButtonTextSelected
              ]}
            />
          }
          data={items}
          renderItem={this._renderItem}
          onScroll={this._onScroll}
        />

        <FloatingButton
          isScrollTop={showScrollTopButton}
          scrollTop={this._scrollTop}
          addPost={this._addPost}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  noPosts: {
    alignItems: 'center'
  }
});
