export const getAuthScreen = () => ({
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
