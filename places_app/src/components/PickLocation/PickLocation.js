import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

const INITIAL_CORDS = {
  latitude: 49.9950205,
  longitude: 36.2361048,
};

class PickLocation extends Component {
  state = {
    focusedLocation: {
      ...INITIAL_CORDS,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    locationChosen: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.control.value !== this.props.control.value &&
      prevState.locationChosen &&
      !this.props.control.value
    ) {
      this.setState({
        focusedLocation: {
          ...prevState.focusedLocation,
          ...INITIAL_CORDS
        },
        locationChosen: false
      })
    }
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
  };

  getLocationHandler = () => {
    // * navigator - React native global object
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually");
      }
    );
  };

  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)} // * bind class property map with MapView element
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export { PickLocation };
