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
import { PlaceList } from './src/components/PlaceList/PlaceList';
import { PlaceInput } from './src/components/PlaceInput/PlaceInput';

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

  onItemDeleted = index => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place, i) => i !== index)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput 
          placeName={this.state.placeName} 
          placeNameChangeHandler={this.placeNameChangeHandler}
          placeSubmitHandler={this.placeSubmitHandler}
        />

        <PlaceList places={this.state.places} onItemDeleted={this.onItemDeleted} />
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
  }
});
