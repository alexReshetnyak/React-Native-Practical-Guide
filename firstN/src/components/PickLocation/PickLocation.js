import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

// * Instructions how to fix google maps for android:
// * 1) Android Studio -> search SDK manager -> SDK tools -> install Google play services
// * 2) Enable your google api key
// * 3) Change user permissions to get current location in android -> src -> main -> AndroidManifest
// * 3) Android Studio -> search AVD manager -> create new device with different version of android (optional)

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 49.9950205,
      longitude: 36.2361048,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get('window').width / 
        Dimensions.get('window').height * 
        0.0122
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    }));

    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }

  getLocationHandler = () => {
    // * navigator - React native global object
    navigator.geolocation.getCurrentPosition(pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            }
          }
        }
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert('Fetching the Position failed, please pick one manually');
      }
    )
  }
  

  render() { 
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref} // * bind class property map with MapView element
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title='Locate me' onPress={this.getLocationHandler}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  }
});
 
export { PickLocation };