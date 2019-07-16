/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// * to reload device set live reload (ctrl + m) or press rr

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
    places: []
  }

  placeSubmitHandler = (newPlace) => {
    this.setState(prevState => ({
      places: prevState.places.concat({key: Date.now() + '', value: newPlace})
    }));
  }

  onItemDeleted = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key;
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput
          onPlaceAdded={this.placeSubmitHandler}
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
