import React, {useState, useEffect, FC} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {PlaceList} from '../../components/PlaceList/PlaceList';
import {showSideDrawer} from '../SideDrawer/SideDrawer';
import {getPlaceDetailScreen} from '../../navigation/homeScreens';
import {setComponentId, getPlaces} from '../../store/actions';
import {RootState} from '../../store/configureStore';
import {Dispatch} from 'redux';

type Props = {
  componentId: string;
  placeAdded: boolean;
  places: any[];
  setComponentId: (componentId: string) => void;
  loadPlaces: () => void;
};

const FindPlaceScreenComponent: FC<Props> = props => {
  const removeAnimation = new Animated.Value(1); //* create animation for button remove (1 - opacity value)
  const placesAnimation = new Animated.Value(0);
  const [placesLoaded, setPlacesLoaded] = useState(false);

  useEffect(() => {
    props.setComponentId(props.componentId);
    props.loadPlaces();
  });

  useEffect(() => {
    props.placeAdded &&
      Navigation.mergeOptions(props.componentId, {
        bottomTabs: {
          currentTabId: props.componentId,
        },
      });
  }, [props.componentId, props.placeAdded]);

  useEffect(() => {
    // console.log('NavigationEvents: ', Navigation.events());
    const listener =
      Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          buttonId === 'openSideDrawerButton' &&
            showSideDrawer(props.componentId);
        },
      );
    return () => listener.remove();
  });

  const itemSelectedHandler = async (key: string) => {
    const selectedPlace = props.places.find(place => place.key === key);

    const navComponent = await getPlaceDetailScreen(selectedPlace);
    Navigation.push(props.componentId, navComponent);
  };

  const placesSearchHandler = () => {
    Animated.timing(removeAnimation, {
      toValue: 0,
      duration: 500, // * milliseconds
      useNativeDriver: true,
    }).start(() => {
      setPlacesLoaded(true);
    });
  };

  const placesLoadedHandler = () => {
    Animated.timing(placesAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getContent = () => {
    const placesList = (
      <Animated.View style={getAnimatedPlacesStyles(placesAnimation)}>
        <PlaceList places={props.places} onItemSelected={itemSelectedHandler} />
      </Animated.View>
    );

    const searchButton = (
      <Animated.View style={getAnimatedButtonStyles(removeAnimation)}>
        <TouchableOpacity onPress={placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    placesLoaded && placesLoadedHandler(); // Run places animation
    return placesLoaded ? placesList : searchButton;
  };

  return (
    <View style={placesLoaded ? null : styles.buttonContainer}>
      {getContent()}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  places: state.places.places,
  placeAdded: state.places.placeAdded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setComponentId: (id: string) => dispatch(setComponentId(id)),
  loadPlaces: () => dispatch(getPlaces()),
});

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26,
  },
});

const getAnimatedButtonStyles = (removeAnimation: Animated.Value) => ({
  opacity: removeAnimation,
  transform: [
    {
      scale: removeAnimation.interpolate({
        inputRange: [0, 1], //* range what we get (opacity range from 0 to 1)
        outputRange: [12, 0.8],
      }),
    },
  ],
});

const getAnimatedPlacesStyles = (placesAnimation: Animated.Value) => ({
  opacity: placesAnimation,
});

export const FindPlaceScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindPlaceScreenComponent);
