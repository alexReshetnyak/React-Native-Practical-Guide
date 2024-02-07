import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

let findPlaceIconName   = 'ios-map';
let sharePlaceIconName  = 'ios-share-alt';
let menuIconName        = 'ios-menu';

if (Platform.OS === 'android') {
  findPlaceIconName   = 'md-map';
  sharePlaceIconName  = 'md-share-alt';
  menuIconName        = 'md-menu';
}

/**
 * Get FindPlaceScreen object for navigation
 *
 * @return {Object} FindPlaceScreen promise object for navigation
 *
 * @example
 *     getFindPlaceScreen()
 */
export const getFindPlaceScreen = async () => ({
  component: {
    name: 'navigation.FindPlaceScreen',
    // children: [],
    options: {
      bottomTab: {
        fontSize: 15,
        text: 'Find Place',
        textColor: 'red',
        selectedTextColor: 'green',
        selectedIconColor: 'green',
        // icon: require('../assets/Screenshot_1.png')
        icon: await Icon.getImageSource(findPlaceIconName, 30, 'red')
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
            icon: await Icon.getImageSource(menuIconName, 30, 'orange')
          }
        ]
      }
    }
  }
});


/**
 * Get SharePlaceScreen object for navigation
 *
 * @return {Object} SharePlaceScreen promise object for navigation
 *
 * @example
 *     getSharePlaceScreen()
 */
export const getSharePlaceScreen = async () => ({
  component: {
    name: 'navigation.SharePlaceScreen',
    // children: [],
    options: {
      bottomTab: {
        fontSize: 15,
        text: 'Share Place',
        textColor: 'red',
        selectedTextColor: 'blue',
        selectedIconColor: 'blue',
        // badge: '5',
        // badgeColor: 'red',
        icon: await Icon.getImageSource(sharePlaceIconName, 30, 'red'),
        disabledColor: 'blue',
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
            icon: await Icon.getImageSource(menuIconName, 30, 'orange')
          }
        ]
      }
    }
  }
});

  /**
   * Get PlaceDetailScreen object for navigation
   *
   * @param {Object} selectedPlace - selected place object { key: 'string', name: 'string', image: object }
   * @return {Object} PlaceDetail promise object for navigation
   *
   * @example
   *
   *     getPlaceDetailScreen({ key: 'string', name: 'string', image: object })
   */
  export const getPlaceDetailScreen = async selectedPlace => ({
    component: {
      name: 'navigation.PlaceDetailScreen',
      passProps: {
        selectedPlace
      },
      options: {
        topBar: {
          title: {
            text: selectedPlace.name,
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
              icon: await Icon.getImageSource(menuIconName, 30, 'orange')
            }
          ]
        }
      }
    }
  });
