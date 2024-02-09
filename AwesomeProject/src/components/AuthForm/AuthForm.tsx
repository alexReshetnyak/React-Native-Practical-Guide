import React, {FC} from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {DefaultInput} from '../UI/DefaultInput/DefaultInput';

export type ControlsType = {
  [key: string]: {
    value: string;
    valid: boolean;
    pristine: boolean;
    validationRules: {
      [rule: string]: any;
    };
  };
};

type AuthFormProps = {
  authMode: string;
  viewMode: string;
  onFormChange: (key: string, value: string) => void;
  controls: ControlsType;
};

const AuthForm: FC<AuthFormProps> = props => {
  const {authMode, viewMode, onFormChange} = props;
  const {email, password, confirmPassword} = props.controls;
  let confirmPasswordControl = null;

  if (authMode === 'signup') {
    confirmPasswordControl = (
      <View
        style={
          viewMode === 'portrait'
            ? styles.portraitPasswordWrapper
            : styles.landscapePasswordWrapper
        }>
        <DefaultInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword.value}
          valid={confirmPassword.valid || confirmPassword.pristine}
          secureTextEntry
          onChangeText={(value: any) => onFormChange('confirmPassword', value)}
        />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputContainer}>
        <DefaultInput
          style={[styles.input, {backgroundColor: 'white'}]}
          placeholder="Your E-Mail Address"
          value={email.value}
          valid={email.valid || email.pristine}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value: any) => onFormChange('email', value)}
        />

        <View
          style={
            viewMode === 'landscape' && authMode === 'signup'
              ? styles.landscapePasswordContainer
              : styles.portraitPasswordContainer
          }>
          <View
            style={
              viewMode === 'landscape' && authMode === 'signup'
                ? styles.landscapePasswordWrapper
                : styles.portraitPasswordWrapper
            }>
            <DefaultInput
              style={styles.input}
              placeholder="Password"
              value={password.value}
              valid={password.valid || password.pristine}
              secureTextEntry
              onChangeText={(value: any) => onFormChange('password', value)}
            />
          </View>
          {confirmPasswordControl}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderWidth: 2,
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordWrapper: {
    width: '48%',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});

export {AuthForm};
