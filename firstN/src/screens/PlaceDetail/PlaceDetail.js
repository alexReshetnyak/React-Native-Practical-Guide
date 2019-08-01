import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { deletePlace } from '../../store/actions';
import { SideDrawer } from '../SideDrawer/SideDrawer'

class PlaceDetailScreen extends Component {

  /**
   * Get PlaceDetail object for navigation
   *
   * @param {Object} selectedPlace - selected place object { key: 'string', name: 'string', image: object }
   * @return {Object} PlaceDetail promise object for navigation
   *
   * @example
   *
   *     getNavigationComponent({ key: 'string', name: 'string', image: object })
   */
  static getNavigationComponent = async selectedPlace => ({
    component: {
      name: 'navigation.PlaceDetailScreen',
      passProps: {
        selectedPlace
      },
      options: {
        topBar: {
          title: {
            text: selectedPlace.name,
            color: '#FFBC42',
            fontSize: 24,
            alignment: 'center'
          },
          background: {
            color: '#424242'
          },
          rightButtons: [
            {
              id: 'openSideDrawerButton',
              icon: await Icon.getImageSource('ios-menu', 30, 'orange')
            }
          ]
        }
      }
    }
  });

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  
  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawerButton") {
      SideDrawer.showSideDrawer(this.props.componentId);
    }
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
              <Icon size={30} name='ios-trash' color='red' />
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