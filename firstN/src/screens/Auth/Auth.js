import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { goHome } from '../../navigation/navigation';
import { DefaultInput } from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
  
  loginHandler = () => {
    goHome();
  }

  render() {
    DefaultInput
    return (
      <View style={styles.container}>
        <Text>Please Log In</Text>
        <Button title='Switch to Login'/>
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Password"/>
          <DefaultInput placeholder="Confirm Password"/>
          <DefaultInput placeholder="Your E-Mail Address"/>
        </View>
        <Button title='Submit' onPress={this.loginHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: '80%'
  }
});

export { AuthScreen };