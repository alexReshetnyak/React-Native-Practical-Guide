
// * to reload device set live reload (ctrl + m) or press rr
// * to resolve watchers issue use:  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// ? Debug: react-devtools //////////////// Debug JS Remotely better to use react-native-debbuger

import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import { PlaceList } from './src/components/PlaceList/PlaceList';
import { PlaceInput } from './src/components/PlaceInput/PlaceInput';
import { PlaceDetail } from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions';

class App extends Component {

  placeAddedHandler = newPlaceName => {
    this.props.onAddPlace(newPlaceName);
  }

  onPlaceSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }

  onPlaceDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  onModalClosedHandler = () => {
    this.props.onDeselectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.onPlaceDeletedHandler}
          onModalClosed={this.onModalClosedHandler} 
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList 
          places={this.props.places} 
          onItemSelected={this.onPlaceSelectedHandler} 
        />
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


const mapStateToProps = state => ({
  places:         state.places.places,
  selectedPlace:  state.places.selectedPlace
});

const mapDispatchToProps = dispatch => ({
  onAddPlace:     (name) => dispatch(addPlace(name)),
  onDeletePlace:      () => dispatch(deletePlace()),
  onSelectPlace:   (key) => dispatch(selectPlace(key)),
  onDeselectPlace:    () => dispatch(deselectPlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
