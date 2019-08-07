import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { goHome } from '../../navigation/navigation';
import { DefaultInput } from '../../components/UI/DefaultInput/DefaultInput';
import { HeadingText } from '../../components/UI/HeadingText/HeadingText';
import { MainText } from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
  
  loginHandler = () => {
    goHome();
  }

  render() {
    return (
      <View style={styles.container}>
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>

        <Button title='Switch to Login'/>
        
        <View style={styles.inputContainer}>
          <DefaultInput style={styles.input} placeholder="Password"/>
          <DefaultInput style={styles.input} placeholder="Confirm Password"/>
          <DefaultInput style={[styles.input, {backgroundColor: 'white'}]} placeholder="Your E-Mail Address"/>
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
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderWidth: 2
  }
});

export { AuthScreen };