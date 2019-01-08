import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getProfileImageUrl } from '../../services/api';
import Pictures from './Pictures';
import PropTypes from 'prop-types';
import icons from '../../theme/icons';
import fonts from '../../theme/fonts';
import FastImage from 'react-native-fast-image';
import store from '../Settings/store';

const SIDEMENU_ID = 'sideMenu';

class Profile extends React.Component {
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

  static propTypes = {
    componentId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId !== SIDEMENU_ID) {
      return;
    }

    Navigation.mergeOptions('settingsDrawer', {
      sideMenu: {
        right: {
          visible: !store.isDrawerOpen
        }
      }
    });
  }

  _changeProfilePicture() {
    alert('TODO: Change profile picture');
  }

  render() {
    const { componentId } = this.props;

    return (
      <View style={styles.container}>
        <Pictures
          header={
            <TouchableOpacity
              onPress={this._changeProfilePicture}
              style={styles.imageContainer}
            >
              <FastImage
                style={styles.image}
                resizeMode="cover"
                source={{ uri: getProfileImageUrl() }}
              />
            </TouchableOpacity>
          }
          componentId={componentId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    height: 240
  },
  image: {
    flex: 1,
    marginBottom: -65
  },
  tabs: {
    flex: 1
  }
});

export default Profile;
