// * Index js for android platforms (not required)

// import React from 'react';
// // import { AppRegistry } from 'react-native';
// import { Provider } from 'react-redux';
// import { Navigation } from "react-native-navigation";

// import App from './App';
// // import { name as firstApp } from './app.json';
// import configureStore from './src/store/configureStore';

// const store = configureStore();

// // * Redux wrapper for App
// const ReactNativeRedux = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// // AppRegistry.registerComponent(firstApp, () => ReactNativeRedux);
// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => ReactNativeRedux);

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "navigation.playground.WelcomeScreen"
//       }
//     }
//   });
// });

import { AppRegistry } from 'react-native';
import App from './App';
import { name as firstApp } from './app.json';

AppRegistry.registerComponent(firstApp, () => App);