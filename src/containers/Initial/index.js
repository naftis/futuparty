import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { goAuth, goHome } from '../../navigation';
import { initFetchUser } from '../../redux/modules/auth/actions';
import { getCode } from '../../services/auth';
import sizes from '../../theme/sizes';
import luuppi from '../../../assets/luuppi.png';
import futurice from '../../../assets/futurice.png';

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
        <Image source={luuppi} style={styles.image} />

        <Image resizeMode="contain" source={futurice} style={styles.futurice} />
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  welcome: {
    fontSize: sizes.TEXT_HUGE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 100,
    width: 300,
    resizeMode: 'contain'
  },
  futurice: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    width: width / 4,
    opacity: 0.4
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
