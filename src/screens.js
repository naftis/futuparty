import { Navigation } from 'react-native-navigation';
import Comment from './containers/Comment';
import CommentTopBar from './containers/Comment/TopBar';
import Feed from './containers/Feed';
import FeedTopBar from './containers/Feed/TopBar';
import Food from './containers/Food';
import Info from './containers/Info';
import Initial from './containers/Initial';
import Post from './containers/Post';
import Profile from './containers/Profile';
import Burger from './containers/Profile/Burger';
import Program from './containers/Program';
import Settings from './containers/Settings';
import SignIn from './containers/SignIn';

export function registerScreens() {
  /*
   * Initial app load
   */
  Navigation.registerComponent('Initial', () => Initial);

  /*
   * Unauthorized user
   */
  Navigation.registerComponent('SignIn', () => SignIn);

  /*
   * Signed in view
   */
  Navigation.registerComponent('Food', () => Food);
  Navigation.registerComponent('Program', () => Program);

  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('Settings', () => Settings);

  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('Comment', () => Comment);
  Navigation.registerComponent('Post', () => Post);

  Navigation.registerComponent('Info', () => Info);

  /*
   * UI Components
   */
  Navigation.registerComponent('FeedTopBar', () => FeedTopBar);
  Navigation.registerComponent('CommentTopBar', () => CommentTopBar);
  Navigation.registerComponent('Burger', () => Burger);
}
