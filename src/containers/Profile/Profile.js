import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getProfileImageUrl } from '../../services/api';
import Pictures from './Pictures';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const SIDEMENU_ID = 'sideMenu';

class Profile extends React.Component {
  static propTypes = {
    componentId: PropTypes.string.isRequired
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
