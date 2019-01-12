import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import Item from '../Feed/Item';
import { Navigation } from 'react-native-navigation';
import { getUserFeed } from '../../services/api';
import colors from '../../theme/colors';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';

class Pictures extends React.Component {
  static propTypes = {
    componentId: PropTypes.string,
    header: PropTypes.node
  };

  state = {
    refreshing: true,
    items: []
  };

  async componentDidMount() {
    const items = await getUserFeed();

    this.setState({ items, refreshing: false });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const items = await getUserFeed();

    this.setState({ items, refreshing: false });
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
    const { header } = this.props;
    const { items, refreshing } = this.state;

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
      <FlatList
        ref={this.flatListRef}
        ListHeaderComponent={header}
        contentContainerStyle={styles.container}
        refreshControl={refreshControl}
        data={itemsWithKeys}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10
  }
});

export default Pictures;
