import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';


class PickLocation extends Component {
  state = {  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        
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
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 200
  },
  button: {
    margin: 8
  }
});
 
export { PickLocation };