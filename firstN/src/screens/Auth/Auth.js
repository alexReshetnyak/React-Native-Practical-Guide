import React, { Component } from "react";
import {
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import backgroundImage from "../../assets/background.jpg";
import { authStyles } from "./AuthStyles";
import { HeadingText } from "../../components/UI/HeadingText/HeadingText";
import { MainText } from "../../components/UI/MainText/MainText";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { ButtonWithBackground } from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import { validateFormValue } from "../../utility/validation";
import { authFormControls } from "./AuthFormControls";
import { tryAuth } from "../../store/actions";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    controls: authFormControls,
    authMode: "login"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === "login" ? "signup" : "login"
    }));
  };

  authHandler = () => {
    const { controls } = this.state;
    const authData = Object.keys(controls).reduce((sum, key) => {
       sum[key] = controls[key].value;
       return sum;
    }, {});
    Keyboard.dismiss();
    this.props.onTryAuth(authData, this.state.authMode);
  };

  updateInputState = (key, value) => {
    this.setState(
      prevState => ({
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            valid: validateFormValue(value, key, prevState.controls),
            pristine: false,
            value
          }
        }
      }),
      () => {
        if (
          key === "password" &&
          !this.state.controls["confirmPassword"].valid
        ) {
          this.setState(prevState => ({
            controls: {
              ...prevState.controls,
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid: validateFormValue(
                  prevState.controls["confirmPassword"].value,
                  "confirmPassword",
                  prevState.controls
                )
              }
            }
          }));
        }
      }
    );
  };

  checkFormValidity = () => {
    const { controls, authMode } = this.state;
    isValid = Object.keys(controls).every(key => {
      return authMode === "login" && key === "confirmPassword"
        ? true
        : controls[key].valid;
    });
    return isValid;
  };

  render() {
    const { viewMode, controls, authMode } = this.state;
    const headingText =
      viewMode === "portrait" ? (
        <MainText>
          <HeadingText style={{ color: "white" }}>
            Please {authMode === "login" ? " Sign Up" : " Login"}
          </HeadingText>
        </MainText>
      ) : null;
    const submitButton = this.props.isLoading ? (
      <ActivityIndicator />
    ) : (
      <ButtonWithBackground
        disabled={!this.checkFormValidity()}
        onPress={this.authHandler}
      >
        Submit
      </ButtonWithBackground>
    );

    return (
      <ImageBackground
        source={backgroundImage}
        style={authStyles.backgroundImage}
      >
        <KeyboardAvoidingView style={authStyles.container} behavior="height">
          {headingText}

          <ButtonWithBackground onPress={this.switchAuthMode}>
            Switch to {authMode === "login" ? " Sign Up" : " Login"}
          </ButtonWithBackground>

          <AuthForm
            controls={controls}
            authMode={authMode}
            viewMode={viewMode}
            onFormChange={this.updateInputState}
          />

          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
});

const mapDispatchToProps = dispatch => ({
  onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
});

AuthScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);

export { AuthScreen };
