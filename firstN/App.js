
// * to reload device set live reload (ctrl + m) or press rr
// * to resolve watchers issue use:  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// ? Debug: react-devtools //////////////// Debug JS Remotely better to use react-native-debbuger

// import { Provider } from 'react-redux';
import { Navigation } from "react-native-navigation";

// import configureStore from './src/store/configureStore';
// import { AuthScreen } from '../firstN/src/screens/Auth/Auth';
import { registerScreens } from './src/navigation/screens';

// const store = configureStore();

// * Redux wrapper for App
// const ReactNativeRedux = () => (
//   <Provider store={store}>
//     <AuthScreen />
//   </Provider>
// );


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AuthScreenId',
        children: [
          {
            component: {
              name: 'AuthScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                    color: '#FFBC42',
                    fontSize: 24,
                    alignment: 'center'
                  },
                  background: {
                    color: '#424242'
                  }
                }
              }
            },
          }
        ],
      }
    }
  });
});

// * multiple screens
// const screens = [{
//   component: {
//     name: "AuthScreen",
//     options: {
//       topBar: {
//         title: {
//           text: 'Login',
//           color: '#FFBC42',
//           fontSize: 24,
//           alignment: 'center'
//         },
//         background: {
//           color: '#424242'
//         }
//       }
//     }
//   }
// }];

// Navigation.events().registerAppLaunchedListener(() => {
  //   Navigation.setRoot({
    //     root: {
//       stack: {
//         options: {
//           topBar: {
//             visible: true
//           }
//         },
//         children: screens
//       }
//     }
//   });
// });

