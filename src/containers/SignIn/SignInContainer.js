import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import { initFetchUser } from '../../redux/modules/auth/actions';

class SignInContainer extends React.Component {
  static options = {
    topBar: {
      visible: false,
      drawBehind: true
    }
  };

  static propTypes = {
    fetchUser: PropTypes.func,
    error: PropTypes.any,
    user: PropTypes.any,
    code: PropTypes.string
  };

  render() {
    const { fetchUser, error, user, code } = this.props;
    return <SignIn onLogin={fetchUser} error={error} user={user} code={code} />;
  }
}

const mapStateToProps = state => {
  const { user, code, error } = state.auth;
  return { user, error, code };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: code => dispatch(initFetchUser(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
