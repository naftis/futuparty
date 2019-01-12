import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import icons from '../../theme/icons';
import fonts from '../../theme/fonts';

const SIDEMENU_ID = 'sideMenu';

class ProfileContainer extends React.Component {
  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: SIDEMENU_ID,
            // TODO: change corresponding icon
            icon: icons.privacy,
            color: '#000',
            disableColorTint: false
          }
        ],
        title: {
          text: 'TODO: Nimi',
          fontFamily: fonts.monospace,
          alignment: 'fill'
        }
      }
    };
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(ProfileContainer);
