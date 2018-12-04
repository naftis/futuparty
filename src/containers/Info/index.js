import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Linking
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PropTypes } from 'prop-types';

import calendar from '../../../assets/icons/calendar.png';
import food from '../../../assets/icons/fork.png';
import link from '../../../assets/icons/link.png';

const pages = [
  {
    component: 'Food',
    name: 'Ruokalista',
    icon: food
  },
  {
    component: 'Program',
    name: 'Ohjelma',
    icon: calendar
  },
  {
    component: 'https://luuppi50.fi',
    name: 'Luuppi50.fi',
    icon: link
  }
];

export default class Info extends React.Component {
  static propTypes = {
    componentId: PropTypes.string
  };

  _onPress = name => async () => {
    if (name.startsWith('http')) {
      Linking.openURL(name);
      return;
    }

    await Navigation.push(this.props.componentId, {
      component: {
        name,
        options: {
          topBar: {
            title: {
              text: name,
              color: '#000'
            }
          },
          preview: true
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {pages.map((item, i) => (
          <React.Fragment key={item.component}>
            {i > 0 && <View style={styles.separator} />}

            <View style={styles.opacityWrapper}>
              <TouchableOpacity
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'Food'
                    }
                  });
                }}
                activeOpacity={0.8}
                style={styles.item}
              >
                <Image style={styles.icon} source={item.icon} />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}

        <View style={styles.separator} />
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
    fontFamily: Platform.OS === 'ios' ? 'Iowan Old Style' : 'serif'
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
