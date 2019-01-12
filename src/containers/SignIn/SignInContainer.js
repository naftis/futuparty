import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import { initFetchUser } from '../../redux/modules/auth/actions';

class SignInContainer extends React.Component {
  render() {
    return <SignIn {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUser: () => dispatch(initFetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
