import PropTypes from 'prop-types';
import React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { format } from 'timeago.js';
import { getFeed } from '../../services/api';
import colors from '../../theme/colors';
import icons from '../../theme/icons';
import fonts from '../../theme/fonts';
import FloatingButton from './FloatingButton';
import Item from './Item';

const ITEMS_PER_VIEW = 20;

class Feed extends React.Component {
  static options = {
    topBar: {
      visible: true,
      title: {
        component: {
          name: 'FeedTopBar',
          alignment: 'fill'
        }
      }
    },
    bottomTab: {
      icon: icons.chats
    }
  };

  state = {
    refreshing: true,
    showScrollTopButton: false,
    allItems: [],
    items: []
  };

  static propTypes = {
    componentId: PropTypes.string
  };

  flatListRef = React.createRef();

  async componentDidMount() {
    const allItems = await getFeed();
    const items = allItems.slice(0, ITEMS_PER_VIEW);

    this.setState({ allItems, items, refreshing: false });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const allItems = await getFeed();
    const items = allItems.slice(0, ITEMS_PER_VIEW);

    this.setState({ allItems, items, refreshing: false });
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
    if (this.flatListRef && this.flatListRef.current) {
      this.flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  _addPost = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Post',
        passProps: {
          onPostSuccess: this._onRefresh
        }
      }
    });
  };

  _onPressComment = item => () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Comment',
        passProps: {
          item
        },
        options: {
          topBar: {
            title: {
              component: {
                passProps: {
                  item
                }
              }
            }
          }
        }
      }
    });
  };

  _onEndReached = () => {
    const { allItems, items } = this.state;

    const isMoreItems = allItems.length > items.length;

    if (!isMoreItems) {
      return;
    }

    const newItems = allItems.slice(0, items.length + ITEMS_PER_VIEW);

    this.setState({ items: newItems });
  };

  _renderItem = ({ item }) => (
    <Item
      id={item.id}
      image={item.image}
      picture={item.picture}
      text={item.description}
      time={format(new Date(item.updated_at), 'fi_FI')}
      name={item.name}
      likes={parseInt(item.likes)}
      liked={item.liked}
      comments={item.comments}
      onComment={this._onPressComment(item)}
    />
  );

  render() {
    const { items, showScrollTopButton, refreshing } = this.state;

    const itemsWithKeys = items.map(item => ({
      key: item.id,
      ...item
    }));

    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this._onRefresh}
        progressBackgroundColor={colors.refreshButton}
        colors={[colors.refreshButtonText, colors.refreshButtonTextSelected]}
      />
    );

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={{ flex: 1 }}>
          {items.length === 0 ? (
            <View>
              {refreshing ? (
                <ActivityIndicator
                  size="large"
                  color={colors.refreshButtonTextSelected}
                  style={styles.noPostsSpinner}
                />
              ) : (
                <Text style={styles.noPostsText}>Ei viestejä!</Text>
              )}
            </View>
          ) : (
            <FlatList
              ref={this.flatListRef}
              contentContainerStyle={styles.container}
              refreshControl={refreshControl}
              data={itemsWithKeys}
              renderItem={this._renderItem}
              onScroll={this._onScroll}
              onEndReachedThreshold={0.5}
              onEndReached={this._onEndReached}
            />
          )}

          <FloatingButton
            isScrollTop={showScrollTopButton}
            scrollTop={this._scrollTop}
            addPost={this._addPost}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noPosts: {
    alignItems: 'center',
    marginTop: 20
  },
  noPostsText: {
    marginTop: 50,
    alignSelf: 'center',
    fontFamily: fonts.monospace
  },
  noPostsSpinner: {
    marginTop: 50
  },
  container: {
    paddingBottom: 10
  }
});

export default Feed;
