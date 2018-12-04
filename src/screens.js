import { Navigation } from 'react-native-navigation';

import Info from './containers/Info';
import Feed from './containers/Feed';
import SignIn from './containers/SignIn';
import Initial from './containers/Initial';
import Profile from './containers/Profile';
import Food from './containers/Food';

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

  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('Info', () => Info);
}
