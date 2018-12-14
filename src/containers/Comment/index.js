import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import icons from '../../theme/icons';

function requiredPropsCheck(props, _, componentName) {
  if (!props.text && !props.imageUrl) {
    return new Error(
      `One of 'text' or 'imageUrl' is required by '${componentName}' component.`
    );
  }
}

class Comment extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: requiredPropsCheck,
      imageUrl: requiredPropsCheck,
      time: PropTypes.string
    }).isRequired
  };

  state = {
    refreshing: false,
    comments: [],
    text: ''
  };

  static get options() {
    return {
      topBar: {
        title: {
          component: {
            name: 'CommentTopBar',
            alignment: 'left'
          }
        }
      },
      bottomTabs: {
        visible: false,
        drawBehind: true
      }
    };
  }

  async componentDidMount() {
    this.setState({
      comments: [
        {
          key: 'A',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomatonta!'
        },
        {
          key: 'A1',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomaxtonta!'
        },
        {
          key: 'A2',
          author: 'Cihan Bebek',
          time: '5m ago',
          text:
            'Aivan huikaiseva sovellus! Uskomatoxxnta! Uskomatoxxnta!Uskomatoxxnta!Uskomatoxx nta!Uskomatoxxnta!Uskomatoxxnta!Usk omatoxxnta!Uskomatoxxnta!'
        },
        {
          key: 'Aa',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomatonta!'
        },
        {
          key: 'A1v',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomaxtonta!'
        },
        {
          key: 'Ac',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomatonta!'
        },
        {
          key: 'A1d',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomaxtonta!'
        },
        {
          key: 'Ae',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomatonta!'
        },
        {
          key: 'A1f',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomaxtonta!'
        },
        {
          key: 'Ag',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomatonta!'
        },
        {
          key: 'A1h',
          author: 'Cihan Bebek',
          time: '5m ago',
          text: 'Aivan huikaiseva sovellus! Uskomaxtonta!'
        }
      ]
    });
  }

  _onRefresh = () => {
    // TODO: get new comments
  };

  _sendComment = () => {
    // TODO: send comment
  };

  _renderImageWithText = () => {
    const { imageUrl, text, time } = this.props.item;

    return (
      <>
        <Image style={styles.image} source={{ uri: imageUrl }} />

        {text && (
          <View style={styles.imageTextWrapper}>
            <Text style={styles.imageText}>{text}</Text>
            <Text style={styles.imageTextTime}>{time.toUpperCase()}</Text>
          </View>
        )}
      </>
    );
  };

  _renderTextOnly = () => {
    const { text } = this.props.item;

    return (
      <Text style={styles.text}>
        {text}daksjdalks aklsdja lskdja sldkajslkd ajslkdja ls djalks jalksj
        dalksjdlka jsdlka jsldajs lasjd alsjd laksjdlasj alksdj alksjd alksjdal
        ksjdalks jalks jdals jalksj l
      </Text>
    );
  };

  _renderComment({ item }) {
    return (
      <View style={styles.comment}>
        <View style={styles.commentInfo}>
          <Text style={styles.commentAuthor}>{item.author}</Text>
          <Text style={styles.commentTime}>{item.time.toUpperCase()}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    );
  }

  render() {
    const { imageUrl } = this.props.item;
    const { refreshing, comments, text } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
              progressBackgroundColor={colors.refreshButton}
              colors={[
                colors.refreshButtonText,
                colors.refreshButtonTextSelected
              ]}
            />
          }
          data={comments}
          renderItem={this._renderComment}
          contentContainerStyle={styles.comments}
          ListHeaderComponent={
            imageUrl ? this._renderImageWithText : this._renderTextOnly
          }
        />

        <View style={styles.addComment}>
          <TextInput
            placeholder="Kommentoi"
            onChangeText={text => this.setState({ text })}
            value={text}
            style={styles.textField}
          />
          <TouchableOpacity onPress={this._sendComment}>
            <Image source={icons.leftArrow} style={styles.arrowButton} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: fonts.default,
    fontSize: 22,
    textAlign: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#000',
    color: '#fff'
  },
  image: {
    width,
    height: width,
    resizeMode: 'cover'
  },
  imageTextWrapper: {
    padding: 18,
    backgroundColor: colors.background
  },
  imageText: {
    marginBottom: 18,
    fontFamily: fonts.monospace,
    lineHeight: 18
  },
  imageTextTime: {
    fontFamily: fonts.monospace,
    color: '#bbb',
    fontSize: 11,
    fontWeight: 'bold'
  },
  comments: {
    backgroundColor: '#fbfbfb'
  },
  comment: {
    margin: 18,
    marginBottom: 0,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#edeeee'
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  commentAuthor: {
    fontFamily: fonts.monospace,
    fontWeight: 'bold',
    color: colors.author
  },
  commentTime: {
    fontFamily: fonts.monospace,
    color: '#bbb',
    fontSize: 11
  },
  commentText: {
    lineHeight: 20,
    fontFamily: fonts.monospace
  },
  addComment: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.8,

    elevation: -6
  },
  textField: {
    flex: 1,
    fontFamily: fonts.monospace
  },
  arrowButton: {
    transform: [{ rotate: '180deg' }],
    tintColor: '#000'
  }
});

export default Comment;
