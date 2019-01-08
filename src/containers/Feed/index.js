import PropTypes from 'prop-types';
import React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { format } from 'timeago.js';
import { getFeed } from '../../services/api';
import colors from '../../theme/colors';
import icons from '../../theme/icons';
import fonts from '../../theme/fonts';
import FloatingButton from './FloatingButton';
import Item from './Item';
import Background from '../../components/Background';

class Feed extends React.Component {
  static get options() {
    return {
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
  }

  state = {
    refreshing: false,
    showScrollTopButton: false,
    items: []
  };

  static propTypes = {
    componentId: PropTypes.string
  };

  flatListRef = React.createRef();

  async componentDidMount() {
    const items = await getFeed();

    this.setState({ items });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const items = await getFeed();

    this.setState({ items, refreshing: false });
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

  _renderItem = ({ item }) => (
    <Item
      id={item.id}
      image={item.image}
      text={item.description}
      time={format(new Date(item.updated_at))}
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
      <View style={{ flex: 1 }}>
        <Background />

        <SafeAreaView style={{ flex: 1 }}>
          {items.length === 0 ? (
            <Text style={styles.noPostsText}>Ei viestejä!</Text>
          ) : (
            <FlatList
              ref={this.flatListRef}
              contentContainerStyle={styles.container}
              refreshControl={refreshControl}
              data={itemsWithKeys}
              renderItem={this._renderItem}
              onScroll={this._onScroll}
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
  container: {
    paddingBottom: 10
  }
});

export default Feed;
