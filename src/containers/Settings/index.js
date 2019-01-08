import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView
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

class Settings extends React.Component {
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
    fontSize: 16,
    height: 20
  },
  icon: {
    marginRight: 10,
    width: 30,
    tintColor: '#000'
  }
});

export default Settings;
