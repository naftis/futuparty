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
import { format } from 'timeago.js';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';
import icons from '../../theme/icons';
import { postComment, getComments } from '../../services/api';
import Picture from './Picture';

function requiredPropsCheck(props, _, componentName) {
  if (!props.description && !props.image) {
    return new Error(
      `One of 'description' or 'image' is required by '${componentName}' component.`
    );
  }
}

class Comment extends React.Component {
  static options = {
    topBar: {
      title: {
        component: {
          name: 'CommentTopBar',
          alignment: 'left'
        }
      },
      backButton: {
        showTitle: false
      }
    },
    bottomTabs: {
      visible: false,
      drawBehind: true
    }
  };

  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: requiredPropsCheck,
      image: requiredPropsCheck,
      updated_at: PropTypes.string,
      id: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    refreshing: false,
    comments: [],
    text: ''
  };

  commentListRef = React.createRef();

  async componentDidMount() {
    await this._onRefresh();
  }

  _onRefresh = async () => {
    const feedItemId = this.props.item.id;
    const comments = await getComments(feedItemId);

    this.setState({ comments });
  };

  _sendComment = async () => {
    const { text } = this.state;
    const feedId = this.props.item.id;

    await postComment(text, feedId);
    await this._onRefresh();

    this.setState({ text: '' });

    /* TODO: Scroll 2 bottom */
  };

  _renderImageWithText = () => {
    const { image, description, updated_at } = this.props.item;

    const parsedTime = format(new Date(updated_at));

    return (
      <>
        <Picture uri={image} />

        {description ? (
          <View style={styles.imageTextWrapper}>
            <Text style={styles.imageText}>{description}</Text>
            <Text style={styles.imageTextTime}>{parsedTime.toUpperCase()}</Text>
          </View>
        ) : null}
      </>
    );
  };

  _renderTextOnly = () => {
    const { description, updated_at } = this.props.item;
    const parsedTime = format(new Date(updated_at));

    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.textTime}>{parsedTime}</Text>
      </View>
    );
  };

  _renderComment({ item }) {
    const parsedTime = format(new Date(item.updated_at));

    return (
      <View style={styles.comment}>
        <View style={styles.commentInfo}>
          <Text style={styles.commentAuthor}>{item.name}</Text>
          <Text style={styles.commentTime}>{parsedTime.toUpperCase()}</Text>
        </View>
        <Text style={styles.commentText}>{item.description}</Text>
      </View>
    );
  }

  render() {
    const { image } = this.props.item;
    const { refreshing, comments, text } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={this.commentListRef}
          keyExtractor={(_, index) => index.toString()}
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
            image ? this._renderImageWithText : this._renderTextOnly
          }
        />

        <View style={styles.addComment}>
          <TextInput
            placeholder="Kommentoi"
            onChangeText={text => this.setState({ text })}
            value={text}
            style={styles.textField}
          />

          <TouchableOpacity onPress={this._sendComment} disabled={!text}>
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
    flex: 1,
    backgroundColor: colors.background
  },
  textContainer: {
    backgroundColor: colors.text,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 0
  },
  text: {
    fontFamily: fonts.default,
    fontSize: sizes.TEXT_LARGE,
    textAlign: 'center',
    color: colors.background
  },
  textTime: {
    fontFamily: fonts.monospace,
    color: '#bbb',
    fontSize: sizes.TEXT_TINY,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 2
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
    fontSize: sizes.TEXT_TINY,
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
    fontSize: sizes.TEXT_TINY
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
