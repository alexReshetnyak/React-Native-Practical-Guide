import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import { goHome } from '../../navigation/navigation';
import { DefaultInput } from '../../components/UI/DefaultInput/DefaultInput';
import { HeadingText } from '../../components/UI/HeadingText/HeadingText';
import { MainText } from '../../components/UI/MainText/MainText';
import { ButtonWithBackground } from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {

  state = {
    respStyles: {
      pwContainerDirection: 'column',
      pwContainerJustifyContent: 'flex-start',
      pwWrapperWidth: '100%'
    }
  }

  constructor(props) {
    super(props)
    Dimensions.addEventListener('change', dims => {
      const portrait = Dimensions.get('window').height > 500;
      this.setState({
        respStyles: {
          pwContainerDirection:       portrait ? 'column' : 'row',
          pwContainerJustifyContent:  portrait ? 'flex-start' : 'space-between',
          pwWrapperWidth:             portrait ? '100%' : '48%'
        }   
      });
    });
  }

  loginHandler = () => {
    goHome();
  }

  render() {
    const {respStyles: { pwContainerDirection, pwContainerJustifyContent, pwWrapperWidth }} = this.state
    let headingText = null;
    if (Dimensions.get('window').height > 500) {
      headingText = (<MainText>
        <HeadingText style={{color: 'white'}}>Please Log In</HeadingText>
      </MainText>);
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
            {headingText}

            <ButtonWithBackground 
              onPress={() => alert('Hello')}
              style={{ backgroundColor: '#424242', color: 'white'}}
            >
              Switch to Login
            </ButtonWithBackground>
            
            <View style={styles.inputContainer}>
              <View style={{
                flexDirection: pwContainerDirection,
                justifyContent: pwContainerJustifyContent
              }}>
                <View style={{width: pwWrapperWidth}}>
                  <DefaultInput style={styles.input} placeholder="Password"/>
                </View>
                <View style={{width: pwWrapperWidth}}>
                  <DefaultInput style={styles.input} placeholder="Confirm Password"/>
                </View>
              </View>
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
  },
  passwordContainer: {
    flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
    justifyContent: "space-between"
  },
  passwordWrapper: {
    width: Dimensions.get('window').height > 500 ? '100%' : '48%',
  }
});

export { AuthScreen };