import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { goToFindPlace } from '../../navigation/navigation';

class AuthScreen extends Component {
  loginHandler = () => {
    goToFindPlace();
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     goHome();  
  //   }, 5000);
  // }

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