import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { goHome } from '../../navigation/navigation';

class AuthScreen extends Component {
  
  loginHandler = () => {
    goHome();
  }

  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title='Login' onPress={this.loginHandler}/>
      </View>
    );
  }
}
 
export { AuthScreen };