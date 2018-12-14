import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Background from '../../components/Background';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import colors from '../../theme/colors';

class Post extends React.Component {
  state = {
    imageSource: null,
    text: ''
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Lähetä'
        }
      },
      bottomTabs: {
        visible: false,
        drawBehind: true
      }
    };
  }

  _onImagePress = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Valitse kuva',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          return;
        }

        const imageSource = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource });
      }
    );
  };

  render() {
    const { imageSource } = this.state;

    return (
      <View style={styles.container}>
        <Background />

        <View style={styles.backgroundColor}>
          <TouchableOpacity
            onPress={this._onImagePress}
            style={styles.imageContainer}
          >
            {imageSource ? (
              <Image source={imageSource} style={styles.photo} />
            ) : (
              <Image source={icons.addPhoto} style={styles.addPhotoIcon} />
            )}
          </TouchableOpacity>
          <View style={styles.textInputWrapper}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              style={styles.textInput}
              placeholder="Kirjoita..."
            />
          </View>
        </View>

        <TouchableHighlight
          underlayColor={colors.buttonSelected}
          onPress={() => {}}
          style={styles.button}
          accessibilityLabel="Lähetä"
        >
          <Text style={styles.buttonText}>Lähetä</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    height: width - 40,
    width: width - 40,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd'
  },
  addPhotoIcon: {
    tintColor: '#000'
  },
  photo: {
    height: width - 40,
    width: width - 40,
    resizeMode: 'contain'
  },
  textInputWrapper: {
    padding: 20,
    width: width - 40,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff'
  },
  textInput: {
    fontFamily: fonts.monospace
  },
  backgroundColor: {
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 8
  },
  button: {
    marginTop: 10,
    width: width - 40,
    borderRadius: 5,
    padding: 15,
    backgroundColor: colors.button
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.monospace,
    textAlign: 'center'
  }
});

export default Post;
