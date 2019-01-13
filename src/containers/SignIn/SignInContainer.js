import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import { initFetchUser } from '../../redux/modules/auth/actions';

class SignInContainer extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      }
    };
  }

  static propTypes = {
    fetchUser: PropTypes.func,
    error: PropTypes.any,
    user: PropTypes.any
  };

  render() {
    const { fetchUser, error, user } = this.props;
    return <SignIn onLogin={fetchUser} error={error} user={user} />;
  }
}

const mapStateToProps = state => {
  const { user, error } = state.auth;
  return { user, error };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUser: code => dispatch(initFetchUser(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
