import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import MapView from "react-native-maps";

import { deletePlace } from '../../store/actions';
import { showSideDrawer } from '../SideDrawer/SideDrawer'

const placeDetailScreen = props => {
  const { selectedPlace } = props;
  const [viewMode, setViewMode] = useState("portrait")

  useEffect(() => {
    Dimensions.addEventListener("change", updateStyles);
    return () => {
      Dimensions.removeEventListener("change", updateStyles);
    };
  }, [])

  useEffect(() => {
    // console.log('NavigationEvents: ', Navigation.events());
    const listener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        buttonId === "openSideDrawerButton" && showSideDrawer(props.componentId);
      } 
    );
    return () => listener.remove();
  }, []);

  const updateStyles = dims => {
    setViewMode(dims.window.height > 500 ? "portrait" : "landscape");
  };

  const placeDeleteHandler = () => {
    props.onDeletePlace(props.selectedPlace.key);
    // * Remove component from navigation stack
    Navigation.pop(props.componentId);
  };

  return (
    <View 
        style={[
          styles.container, 
          viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer
        ]}
      >
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={selectedPlace.image}
              style={styles.placeImage} 
            />
          </View>

          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={selectedPlace.location} />
            </MapView>
          </View>
        </View>
        
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>{selectedPlace ? selectedPlace.name : null}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={placeDeleteHandler}>
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
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});


export const PlaceDetailScreen = connect(null, mapDispatchToProps)(placeDetailScreen);
