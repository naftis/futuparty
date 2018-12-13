import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-renderer';

import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

const content = `
# Vegaani

### Alkuruoka

*Paahdettua maa-artisokkaa, osterivinokkaita ja marinoitua papusalaattia*

### Pääruoka

*Kurpitsarisottoa, kylmäsavustettua tofua ja salviaöljyä*

### Jälkiruoka

*Manteli-suklaamoussea, vaniljacrumblea ja vadelmaa*

---

# Liha

### Alkuruoka

*Sokerisuolattua siikaa, ruista ja kananmunaa*

### Pääruoka

*Kotimaista naudan entrecotea, grillattua maa-artisokkaa ja karamellisoitua porkkanaa*

### Jälkiruoka

*Mustikkaleivos, kauracrumblea ja marenkia*

---

# Kala

### Alkuruoka

*Sokerisuolattua siikaa, ruista ja kananmunaa*

### Pääruoka

*Paistettua nieriää, kukkakaalia ja savustettua fenkolivoikastiketta*

### Jälkiruoka

*Mustikkaleivos, kauracrumblea ja marenkia*
`;

class Food extends React.Component {
  static get options() {
    return {
      topBar: { title: { text: 'Ruokalista' } }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Markdown style={styles}>{content}</Markdown>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    color: colors.foodPrimaryColor
  },
  view: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    fontSize: 20
  },
  scrollView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  heading: {
    fontFamily: fonts.default,
    textAlign: 'center'
  },
  heading1: {
    fontSize: 32,
    marginBottom: 10
  },
  heading2: {
    fontSize: 24
  },
  heading3: {
    fontSize: 18,
    color: colors.foodSecondaryColor
  },
  hr: {
    height: 20,
    width: 0
  },
  em: {
    color: colors.foodPrimaryColor,
    fontFamily: fonts.default,
    fontSize: 15
  }
});

export default Food;
