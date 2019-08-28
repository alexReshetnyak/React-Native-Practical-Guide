import React, { Component } from "react";
import { View, ImageBackground, Dimensions, Text } from "react-native";

import { authStyles } from "./AuthStyles";
import { goHome } from "../../navigation/navigation";
import { DefaultInput } from "../../components/UI/DefaultInput/DefaultInput";
import { HeadingText } from "../../components/UI/HeadingText/HeadingText";
import { MainText } from "../../components/UI/MainText/MainText";
import { ButtonWithBackground } from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import { validateFormValue } from "../../utility/validation";
import { authFormControls } from "./AuthFormControls";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    controls: authFormControls
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

  loginHandler = () => {
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

  render() {
    const { viewMode, controls } = this.state;
    const { email, password, confirmPassword } = controls;
    let headingText = null;
    if (viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={{ color: "white" }}>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={authStyles.backgroundImage}
      >
        <View style={authStyles.container}>
          {headingText}

          <ButtonWithBackground
            onPress={() => alert("Hello")}
            style={{ backgroundColor: "#424242", color: "white" }}
          >
            Switch to Login
          </ButtonWithBackground>

          <View style={authStyles.inputContainer}>
            <View
              style={
                viewMode === "portrait"
                  ? authStyles.portraitPasswordContainer
                  : authStyles.landscapePasswordContainer
              }
            >
              <View
                style={
                  viewMode === "portrait"
                    ? authStyles.portraitPasswordWrapper
                    : authStyles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  style={authStyles.input}
                  placeholder="Password"
                  value={password.value}
                  onChangeText={value =>
                    this.updateInputState("password", value)
                  }
                />
                <Text style={{ color: "green" }}>
                  {password.valid ? "password VALID" : "password INVALID"}
                </Text>
              </View>
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
                  onChangeText={value =>
                    this.updateInputState("confirmPassword", value)
                  }
                />
                <Text style={{ color: "green" }}>
                  {confirmPassword.valid
                    ? "confirmPassword VALID"
                    : "confirmPassword INVALID"}
                </Text>
              </View>
            </View>
            <DefaultInput
              style={[authStyles.input, { backgroundColor: "white" }]}
              placeholder="Your E-Mail Address"
              value={email.value}
              onChangeText={value => this.updateInputState("email", value)}
            />
            <Text style={{ color: "green" }}>
              {email.valid ? "Email VALID" : "Email INVALID"}
            </Text>
          </View>

          <ButtonWithBackground
            onPress={this.loginHandler}
            style={{ backgroundColor: "#424242", color: "white" }}
          >
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

export { AuthScreen };
