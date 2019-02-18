import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';

import { updateProfileImage } from '../../services/api';
import Pictures from './Pictures';
import colors from '../../theme/colors';
import defaultProfileImage from '../../../assets/default-avatar1.jpg';

const SIDEMENU_ID = 'sideMenu';

class Profile extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    profileImageUrl: PropTypes.string
  };

  state = {
    updatingImage: false,
    updatedImage: undefined
  };

  isDrawerOpen = false;

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    Navigation.events().registerComponentDidAppearListener(
      ({ componentId }) => {
        if (componentId === 'settingsDrawer') {
          this.isDrawerOpen = true;
        }
      }
    );

    Navigation.events().registerComponentDidDisappearListener(
      ({ componentId }) => {
        if (componentId === 'settingsDrawer') {
          this.isDrawerOpen = false;
        }
      }
    );
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId !== SIDEMENU_ID) {
      return;
    }

    Navigation.mergeOptions('settingsDrawer', {
      sideMenu: {
        right: {
          visible: !this.isDrawerOpen
        }
      }
    });
  }

  _changeProfilePicture = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Valitse kuva',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          return;
        }

        const imageSource = {
          uri: response.uri
        };

        try {
          this.setState({ sending: true });
          await updateProfileImage(imageSource);
          this.setState({
            updatedImage: imageSource,
            sending: false
          });
        } catch (e) {
          this.setState({ sending: false });
        }
      }
    );
  };

  render() {
    const { componentId, profileImageUrl } = this.props;
    const { updatedImage, sending } = this.state;

    const userProfileImage = profileImageUrl
      ? { uri: profileImageUrl }
      : defaultProfileImage;

    const image = updatedImage || userProfileImage;

    const spinner = (
      <ActivityIndicator
        size="small"
        color={colors.refreshButtonTextSelected}
      />
    );

    return (
      <View style={styles.container}>
        <Pictures
          header={
            <TouchableOpacity
              onPress={this._changeProfilePicture}
              style={styles.imageContainer}
            >
              {sending ? (
                spinner
              ) : (
                <FastImage
                  style={styles.image}
                  resizeMode="cover"
                  source={image}
                />
              )}
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
    flex: 1,
    backgroundColor: colors.background
  },
  imageContainer: {
    height: 240
  },
  image: {
    flex: 1,
    marginBottom: -70
  },
  tabs: {
    flex: 1
  }
});

export default Profile;
