import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { deletePlace } from '../../store/actions';
import { SideDrawer } from '../SideDrawer/SideDrawer'

class PlaceDetailScreen extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  
  navigationButtonPressed({ buttonId }) {
    buttonId === "openSideDrawerButton" && 
      SideDrawer.showSideDrawer(this.props.componentId);
  }

  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    // * Remove component from navigation stack
    Navigation.pop(this.props.componentId); 
  }
  
  render() {
    const { selectedPlace } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Image 
            source={selectedPlace ? selectedPlace.image : null}
            style={styles.placeImage} 
          />
          <Text style={styles.placeName}>{selectedPlace ? selectedPlace.name : null}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeleteHandler}>
            <View style={styles.deleteButton}>
              <Icon 
                size={30} 
                name={Platform.OS==="ios"?'ios-trash':'md-trash'} 
                color='red' 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center',
  }
});

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});


PlaceDetailScreen = connect(null, mapDispatchToProps)(PlaceDetailScreen);

export { PlaceDetailScreen };