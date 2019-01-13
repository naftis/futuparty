import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goAuth } from '../../navigation';
import { logout } from '../../services/auth';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import sizes from '../../theme/sizes';
import store from './store';

function showModal(componentName) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: componentName,
            options: {
              topBar: {
                visible: false
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
    onPress: () => () => {
      // TODO
      alert('change photo');
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
    onPress: () => async () => {
      await logout();
      goAuth();
    }
  }
];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  // Drawer opening button cannot be toggled by RNN so
  // we need to store the information about it's open state
  componentDidAppear() {
    store.isDrawerOpen = true;
  }

  componentDidDisappear() {
    store.isDrawerOpen = false;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 20 }}>
          {SETTINGS_ITEMS.map(item => (
            <TouchableHighlight
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
            </TouchableHighlight>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  link: {
    padding: 22,
    margin: 10,
    marginTop: 0,
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
