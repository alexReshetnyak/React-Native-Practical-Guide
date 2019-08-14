import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

import { goHome } from '../../navigation/navigation';
import { DefaultInput } from '../../components/UI/DefaultInput/DefaultInput';
import { HeadingText } from '../../components/UI/HeadingText/HeadingText';
import { MainText } from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import {ButtonWithBackground} from '../../components/UI/ButtonWithBackground/ButtonWithBackground'

class AuthScreen extends Component {

  loginHandler = () => {
    goHome();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
            <MainText>
              <HeadingText style={{color: 'white'}}>Please Log In</HeadingText>
            </MainText>

            <ButtonWithBackground 
              onPress={() => alert('Hello')}
              style={{ backgroundColor: '#424242', color: 'white'}}
            >
              Switch to Login
            </ButtonWithBackground>
            
            <View style={styles.inputContainer}>
              <DefaultInput style={styles.input} placeholder="Password"/>
              <DefaultInput style={styles.input} placeholder="Confirm Password"/>
              <DefaultInput style={[styles.input, {backgroundColor: 'white'}]} placeholder="Your E-Mail Address"/>
            </View>
            
            <ButtonWithBackground 
              onPress={this.loginHandler} 
              style={{ backgroundColor: '#424242', color: 'white'}}
            >
              Submit
            </ButtonWithBackground>
        </View>
      </ImageBackground>
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
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderWidth: 2
  }
});

export { AuthScreen };