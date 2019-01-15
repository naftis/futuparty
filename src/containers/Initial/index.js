import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { goAuth, goHome } from '../../navigation';
import { initFetchUser } from '../../redux/modules/auth/actions';
import { getCode } from '../../services/auth';
import sizes from '../../theme/sizes';

class Initial extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };

  async componentDidMount() {
    const { user, fetchUser } = this.props;
    const code = await getCode();

    if (!code) {
      goAuth();
      return;
    }

    if (!user) {
      await fetchUser(code);
      return;
    }

    goHome();
  }

  componentDidUpdate() {
    const { user } = this.props;

    if (user) {
      goHome();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Ladataan...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: sizes.TEXT_HUGE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: code => dispatch(initFetchUser(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initial);
