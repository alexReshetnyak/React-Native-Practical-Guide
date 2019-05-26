/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity
} from 'react-native';
import { ListItem } from './src/components/ListItem/ListItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName: val
    });
  }

  placeSubmitHandler = (e) => {
    if (!this.state.placeName.trim()) { return; }

    this.setState(prevState => ({
      placeName: '',
      places: prevState.places.concat(prevState.placeName)
    }));
  }

  render() {
    const placesOutput = this.state.places.map((place, index) => (
      <ListItem key={index} placeName={place}></ListItem>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{backgroundColor: 'white', ...styles.placeInput}}
            placeholder="Awesome input"
            value={this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
          />
          {/* <Button color="#841584" title='ADD'/> */}
          <TouchableOpacity onPress={this.placeSubmitHandler}>
            <Text style={styles.placeButton}>Click Me!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {placesOutput}
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
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'black',
    // borderWidth: 1
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    backgroundColor: 'red',
    borderRadius: 1,
    color: 'white',
    overflow: 'hidden',
    flexGrow: 1,
    padding: 12,
    textAlign:'center',
  },
  listContainer: {
    width: '100%'
  }
});
