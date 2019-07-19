/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// * to reload device set live reload (ctrl + m) or press rr
// * resolve watchers issue echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// ? Debug: react-devtools //////////////// Debug JS Remotely

import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Image
} from 'react-native';

import { PlaceList } from './src/components/PlaceList/PlaceList';
import { PlaceInput } from './src/components/PlaceInput/PlaceInput';
import { PlaceDetail } from './src/components/PlaceDetail/PlaceDetail';
import placeImage from './src/assets/Screenshot_1.png'; // * will create js object with path property

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeAddedHandler = newPlace => {
    this.setState(prevState => ({
      places: prevState.places.concat({
        key: Date.now() + '', 
        name: newPlace,
        // image: placeImage
        image: {
          uri: 'http://www.rialzi4x4evo.it/WebRoot/StoreIT8/Shops/150916/5971/B197/436C/F0E0/CE9B/0A0A/B010/A7B0/seat-cordoba-16.jpg'
        }
      })
    }));
  }

  onPlaceSelectedHandler = key => {
    // this.setState(prevState => {
    //   return {
    //     places: prevState.places.filter(place => place.key !== key)
    //   }
    // });

    this.setState(prevState => ({
      selectedPlace: prevState.places.find(place => place.key === key)
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.state.selectedPlace} />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.onPlaceSelectedHandler} />
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
