/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';

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
        <TextInput
          style={{width: 300, borderColor: 'black', borderWidth: 1}}
          placeholder="Awesome input"
          value={this.state.placeName}
          onChangeText={this.placeNameChangeHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  }
});
