import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

const PROGRAM_ITEMS = [
  {
    title: 'Silliskuljetus',
    time: '12.00',
    description:
      'Bussit lähtevät kohti salaista sillispaikkaa! Ole ajoissa tai jäät paitsi.'
  },
  {
    title: 'Saapuminen',
    time: '13.00',
    description:
      'Saavumme sillispaikalle, luvassa ruokaa, juomaa paljua sekä muuta ohjelmaa!'
  },
  {
    title: 'Viinavartti™',
    time: '14:00',
    description:
      'Shottikierros! Tarjoamme osallistujille päivän ensimmäiset paukut! Järjestetään etupihalla.'
  },
  {
    title: 'Kilpailu',
    time: '14:30',
    description:
      'Kuka on silliksen kovin tyyppi, tule ottamaan selvää! Palkinnot tarjoaa Kaalimato! Järjestetään juhlasalissa.'
  },
  {
    title: 'Viinavartti™',
    time: '15:15',
    description: 'Toinen kierros! Järjestetään etupihalla.'
  },
  {
    title: 'Bändi',
    time: '15:30',
    description:
      'Pikkujouluiltakin tuttu Likes of us soittaa luuppilaisten rakastamia ikivihreitä klassikoita!'
  },
  {
    title: 'Pääesiintyjä',
    time: '16:30',
    description:
      'Vujujen viimeinen yllätysesiintyjä! Tämä yhtye on saavuttanut parissa vuodesasa huippusuosion ja takaa huippu sillisfiiliksen!'
  },
  {
    title: 'Viinavartti™',
    time: '18:30',
    description: 'Kolmas ja viimeinen Viinavartti™! Järjestetään etupihalla.'
  },
  {
    title: 'Lähtö',
    time: '19:00',
    description:
      'Kuljetus takaisin kohti Tamperetta, mutta eivät juhlat tähän jää...'
  },
  {
    title: 'Silliksen jatkot',
    time: '19:30',
    description:
      '...Sillä ilta jatkuu silliksen jatkoilla! Luvassa ruokaa, juomaa, saunomista ja ankaraa juhlimista!'
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
