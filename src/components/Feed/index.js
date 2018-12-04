import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import { getFeed } from '../../api';

class RefreshableList extends React.Component {
  state = {
    refreshing: false
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    await getFeed();

    this.setState({ refreshing: false });
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      />
    );
  }
}

export default RefreshableList;
