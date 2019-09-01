import React, { Component } from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { connect } from "react-redux";

import backgroundImage from "../../assets/background.jpg";
import { authStyles } from "./AuthStyles";
import { goHome } from "../../navigation/navigation";
import { DefaultInput } from "../../components/UI/DefaultInput/DefaultInput";
import { HeadingText } from "../../components/UI/HeadingText/HeadingText";
import { MainText } from "../../components/UI/MainText/MainText";
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

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === "login" ? "signup" : "login"
    }));
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  loginHandler = () => {
    const { controls } = this.state;
    const authData = Object.keys(controls).map(key => ({
      [key]: controls[key].value
    }));
    this.props.onLogin(authData);
    goHome();
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
    const { email, password, confirmPassword } = controls;
    let headingText = null;
    let confirmPasswordControl = null;

    if (viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={{ color: "white" }}>
            Please {authMode === "login" ? " Sign Up" : " Login"}
          </HeadingText>
        </MainText>
      );
    }

    if (authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            viewMode === "portrait"
              ? authStyles.portraitPasswordWrapper
              : authStyles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            style={authStyles.input}
            placeholder="Confirm Password"
            value={confirmPassword.value}
            valid={confirmPassword.valid || confirmPassword.pristine}
            onChangeText={value =>
              this.updateInputState("confirmPassword", value)
            }
          />
        </View>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={authStyles.backgroundImage}
      >
        <View style={authStyles.container}>
          {headingText}

          <ButtonWithBackground onPress={this.switchAuthMode}>
            Switch to {authMode === "login" ? " Sign Up" : " Login"}
          </ButtonWithBackground>

          <View style={authStyles.inputContainer}>
            <View
              style={
                viewMode === "landscape" && authMode === "signup"
                  ? authStyles.landscapePasswordContainer
                  : authStyles.portraitPasswordContainer
              }
            >
              <View
                style={
                  viewMode === "landscape" && authMode === "signup"
                    ? authStyles.landscapePasswordWrapper
                    : authStyles.portraitPasswordWrapper
                }
              >
                <DefaultInput
                  style={authStyles.input}
                  placeholder="Password"
                  value={password.value}
                  valid={password.valid || password.pristine}
                  onChangeText={value =>
                    this.updateInputState("password", value)
                  }
                />
              </View>
              {confirmPasswordControl}
            </View>
            <DefaultInput
              style={[authStyles.input, { backgroundColor: "white" }]}
              placeholder="Your E-Mail Address"
              value={email.value}
              valid={email.valid || email.pristine}
              onChangeText={value => this.updateInputState("email", value)}
            />
          </View>

          <ButtonWithBackground
            disabled={!this.checkFormValidity()}
            onPress={this.loginHandler}
          >
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: authData => dispatch(tryAuth(authData))
});

AuthScreen = connect(
  null,
  mapDispatchToProps
)(AuthScreen);

export { AuthScreen };
