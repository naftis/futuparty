import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getProfileImageUrl } from '../../services/api';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';
import Pictures from './Pictures';

const SIDEMENU_ID = 'sideMenu';

class Profile extends React.Component {
  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: SIDEMENU_ID,
            component: {
              name: 'Burger'
            }
          }
        ]
      }
    };
  }

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            blurRadius={10}
            source={{ uri: getProfileImageUrl() }}
          />
        </View>

        <Text style={styles.name}>Pyry Rouvila</Text>

        <Pictures />
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
    flex: 1
  },
  name: {
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_HUGE,
    margin: 8
  },
  tabs: {
    flex: 1
  }
});

export default Profile;
