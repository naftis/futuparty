import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view-universal';
import { getProfileImageUrl } from '../../api';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import Pictures from './Pictures';
import Settings from './Settings';

class Profile extends React.Component {
  state = {
    selectedTab: 0
  };

  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      },
      bottomTab: {
        icon: icons.user
      }
    };
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
        <View style={styles.tabs}>
          <ScrollableTabView
            tabBarTextStyle={{ fontFamily: fonts.default, fontSize: 16 }}
            tabBarUnderlineStyle={{
              backgroundColor: colors.profileTabBarSelected
            }}
            tabBarActiveTextColor={colors.profileTabBarSelected}
          >
            <Pictures tabLabel="Kuvat" />
            <Settings tabLabel="Asetukset" />
          </ScrollableTabView>
        </View>
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
    fontSize: 26,
    margin: 8
  },
  tabs: {
    flex: 1
  }
});

export default Profile;
