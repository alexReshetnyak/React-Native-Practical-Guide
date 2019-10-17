import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/navigation/screens";
import SplashScreen from 'react-native-splash-screen';

SplashScreen.show();
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: "AuthScreenId",
        children: [
          {
            component: {
              name: "navigation.AuthScreen",
              options: {
                topBar: {
                  title: {
                    text: "Login",
                    color: "#FFBC42",
                    fontSize: 24,
                    alignment: "center"
                  },
                  background: {
                    color: "#424242"
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
});
