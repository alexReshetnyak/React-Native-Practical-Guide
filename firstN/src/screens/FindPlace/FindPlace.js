import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { PlaceList } from '../../components/PlaceList/PlaceList';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { getPlaceDetailScreen } from '../../navigation/homeScreens';
import { setComponentId } from '../../store/actions';

class FindPlaceScreen extends Component {
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.setComponentId(this.props.componentId)
  }
  
  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawerButton") {
      SideDrawer.showSideDrawer(this.props.componentId);
    }
  }

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);

    getPlaceDetailScreen(selectedPlace).then(navComponent =>{
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

const mapDispatchToProps = dispatch => ({
  setComponentId: id => dispatch(setComponentId(id))
});


FindPlaceScreen = connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);

export { FindPlaceScreen };
