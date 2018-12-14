import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { logout } from '../../auth';
import { goAuth } from '../../navigation';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';

const SETTINGS_ITEMS = [
  {
    text: 'Lisenssit',
    icon: icons.licenses,
    onPress: () => {}
  },
  {
    text: 'Käyttöehdot',
    icon: icons.tos,
    onPress: () => {}
  },
  {
    text: 'Yksityisyys',
    icon: icons.privacy,
    onPress: () => {}
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
  <View style={{ flex: 1 }}>
    {SETTINGS_ITEMS.map((item, i) => (
      <TouchableHighlight
        key={item.text}
        underlayColor="rgba(0, 0, 0, 0.1)"
        style={[styles.link, i === 0 ? { marginTop: 10 } : {}]}
        onPress={item.onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode="contain" source={item.icon} style={styles.icon} />
          <Text style={styles.linkText}>{item.text}</Text>
        </View>
      </TouchableHighlight>
    ))}
  </View>
);

const styles = StyleSheet.create({
  link: {
    padding: 8,
    margin: 10,
    marginTop: 0,
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center'
  },
  linkText: {
    fontFamily: fonts.default,
    fontSize: 16
  },
  icon: {
    marginRight: 10,
    width: 30,
    tintColor: '#000'
  }
});

export default Settings;
