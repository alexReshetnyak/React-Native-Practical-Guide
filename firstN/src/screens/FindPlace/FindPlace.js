import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { PlaceList } from '../../components/PlaceList/PlaceList';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { getPlaceDetailScreen } from '../../navigation/homeScreens';
import { setComponentId } from '../../store/actions';

class FindPlaceScreen extends Component {
  state = {
    placesLoaded: false
  }
  
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

  placesSearchHandler = () => {
    this.setState({
      placesLoaded: true
    });
  }
  
  render() {
    let content = (
      <TouchableOpacity onPress={this.placesSearchHandler}>
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Find Places</Text>
        </View>
      </TouchableOpacity>
    );
    if(this.state.placesLoaded) {
      content = <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
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

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});


FindPlaceScreen = connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);

export { FindPlaceScreen };
