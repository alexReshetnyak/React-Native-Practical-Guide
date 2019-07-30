import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { AuthScreen } from '../screens/Auth/Auth';
import { FindPlaceScreen } from '../screens/FindPlace/FindPlace';
import { SharePlaceScreen } from '../screens/SharePlace/SharePlace';
import configureStore from '../store/configureStore';
import {PlaceDetailScreen} from '../screens/PlaceDetail/PlaceDetail';

const store = configureStore();

// * pass store and Provider if you want to use redux
export function registerScreens() {
  Navigation.registerComponentWithRedux('AuthScreen',      (sc) => AuthScreen,        Provider, store);
  Navigation.registerComponentWithRedux('FindPlaceScreen',   () => FindPlaceScreen,   Provider, store);
  Navigation.registerComponentWithRedux('SharePlaceScreen',  () => SharePlaceScreen,  Provider, store);
  Navigation.registerComponentWithRedux('PlaceDetailScreen', () => PlaceDetailScreen, Provider, store);
}
