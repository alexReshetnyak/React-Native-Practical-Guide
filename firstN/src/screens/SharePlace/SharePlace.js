import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { addPlace, increaseBadgeNumber } from '../../store/actions';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { MainText } from '../../components/UI/MainText/MainText';
import { HeadingText } from '../../components/UI/HeadingText/HeadingText';
import { PlaceInput } from '../../components/PlaceInput/PlaceInput';
import { PickImage } from '../../components/PickImage/PickImage';
import { PickLocation } from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  state = {
    placeName: ''
  }

  navigationButtonPressed({ buttonId }) { // * Navigation method
    buttonId === "openSideDrawerButton" &&
      SideDrawer.showSideDrawer(this.props.componentId);
  }
  
  placeAddedHandler = async () => {
    if (this.state.placeName.trim()) {
      this.props.onAddPlace(this.state.placeName);
      this.props.onIncreaseBadgeNumber();
      this.setState({placeName: ''});
    }
  }

  componentWillUnmount() {
    this.navigationEventListener && this.navigationEventListener.remove();
  }

  onChangePlaceNameHandler = (newName) => {
    this.setState({
      placeName: newName
    });
  }
  
  render() {
    return (
      // <ScrollView contentContainerStyle={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          
          <PickImage/>
          <PickLocation/>
          <PlaceInput 
            placeName={this.state.placeName} 
            onChangeText={this.onChangePlaceNameHandler} 
          />
          
          <View style={styles.button}>
            <Button title='Share the place!' onPress={this.placeAddedHandler}/>
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
  }
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName)),
  onIncreaseBadgeNumber: () => dispatch(increaseBadgeNumber())
});

SharePlaceScreen = connect(null, mapDispatchToProps)(SharePlaceScreen);

export { SharePlaceScreen };
