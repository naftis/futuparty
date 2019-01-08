import { Navigation } from 'react-native-navigation';
import colors from './theme/colors';
import icons from './theme/icons';

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
      animate: false,
      barStyle: 'black',
      backgroundColor: colors.bottomBar,
      titleDisplayMode: 'alwaysHide'
    },

    animations: {
      setRoot: {
        alpha: {
          from: 0,
          to: 1,
          duration: 400,
          startDelay: 0,
          interpolation: 'accelerate'
        }
      },

      push: {
        enabled: 'true',
        content: {
          alpha: {
            from: 0,
            to: 1,
            duration: 500,
            interpolation: 'accelerate'
          }
        }
      },

      pop: {
        content: {
          enabled: 'true',
          alpha: {
            from: 1,
            to: 0,
            duration: 500,
            interpolation: 'decelerate'
          }
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
            sideMenu: {
              center: {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Profile'
                      }
                    }
                  ]
                }
              },
              right: {
                component: {
                  name: 'Settings',
                  id: 'settingsDrawer'
                }
              },

              /*
               * Due to Profile-page having side menu,
               * we need to set the icon here
               */
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
