/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as firstApp } from './app.json';
import configureStore from './src/store/configureStore';

const store = configureStore();

// * Redux wrapper for App
const ReactNativeRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(firstApp, () => ReactNativeRedux);
