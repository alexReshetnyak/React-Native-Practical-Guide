import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { PlaceList } from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);

    Navigation.push(this.props.componentId, {
      component: {
        name: 'PlaceDetailScreen',
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
            }
          }
        }
      }
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
