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
    viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape'
  }

  constructor(props) {
    super(props)
    Dimensions.addEventListener('change', dims => {
      const portrait = Dimensions.get('window').height > 500;
      this.setState({
        viewMode: portrait ? 'portrait' : 'landscape'
      });
    });
  }

  loginHandler = () => {
    goHome();
  }

  render() {
    const { viewMode } = this.state
    let headingText = null;
    if (viewMode === 'portrait') {
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
              <View style={ viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                  <DefaultInput style={styles.input} placeholder="Password"/>
                </View>
                <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
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
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },  
  portraitPasswordContainer: {
    flexDirection:'column',
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: '48%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

export { AuthScreen };