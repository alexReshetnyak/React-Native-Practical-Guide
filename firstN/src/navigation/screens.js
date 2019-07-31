import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import { AuthScreen } from '../screens/Auth/Auth';
import { FindPlaceScreen } from '../screens/FindPlace/FindPlace';
import { SharePlaceScreen } from '../screens/SharePlace/SharePlace';
import { PlaceDetailScreen } from '../screens/PlaceDetail/PlaceDetail';
import { SideDrawer } from '../screens/SideDrawer/SideDrawer';

const store = configureStore();

// * pass store and Provider if you want to use redux
export function registerScreens() {
  Navigation.registerComponentWithRedux('navigation.AuthScreen',      (sc) => AuthScreen,        Provider, store);
  Navigation.registerComponentWithRedux('navigation.FindPlaceScreen',   () => FindPlaceScreen,   Provider, store);
  Navigation.registerComponentWithRedux('navigation.SharePlaceScreen',  () => SharePlaceScreen,  Provider, store);
  Navigation.registerComponentWithRedux('navigation.PlaceDetailScreen', () => PlaceDetailScreen, Provider, store);
  Navigation.registerComponentWithRedux('navigation.SideDrawer',        () => SideDrawer,        Provider, store);
}
