import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';

import { goAuth } from '../../navigation';
import { logout } from '../../services/auth';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import sizes from '../../theme/sizes';
import { updateProfileImage } from '../../services/api';

function showModal(componentName) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: componentName,
            options: {
              topBar: {
                visible: false,
                drawBehind: true
              }
            }
          }
        }
      ]
    }
  });
}

const SETTINGS_ITEMS = [
  {
    text: 'Vaihda profiilikuva',
    icon: icons.addPhoto,
    onPress: () => {
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
            uri: 'data:image/jpeg;base64,' + response.data
          };

          try {
            await updateProfileImage(imageSource);
          } catch (e) {
            this.setState({ sending: false });
          }
        }
      );
    }
  },
  {
    text: 'Lisenssit',
    icon: icons.licenses,
    onPress: () => showModal('License')
  },
  {
    text: 'Käyttöehdot',
    icon: icons.tos,
    onPress: () => showModal('Terms')
  },
  {
    text: 'Yksityisyys',
    icon: icons.privacy,
    onPress: () => showModal('Privacy')
  },
  {
    text: 'Kirjaudu ulos',
    icon: icons.logout,
    onPress: async () => {
      await logout();
      goAuth();
    }
  }
];

const Settings = () => (
  <SafeAreaView style={styles.container}>
    <View style={{ marginTop: 20 }}>
      {SETTINGS_ITEMS.map(item => (
        <TouchableOpacity
          key={item.text}
          underlayColor="rgba(0, 0, 0, 0.1)"
          style={styles.link}
          onPress={item.onPress}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.icon}
            />
            <Text style={styles.linkText}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  link: {
    height: Platform.OS === 'android' ? 50 : 0,
    margin: 10,
    padding: Platform.OS === 'android' ? 0 : 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center'
  },
  linkText: {
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_MEDIUM,
    height: 20
  },
  icon: {
    marginRight: 10,
    width: 30,
    tintColor: '#000'
  }
});

export default Settings;
