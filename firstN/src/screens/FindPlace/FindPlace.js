import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { PlaceList } from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  onItemSelectedHandler = key => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'PlaceDetailScreen',
        // children: [],
        options: {
          // bottomTab: {
          //   fontSize: 12,
          //   text: 'Place Detail',
          //   icon: await Icon.getImageSource('ios-share-alt', 30, 'blue')
          // },
          topBar: {
            title: {
              text: this.props.places.find(place => place.key === key).name,
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
    })
  }

  render() { 
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places
});


FindPlaceScreen = connect(mapStateToProps)(FindPlaceScreen);

export { FindPlaceScreen };
