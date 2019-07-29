import { Navigation } from 'react-native-navigation';
import { AuthScreen } from '../screens/Auth/Auth';
import { FindPlaceScreen } from '../screens/FindPlace/FindPlace';
import { SharePlaceScreen } from '../screens/SharePlace/SharePlace';

export function registerScreens() {
  Navigation.registerComponent('AuthScreen', (sc) => AuthScreen);
  Navigation.registerComponent('FindPlaceScreen', () => FindPlaceScreen);
  Navigation.registerComponent('SharePlaceScreen', () => SharePlaceScreen);
}
