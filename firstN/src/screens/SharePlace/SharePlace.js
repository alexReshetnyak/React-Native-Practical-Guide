import React, { Component } from 'react';
import { View } from 'react-native';
import { PlaceInput } from '../../components/PlaceInput/PlaceInput'
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {

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
