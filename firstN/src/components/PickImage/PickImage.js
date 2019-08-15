import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceHolder from '../../assets/beautiful-place.jpg';


class PickImage extends Component {
  state = {  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={imagePlaceHolder} style={styles.previewImage}/>
        </View>

        <View style={styles.button}>
          <Button title='Pick Image' onPress={() => alert('Pick Image!')}/>
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
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});
 
export { PickImage };