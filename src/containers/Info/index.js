import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';

import fonts from '../../theme/fonts';
import icons from '../../theme/icons';

const pages = [
  {
    component: 'Food',
    name: 'Ruokalista',
    icon: icons.food
  },
  {
    component: 'Program',
    name: 'Ohjelma',
    icon: icons.calendar
  },
  {
    component: 'https://luuppi50.fi',
    name: 'Luuppi50.fi',
    icon: icons.link
  }
];

export default class Info extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: false
      },
      bottomTab: {
        icon: icons.info
      }
    };
  }

  static propTypes = {
    componentId: PropTypes.string
  };

  _onPress = name => {
    if (name.startsWith('http')) {
      Linking.openURL(name);
      return;
    }

    Navigation.push(this.props.componentId, { component: { name } });
  };

  render() {
    return (
      <View style={styles.container}>
        {pages.map((item, i) => (
          <React.Fragment key={item.component}>
            {i > 0 && <View style={styles.separator} />}

            <View style={styles.opacityWrapper}>
              <TouchableOpacity
                onPress={() => this._onPress(item.component)}
                activeOpacity={0.8}
                style={styles.item}
              >
                <Image style={styles.icon} source={item.icon} />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.default
  },
  opacityWrapper: {
    borderRadius: 4,
    margin: 8,
    flex: 1,
    backgroundColor: '#000'
  },
  icon: {
    marginBottom: 16,
    tintColor: '#000'
  },
  separator: {
    marginLeft: 20,
    marginRight: 20,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
});
