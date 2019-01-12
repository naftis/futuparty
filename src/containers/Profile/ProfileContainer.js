import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';

class ProfileContainer extends React.Component {
  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(ProfileContainer);
