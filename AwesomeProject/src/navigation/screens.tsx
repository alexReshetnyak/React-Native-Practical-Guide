import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import React from 'react';

import configureStore from '../store/configureStore';
import {AuthScreen} from '../screens/Auth/Auth';
import {FindPlaceScreen} from '../screens/FindPlace/FindPlace';
import {SharePlaceScreen} from '../screens/SharePlace/SharePlace';
import {PlaceDetailScreen} from '../screens/PlaceDetail/PlaceDetail';
import {SideDrawer} from '../screens/SideDrawer/SideDrawer';

const store = configureStore;

// * pass store and Provider if you want to use redux
export function registerScreens() {
  Navigation.registerComponent(
    'navigation.AuthScreen',
    () => props =>
      (
        <Provider store={store}>
          <AuthScreen {...props} />
        </Provider>
      ),
    () => AuthScreen,
  );
  Navigation.registerComponent(
    'navigation.FindPlaceScreen',
    () => props =>
      (
        <Provider store={store}>
          <FindPlaceScreen {...props} />
        </Provider>
      ),
    () => FindPlaceScreen,
  );
  Navigation.registerComponent(
    'navigation.SharePlaceScreen',
    () => props =>
      (
        <Provider store={store}>
          <SharePlaceScreen {...props} />
        </Provider>
      ),
    () => SharePlaceScreen,
  );
  Navigation.registerComponent(
    'navigation.PlaceDetailScreen',
    () => props =>
      (
        <Provider store={store}>
          <PlaceDetailScreen {...props} />
        </Provider>
      ),
    () => PlaceDetailScreen,
  );
  Navigation.registerComponent(
    'navigation.SideDrawer',
    () => props =>
      (
        <Provider store={store}>
          <SideDrawer {...props} />
        </Provider>
      ),
    () => SideDrawer,
  );
}
