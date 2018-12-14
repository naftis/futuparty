import { Navigation } from 'react-native-navigation';
import Comment from './containers/Comment';
import CommentTopBar from './containers/Comment/CommentTopBar';
import Feed from './containers/Feed';
import Food from './containers/Food';
import Info from './containers/Info';
import Initial from './containers/Initial';
import Post from './containers/Post';
import Profile from './containers/Profile';
import Program from './containers/Program';
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

  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('Comment', () => Comment);
  Navigation.registerComponent('Post', () => Post);

  Navigation.registerComponent('Info', () => Info);

  /*
   * UI Components
   */
  Navigation.registerComponent('CommentTopBar', () => CommentTopBar);
}
