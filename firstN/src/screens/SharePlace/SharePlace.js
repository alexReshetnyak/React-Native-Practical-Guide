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
import { validateFormValue } from '../../utility/validation';

class SharePlaceScreen extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        pristine: true,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      }
    }
  }

  navigationButtonPressed({ buttonId }) { // * Navigation method
    buttonId === "openSideDrawerButton" &&
      SideDrawer.showSideDrawer(this.props.componentId);
  }
  
  placeAddedHandler = async () => {
    const { placeName: {value: placeName}, location: {value: location} } = this.state.controls;
    if (placeName.trim()) {
      this.props.onAddPlace(placeName, location);
      this.props.onIncreaseBadgeNumber();
      this.setState(prevState => ({
        controls: {
          placeName: { ...prevState.controls.placeName, value: '', valid: false, pristine: true },
          location: { ...prevState.controls.location, value: null, valid: false }
        }
      }));
    }
  }

  componentWillUnmount() {
    this.navigationEventListener && this.navigationEventListener.remove();
  }

  onChangePlaceNameHandler = newName => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          valid: validateFormValue(newName, 'placeName', prevState.controls),
          pristine: false,
          value: newName
        }
      }
    }));
  }

  locationPickedHandler = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }));
  }
  
  
  render() {
    const { controls } = this.state;

    return (
      // <ScrollView contentContainerStyle={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          
          <PickImage/>
          <PickLocation onLocationPick={this.locationPickedHandler}/>
          <PlaceInput 
            controls={controls}
            onChangeText={this.onChangePlaceNameHandler} 
          />
          
          <View style={styles.button}>
            <Button 
              disabled={!controls.placeName.valid || !controls.location.valid} 
              title='Share the place!' 
              onPress={this.placeAddedHandler}
            />
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
  onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location)),
  onIncreaseBadgeNumber: () => dispatch(increaseBadgeNumber())
});

SharePlaceScreen = connect(null, mapDispatchToProps)(SharePlaceScreen);

export { SharePlaceScreen };
