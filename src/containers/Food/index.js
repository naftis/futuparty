import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';

class Food extends React.Component {
  static options = {
    topBar: {
      title: {
        fontFamily: fonts.monospaceBold,
        fontSize: sizes.TEXT_SMALL,
        text: 'Ruokalista'
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.heading}>Vegaani</Text>

          <Text style={styles.heading2}>Alkuruoka</Text>

          <Text style={styles.em}>
            Paahdettua maa-artisokkaa, osterivinokkaita ja marinoitua
            papusalaattia
          </Text>

          <Text style={styles.heading2}>Pääruoka</Text>

          <Text style={styles.em}>
            Kurpitsarisottoa, kylmäsavustettua tofua ja salviaöljyä
          </Text>

          <Text style={styles.heading2}>Jälkiruoka</Text>

          <Text style={styles.em}>
            Manteli-suklaamoussea, vaniljacrumblea ja vadelmaa
          </Text>

          <Text style={styles.divider}>
            - - - - - - - - - - - - - - - - - -
          </Text>

          <Text style={styles.heading}>Liha</Text>

          <Text style={styles.heading2}>Alkuruoka</Text>

          <Text style={styles.em}>
            Sokerisuolattua siikaa, ruista ja kananmunaa
          </Text>

          <Text style={styles.heading2}>Pääruoka</Text>

          <Text style={styles.em}>
            Kotimaista naudan entrecotea, grillattua maa-artisokkaa ja
            karamellisoitua porkkanaa
          </Text>

          <Text style={styles.heading2}>Jälkiruoka</Text>

          <Text style={styles.em}>
            Mustikkaleivos, kauracrumblea ja marenkia
          </Text>

          <Text style={styles.divider}>
            - - - - - - - - - - - - - - - - - -
          </Text>

          <Text style={styles.heading}>Kala</Text>

          <Text style={styles.heading2}>Alkuruoka</Text>

          <Text style={styles.em}>
            Sokerisuolattua siikaa, ruista ja kananmunaa
          </Text>

          <Text style={styles.heading2}>Pääruoka</Text>

          <Text style={styles.em}>
            Paistettua nieriää, kukkakaalia ja savustettua fenkolivoikastiketta
          </Text>

          <Text style={styles.heading2}>Jälkiruoka</Text>

          <Text style={styles.em}>
            Mustikkaleivos, kauracrumblea ja marenkia
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    fontSize: sizes.TEXT_LARGE
  },
  scrollView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  heading: {
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_ENORMOUS,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  heading2: {
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_LARGE,
    marginBottom: 10,
    marginTop: 10
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  },
  em: {
    color: colors.foodPrimaryColor,
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_MEDIUM,
    textAlign: 'center',
    flex: 1
  }
});

export default Food;
