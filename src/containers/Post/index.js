import { PropTypes } from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';
import Background from '../../components/Background';
import { postFeedItem } from '../../services/api';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';
import sizes from '../../theme/sizes';

class Post extends React.Component {
  state = {
    imageSource: null,
    text: '',
    sending: false
  };

  static options = {
    topBar: {
      title: {
        text: 'Lähetä',
        fontFamily: fonts.monospaceBold,
        fontSize: sizes.TEXT_SMALL
      }
    }
  };

  static propTypes = {
    componentId: PropTypes.string,
    onPostSuccess: PropTypes.func
  };

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

        const imageSource = { uri: response.uri };

        this.setState({ imageSource });
      }
    );
  };

  _onPost = async () => {
    const { imageSource, text } = this.state;
    const { componentId, onPostSuccess } = this.props;

    try {
      this.setState({ sending: true });
      await postFeedItem(imageSource, text);
      this.setState({ sending: false });
      Navigation.pop(componentId);
      onPostSuccess();
    } catch (e) {
      this.setState({ sending: false });
    }
  };

  render() {
    const { imageSource, text, sending } = this.state;

    const buttonActive = (imageSource || text) && !sending;

    return (
      <View style={styles.container}>
        <Background />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.backgroundColor}>
            <View style={styles.textInputWrapper}>
              <TextInput
                onChangeText={text => this.setState({ text })}
                value={text}
                style={styles.textInput}
                placeholder="Kirjoita..."
              />
            </View>
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
          </View>

          <TouchableHighlight
            underlayColor={colors.buttonSelected}
            onPress={this._onPost}
            style={buttonActive ? styles.button : styles.buttonDisabled}
            accessibilityLabel={sending ? 'Lähetetään...' : 'Lähetä'}
            disabled={!buttonActive}
          >
            <Text style={styles.buttonText}>
              {sending ? 'Lähetetään...' : 'Lähetä'}
            </Text>
          </TouchableHighlight>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    height: width - 40,
    width: width - 40,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  buttonDisabled: {
    marginTop: 10,
    width: width - 40,
    borderRadius: 5,
    padding: 15,
    backgroundColor: colors.buttonDisabled
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.monospace,
    textAlign: 'center'
  }
});

export default Post;
