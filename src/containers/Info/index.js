import { PropTypes } from 'prop-types';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import icons from '../../theme/icons';
import Panel from './Panel';

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

class Info extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      },
      bottomTab: {
        icon: icons.info
      }
    };
  }

  static propTypes = {
    componentId: PropTypes.string
  };

  _onPress = name => () => {
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

            <Panel
              icon={item.icon}
              name={item.name}
              onPress={this._onPress(item.component)}
            />
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
  separator: {
    marginLeft: 20,
    marginRight: 20,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
});

export default Info;
