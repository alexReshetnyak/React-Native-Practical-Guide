import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

// * Instructions how to fix google maps for android:
// * 1) Android Studio -> search SDK manager -> SDK tools -> install Google play services
// * 2) Enable your google api key
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
    }
  }

  render() { 
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map} 
        />
        
        <View style={styles.button}>
          <Button title='Locate me' onPress={() => alert('Pick Location!')}/>
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