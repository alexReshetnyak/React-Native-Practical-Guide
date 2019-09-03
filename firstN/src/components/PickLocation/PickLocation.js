import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 49.9950205,
      longitude: 36.2361048,
      latitudeDelta,
      longitudeDelta
    }
  }

  render() { 
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={}
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