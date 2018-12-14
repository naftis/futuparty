import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';

const PROGRAM_ITEMS = [
  {
    title: 'Avausmalja',
    time: '18.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  },
  {
    title: 'Avausmalja',
    time: '20.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  },
  {
    title: 'Avausmalja',
    time: '21.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  },
  {
    title: 'Avausmalja',
    time: '23.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  },
  {
    title: 'Avausmalja',
    time: '00.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  },
  {
    title: 'Lopetusmalja',
    time: '04.00',
    description: 'Nostetaan malja blah blah bla, blaa blaa TODO blah.'
  }
];

class Program extends React.Component {
  static get options() {
    return {
      topBar: { title: { text: 'Ohjelma' } }
    };
  }

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
    fontSize: 20,
    fontFamily: fonts.default
  },
  time: {
    marginBottom: 8,
    fontSize: 12,
    fontFamily: fonts.default
  },
  description: {
    fontSize: 14,
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
