import { Navigation } from 'react-native-navigation';

import colors from './theme/colors';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    bottomTab: {
      textColor: colors.bottomBarText,
      selectedTextColor: colors.bottomBarTextSelected,
      selectedIconColor: colors.bottomBarTextSelected,
      iconInsets: { top: 8, bottom: -8 },
      iconColor: colors.bottomBarText
    },

    bottomTabs: {
      animate: true,
      barStyle: 'black',
      backgroundColor: colors.bottomBar,
      titleDisplayMode: 'alwaysHide'
    },

    animations: {
      setRoot: {
        enabled: 1,
        alpha: {
          from: 0,
          to: 1,
          duration: 400,
          startDelay: 0,
          interpolation: 'accelerate'
        }
      }
    }
  });
});

export const goAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'SignIn'
            }
          }
        ]
      }
    }
  });

export const goHome = async () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Feed'
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Info'
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Profile'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
