import {Navigation} from 'react-native-navigation';
import {getAuthScreen} from './authScreens';
import {getFindPlaceScreen, getSharePlaceScreen} from './homeScreens';

export const goHome = async () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'sideDrawerId',
        left: {
          component: {
            id: 'sideDrawer',
            name: 'navigation.SideDrawer',
          },
        },
        center: {
          bottomTabs: {
            id: 'HomeId',
            children: [
              {
                stack: {
                  id: 'findPlaceId',
                  children: [await getFindPlaceScreen()],
                },
              },
              {
                stack: {
                  id: 'SharePlaceId',
                  children: [await getSharePlaceScreen()],
                },
              },
            ],
          },
        },
      },
    },
  });
};

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AuthScreenId',
        children: [getAuthScreen()],
      },
    },
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
