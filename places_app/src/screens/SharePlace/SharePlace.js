import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";

import { addPlace, startAddPlace } from "../../store/actions";
import { showSideDrawer} from "../SideDrawer/SideDrawer";
import { MainText } from "../../components/UI/MainText/MainText";
import { HeadingText } from "../../components/UI/HeadingText/HeadingText";
import { PlaceInput } from "../../components/PlaceInput/PlaceInput";
import { PickImage } from "../../components/PickImage/PickImage";
import { PickLocation } from "../../components/PickLocation/PickLocation";
import { validateFormValue } from "../../utility/validation";


const sharePlaceScreen = props => {
  const defaultControls = {
    placeName: {
      value: "",
      valid: false,
      pristine: true,
      validationRules: {
        notEmpty: true
      }
    },
    location: {
      value: null,
      valid: false
    },
    image: {
      value: null,
      valid: false
    }
  };
  const [controls, setControls] = useState(defaultControls);

  useEffect(() => {
    // console.log('NavigationEvents: ', Navigation.events());
    const listener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        buttonId === "openSideDrawerButton" && showSideDrawer(props.componentId);
      } 
    );
    return () => listener.remove();
  }, []);

  const resetFormState = () => {
    setControls(defaultControls);
  };

  const addPlace = async () => {
    const {
      placeName: { value: placeName },
      location: { value: location },
      image: { value: image }
    } = controls;

    props.onStartAddPlace();
    
    if (placeName.trim()) {
      props.onAddPlace(placeName, location, image);
      resetFormState();
    }
  };

  const changePlaceName = newName => {
    setControls({
        ...controls,
        placeName: {
          ...controls.placeName,
          valid: validateFormValue(newName, "placeName", controls),
          pristine: false,
          value: newName
        }
    });
  };

  const changePickedLocation = location => {
    setControls({
      ...controls,
      location: {
        value: location,
        valid: true
      }
    });
  };

  const changePickedImage = image => {
    setControls({
        ...controls,
        image: {
          value: image,
          valid: true
        }
      });
  };

  const submitButton = props.isLoading ? (
      <ActivityIndicator />
    ) : (
      <Button
        disabled = {
          !controls.placeName.valid ||
          !controls.location.valid ||
          !controls.image.valid
        }
        title="Share the place!"
        onPress={addPlace}
      />
    );
  
  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a place with us!</HeadingText>
        </MainText>

        <PickImage
          control={controls.image}
          onImagePicked={changePickedImage}
        />
        <PickLocation
          control={controls.location}
          onLocationPick={changePickedLocation}
        />
        <PlaceInput
          controls={controls}
          onChangeText={changePlaceName}
        />

        <View style={styles.button}>{submitButton}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 200
  },
  button: {
    margin: 8
  }
});

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName, location, image) =>
    dispatch(addPlace(placeName, location, image)),
  
  onStartAddPlace: () => dispatch(startAddPlace())
});

export const SharePlaceScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(sharePlaceScreen);
