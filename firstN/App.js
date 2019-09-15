import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/navigation/screens";

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
