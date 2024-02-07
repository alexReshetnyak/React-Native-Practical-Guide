import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from "react-native-image-picker";

class PickImage extends Component {
  state = {
    pickedImage: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.control.value   !== this.props.control.value &&
      prevState.pickedImage     !== this.props.control.value && 
      this.props.control.value  !== this.state.pickedImage
    ) {
      this.setState({ pickedImage: this.props.control.value })
    }
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 300, maxHeight: 200}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage}/>
        </View>

        <View style={styles.button}>
          <Button title='Pick Image' onPress={this.pickImageHandler}/>
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