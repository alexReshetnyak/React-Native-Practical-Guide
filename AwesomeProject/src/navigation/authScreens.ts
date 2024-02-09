import {LayoutStackChildren} from 'react-native-navigation';

/**
 * Get AuthScreen object for navigation
 *
 * @return {Object} AuthScreen promise object for navigation
 *
 * @example
 *     getAuthScreen()
 */
export const getAuthScreen: () => LayoutStackChildren = () => ({
  component: {
    name: 'navigation.AuthScreen',
    options: {
      topBar: {
        title: {
          text: 'Login',
          color: '#FFBC42',
          fontSize: 24,
          alignment: 'center',
        },
        background: {
          color: '#424242',
        },
      },
    },
  },
});
