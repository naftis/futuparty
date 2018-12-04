import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

import icons from './theme/icons';
import colors from './theme/colors';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    bottomTab: {
      textColor: colors.bottomBarText,
      selectedTextColor: colors.bottomBarTextSelected,
      selectedIconColor: colors.bottomBarTextSelected,
      iconInsets: { top: 8, bottom: -8 }
    },
    bottomTabs: {
      animate: true,
      barStyle: 'black',
      backgroundColor: colors.bottomBar,
      titleDisplayMode: 'alwaysHide'
    },
    animations: {
      push: {
        bottomTabs: {
          alpha: {
            from: 0,
            to: 1
          }
        }
      },
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
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            component: {
              name: 'SignIn',
              options: {
                bottomTab: {}
              }
            }
          },
          {
            component: {
              name: 'Home',
              options: {
                bottomTab: {}
              }
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
                    name: 'Info',
                    options: {
                      topBar: {
                        visible: Platform.OS === 'ios',
                        drawBehind: Platform.OS !== 'ios'
                      },
                      bottomTab: {
                        icon: icons.info
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            component: {
              name: 'Feed',
              options: {
                bottomTab: {
                  badge: '5',
                  badgeColor: colors.bottomBarBadgeColor,
                  icon: icons.chat
                }
              }
            }
          },
          {
            component: {
              name: 'Profile',
              options: {
                bottomTab: {
                  icon: icons.user
                }
              }
            }
          }
        ]
      }
    }
  });
