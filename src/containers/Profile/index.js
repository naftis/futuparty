import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Profile from './Profile';
import icons from '../../theme/icons';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

const SIDEMENU_ID = 'sideMenu';

class ProfileContainer extends React.Component {
  static options = {
    topBar: {
      rightButtons: [
        {
          id: SIDEMENU_ID,
          icon: icons.burger,
          systemItem: 'done',
          color: '#000',
          disableColorTint: false
        }
      ],
      title: {
        fontFamily: fonts.monospaceBold,
        fontSize: sizes.TEXT_SMALL,
        alignment: 'fill'
      }
    }
  };

  componentDidMount() {
    const { user } = this.props;

    Navigation.mergeOptions(this.props.componentId, {
      topBar: { title: { text: user.name } }
    });
  }

  render() {
    const { picture } = this.props.user;
    return <Profile {...this.props} profileImageUrl={picture} />;
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(ProfileContainer);
