import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { PlaceList } from '../../components/PlaceList/PlaceList';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { PlaceDetailScreen } from '../PlaceDetail/PlaceDetail';

class FindPlaceScreen extends Component {
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  
  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawerButton") {
      SideDrawer.showSideDrawer(this.props.componentId);
    }
  }

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);

    PlaceDetailScreen.getNavigationComponent(selectedPlace).then(navComponent =>{
      Navigation.push(this.props.componentId, navComponent);
    });
  }

  render() { 
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places
});


FindPlaceScreen = connect(mapStateToProps)(FindPlaceScreen);

export { FindPlaceScreen };
