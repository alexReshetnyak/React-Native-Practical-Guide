import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { PlaceInput } from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions';
import { SideDrawer } from '../SideDrawer/SideDrawer';

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
