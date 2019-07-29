import { Navigation } from 'react-native-navigation'

export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'HomeId',
      children: [
        {
          component: {
            name: 'FindPlaceScreen',
            // children: [],
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Find Place',
                icon: require('../assets/Screenshot_1.png')
              }
            }
          },
        },
        {
          component: {
            name: 'SharePlaceScreen',
            // children: [],
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Share Place',
                icon: require('../assets/Screenshot_1.png')
              },
            }
          },
        },
      ],
    }
  }
});


export const goToFindPlace = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'FindPlaceId',
      children: [
        {
          component: {
            name: 'FindPlaceScreen',
            options: {
              topBar: {
                title: {
                  text: 'Find Place',
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

export const goToSharePlace = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'SharePlaceId',
      children: [
        {
          component: {
            name: 'SharePlaceScreen',
            options: {
              topBar: {
                title: {
                  text: 'Share Place',
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

export const goToAuth = () => Navigation.setRoot({
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