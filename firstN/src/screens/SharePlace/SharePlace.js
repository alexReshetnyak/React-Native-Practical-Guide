import React, { Component } from "react";
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
import { SideDrawer } from "../SideDrawer/SideDrawer";
import { MainText } from "../../components/UI/MainText/MainText";
import { HeadingText } from "../../components/UI/HeadingText/HeadingText";
import { PlaceInput } from "../../components/PlaceInput/PlaceInput";
import { PickImage } from "../../components/PickImage/PickImage";
import { PickLocation } from "../../components/PickLocation/PickLocation";
import { validateFormValue } from "../../utility/validation";
import { getFindPlaceScreen } from '../../navigation/homeScreens';

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  state = {
    controls: {
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
    }
  };
  
  componentWillUnmount() {
    this.navigationEventListener && this.navigationEventListener.remove();
  }

  resetFormState = () => {
    this.setState(prevState => ({
      controls: {
        placeName: {
          ...prevState.controls.placeName,
          value: "",
          valid: false,
          pristine: true
        },
        location: {
          ...prevState.controls.location,
          value: null,
          valid: false
        },
        image: { ...prevState.controls.image, value: null, valid: false }
      }
    }));
  }

  navigationButtonPressed({ buttonId }) {
    // * Navigation method
    buttonId === "openSideDrawerButton" &&
      SideDrawer.showSideDrawer(this.props.componentId);
  }


  placeAddedHandler = async () => {
    const {
      placeName: { value: placeName },
      location: { value: location },
      image: { value: image }
    } = this.state.controls;

    this.props.onStartAddPlace();
    
    if (placeName.trim()) {
      this.props.onAddPlace(placeName, location, image);
      this.resetFormState();
    }
  };


  onChangePlaceNameHandler = newName => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          valid: validateFormValue(newName, "placeName", prevState.controls),
          pristine: false,
          value: newName
        }
      }
    }));
  };

  locationPickedHandler = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }));
  };


  imagePickedHandler = image => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        image: {
          value: image,
          valid: true
        }
      }
    }));
  };


  render() {
    const { controls } = this.state;
    const submitButton = this.props.isLoading ? (
      <ActivityIndicator />
    ) : (
      <Button
        disabled={
          !controls.placeName.valid ||
          !controls.location.valid ||
          !controls.image.valid
        }
        title="Share the place!"
        onPress={this.placeAddedHandler}
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
            onImagePicked={this.imagePickedHandler}
          />
          <PickLocation
            control={controls.location}
            onLocationPick={this.locationPickedHandler}
          />
          <PlaceInput
            controls={controls}
            onChangeText={this.onChangePlaceNameHandler}
          />

          <View style={styles.button}>{submitButton}</View>
        </View>
      </ScrollView>
    );
  }
}

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

SharePlaceScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);

export { SharePlaceScreen };
