import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';

import Comment from './containers/Comment';
import CommentTopBar from './containers/Comment/TopBar';
import Feed from './containers/Feed';
import FeedTopBar from './containers/Feed/TopBar';
import Food from './containers/Food';
import Info from './containers/Info';
import Initial from './containers/Initial';
import Post from './containers/Post';
import Profile from './containers/Profile/ProfileContainer';
import Program from './containers/Program';
import Settings from './containers/Settings';
import SignIn from './containers/SignIn/SignInContainer';

const store = configureStore();

export function registerScreens() {
  /*
   * Initial app load
   */
  Navigation.registerComponentWithRedux(
    'Initial',
    () => Initial,
    Provider,
    store
  );

  /*
   * Unauthorized user
   */
  Navigation.registerComponentWithRedux(
    'SignIn',
    () => SignIn,
    Provider,
    store
  );

  /*
   * Signed in view
   */
  Navigation.registerComponentWithRedux('Food', () => Food, Provider, store);
  Navigation.registerComponentWithRedux(
    'Program',
    () => Program,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'Profile',
    () => Profile,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'Settings',
    () => Settings,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux('Feed', () => Feed, Provider, store);
  Navigation.registerComponentWithRedux(
    'Comment',
    () => Comment,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux('Post', () => Post, Provider, store);

  Navigation.registerComponentWithRedux('Info', () => Info, Provider, store);

  /*
   * UI Components
   */
  Navigation.registerComponentWithRedux(
    'FeedTopBar',
    () => FeedTopBar,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'CommentTopBar',
    () => CommentTopBar,
    Provider,
    store
  );
}
