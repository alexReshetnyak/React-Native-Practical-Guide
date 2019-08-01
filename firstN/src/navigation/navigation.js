import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const getFindPlaceScreen = async () => ({
  component: {
    name: 'navigation.FindPlaceScreen',
    // children: [],
    options: {
      bottomTab: {
        fontSize: 12,
        text: 'Find Place',
        // icon: require('../assets/Screenshot_1.png')
        icon: await Icon.getImageSource('md-map', 30, 'green')
      },
      topBar: {
        title: {
          text: 'Find Place',
          color: '#FFBC42',
          fontSize: 24,
          alignment: 'center'
        },
        background: {
          color: '#424242'
        },
        rightButtons: [
          {
            id: 'openSideDrawerButton',
            icon: await Icon.getImageSource('ios-menu', 30, 'orange')
          }
        ]
      }
    }
  }
});

const getSharePlaceScreen = async () => ({
  component: {
    name: 'navigation.SharePlaceScreen',
    // children: [],
    options: {
      bottomTab: {
        fontSize: 12,
        text: 'Share Place',
        icon: await Icon.getImageSource('ios-share-alt', 30, 'blue')
      },
      topBar: {
        title: {
          text: 'Share Place',
          color: '#FFBC42',
          fontSize: 24,
          alignment: 'center'
        },
        background: {
          color: '#424242'
        },
        rightButtons: [
          {
            id: 'openSideDrawerButton',
            icon: await Icon.getImageSource('ios-menu', 30, 'orange')
          }
        ]
      }
    }
  }
});

const getAuthScreen = () => ({
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
    }
});

export const goHome = async () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'sideDrawerId',
        left: {
          component: {
            id: 'sideDrawer',
            name: 'navigation.SideDrawer'
          }
        },
        center: {
          bottomTabs: {
            id: 'HomeId',
            children: [
              {
                stack: {
                  id: 'findPlaceId',
                  children: [await getFindPlaceScreen()]
                }
              },
              {
                stack: {
                  id: 'SharePlaceId',
                  children: [await getSharePlaceScreen()]
                }
              }
            ]
          }
        }
      }
    }
  });
};

export const goToAuth = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AuthScreenId',
      children: [getAuthScreen()],
    }
  }
});

// export const goToFindPlace = () => Navigation.setRoot({
//   root: {
//     stack: {
//       id: 'FindPlaceId',
//       children: [
//         {
//           component: {
//             name: 'FindPlaceScreen',
//             options: {
//               topBar: {
//                 title: {
//                   text: 'Find Place',
//                   color: '#FFBC42',
//                   fontSize: 24,
//                   alignment: 'center'
//                 },
//                 background: {
//                   color: '#424242'
//                 }
//               }
//             }
//           },
//         }
//       ],
//     }
//   }
// });

// export const goToSharePlace = () => Navigation.setRoot({
//   root: {
//     stack: {
//       id: 'SharePlaceId',
//       children: [
//         {
//           component: {
//             name: 'SharePlaceScreen',
//             options: {
//               topBar: {
//                 title: {
//                   text: 'Share Place',
//                   color: '#FFBC42',
//                   fontSize: 24,
//                   alignment: 'center'
//                 },
//                 background: {
//                   color: '#424242'
//                 }
//               }
//             }
//           },
//         }
//       ],
//     }
//   }
// });

