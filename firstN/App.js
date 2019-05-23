/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    placeName: ''
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{backgroundColor: 'white', marginBottom: 10, ...styles.placeInput}}
            placeholder="Awesome input"
            value={this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
          />
          <Button color="#841584" title='ADD'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 20,
  },
  inputContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
 
    alignItems: 'center',
    alignContent: 'center'

  },
  placeInput: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'red'
  },
  placeButton: {
    height: '100%',
    width: '30%',
    borderWidth: 1,
    borderColor: 'red'
  }
});
