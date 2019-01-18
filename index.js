import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import timeagoFinnish from './src/translations/timeago.fi_FI';
import { register } from 'timeago.js';

register('fi_FI', timeagoFinnish);
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initial'
      }
    }
  });
});
