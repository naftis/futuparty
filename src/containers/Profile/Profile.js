import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';
import { getProfileImageUrl } from '../../services/api';
import Pictures from './Pictures';
import colors from '../../theme/colors';

const SIDEMENU_ID = 'sideMenu';

class Profile extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired
  };

  state = {
    profileImageSource: undefined
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

  async componentDidMount() {
    const profileImageUrl = await getProfileImageUrl();

    this.setState({
      profileImageSource: { uri: profileImageUrl }
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
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          return;
        }

        const imageSource = {
          uri: 'data:image/jpeg;base64,' + response.data
        };

        // TODO: Send profile pic to server
        this.setState({ profileImageSource: imageSource });
      }
    );
  };

  render() {
    const { componentId } = this.props;
    const { profileImageSource } = this.state;

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
                source={profileImageSource}
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
