import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { PlaceList } from '../../components/PlaceList/PlaceList';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { getPlaceDetailScreen } from '../../navigation/homeScreens';
import { setComponentId, getPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
  state = {
    placesLoaded: false,
    removeAnimation: new Animated.Value(1), //* create animation for button remove (1 - opacity value)
    placesAnimation: new Animated.Value(0)
  }
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.setComponentId(this.props.componentId);
    this.props.loadPlaces();
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
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500, // * milliseconds
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler(); // * Run places animation
    });
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
  
  render() {
    let content = (
      <Animated.View style={getAnimatedButtonStyles(this.state)}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if(this.state.placesLoaded) {
      content = (
        <Animated.View style={getAnimatedPlacesStyles(this.state)}>
          <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      )
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
  setComponentId: id => dispatch(setComponentId(id)),
  loadPlaces: () => dispatch(getPlaces())
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
    borderRadius: 10,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const getAnimatedButtonStyles = state => ({
  opacity: state.removeAnimation,
  transform: [
    {
      scale: state.removeAnimation.interpolate({
        inputRange: [0, 1], //* range what we get (opacity range from 0 to 1)
        outputRange: [12, 0.8]
      })
    }
  ]
});

const getAnimatedPlacesStyles = state => ({
  opacity: state.placesAnimation
});


FindPlaceScreen = connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);

export { FindPlaceScreen };
