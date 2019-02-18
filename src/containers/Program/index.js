import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

const PROGRAM_ITEMS = [
  {
    title: 'Paja Kongressi aukeaa',
    time: '17.00',
    description: 'Paikalle voi saapua'
  },
  {
    title: 'Vuosijuhlat alkavat',
    time: '18.00',
    description: 'Liput saapuvat, alkupuhe'
  },
  {
    title: 'Luuppi ry:n puheenjohtajan puhe',
    description: 'Kari Kuukka'
  },
  {
    title: 'Yhteistyökumppanin puhe',
    description: 'Gofore Oyj'
  },
  {
    title: 'Alkuruoka',
    description: 'Tarjoilun löydät "Ruokalista" -sivulta'
  },
  {
    title: 'Puhe menneiltä vuosilta',
    description: 'Terttu Pulkkinen'
  },
  {
    title: 'Tauko'
  },
  {
    title: 'Puhe menneiltä vuosilta',
    description: 'Jyrki Nummenmaa'
  },
  {
    title: 'Pääruoka'
  },
  {
    title: 'Kunniamaininnat'
  },
  {
    title: 'Tauko'
  },
  {
    title: 'Puhe menneiltä vuosilta',
    description: 'Marja Ahonen'
  },
  {
    title: 'Jälkiruoka'
  },
  {
    title: 'Puhe naiselle',
    description: 'Ykä Lähteenmäki'
  },
  {
    title: 'Puhe miehelle',
    description: 'Marjaana Isokallio'
  },
  {
    title: 'Liput poistuvat'
  },
  {
    title: 'Bändi',
    description: 'Tanssittamassa TavastFunk'
  },
  {
    title: 'Kuljetukset jatkoille alkavat',
    time: '23:00'
  },
  {
    title: 'Kuljetukset jatkojen jatkoille',
    time: '03:00'
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
          <View style={styles.titleContainer}>
            <Text style={[styles.heading, isEven ? {} : styles.white]}>
              {item.title}
            </Text>
            {item.time && (
              <Text style={[styles.time, isEven ? {} : styles.white]}>
                {item.time}
              </Text>
            )}
          </View>
          {item.description && (
            <Text style={[styles.description, isEven ? {} : styles.white]}>
              {item.description}
            </Text>
          )}
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: sizes.TEXT_LARGE,
    fontFamily: fonts.default
  },
  time: {
    fontSize: sizes.TEXT_MEDIUM,
    fontFamily: fonts.monospace
  },
  description: {
    marginTop: 8,
    fontSize: sizes.TEXT_TINY,
    fontFamily: fonts.monospace
  },
  separator: {
    marginTop: 16,
    backgroundColor: '#000',
    height: 2,
    width: 64
  }
});

export default Program;
