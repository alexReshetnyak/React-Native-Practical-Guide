import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { PlaceInput } from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {

  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
  }
  
  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawer") {
      (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
        Navigation.mergeOptions(this.props.componentId, {
          sideMenu: {
            left: {
              visible: this.isSideDrawerVisible,
            }
          }
        });
    }
  }
  
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  }
  
  render() { 
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
});
 

SharePlaceScreen = connect(null, mapDispatchToProps)(SharePlaceScreen);

export { SharePlaceScreen };
