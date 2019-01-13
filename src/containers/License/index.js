import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ModalBackButton from '../../components/ModalBackButton';
import fonts from '../../theme/fonts';

class License extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ModalBackButton title="Licenses" />

        <View style={styles.content}>
          <Text style={styles.paragraph}>Last updated: Jan 13, 2019</Text>
          <Text style={styles.paragraph}>
            Luuppi50 app and all information in the app are property of Futurice
            Oy.
          </Text>
          <Text style={styles.paragraph}>
            All rights to the content posted by the users to the app remains at
            the user him-/herself. By posting content to the app, the user
            grants Futurice Oy the right and license to use, modify, publicly
            display, reproduce, make available and distribute such content in
            the app and at Luuppi50 events on 18.02.2019 - 24.02.2019.
          </Text>
          <Text style={styles.paragraph}>
            This app and all the content generated by users is only for use
            within the app during Luuppi50 events on 18.02.2019 - 24.02.2019.
            None of the content may be used for any other purposes.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  paragraph: {
    padding: 10
  },
  bold: {
    fontFamily: fonts.monospace,
    fontWeight: 'bold'
  }
});

export default License;