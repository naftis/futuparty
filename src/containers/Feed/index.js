import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';

import colors from '../../theme/colors';
import { getFeed } from '../../api';

export default class Feed extends React.Component {
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
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            progressBackgroundColor={colors.refreshButton}
            colors={[
              colors.refreshButtonText,
              colors.refreshButtonTextSelected
            ]}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
