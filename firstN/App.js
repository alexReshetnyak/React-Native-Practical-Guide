
// * to reload device set live reload (ctrl + m) or press rr
// * to resolve watchers issue use:  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// ? Debug: react-devtools //////////////// Debug JS Remotely better to use react-native-debbuger
// * NativeBase.io - cross platform UI library
// * firebase init to init cloud functions
// * cd functions npm i

import { Navigation } from "react-native-navigation";
import { registerScreens } from './src/navigation/screens';


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AuthScreenId',
        children: [
          {
            component: {
              name: 'navigation.AuthScreen',
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
