import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { DefaultInput } from '../../components/UI/DefaultInput/DefaultInput'
import { MainText } from '../../components/UI/MainText/MainText';
import { HeadingText } from '../../components/UI/HeadingText/HeadingText';
import imagePlaceHolder from '../../assets/background.jpg';

class SharePlaceScreen extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    buttonId === "openSideDrawerButton" &&
      SideDrawer.showSideDrawer(this.props.componentId);
  }
  
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  }

  componentWillUnmount() {
    this.navigationEventListener && this.navigationEventListener.remove();
  }
  
  render() {
    return (
      // <ScrollView contentContainerStyle={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          
          <View style={styles.placeholder}>
            <Image source={imagePlaceHolder} style={styles.previewImage}/>
          </View>
          
          <View style={styles.button}>
            <Button title='Pick Image'/>
          </View>
          
          <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          
          <View style={styles.button}>
            <Button title='Locate me'/>
          </View>

          <DefaultInput placeholder='Place Name'/>
          
          <View style={styles.button}>
            <Button title='Share the place!'/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center" 
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

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
});

SharePlaceScreen = connect(null, mapDispatchToProps)(SharePlaceScreen);

export { SharePlaceScreen };
