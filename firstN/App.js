/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// * to reload device set live reload (ctrl + m) or press rr
// * resolve watchers issue echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Image
} from 'react-native';

import { PlaceList } from './src/components/PlaceList/PlaceList';
import { PlaceInput } from './src/components/PlaceInput/PlaceInput';
import placeImage from './src/assets/Screenshot_1.png'; // * will create js object with path property

export default class App extends Component {
  state = {
    places: []
  }

  placeAddedHandler = newPlace => {
    this.setState(prevState => ({
      places: prevState.places.concat({
        key: Date.now() + '', 
        name: newPlace,
        image: placeImage
      })
    }));
  }

  onItemDeleted = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => place.key !== key)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
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
