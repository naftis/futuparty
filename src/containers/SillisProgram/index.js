import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

const PROGRAM_ITEMS = [
  {
    title: 'Bussit lähtevät Tampere-talolta',
    time: '12.00'
  },
  {
    title: 'Bussit lähtevät jatkoille',
    time: '19.00'
  },
  {
    title: 'Silliksen jatkot',
    time: '19.30'
  }
];

class Program extends React.Component {
  static options = {
    topBar: {
      title: {
        fontFamily: fonts.monospaceBold,
        fontSize: sizes.TEXT_SMALL,
        text: 'Ohjelma'
      }
    }
  };

  render() {
    const items = PROGRAM_ITEMS.map((item, key) => {
      const isEven = key % 2 === 0;

      return (
        <View
          key={`${item.title}${key}`}
          style={[styles.item, isEven ? styles.backgroundWhite : {}]}
        >
          <Text style={[styles.heading, isEven ? {} : styles.white]}>
            {item.title}
          </Text>
          <Text style={[styles.time, isEven ? {} : styles.white]}>
            {item.time}
          </Text>
          <Text style={[styles.description, isEven ? {} : styles.white]}>
            {item.description}
          </Text>
          <View
            style={[styles.separator, isEven ? {} : styles.backgroundWhite]}
          />
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {items}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  /* Modifiers */
  white: {
    color: '#fff'
  },
  backgroundWhite: {
    backgroundColor: '#fff'
  },

  /* Components */
  item: {
    backgroundColor: '#212121',
    padding: 16
  },
  heading: {
    fontSize: sizes.TEXT_LARGE,
    fontFamily: fonts.default
  },
  time: {
    marginBottom: 8,
    fontSize: sizes.TEXT_TINY,
    fontFamily: fonts.default
  },
  description: {
    fontSize: sizes.TEXT_SMALL,
    fontFamily: fonts.default,
    marginBottom: 16
  },
  separator: {
    backgroundColor: '#000',
    height: 2,
    width: 64
  }
});

export default Program;
